import { TokenGenerator } from "../services/tokenGenerator";
import { Request, Response } from "express";
import { UserBusinessFilterAdmissionDate } from "../business/filterAdmissionDate/userBusinessFilterAdmissionDate";
import { BusinessRules } from "../business/BusinessRules";
import { BaseDataBase } from "../data/BaseDatabase";
import { NaverDataBase } from "../data/NaverDataBase";

export class UserControllerFilterAdmissionDate {
  private static userBusinessFilterAdmissionDate = new UserBusinessFilterAdmissionDate(
    new TokenGenerator(),
    new NaverDataBase(),
    new BusinessRules()
  );

  async getUser(req: Request, res: Response) {
    try {
      const result = await UserControllerFilterAdmissionDate.userBusinessFilterAdmissionDate.getUser(
        {
          AdmissionDate: req.query.AdmissionDate as string,
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
