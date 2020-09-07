import { Request, Response } from "express";
import { TokenGenerator } from "../../services/tokenGenerator";
import { HashGenerator } from "../../services/hashGenerator";
import { BusinessRules } from "../../business/BusinessRules";
import { UserBusinessLogin } from "../../business/user/login/userBusinessLogin";
import { BaseDataBase } from "../../data/BaseDatabase";
import { UserDatabase } from "../../data/UserDataBase";

export class UserControllerLogin {
  private static userBusiness = new UserBusinessLogin(
    new HashGenerator(),
    new TokenGenerator(),
    new BusinessRules(),
    new UserDatabase()
  );

  async login(req: Request, res: Response) {
    try {
      const result = await UserControllerLogin.userBusiness.login({
        email: req.body.email,
        password: req.body.password,
      });

      res.status(200).send(result);
      await new BaseDataBase().destroyConnection();
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
      await new BaseDataBase().destroyConnection();
    }
  }
}
