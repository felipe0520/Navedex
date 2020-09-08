import { BaseDataBase } from "./BaseDatabase";
import { Naver } from "../model/Naver";

export class NaverDataBase extends BaseDataBase {
  protected tableName: string = "naver_user";
  protected tableJunction: string = "users_and_projects";

  private toModel(dbModel?: any): Naver | undefined {
    return (
      dbModel &&
      new Naver(
        dbModel.id,
        dbModel.id_admin,
        dbModel.name,
        dbModel.birth_date,
        dbModel.job_role,
        dbModel.admission_date,
        dbModel.projects
      )
    );
  }

  public async createUser(user: Naver): Promise<void> {
    await super.getConnection().raw(`
        INSERT INTO ${
          this.tableName
        } (id, name, birth_date, job_role, admission_date, id_admin)
        VALUES (
          '${user.getId()}',
          '${user.getName()}',
          '${user.getBirthDate()}',
          '${user.getJobRole()}',
          '${user.getAdmissionDate()}',
          '${user.getIdAdmin()}'
          )`);

    for (let i = 0; i < user.getProjects().length; i++) {
      await this.addProjectToUser(user.getId(), user.getProjects()[i]);
    }
  }

  public async addProjectToUser(idUser: string, idProject: string) {
    await super.getConnection().raw(`
    INSERT INTO ${this.tableJunction} (id_user, id_project)
    VALUES ( 
      '${idUser}',
      '${idProject}'
      )`);
  }

  public async alterUser(user: Naver): Promise<void> {
    await super.getConnection().raw(`
    UPDATE ${this.tableName} SET 
    name = '${user.getName()}',
    birth_date = '${user.getBirthDate()}',
    admission_date = '${user.getAdmissionDate()}',
    job_role = '${user.getJobRole()}'
    WHERE ID = '${user.getId()}';

    `);

    await this.deleteProjects(user.getId());

    for (let i = 0; i < user.getProjects().length; i++) {
      await this.addProjectToUser(user.getId(), user.getProjects()[i]);
    }
  }

  public async deleteProjects(idUser: string) {
    await super.getConnection().raw(`
    DELETE FROM ${this.tableJunction} WHERE id_user = '${idUser}'
    `);
  }

  public async deleteUser(idUser: string): Promise<void> {
    await this.deleteProjects(idUser);
    await super.getConnection().raw(`
    DELETE FROM ${this.tableName} WHERE id = '${idUser}'`);
  }

  public async getUserByEmail(email: string): Promise<Naver | undefined> {
    const result = await super.getConnection().raw(`
      SELECT * FROM ${this.tableName} WHERE email = '${email}'
      `);
    return this.toModel(result[0][0]);
  }

  public async checkIfUserIsRequiredByTheAdministrator(
    idUser: string,
    idAdmin: string
  ) {
    const user = await this.getUserById(idUser);

    if (user) {
      const result = await this.getUserByIdAndIdAdmin(idUser, idAdmin);
      return result;
    }

    throw new Error("Invalid id user");
  }

  public async getUserById(id: string): Promise<Naver | undefined> {
    const result = await super.getConnection().raw(`
    SELECT * FROM ${this.tableName} WHERE id = '${id}'
    `);

    return this.toModel(result[0][0]);
  }

  public async getUserByIdAndIdAdmin(
    idUser: string,
    idAdmin: string
  ): Promise<Naver | undefined> {
    const result = await super.getConnection().raw(`
    SELECT * FROM   ${this.tableName} WHERE id = '${idUser}'
    AND id_admin = '${idAdmin}'
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
    SELECT * from ${this.tableName} WHERE name LIKE '%${name}%'
    `);
    return result[0].map((data: any) => {
      return this.toModel(data);
    });
  }

  public async getFilterByJob(jobRole: string): Promise<Naver[]> {
    const result = await super.getConnection().raw(`
    SELECT * from ${this.tableName} WHERE job_role LIKE '%${jobRole}%'
    `);
    return result[0].map((data: any) => {
      return this.toModel(data);
    });
  }

  public async getFilterByAdmissionDate(
    AdmissionDate: string
  ): Promise<Naver[]> {
    const result = await super.getConnection().raw(`
    SELECT * from ${this.tableName} WHERE admission_date  = '${AdmissionDate}'
    `);
    return result[0].map((data: any) => {
      return this.toModel(data);
    });
  }

  public async getNaverDetail(id: string) {
    const result = await super.getConnection().raw(`
    SELECT * FROM ${this.tableName}
    JOIN users_and_projects as u ON ${this.tableName}.id = u.id_user
    JOIN naver_project as z on u.id_project = z.id
    WHERE u.id_user = '${id}'`);
    return result[0];
  }
}
