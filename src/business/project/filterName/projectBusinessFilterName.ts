import { TokenGenerator } from "../../../services/tokenGenerator";
import { FilterName } from "./interfaceFilterName";
import { BusinessRules } from "../../BusinessRules";
import { ProjectDataBase } from "../../../data/ProjectDataBase";

export class ProjectBusinessFilterName {
  constructor(
    private tokenGenerator: TokenGenerator,
    private projectDataBase: ProjectDataBase,
    private businessRules: BusinessRules
  ) {}

  async getProject(dataFilter: FilterName) {
    this.tokenGenerator.verify(dataFilter.token);

    const users = await this.projectDataBase.getFilterByName(dataFilter.name);

    if (users.length === 0) {
      return "filter did not find result";
    }

    return this.businessRules.projectDataBaseForScreen(users);
  }
}
