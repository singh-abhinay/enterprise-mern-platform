import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import { EventEmitter } from "events";

// Increase max listeners to avoid warning
EventEmitter.defaultMaxListeners = 20;

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
