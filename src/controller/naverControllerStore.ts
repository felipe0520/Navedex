import { Request, Response } from "express";
import { NaverBusinessStore } from "../business/store/naverBusinessStore";
import { IdGenerator } from "../services/idGenerator";
import { BusinessRules } from "../business/BusinessRules";
import { BaseDataBase } from "../data/BaseDatabase";
import { NaverDataBase } from "../data/NaverDataBase";

export class NaverControllerStore {
  private static naverBusinessStore = new NaverBusinessStore(
    new NaverDataBase(),
    new IdGenerator(),
    new BusinessRules()
  );

  async signup(req: Request, res: Response) {
    try {
      const result = await NaverControllerStore.naverBusinessStore.signup({
        name: req.body.name,
        birthDate: req.body.birthDate,
        jobRole: req.body.jobRole,
        admissionDate: req.body.admission,
      });

      res.status(200).send(result);
      await new BaseDataBase().destroyConnection();
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
      await new BaseDataBase().destroyConnection();
    }
  }
}
