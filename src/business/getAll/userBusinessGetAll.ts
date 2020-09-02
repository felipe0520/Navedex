import { TokenGenerator } from "../../services/tokenGenerator";
import { UserDatabase } from "../../data/UserDataBase";

export class UserBusinessGetAll {
  constructor(
    private tokenGenerator: TokenGenerator,
    private userDataBase: UserDatabase
  ) {}

  async getAll(token: string) {
    this.tokenGenerator.verify(token);

    const result = await this.userDataBase.getAll();

    return result.map((el) => {
      return {
        id: el.getId(),
        name: el.getName(),
        birth_date: el.getBirthDate(),
        admission_date: el.getAdmissionDate(),
        job_role: el.getJobRole(),
      };
    });
  }
}
