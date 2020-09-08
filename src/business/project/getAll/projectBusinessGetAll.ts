import { TokenGenerator } from "../../../services/tokenGenerator";
import { BusinessRules } from "../../BusinessRules";
import { ProjectDataBase } from "../../../data/ProjectDataBase";

export class ProjectBusinessGetAll {
  constructor(
    private tokenGenerator: TokenGenerator,
    private projectDataBase: ProjectDataBase,
    private businessRules: BusinessRules
  ) {}

  async getAll(token: string) {
    this.tokenGenerator.verify(token);

    const projects = await this.projectDataBase.getAll();

    return this.businessRules.projectDataBaseForScreen(projects);
  }
}
