import { Request, Response } from "express";
import { NaverBusinessStore } from "../../business/naver/store/naverBusinessStore";
import { IdGenerator } from "../../services/idGenerator";
import { BusinessRules } from "../../business/BusinessRules";
import { BaseDataBase } from "../../data/BaseDatabase";
import { NaverDataBase } from "../../data/NaverDataBase";
import { TokenGenerator } from "../../services/tokenGenerator";

export class NaverControllerStore {
  private static naverBusinessStore = new NaverBusinessStore(
    new NaverDataBase(),
    new IdGenerator(),
    new BusinessRules(),
    new TokenGenerator()
  );

  async signup(req: Request, res: Response) {
    try {
      const result = await NaverControllerStore.naverBusinessStore.signup({
        name: req.body.name,
        token: req.headers.authorization as string,
        birthDate: req.body.birthDate,
        jobRole: req.body.jobRole,
        admissionDate: req.body.admission,
        projects: req.body.projects,
      });

      res.status(200).send(result);
      await new BaseDataBase().destroyConnection();
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
      await new BaseDataBase().destroyConnection();
    }
  }
}
