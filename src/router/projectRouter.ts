import express from "express";
import { ProjectControllerGetAll } from "../controller/project/projectControllerGetAll";
import { ProjectControllerDetail } from "../controller/project/projectControllerDetail";
import { ProjectControllerStore } from "../controller/project/projectControllerStore";
import { ProjectControllerUpdate } from "../controller/project/projectControllerUpdate";
import { ProjectControllerDelete } from "../controller/project/projectControllerDelete";
import { ProjectControllerFilterName } from "../controller/project/projectControllerFilterName";

export const projectRouter = express.Router();

projectRouter.get("/all", new ProjectControllerGetAll().getAll);
projectRouter.get("/filter", new ProjectControllerFilterName().getProject);
projectRouter.get("/detail", new ProjectControllerDetail().getDetail);

projectRouter.post("/create", new ProjectControllerStore().signup);
projectRouter.post("/update", new ProjectControllerUpdate().alter);

projectRouter.delete("/delete", new ProjectControllerDelete().delete);
