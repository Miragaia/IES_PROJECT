package com.SensorSafe.API.midleware.rabbitmq;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Getter
public abstract class RabbitMQNotification {
    
    private final Logger logger = LoggerFactory.getLogger(RabbitMQNotification.class);
    private final RabbitMQHandler rabbitMQHandler;
    private final Object[] args;

    public RabbitMQNotification(RabbitMQHandler rabbitMQHandler, Object... args) {
        this.rabbitMQHandler = rabbitMQHandler;
        this.args = args;
    }

    public abstract void send();
}
