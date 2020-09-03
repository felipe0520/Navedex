import { TokenGenerator } from "../../services/tokenGenerator";
import { FilterName } from "./interfaceFilterName";
import { NaverDataBase } from "../../data/NaverDataBase";

export class UserBusinessFilterName {
  constructor(
    private tokenGenerator: TokenGenerator,
    private naverDataBase: NaverDataBase
  ) {}

  async getUser(dataFilter: FilterName) {
    this.tokenGenerator.verify(dataFilter.token);

    const users = await this.naverDataBase.getFilterByName(dataFilter.name);

    if (users.length === 0) {
      return "filter did not find result";
    }

    return users;
  }
}
