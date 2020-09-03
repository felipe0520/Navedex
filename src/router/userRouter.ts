import express from "express";
import { UserControllerLogin } from "../controller/userControllerLogin";

export const userRouter = express.Router();

userRouter.get("/login", new UserControllerLogin().login);
