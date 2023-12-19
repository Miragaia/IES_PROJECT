package com.SensorSafe.API.midleware.rabbitmq;


import lombok.Getter;

@Getter
public abstract class RabbitMQNotificationReact extends RabbitMQNotification {

    private final String queueName = "frontend_notifications";
    
    public RabbitMQNotificationReact(RabbitMQHandler rabbitMQHandler, Object... args) {
        super(rabbitMQHandler, args);
    }
}
