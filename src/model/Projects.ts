export class Project {
  constructor(
    private id: string,
    private id_admin: string,
    private name: string,
    private users: string[]
  ) {}

  public getId(): string {
    return this.id;
  }
  public getIdAdmin(): string {
    return this.id_admin;
  }

  public getName(): string {
    return this.name;
  }

  public getUsers(): string[] {
    return this.users;
  }
}
