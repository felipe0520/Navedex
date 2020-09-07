import { BusinessRules } from "../../business/BusinessRules";
import { BaseDataBase } from "../../data/BaseDatabase";
import { NaverDataBase } from "../../data/NaverDataBase";
import { NaverBusinessUpdate } from "../../business/naver/updateNaver/naverBusinessUpdate";
import { TokenGenerator } from "../../services/tokenGenerator";
import { Request, Response } from "express";

export class NaverControllerUpdate {
  private static naverBusinessUpdate = new NaverBusinessUpdate(
    new TokenGenerator(),
    new NaverDataBase(),
    new BusinessRules()
  );

  async alter(req: Request, res: Response) {
    try {
      const user = {
        name: req.body.name,
        birthDate: req.body.birthDate,
        jobRole: req.body.jobRole,
        admissionDate: req.body.admission,
        projects: req.body.projects,
      };

      if (
        !user.name ||
        !user.birthDate ||
        !user.jobRole ||
        !user.admissionDate ||
        !user.projects
      ) {
        throw new Error("Incomplete user data");
      }

      const authentication = {
        token: req.headers.authorization as string,
        id: req.query.id as string,
      };

      const result = await NaverControllerUpdate.naverBusinessUpdate.update(
        user,
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
