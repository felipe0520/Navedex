import { Request, Response } from "express";
import { UserBusinessSignup } from "../business/userBusiness";
import { TokenGenerator } from "../services/tokenGenerator";
import { UserDatabase } from "../data/UserDataBase";
import { HashGenerator } from "../services/hashGenerator";
import { IdGenerator } from "../services/idGenerator";
import { BusinessRules } from "../business/BusinessRules";

export class UserControllerSingup {
  private static UserBusiness = new UserBusinessSignup(
    new UserDatabase(),
    new HashGenerator(),
    new TokenGenerator(),
    new IdGenerator(),
    new BusinessRules()
  );

  async signup(req: Request, res: Response) {
    try {
      const result = await UserControllerSingup.UserBusiness.signup({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        birthDate: req.body.birthDate,
        jobRole: req.body.jobRole,
        admissionDate: req.body.admission,
      });

      res.status(200).send(result);
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
  }
}
