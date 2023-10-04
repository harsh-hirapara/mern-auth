import express from "express";
import { signInUser, signInWithGoogle, signUpUser } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/sign-up", signUpUser);
authRouter.post("/sign-in", signInUser);
authRouter.post("/google", signInWithGoogle);

export default authRouter;
