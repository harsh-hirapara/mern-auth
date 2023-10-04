import express from "express";
import userRouter from "./user.route.js";
import authRouter from "./auth.index.js";

const indexRouter = express.Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/users", userRouter);

export default indexRouter;
