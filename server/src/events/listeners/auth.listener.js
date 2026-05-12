import { appEmitter } from "../emitter.js";

import { EVENTS } from "../event.constants.js";

import { sendToEmailQueue } from "../../queues/email.producer.js";

appEmitter.on(
  EVENTS.USER_REGISTERED,

  async (payload) => {
    console.log("USER_REGISTERED Event Triggered");

    await sendToEmailQueue({
      type: "USER_REGISTERED",

      email: payload.email,

      name: payload.name,
    });
  },
);
