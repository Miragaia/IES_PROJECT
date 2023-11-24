import pika
import json
import time
import random

# Configuração do RabbitMQ
rabbitmq_host = 'localhost'  # Substitua pelo host do seu RabbitMQ
rabbitmq_port = 5672
rabbitmq_username = 'sensorsafe'
rabbitmq_password = 'password'
exchange_name = 'sensor_exchange'
queue_name = 'SensorSafe'

# Conexão com o RabbitMQ
connection = pika.BlockingConnection(pika.ConnectionParameters(host=rabbitmq_host, port=rabbitmq_port, credentials=pika.PlainCredentials(rabbitmq_username, rabbitmq_password)))
channel = connection.channel()

# Declaração da exchange e da fila
channel.exchange_declare(exchange=exchange_name, exchange_type='direct', durable=True)
channel.queue_declare(queue=queue_name, durable=True)
channel.queue_bind(exchange=exchange_name, queue=queue_name, routing_key=queue_name)

# Função para simular a leitura do sensor e enviar para o RabbitMQ
def send_sensor_data():
    while True:
        # Simula a leitura do sensor
        sensor_data = {
            'sensor_id': random.randint(1, 10),
            'value': random.uniform(0, 100),
            'timestamp': int(time.time())
        }

        # Envia os dados para o RabbitMQ
        channel.basic_publish(
            exchange=exchange_name,
            routing_key=queue_name,
            body=json.dumps(sensor_data),
            properties=pika.BasicProperties(
                delivery_mode=2,  # torna a mensagem persistente
            )
        )

        print(f"Sent sensor data: {sensor_data}")

        # Aguarda um intervalo de tempo (por exemplo, 5 segundos) antes de enviar o próximo conjunto de dados
        time.sleep(5)

# Chama a função para enviar dados do sensor
send_sensor_data()

