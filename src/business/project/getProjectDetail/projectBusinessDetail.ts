import { TokenGenerator } from "../../../services/tokenGenerator";
import { ProjectDataBase } from "../../../data/ProjectDataBase";

export class ProjectBusinessDetail {
  constructor(
    private tokenGenerator: TokenGenerator,
    private projectDataBase: ProjectDataBase
  ) {}

  async getDetail(token: string, id: string) {
    this.tokenGenerator.verify(token);

    const result = await this.projectDataBase.getProjectDetail(id);

    const projectAndUsers: {
      id: string;
      name: string;
      users: [
        {
          id: string;
          name: string;
          birth_date: string;
          admission_date: string;
          job_role: string;
        }
      ];
    } = {
      id: result[0].id_user,
      name: result[0].name_project,
      users: result.map(
        (el: {
          id_user: any;
          name: any;
          birth_date: any;
          admission_date: any;
          job_role: any;
        }) => {
          return {
            id: el.id_user,
            name: el.name,
            birth_date: el.birth_date,
            admission_date: el.admission_date,
            job_role: el.job_role,
          };
        }
      ),
    };

    return projectAndUsers;
  }
}
