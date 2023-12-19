const amqp = require('amqplib');
const express = require('express');
const http = require('http');
var cors = require('cors');

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

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
      const notification = message.content.toString();
      console.log('Mensagem recebida:', notification);
      io.emit('new_notification', notification);
    }, {
      noAck: true
    });

    console.log('Listener iniciado. Aguardando mensagens...');
  } catch (error) {
    console.error('Erro ao iniciar o listener:', error);
  }
}

startListener();

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});