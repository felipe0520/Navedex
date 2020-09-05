import { Request, Response } from "express";
import { BaseDataBase } from "../../data/BaseDatabase";
import { NaverDataBase } from "../../data/NaverDataBase";
import { NaverBusinessDelete } from "../../business/deleteNaver/naverBusinessDelete";
import { TokenGenerator } from "../../services/tokenGenerator";

export class NaverControllerDelete {
  private static naverBusinessDelete = new NaverBusinessDelete(
    new TokenGenerator(),
    new NaverDataBase()
  );

  async delete(req: Request, res: Response) {
    try {
      const naverData = {
        token: req.headers.authorization as string,
        idUser: req.query.id as string,
      };

      const result = await NaverControllerDelete.naverBusinessDelete.delete(
        naverData
      );

      res.status(200).send(result);
      await new BaseDataBase().destroyConnection();
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
      await new BaseDataBase().destroyConnection();
    }
  }
}
