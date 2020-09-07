import { TokenGenerator } from "../../services/tokenGenerator";
import { Request, Response } from "express";
import { BusinessRules } from "../../business/BusinessRules";
import { BaseDataBase } from "../../data/BaseDatabase";
import { ProjectBusinessFilterName } from "../../business/project/filterName/projectBusinessFilterName";
import { ProjectDataBase } from "../../data/ProjectDataBase";

export class ProjectControllerFilterName {
  private static projectBusinessFilterName = new ProjectBusinessFilterName(
    new TokenGenerator(),
    new ProjectDataBase(),
    new BusinessRules()
  );

  async getProject(req: Request, res: Response) {
    try {
      const result = await ProjectControllerFilterName.projectBusinessFilterName.getProject(
        {
          name: req.query.name as string,
          token: req.headers.authorization as string,
        }
      );

      res.status(200).send(result);
      await new BaseDataBase().destroyConnection();
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
      await new BaseDataBase().destroyConnection();
    }
  }
}
