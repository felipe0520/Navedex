import { TokenGenerator } from "../../services/tokenGenerator";
import { Request, Response } from "express";
import { NaverBusinessFilterAdmissionDate } from "../../business/naver/filterAdmissionDate/naverBusinessFilterAdmissionDate";
import { BusinessRules } from "../../business/BusinessRules";
import { BaseDataBase } from "../../data/BaseDatabase";
import { NaverDataBase } from "../../data/NaverDataBase";

export class NaverControllerFilterAdmissionDate {
  private static naverBusinessFilterAdmissionDate = new NaverBusinessFilterAdmissionDate(
    new TokenGenerator(),
    new NaverDataBase(),
    new BusinessRules()
  );

  async getUser(req: Request, res: Response) {
    try {
      const result = await NaverControllerFilterAdmissionDate.naverBusinessFilterAdmissionDate.getUser(
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
