import { Request, Response } from "express";
import { TokenGenerator } from "../../services/tokenGenerator";
import { NaverBusinessGetAll } from "../../business/getAll/naverBusinessGetAll";
import { BaseDataBase } from "../../data/BaseDatabase";
import { NaverDataBase } from "../../data/NaverDataBase";
import { BusinessRules } from "../../business/BusinessRules";

export class NaverControllerGetAll {
  private static naverBusinessGetAll = new NaverBusinessGetAll(
    new TokenGenerator(),
    new NaverDataBase(),
    new BusinessRules()
  );

  async getAll(req: Request, res: Response) {
    try {
      const result = await NaverControllerGetAll.naverBusinessGetAll.getAll(
        req.headers.authorization as string
      );

      res.status(200).send(result);
      await new BaseDataBase().destroyConnection();
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
      await new BaseDataBase().destroyConnection();
    }
  }
}
