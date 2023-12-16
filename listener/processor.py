from apiHandler import ApiHandler
import pika
import json
import concurrent.futures
import sys

units = {'TEMPERATURE': '°C', 'HUMIDITY': '%', 'SMOKE': '%'}
token = None

api = ApiHandler()

def callback(ch, method, properties, body):
    try:
        print(" [x] Received %r" % body.decode())

        data = json.loads(body.decode())
        validate_and_process(data)

    except Exception as e:
        print(" [x] Error processing message:", str(e))

    finally:
        ch.basic_ack(delivery_tag=method.delivery_tag)

def validate_and_process(data):
    if "id" not in data or "type" not in data or "value" not in data or "unit" not in data:
        print(" [x] Invalid message")
        return

    sensor_id = data["id"]
    sensor_type = data["type"]
    sensor_value = data["value"]
    sensor_unit = data["unit"]

    sensor = get_sensor(sensor_id, "sensor")

    if sensor:
        print(" [x] Updating sensor state")
        update_state(sensor, sensor_value)

    else:
        sensor = get_sensor(sensor_id, "available")
        if not sensor:
            print(" [x] Sensor not found")

    print(" [x] Sensor found")
    print(" [x] Sensor type: " + sensor_type)
    print(" [x] Sensor value: " + str(sensor_value))
    print(" [x] Sensor unit: " + sensor_unit)

def get_sensor(id, sensor_type):
    try:
        data = api.getSensors() if sensor_type == "sensor" else api.getAvailableSensors()

        if data is None or data.status_code != 200:
            print(" [x] Error getting sensors")
            if data.status_code != 200:
                print(" [x] Status code: " + str(data.status_code))
            return

        sensors = json.loads(data.content.decode())
        current_sensor = next((sensor for sensor in sensors if sensor["deviceId"] == id), None)
        return current_sensor

    except Exception as e:
        print(" [x] Error getting sensor:", str(e))
        return None

def update_state(sensor, value):
    try:
        sensor = {"deviceId": sensor["deviceId"], "category": sensor["category"], "value": value, "sensorStatus": True}
        data = api.putState(sensor)

        if data is None or data.status_code != 200:
            print(" [x] Error updating sensor state")
            if data.status_code != 200:
                print(" [x] Status code: " + str(data.status_code))
            return

        print(" [x] Sensor state updated")

    except Exception as e:
        print(" [x] Error updating sensor state:", str(e))

def main():
    try:
        rabbit_adrress = 'rabbitmq_sensorsafe'
        rabbit_port = 5672
        rabbit_user = 'test'
        rabbit_pass = 'test'
        qeue_name = "SensorSafe"

        credentials = pika.PlainCredentials(rabbit_user, rabbit_pass)
        parameters = pika.ConnectionParameters(rabbit_adrress, rabbit_port, '/', credentials)
        connection = pika.BlockingConnection(parameters)

        channel = connection.channel()

        channel.queue_declare(queue=qeue_name, durable=True)
        print(' [*] Waiting for messages. To exit press CTRL+C')

        channel.basic_qos(prefetch_count=1)
        channel.basic_consume(queue=qeue_name, on_message_callback=callback)

        with concurrent.futures.ThreadPoolExecutor() as executor:
            executor.submit(channel.start_consuming)

    except KeyboardInterrupt or SystemExit:
        pass

    finally:
        channel.stop_consuming()
        connection.close()
        print(" [*] Connection closed")

if __name__ == '__main__':
    main()
