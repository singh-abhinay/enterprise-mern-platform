import amqp from "amqplib";

let connection = null;
let channel = null;

export const connectRabbitMQ = async () => {
  try {
    connection = await amqp.connect(process.env.RABBITMQ_URL);

    channel = await connection.createChannel();

    await channel.assertQueue("email_queue");

    console.log("RabbitMQ Connected");
  } catch (error) {
    console.error("RabbitMQ Connection Error:", error);
  }
};

export const getChannel = () => {
  if (!channel) {
    throw new Error("RabbitMQ channel not initialized");
  }

  return channel;
};
