import { Request, Response } from "express";
import { TokenGenerator } from "../services/tokenGenerator";
import { UserBusinessGetAll } from "../business/getAll/userBusinessGetAll";
import { BaseDataBase } from "../data/BaseDatabase";
import { NaverDataBase } from "../data/NaverDataBase";

export class UserControllerGetAll {
  private static userBusinessGetAll = new UserBusinessGetAll(
    new TokenGenerator(),
    new NaverDataBase()
  );

  async getAll(req: Request, res: Response) {
    try {
      const result = await UserControllerGetAll.userBusinessGetAll.getAll(
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
