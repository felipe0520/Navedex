import express from "express";
import { NaverControllerStore } from "../controller/naver/naverControllerStore";
import { NaverControllerGetAll } from "../controller/naver/naverControllerGetAll";
import { NaverControllerFilterName } from "../controller/naver/naverControllerFilterName";
import { NaverControllerFilterJob } from "../controller/naver/naverControllerFilterJob";
import { NaverControllerFilterAdmissionDate } from "../controller/naver/naverControllerFilterAdmissionDate";
import { NaverControllerUpdate } from "../controller/naver/naverControllerUpdate";
import { NaverControllerDelete } from "../controller/naver/naverControllerDelete";
import { NaverControllerDetail } from "../controller/naver/naverControllerDetail";

export const naverRouter = express.Router();

naverRouter.get("/all", new NaverControllerGetAll().getAll);
naverRouter.get("/filterName", new NaverControllerFilterName().getUser);
naverRouter.get("/filterJob", new NaverControllerFilterJob().getUser);
naverRouter.get(
  "/filterAdmissionDate",
  new NaverControllerFilterAdmissionDate().getUser
);
naverRouter.get("/detail", new NaverControllerDetail().getDetail);

naverRouter.post("/create", new NaverControllerStore().signup);
naverRouter.post("/update", new NaverControllerUpdate().alter);

naverRouter.delete("/delete", new NaverControllerDelete().delete);
