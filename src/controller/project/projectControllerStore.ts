import { Request, Response } from "express";
import { IdGenerator } from "../../services/idGenerator";
import { BaseDataBase } from "../../data/BaseDatabase";
import { TokenGenerator } from "../../services/tokenGenerator";
import { ProjectBusinessStore } from "../../business/project/store/projectBusinessStore";
import { ProjectDataBase } from "../../data/ProjectDataBase";

export class ProjectControllerStore {
  private static projectBusinessStore = new ProjectBusinessStore(
    new ProjectDataBase(),
    new IdGenerator(),
    new TokenGenerator()
  );

  async signup(req: Request, res: Response) {
    try {
      const result = await ProjectControllerStore.projectBusinessStore.signup({
        name: req.body.name,
        token: req.headers.authorization as string,
        users: req.body.users,
      });

      res.status(200).send(result);
      await new BaseDataBase().destroyConnection();
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
      await new BaseDataBase().destroyConnection();
    }
  }
}
