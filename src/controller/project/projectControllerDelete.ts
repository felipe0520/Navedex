import { Request, Response } from "express";
import { BaseDataBase } from "../../data/BaseDatabase";
import { TokenGenerator } from "../../services/tokenGenerator";
import { ProjectBusinessDelete } from "../../business/project/deleteProject/projectBusinessDelete";
import { ProjectDataBase } from "../../data/ProjectDataBase";

export class ProjectControllerDelete {
  private static projectBusinessDelete = new ProjectBusinessDelete(
    new TokenGenerator(),
    new ProjectDataBase()
  );

  async delete(req: Request, res: Response) {
    try {
      const projectData = {
        token: req.headers.authorization as string,
        idProject: req.query.id as string,
      };

      const result = await ProjectControllerDelete.projectBusinessDelete.delete(
        projectData
      );

      res.status(200).send(result);
      await new BaseDataBase().destroyConnection();
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
      await new BaseDataBase().destroyConnection();
    }
  }
}
