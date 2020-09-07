import { TokenGenerator } from "../../../services/tokenGenerator";
import { DeleteProjectData } from "./interfaceDeleteProjects";
import { ProjectDataBase } from "../../../data/ProjectDataBase";

export class ProjectBusinessDelete {
  constructor(
    private tokenGenerator: TokenGenerator,
    private projectDataBase: ProjectDataBase
  ) {}

  public async delete(projectData: DeleteProjectData) {
    const idAdmin = this.tokenGenerator.verify(projectData.token).id.input;

    const oldUser = await this.projectDataBase.checkIfProjectIsRequiredByTheAdministrator(
      projectData.idProject,
      idAdmin
    );

    if (!oldUser) {
      throw new Error("You no have permission");
    }

    await this.projectDataBase.deleteProject(projectData.idProject);

    return "Project successfully deleted";
  }
}
