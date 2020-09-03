import { TokenGenerator } from "../../services/tokenGenerator";
import { FilterJob } from "./interfaceFilterJob";
import { NaverDataBase } from "../../data/NaverDataBase";

export class UserBusinessFilterJob {
  constructor(
    private tokenGenerator: TokenGenerator,
    private naverDataBase: NaverDataBase
  ) {}

  async getUser(dataFilter: FilterJob) {
    this.tokenGenerator.verify(dataFilter.token);

    const users = await this.naverDataBase.getFilterByJob(dataFilter.job);

    if (users.length === 0) {
      return "filter did not find result";
    }

    return users;
  }
}
