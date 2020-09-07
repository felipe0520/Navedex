import { TokenGenerator } from "../../../services/tokenGenerator";
import { NaverDataBase } from "../../../data/NaverDataBase";
import { BusinessRules } from "../../BusinessRules";

export class NaverBusinessGetNaverDetail {
  constructor(
    private tokenGenerator: TokenGenerator,
    private naverDataBase: NaverDataBase,
    private businessRules: BusinessRules
  ) {}

  async getDetail(token: string, id: string) {
    this.tokenGenerator.verify(token);

    const result = await this.naverDataBase.getNaverDetail(id);

    return this.businessRules.naverDataBaseFromUserDetailScreen(result);
  }
}
