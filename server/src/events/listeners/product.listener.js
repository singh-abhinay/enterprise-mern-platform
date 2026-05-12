import { appEmitter } from "../emitter.js";

import { EVENTS } from "../event.constants.js";

import { sendToEmailQueue } from "../../queues/email.producer.js";

appEmitter.on(
  EVENTS.PRODUCT_CREATED,

  async (payload) => {
    console.log("PRODUCT_CREATED Event Triggered");

    await sendToEmailQueue({
      type: "PRODUCT_CREATED",

      email: payload.email,

      name: payload.name,
    });
  },
);
