import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { PORT, WHITE_LIST } from "../config/config.service.js";
import { checkConnectionDB } from "./DB/connectionDB.js";

const app = express();
const port = PORT;

const bootstrap = async () => {
  // Rate Limiting Middleware & CORS Configuration
  const limiter = rateLimit({
    windowMs: 50 * 5 * 1000, // 5 minutes
    limit: 3,
    message: "Too many requests from this IP, please try again after 5 minutes",
  });
  var corsOptions = {
    origin: function (origin, callback) {
      if ([...WHITE_LIST, undefined].includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  };

  // Middleware Setup
  app.use(cors(corsOptions), helmet(), limiter, express.json());
  // Home Route
  app.get("/", (req, res) => res.send("Welcome In Sticky Note!"));
  // Database
  checkConnectionDB();
  // Routes
  //...
  app.use("{/*demo}", (req, res, next) => {
    throw new Error(`Url ${req.originalUrl} Not Found!`, { cause: 404 });
  });
  // Error Handling Middleware
  app.use((err, req, res, next) =>
    res
      .status(err.cause || 500)
      .json({ message: err.message, stack: err.stack }),
  );
  app.listen(port, () => console.log(`Server on port ${port}!`));
};

export default bootstrap;
