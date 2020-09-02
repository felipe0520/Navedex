import { Request, Response } from "express";
import { TokenGenerator } from "../services/tokenGenerator";
import { UserDatabase } from "../data/UserDataBase";
import { UserBusinessGetAll } from "../business/getAll/userBusinessGetAll";

export class UserControllerGetAll {
  private static userBusinessGetAll = new UserBusinessGetAll(
    new TokenGenerator(),
    new UserDatabase()
  );

  async getAll(req: Request, res: Response) {
    try {
      const result = await UserControllerGetAll.userBusinessGetAll.getAll(
        req.headers.authorization as string
      );

      res.status(200).send(result);
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
  }
}
