import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes/index.js";

import errorHandler from "./middleware/errorHandler.js";

import { connectRabbitMQ } from "./config/rabbitmq.js";
import { consumeEmailQueue } from "./queues/email.consumer.js";
import "./events/listeners/auth.listener.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/v1", routes);

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "API running",
  });
});

app.use(errorHandler);

const initializeRabbitMQ = async () => {
  try {
    await connectRabbitMQ();

    await consumeEmailQueue();

    console.log("RabbitMQ Initialized");
  } catch (error) {
    console.error("RabbitMQ Initialization Error:", error);
  }
};

initializeRabbitMQ();

export default app;
