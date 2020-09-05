import { TokenGenerator } from "../../services/tokenGenerator";
import { FilterJob } from "./interfaceFilterJob";
import { NaverDataBase } from "../../data/NaverDataBase";
import { BusinessRules } from "../BusinessRules";

export class NaverBusinessFilterJob {
  constructor(
    private tokenGenerator: TokenGenerator,
    private naverDataBase: NaverDataBase,
    private businessRules: BusinessRules
  ) {}

  async getUser(dataFilter: FilterJob) {
    this.tokenGenerator.verify(dataFilter.token);

    const users = await this.naverDataBase.getFilterByJob(dataFilter.job);

    if (users.length === 0) {
      return "filter did not find result";
    }

    return this.businessRules.dataBaseForScreen(users);
  }
}
