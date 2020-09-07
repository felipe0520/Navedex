import { TokenGenerator } from "../../../services/tokenGenerator";
import { ProjectDataBase } from "../../../data/ProjectDataBase";
import { BusinessRules } from "../../BusinessRules";

export class ProjectBusinessDetail {
  constructor(
    private tokenGenerator: TokenGenerator,
    private projectDataBase: ProjectDataBase,
    private businessRules: BusinessRules
  ) {}

  async getDetail(token: string, id: string) {
    this.tokenGenerator.verify(token);

    const result = await this.projectDataBase.getProjectDetail(id);

    return this.businessRules.projectDataBaseFromUserDetailScreen(result);
  }
}
