import express from "express";
import { NaverControllerStore } from "../controller/naverControllerStore";
import { UserControllerGetAll } from "../controller/userControllerGetAll";
import { UserControllerFilterName } from "../controller/userControllerFilterName";
import { UserControllerFilterJob } from "../controller/userControllerFilterJob";
import { UserControllerFilterAdmissionDate } from "../controller/userControllerFilterAdmissionDate";

export const naverRouter = express.Router();

naverRouter.post("/create", new NaverControllerStore().signup);

naverRouter.get("/all", new UserControllerGetAll().getAll);
naverRouter.get("/filterName", new UserControllerFilterName().getUser);
naverRouter.get("/filterJob", new UserControllerFilterJob().getUser);
naverRouter.get(
  "/filterAdmissionDate",
  new UserControllerFilterAdmissionDate().getUser
);
