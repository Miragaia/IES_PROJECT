from apiHandler import ApiHandler
import pika
import os
import requests
import json
import sys



units = {'TEMPERATURE': '°C', 'HUMIDITY': '%', 'SMOKE': '%'}
token = None
qeue_name = 'SensorSafe'

api = ApiHandler()

def main():

    rabbit_adrress = 'rabbitmq_sensorsafe'
    rabbit_port = 5672
    rabbit_user = 'test'
    rabbit_pass = 'test'

    if len(sys.argv) < 2:
        print ("python3 processor.py <queu>")
        exit(1)

    qeue_name = sys.argv[1]

    credentials = pika.PlainCredentials(rabbit_user, rabbit_pass)
    parameters = pika.ConnectionParameters(rabbit_adrress, rabbit_port,'/', credentials)
    connection = pika.BlockingConnection(parameters)

    channel = connection.channel()

    channel.queue_declare(queue=qeue_name, durable=True)
    print(' [*] Waiting for messages. To exit press CTRL+C')

    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue=qeue_name, on_message_callback=callback)

    try:
        channel.start_consuming()

    except KeyboardInterrupt or SystemExit:
        pass

    finally:
        channel.stop_consuming()
        connection.close()
        print (" [*] Connection closed")

def callback(ch, method, properties, body):

    print(" [x] Received %r" % body.decode())

    data = json.loads(body.decode())

    if "id" not in data or "type" not in data or "value" not in data or "unit" not in data:
        print (" [x] Invalid message")
        return
    
    sensor_id = data["id"]
    sensor_type = data["type"]
    sensor_value = data["value"]
    sensor_unit = data["unit"]

    sensor = getSensor(sensor_id, "sensor")

    if sensor:

        print (" [x] Updating sensor state")
        update_state(sensor, sensor_value)

    else:
        sensor = getSensor(sensor_id, "available")

        if not sensor:
            print (" [x] Sensor not found")

    print (" [x] Sensor found")
    print (" [x] Sensor type: " + sensor_type)
    print (" [x] Sensor value: " + str(sensor_value))
    print (" [x] Sensor unit: " + sensor_unit)

    ch.basic_ack(delivery_tag=method.delivery_tag)

def getSensor(id, sensor_type):

    if sensor_type == "sensor":
        data = api.getSensors()

    elif sensor_type == "available":
        data = api.getAvailableSensors()

    else:
        print (" [x] Invalid sensor type")
        return 
    
    if data is None or data.status_code != 200:
        print (" [x] Error getting sensors")
        if data.status_code != 200:
            print (" [x] Status code: " + str(data.status_code))
        return
    
    sensors = data.content.decode()

    current_sensor = {}

    if sensors:
        all_sensors = json.loads(sensors)

        for sensor in all_sensors:
            if sensor["deviceId"] == id:
                current_sensor = sensor
                break

    return current_sensor


def update_state(sensor, value):

    sensor={"deviceId": sensor["deviceId"], "category": sensor["type"], "value": value, "sensorStatus": True}

    data = api.putState(sensor) 

    if data is None or data.status_code != 200:
        print (" [x] Error updating sensor state")
        if data.status_code != 200:
            print (" [x] Status code: " + str(data.status_code))
        return
    
    print (" [x] Sensor state updated")

if __name__ == '__main__':
    main()