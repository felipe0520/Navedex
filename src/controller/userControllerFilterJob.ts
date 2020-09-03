import { UserBusinessFilterJob } from "../business/filterJob/userBusinessFilterJob";
import { TokenGenerator } from "../services/tokenGenerator";
import { Request, Response } from "express";
import { BusinessRules } from "../business/BusinessRules";
import { BaseDataBase } from "../data/BaseDatabase";
import { NaverDataBase } from "../data/NaverDataBase";

export class UserControllerFilterJob {
  private static userBusinessFilterJob = new UserBusinessFilterJob(
    new TokenGenerator(),
    new NaverDataBase()
  );

  async getUser(req: Request, res: Response) {
    try {
      const result = await UserControllerFilterJob.userBusinessFilterJob.getUser(
        {
          job: req.query.job as string,
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
