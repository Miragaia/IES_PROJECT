import pika
import os
import time 
import requests
from bson import ObjectId
from multiprocessing import Process
from apiHandler import ApiHandler

process_list = []
id_list = []

def main():

    devices=ApiHandler().getSensors()
    if devices is not None:

        for device in devices:
            if device['category'] == 'TEMPERATURE':
               type = 'tempSensor'
               p = Process(target=startSensor, args=(device['deviceId'], type))
            elif device['category'] == 'HUMIDITY':
                type = 'humSensor'
                p = Process(target=startSensor, args=(device['deviceId'], type))
            elif device['category'] == 'SMOKE':
                type = 'smokeSensor'
                p = Process(target=startSensor, args=(device['deviceId'], type))

            p.start()
            process_list.append(p)
            id_list.append(device['deviceId'])

    while True:
        time.sleep(60)

        devices=ApiHandler().getSensors()

        if devices is not None:
            for device in devices:
                if device['category'] == 'TEMPERATURE':
                    if device['deviceId'] not in id_list:
                        type = 'tempSensor'
                        p = Process(target=startSensor, args=(device['deviceId'], type))
                        
                elif device['category'] == 'HUMIDITY':
                    if      device['deviceId'] not in id_list:
                        type = 'humSensor'
                        p = Process(target=startSensor, args=(device['deviceId'], type))
                        
                elif device['category'] == 'SMOKE':
                    if      device['deviceId'] not in id_list:
                        type = 'smokeSensor'
                        p = Process(target=startSensor, args=(device['deviceId'], type))
                        
                p.start()
                process_list.append(p)
                id_list.append(device['deviceId'])



def startSensor(id, type):
    os.system("python3 " + type + ".py " + id)

if __name__ == '__main__':
    main()