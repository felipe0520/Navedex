import { BaseDataBase } from "./BaseDatabase";
import { User } from "../model/User";

export class UserDatabase extends BaseDataBase {
  protected tableName: string = "naver_admin";

  private toModel(dbModel?: any): User | undefined {
    return dbModel && new User(dbModel.id, dbModel.name, dbModel.password);
  }

  public async createUser(user: User): Promise<void> {
    await super.getConnection().raw(`
        INSERT INTO ${this.tableName} (id,  email, password)
        VALUES (
          '${user.getId()}',
          '${user.getEmail()}',
          '${user.getPassword()}'
          )`);
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await super.getConnection().raw(`
      SELECT * from ${this.tableName} WHERE email = '${email}'
      `);
    return this.toModel(result[0][0]);
  }
}
