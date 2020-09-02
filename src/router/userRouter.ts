import express from "express";
import { UserControllerSingup } from "../controller/userController";

export const userRouter = express.Router();

userRouter.get("/test", new UserControllerSingup().signup);
