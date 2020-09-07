import { TokenGenerator } from "../../../services/tokenGenerator";
import { NaverDataBase } from "../../../data/NaverDataBase";
import { BusinessRules } from "../../BusinessRules";

export class NaverBusinessGetAll {
  constructor(
    private tokenGenerator: TokenGenerator,
    private naverDataBase: NaverDataBase,
    private businessRules: BusinessRules
  ) {}

  async getAll(token: string) {
    this.tokenGenerator.verify(token);

    const users = await this.naverDataBase.getAll();

    return this.businessRules.naverDataBaseForScreen(users);
  }
}
