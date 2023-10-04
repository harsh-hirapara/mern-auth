import express from "express";

const userRouter = express.Router();

userRouter.get("/", (req, res, next) => {
  try {
    res.json("user get successfully");
  } catch (err) {
    next(err);
  }
});

export default userRouter;
