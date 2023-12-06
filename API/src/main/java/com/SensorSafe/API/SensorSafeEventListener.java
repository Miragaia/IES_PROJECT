package com.SensorSafe.API;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import com.SensorSafe.API.midleware.rabbitmq.RabbitMQHandler;

import javax.annotation.PreDestroy;
import javax.validation.OverridesAttribute.List;

@Component
public class SensorSafeEventListener {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    private final RabbitMQHandler rabbitMQHandler;

    @Value("${spring.rabbitmq.username}")
    private String username;
    @Value("${spring.rabbitmq.password}")
    private String password;

    @Autowired
    public SensorSafeEventListener(RabbitMQHandler rabbitMQHandler) {
        this.rabbitMQHandler = rabbitMQHandler;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void runAfterStartup() {
        try {
            rabbitMQHandler.connect(username, password, "/");
            rabbitMQHandler.setup("SensorSafe");
            logger.info("Connected to RabbitMQ");

        } catch (Exception e) {
            logger.error("Error connecting to RabbitMQ: " + e.getMessage());
            e.printStackTrace();
        }
    }

    

    @PreDestroy
    public void runOnShutdown() {
        try {
            rabbitMQHandler.disconnect();
        } catch (Exception e) {
            logger.error("Error disconnecting from RabbitMQ: " + e.getMessage());
            e.printStackTrace();
        }
    }

}
