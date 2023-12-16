package com.SensorSafe.API.midleware.rabbitmq;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.concurrent.TimeoutException;


@Getter
@NoArgsConstructor
@Component
public class RabbitMQHandler {
    private static final Logger logger = LoggerFactory.getLogger(RabbitMQHandler.class);


    @Value("${spring.rabbitmq.host}")
    private String address;
    @Value("${spring.rabbitmq.port}")
    private int port;

    private Connection connection;
    private Channel channel;


    @Value("${spring.rabbitmq.template.exchange}")
    private String exchange;

    public void connect(String username, String password, String host) {

        ConnectionFactory factory = new ConnectionFactory();
       
        factory.setUsername(username);
        factory.setPassword(password);
        factory.setVirtualHost(host);
        factory.setHost(address);

        try {
            this.connection = factory.newConnection();
            this.channel = connection.createChannel();
            logger.info("Connected to RabbitMQ");
        } catch (IOException | TimeoutException e) {
            logger.error("Error connecting to RabbitMQ: " + e.getMessage());
            e.printStackTrace();
        }

    }

    public void setup(String queueName) {
        try {
            this.channel.exchangeDeclare(exchange, "direct", true);
            this.channel.queueDeclare(queueName, true, false, false, null);
            this.channel.queueBind(queueName, exchange, queueName);
            logger.info("Setup RabbitMQ");
           } catch (IOException e) {
            logger.error("Error setting up RabbitMQ: " + e.getMessage());
            e.printStackTrace();
            }
    }

    public void publish(String queueName, String message) throws IOException {
        try {
            channel.basicPublish(exchange, queueName, null, message.getBytes());
            logger.info("Published message to RabbitMQ: " + message + " on queue: " + queueName);
        } catch (IOException e) {
            logger.error("Error publishing to RabbitMQ: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public void disconnect() throws IOException, TimeoutException {
        try {
            channel.close();
            connection.close();
            logger.info("Disconnected from RabbitMQ");
        } catch (IOException | TimeoutException e) {
            logger.error("Error disconnecting from RabbitMQ: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public boolean isConnected() {
        
        return connection != null && connection.isOpen();
    }
}

