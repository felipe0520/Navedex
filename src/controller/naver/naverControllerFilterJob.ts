import { NaverBusinessFilterJob } from "../../business/filterJob/naverBusinessFilterJob";
import { TokenGenerator } from "../../services/tokenGenerator";
import { Request, Response } from "express";
import { BusinessRules } from "../../business/BusinessRules";
import { BaseDataBase } from "../../data/BaseDatabase";
import { NaverDataBase } from "../../data/NaverDataBase";

export class NaverControllerFilterJob {
  private static naverBusinessFilterJob = new NaverBusinessFilterJob(
    new TokenGenerator(),
    new NaverDataBase(),
    new BusinessRules()
  );

  async getUser(req: Request, res: Response) {
    try {
      const result = await NaverControllerFilterJob.naverBusinessFilterJob.getUser(
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
