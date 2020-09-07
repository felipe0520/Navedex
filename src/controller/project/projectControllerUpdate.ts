import { BaseDataBase } from "../../data/BaseDatabase";
import { TokenGenerator } from "../../services/tokenGenerator";
import { Request, Response } from "express";
import { ProjectBusinessUpdate } from "../../business/project/updateProject/projectBusinessUpdate";
import { ProjectDataBase } from "../../data/ProjectDataBase";

export class ProjectControllerUpdate {
  private static projectBusinessUpdate = new ProjectBusinessUpdate(
    new TokenGenerator(),
    new ProjectDataBase()
  );

  async alter(req: Request, res: Response) {
    try {
      const project = {
        name: req.body.name,
        users: req.body.users,
      };

      if (!project.name || !project.users) {
        throw new Error("Incomplete user data");
      }

      const authentication = {
        token: req.headers.authorization as string,
        id: req.query.id as string,
      };

      const result = await ProjectControllerUpdate.projectBusinessUpdate.update(
        project,
        authentication
      );

      res.status(200).send(result);
      await new BaseDataBase().destroyConnection();
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
      await new BaseDataBase().destroyConnection();
    }
  }
}
