import { Request, Response } from "express";
import { BaseDataBase } from "../../data/BaseDatabase";
import { NaverDataBase } from "../../data/NaverDataBase";
import { NaverBusinessDelete } from "../../business/naver/deleteNaver/naverBusinessDelete";
import { TokenGenerator } from "../../services/tokenGenerator";
import { NaverBusinessGetNaverDetail } from "../../business/naver/getUserDetail/naverBusinessGetNaverDetail";

export class NaverControllerDetail {
  private static naverBusinessGetNaverDetail = new NaverBusinessGetNaverDetail(
    new TokenGenerator(),
    new NaverDataBase()
  );

  async getDetail(req: Request, res: Response) {
    try {
      const naverData = {
        token: req.headers.authorization as string,
        idUser: req.query.id as string,
      };

      const result = await NaverControllerDetail.naverBusinessGetNaverDetail.getDetail(
        naverData.token,
        naverData.idUser
      );

      res.status(200).send(result);
      await new BaseDataBase().destroyConnection();
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
      await new BaseDataBase().destroyConnection();
    }
  }
}
