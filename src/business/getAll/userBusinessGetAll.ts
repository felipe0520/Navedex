import { TokenGenerator } from "../../services/tokenGenerator";
import { NaverDataBase } from "../../data/NaverDataBase";

export class UserBusinessGetAll {
  constructor(
    private tokenGenerator: TokenGenerator,
    private naverDataBase: NaverDataBase
  ) {}

  async getAll(token: string) {
    this.tokenGenerator.verify(token);

    const users = await this.naverDataBase.getAll();

    return users;
  }
}
