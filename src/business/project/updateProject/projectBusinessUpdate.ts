import { TokenGenerator } from "../../../services/tokenGenerator";
import {
  ProjectInterfaceUpdate,
  ProjectAuthenticationData,
} from "./projectUpdateInterface";
import { ProjectDataBase } from "../../../data/ProjectDataBase";
import { Project } from "../../../model/Projects";

export class ProjectBusinessUpdate {
  constructor(
    private tokenGenerator: TokenGenerator,
    private projectDataBase: ProjectDataBase
  ) {}

  async update(
    project: ProjectInterfaceUpdate,
    authentication: ProjectAuthenticationData
  ) {
    const idAdmin = await this.tokenGenerator.verify(authentication.token).id
      .input;

    const oldUser = await this.projectDataBase.checkIfProjectIsRequiredByTheAdministrator(
      authentication.id,
      idAdmin
    );

    if (!oldUser) {
      throw new Error("You no have permission");
    }

    const newProject = new Project(
      authentication.id,
      oldUser.getIdAdmin(),
      project.name,
      project.users ? project.users : []
    );

    await this.projectDataBase.alterProject(newProject);

    return newProject;
  }
}
