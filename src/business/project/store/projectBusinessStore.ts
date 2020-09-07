import { IdGenerator } from "../../../services/idGenerator";
import { TokenGenerator } from "../../../services/tokenGenerator";
import { ProjectDataBase } from "../../../data/ProjectDataBase";
import { ProjectInterfaceSignup } from "./projectInterface";
import { Project } from "../../../model/Projects";

export class ProjectBusinessStore {
  constructor(
    private projectDataBase: ProjectDataBase,
    private idGenerator: IdGenerator,
    private tokenGenerator: TokenGenerator
  ) {}

  public async signup(projectData: ProjectInterfaceSignup) {
    const id = this.idGenerator.generate();

    const idAdmin = await this.tokenGenerator.verify(projectData.token).id
      .input;

    const project = new Project(
      id,
      idAdmin,
      projectData.name,
      projectData.users ? projectData.users : []
    );

    await this.projectDataBase.createProject(project);

    return { project };
  }
}
