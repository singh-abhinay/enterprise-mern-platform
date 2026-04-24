import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes/index.js";
import errorHandler from "./middleware/errorHandler.js";

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
  res.json({ success: true, message: "API running" });
});

app.use(errorHandler);

export default app;
