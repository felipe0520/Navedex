import express from "express";
import { UserControllerLogin } from "../controller/user/userControllerLogin";
import { UserControllerSignUp } from "../controller/user/userControllerSignUp";

export const userRouter = express.Router();

userRouter.get("/login", new UserControllerLogin().login);

userRouter.post("/signup", new UserControllerSignUp().signUp);
