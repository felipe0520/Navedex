import { BaseDataBase } from "./BaseDatabase";
import { Naver } from "../model/Naver";

export class NaverDataBase extends BaseDataBase {
  protected tableName: string = "naver_user";

  private toModel(dbModel?: any): Naver | undefined {
    return (
      dbModel &&
      new Naver(
        dbModel.id,
        dbModel.name,
        dbModel.birth_date,
        dbModel.job_role,
        dbModel.admission_date
      )
    );
  }

  public async createUser(user: Naver): Promise<void> {
    await super.getConnection().raw(`
        INSERT INTO ${
          this.tableName
        } (id, name, birth_date, job_role, admission_date)
        VALUES (
          '${user.getId()}',
          '${user.getName()}',
          '${user.getBirthDate()}',
          '${user.getJobRole()}',
          '${user.getAdmissionDate()}'
          )`);
  }

  public async getUserByEmail(email: string): Promise<Naver | undefined> {
    const result = await super.getConnection().raw(`
      SELECT * from ${this.tableName} WHERE email = '${email}'
      `);
    return this.toModel(result[0][0]);
  }

  public async getAll(): Promise<Naver[]> {
    const result = await super.getConnection().raw(`
    SELECT * from ${this.tableName}`);

    return result[0].map((data: any) => {
      return this.toModel(data);
    });
  }

  public async getFilterByName(name: string): Promise<Naver[]> {
    const result = await super.getConnection().raw(`
    SELECT * from ${this.tableName} WHERE name = '${name}'
    `);
    return result[0].map((data: any) => {
      return this.toModel(data);
    });
  }

  public async getFilterByJob(jobRole: string): Promise<Naver[]> {
    const result = await super.getConnection().raw(`
    SELECT * from ${this.tableName} WHERE job_role = '${jobRole}'
    `);
    return result[0].map((data: any) => {
      return this.toModel(data);
    });
  }

  public async getFilterByAdmissionDate(
    AdmissionDate: string
  ): Promise<Naver[]> {
    const result = await super.getConnection().raw(`
    SELECT * from ${this.tableName} WHERE admission_date = '${AdmissionDate}'
    `);
    return result[0].map((data: any) => {
      return this.toModel(data);
    });
  }
}
