import { appEmitter } from "../emitter.js";

import { EVENTS } from "../event.constants.js";

import { sendToEmailQueue } from "../../queues/email.producer.js";

appEmitter.on(
  EVENTS.CATEGORY_CREATED,

  async (payload) => {
    console.log("CATEGORY_CREATED Event Triggered");

    await sendToEmailQueue({
      type: "CATEGORY_CREATED",

      email: payload.email,

      name: payload.name,
    });
  },
);
