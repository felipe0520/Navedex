import { TokenGenerator } from "../../../services/tokenGenerator";
import { FilterName } from "./interfaceFilterName";
import { NaverDataBase } from "../../../data/NaverDataBase";
import { BusinessRules } from "../../BusinessRules";

export class NaverBusinessFilterName {
  constructor(
    private tokenGenerator: TokenGenerator,
    private naverDataBase: NaverDataBase,
    private businessRules: BusinessRules
  ) {}

  async getUser(dataFilter: FilterName) {
    this.tokenGenerator.verify(dataFilter.token);

    const users = await this.naverDataBase.getFilterByName(dataFilter.name);

    if (users.length === 0) {
      return "filter did not find result";
    }

    return this.businessRules.dataBaseForScreen(users);
  }
}
