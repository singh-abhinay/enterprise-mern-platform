import { getChannel } from "../config/rabbitmq.js";

import { sendEmail } from "../services/email.service.js";

import { welcomeTemplate } from "../templates/welcome.template.js";

export const consumeEmailQueue = async () => {
  try {
    const channel = getChannel();

    channel.consume(
      "email_queue",

      async (msg) => {
        if (!msg) return;

        const data = JSON.parse(msg.content.toString());

        console.log("Received Event:", data);

        switch (data.type) {
          case "USER_REGISTERED":
            await sendEmail({
              to: data.email,

              subject: "Welcome",

              html: welcomeTemplate(data.name),
            });

            break;

          default:
            console.log("Unknown Event Type");
        }

        channel.ack(msg);
      },
    );

    console.log("Email Consumer Started");
  } catch (error) {
    console.error("Consumer Error:", error);
  }
};
