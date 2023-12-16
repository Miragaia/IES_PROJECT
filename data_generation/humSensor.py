import sys
import time
import random
import pika
import json
import os

class humSensor:

    def __init__(self, id, start_humi = None, spleep_time = 60):
        self.rabbit_adrress = 'rabbitmq_sensorsafe'
        self.rabbit_port = 5672
        self.rabbit_user = 'test'
        self.rabbit_pass = 'test'

        if start_humi is None:
            self.start_humi = random.uniform(65, 80)
        else:
            self.start_humi = start_humi

        self.spleep_time = spleep_time
        self.type = 'HUMIDITY'
        self.id = id
        self.value = self.start_humi
        self.unit = '%'

        self.credentials = pika.PlainCredentials(self.rabbit_user, self.rabbit_pass)
        self.parameters = pika.ConnectionParameters(self.rabbit_adrress, self.rabbit_port,'/', self.credentials)
        self.connection = pika.BlockingConnection(self.parameters)

        self.channel = self.connection.channel()
        self.queue_name = 'SensorSafe'
        self.channel.queue_declare(queue=self.queue_name, durable=True)

    def run(self):
        humi_start=self.start_humi

        while True:
            humi_change = random.random() / 4
            chance = random.random()
            humi_dif =humi_start - self.start_humi

            up_down = (0.5 +(0.5* (humi_dif/3))) 

            if chance < up_down:
                humi_start = humi_start - humi_change
            else:
                humi_start = humi_start + humi_change

            self.value = humi_start
            print("Humidity: " + str(humi_start))
            data = {'type': self.type, 'id': self.id, 'value': self.value, 'unit': self.unit}
            self.channel.basic_publish(exchange='', routing_key=self.queue_name, body=json.dumps(data), properties=pika.BasicProperties(delivery_mode=pika.spec.PERSISTENT_DELIVERY_MODE))

            time.sleep(self.spleep_time)


if __name__ == '__main__':
    id = sys.argv[1]
    start_humi = sys.argv[2] if len(sys.argv) > 2 else None

    sensor = humSensor(id, start_humi)
    sensor.run()