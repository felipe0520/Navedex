import express from "express";
import { UserControllerSingup } from "../controller/userControllerSignup";
import { UserControllerLogin } from "../controller/userControllerLogin";
import { UserControllerGetAll } from "../controller/userControllerGetAll";

export const userRouter = express.Router();

userRouter.get("/test", new UserControllerSingup().signup);
userRouter.post("/login", new UserControllerLogin().login);
userRouter.get("/all", new UserControllerGetAll().getAll);
