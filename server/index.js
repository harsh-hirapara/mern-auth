import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import connectDatabase from "./config/database.config.js";
import indexRouter from "./routes/index.route.js";
import { NODE_ENV } from "./enums/index.enum.js";
connectDatabase();

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// if (process.env.NODE_ENV === NODE_ENV.DEV) {
//   app.use(cors());
// }

app.use("/api", indexRouter);

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const errorMessage = err.message || "Internal server error";
  console.log("ERROR FROM GLOBAL ERROR HANDLER: ", errorMessage);
  return res.status(statusCode).json({ status: false, message: errorMessage });
});

app.listen(process.env.PORT, () => {
  console.log("Server listening on port :", process.env.PORT);
});
