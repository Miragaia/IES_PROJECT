const amqp = require('amqplib');

async function startListener() {
  try {
    // Conectar ao RabbitMQ
    const connection = await amqp.connect({
      hostname: 'rabbitmq_sensorsafe',
      port: 5672,
      username: 'test',
      password: 'test'
    });
    if (!connection) {
      throw new Error('Não foi possível conectar ao RabbitMQ');
    }

    const channel = await connection.createChannel();

    // Criar uma fila
    const queue = 'frontend_notifications';
    await channel.assertQueue(queue);

    if (!channel)
      throw new Error('Não foi possível criar a fila');

    // Consumir mensagens
    channel.consume(queue, (message) => {
      console.log('Mensagem recebida:', message.content.toString());
    }, {
      noAck: true
    });

    console.log('Listener iniciado. Aguardando mensagens...');
  } catch (error) {
    console.error('Erro ao iniciar o listener:', error);
  }
}

startListener();