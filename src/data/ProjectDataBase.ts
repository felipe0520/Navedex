import { BaseDataBase } from "./BaseDatabase";
import { Project } from "../model/Projects";

export class ProjectDataBase extends BaseDataBase {
  protected tableName: string = "naver_project";
  protected tableJunction: string = "users_and_projects";

  private toModel(dbModel?: any): Project | undefined {
    return (
      dbModel &&
      new Project(
        dbModel.id,
        dbModel.id_admin,
        dbModel.name_project,
        dbModel.users
      )
    );
  }

  public async getAll(): Promise<Project[]> {
    const result = await super.getConnection().raw(`
    SELECT * from ${this.tableName}`);
    return result[0].map((data: any) => {
      return this.toModel(data);
    });
  }
  public async getProjectDetail(id: string) {
    const result = await super.getConnection().raw(`
    SELECT * FROM ${this.tableName}
    JOIN users_and_projects as u ON ${this.tableName}.id = u.id_project
    JOIN naver_user as z on u.id_user = z.id
    WHERE u.id_project = '${id}'`);
    return result[0];
  }

  public async createProject(project: Project): Promise<void> {
    await super.getConnection().raw(`
        INSERT INTO ${this.tableName} (id, id_admin, name_project)
        VALUES (
          '${project.getId()}',
          '${project.getIdAdmin()}',
          '${project.getName()}'
          )`);

    for (let i = 0; i < project.getUsers().length; i++) {
      await this.addProjectToUser(project.getId(), project.getUsers()[i]);
    }
  }

  public async addProjectToUser(idProject: string, idUser: string) {
    await super.getConnection().raw(`
    INSERT INTO ${this.tableJunction} (id_project, id_user )
    VALUES ( 
      '${idProject}',
      '${idUser}'
      )`);
  }

  public async alterProject(project: Project): Promise<void> {
    await super.getConnection().raw(`
    UPDATE ${this.tableName} SET 
    name_project = '${project.getName()}'
    WHERE ID = '${project.getId()}';

    `);

    await this.deleteUsersAndProjectsInTableJunction(project.getId());

    for (let i = 0; i < project.getUsers().length; i++) {
      await this.addProjectToUser(project.getId(), project.getUsers()[i]);
    }
  }

  public async deleteUsersAndProjectsInTableJunction(idProject: string) {
    await super.getConnection().raw(`
    DELETE FROM ${this.tableJunction} WHERE id_project = '${idProject}'
    `);
  }

  public async checkIfProjectIsRequiredByTheAdministrator(
    idUser: string,
    idAdmin: string
  ) {
    const project = await this.getProjectById(idUser);

    if (project) {
      const result = await this.getProjectByIdAndIdAdmin(idUser, idAdmin);
      return result;
    }

    throw new Error("Invalid id user");
  }

  public async getProjectById(id: string): Promise<Project | undefined> {
    const result = await super.getConnection().raw(`
    SELECT * FROM ${this.tableName} WHERE id = '${id}'
    `);

    return this.toModel(result[0][0]);
  }

  public async getProjectByIdAndIdAdmin(
    idUser: string,
    idAdmin: string
  ): Promise<Project | undefined> {
    const result = await super.getConnection().raw(`
    SELECT * FROM   ${this.tableName} WHERE id = '${idUser}'
    AND id_admin = '${idAdmin}'
    `);

    return this.toModel(result[0][0]);
  }

  public async deleteProject(idProject: string): Promise<void> {
    await this.deleteUsersAndProjectsInTableJunction(idProject);

    await super.getConnection().raw(`
    DELETE FROM ${this.tableName} WHERE id = '${idProject}'`);
  }

  public async getFilterByName(name: string): Promise<Project[]> {
    const result = await super.getConnection().raw(`
    SELECT * from ${this.tableName} WHERE name_project LIKE '%${name}%'
    `);
    return result[0].map((data: any) => {
      return this.toModel(data);
    });
  }
}
