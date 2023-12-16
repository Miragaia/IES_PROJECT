import pika
import os
import time
from multiprocessing import Process
from math import ceil


queue_name = 'SensorSafe'

rabbit_adrress = 'rabbitmq_sensorsafe'
rabbit_port = 5672
rabbit_user = 'test'
rabbit_pass = 'test'

credentials = pika.PlainCredentials(rabbit_user, rabbit_pass)
parameters = pika.ConnectionParameters(rabbit_adrress, rabbit_port,'/', credentials)
connection = pika.BlockingConnection(parameters)

channel = connection.channel()

ProcessList = []


def first():

    global ProcessList

    response = channel.queue_declare(queue=queue_name, durable=True)

    messages= response.method.message_count
    consumers = response.method.consumer_count

    print(f"Queue {queue_name} has {messages} messages and {consumers} consumers")

    for message in range(messages):
        
        p = Process(target=processor, args=(queue_name,))

        print(f"Starting processor for queue {queue_name}")

        p.start()

        ProcessList.append(p)


def loop():

    global ProcessList

    try:
        while True:
            time.sleep(60)

            for process in ProcessList:
                if not process.is_alive():
                    ProcessList.remove(process)

            response = channel.queue_declare(queue=queue_name, durable=True)

            messages= response.method.message_count
            consumers = response.method.consumer_count

            print(f"Queue {queue_name} has {messages} messages and {consumers} consumers")

            if consumers < messages/2:
                for message in range(ceil((messages/2)-consumers)):
                    
                    p = Process(target=processor, args=(queue_name,))

                    print(f"Starting processor for queue {queue_name}")

                    p.start()

                    ProcessList.append(p)

            elif consumers > messages:

                for i in range(consumers-messages):
                    
                    print(f"Stopping processor for queue {queue_name}")

                    p = ProcessList.pop()
                    p.terminate()

           
    except KeyboardInterrupt:
        pass

    finally:

        connection.close()

        if ProcessList:
            for process in ProcessList:
                process.terminate()

        time.sleep(1)
        print("All processes terminated")


def processor(queue_name):
    os.system(f"python3 processor.py {queue_name}")


def main():
    first()
    loop()

if __name__ == '__main__':
    main()