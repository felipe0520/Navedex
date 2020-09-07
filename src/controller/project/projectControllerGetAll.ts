import { Request, Response } from "express";
import { TokenGenerator } from "../../services/tokenGenerator";
import { BaseDataBase } from "../../data/BaseDatabase";
import { BusinessRules } from "../../business/BusinessRules";
import { ProjectBusinessGetAll } from "../../business/project/getAll/projectBusinessGetAll";
import { ProjectDataBase } from "../../data/ProjectDataBase";

export class ProjectControllerGetAll {
  private static projectBusinessGetAll = new ProjectBusinessGetAll(
    new TokenGenerator(),
    new ProjectDataBase(),
    new BusinessRules()
  );

  async getAll(req: Request, res: Response) {
    try {
      const result = await ProjectControllerGetAll.projectBusinessGetAll.getAll(
        req.headers.authorization as string
      );

      res.status(200).send(result);
      await new BaseDataBase().destroyConnection();
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
      await new BaseDataBase().destroyConnection();
    }
  }
}
