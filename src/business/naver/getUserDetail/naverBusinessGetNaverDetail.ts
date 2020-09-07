import { TokenGenerator } from "../../../services/tokenGenerator";
import { NaverDataBase } from "../../../data/NaverDataBase";

export class NaverBusinessGetNaverDetail {
  constructor(
    private tokenGenerator: TokenGenerator,
    private naverDataBase: NaverDataBase
  ) {}

  async getDetail(token: string, id: string) {
    this.tokenGenerator.verify(token);

    const result = await this.naverDataBase.getNaverDetail(id);

    const userAndProjects: {
      id: string;
      name: string;
      birth_date: string;
      projects: [{ id: string; name: string }];
    } = {
      id: result[0].id_user,
      name: result[0].name,
      birth_date: result[0].birth_date,
      projects: result.map((el: { name_project: any; id_project: any }) => {
        return { name: el.name_project, id: el.id_project };
      }),
    };

    return userAndProjects;
  }
}
