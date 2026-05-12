import { getChannel } from "../config/rabbitmq.js";

export const sendToEmailQueue = async (data) => {
  try {
    const channel = getChannel();

    channel.sendToQueue("email_queue", Buffer.from(JSON.stringify(data)));

    console.log("Event pushed to email_queue");
  } catch (error) {
    console.error("Producer Error:", error);
  }
};
