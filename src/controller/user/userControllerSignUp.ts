import { Request, Response } from "express";
import { TokenGenerator } from "../../services/tokenGenerator";
import { HashGenerator } from "../../services/hashGenerator";
import { BusinessRules } from "../../business/BusinessRules";
import { BaseDataBase } from "../../data/BaseDatabase";
import { UserDatabase } from "../../data/UserDataBase";
import { UserBusinessSignup } from "../../business/user/signup/userBusinessSignUp";
import { IdGenerator } from "../../services/idGenerator";

export class UserControllerSignUp {
  private static userBusinessSignup = new UserBusinessSignup(
    new UserDatabase(),
    new IdGenerator(),
    new HashGenerator(),
    new TokenGenerator(),
    new BusinessRules()
  );

  async signUp(req: Request, res: Response) {
    try {
      const result = await UserControllerSignUp.userBusinessSignup.signup({
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
