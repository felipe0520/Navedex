import { Request, Response } from "express";
import { BaseDataBase } from "../../data/BaseDatabase";
import { TokenGenerator } from "../../services/tokenGenerator";
import { ProjectBusinessDetail } from "../../business/project/getProjectDetail/projectBusinessDetail";
import { ProjectDataBase } from "../../data/ProjectDataBase";

export class ProjectControllerDetail {
  private static projectBusinessDetail = new ProjectBusinessDetail(
    new TokenGenerator(),
    new ProjectDataBase()
  );

  async getDetail(req: Request, res: Response) {
    try {
      const naverData = {
        token: req.headers.authorization as string,
        idUser: req.query.id as string,
      };

      const result = await ProjectControllerDetail.projectBusinessDetail.getDetail(
        naverData.token,
        naverData.idUser
      );

      res.status(200).send(result);
      await new BaseDataBase().destroyConnection();
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
      await new BaseDataBase().destroyConnection();
    }
  }
}
