import moment from "moment";

export class Naver {
  constructor(
    private id: string,
    private id_admin: string,
    private name: string,
    private birth_date: string | Date,
    private job_role: UserRole,
    private admission_date: string | Date,
    private projects: string[]
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

  public getJobRole(): UserRole {
    return this.job_role;
  }

  public getBirthDate(): string {
    return moment(this.birth_date).format("YYYY-MM-DD");
  }

  public getAdmissionDate(): string {
    return moment(this.admission_date).format("YYYY-MM-DD");
  }

  public getProjects(): string[] {
    return this.projects;
  }
}

export enum UserRole {
  DEV = "DESENVOLVEDOR",
  CONTABILIDADE = "CONTABILIDADE",
  RECURSOS_HUMANOS = "RECURSOS HUMANOS",
  ADMIN = "ADMIN",
}

export const stringToUserRole = (input: string): UserRole => {
  switch (input) {
    case "DESENVOLVEDOR":
      return UserRole.DEV;
    case "CONTABILIDADE":
      return UserRole.CONTABILIDADE;
    case "RECURSOS HUMANOS":
      return UserRole.RECURSOS_HUMANOS;
    case "ADMIN":
      return UserRole.ADMIN;
    default:
      throw new Error("Invalid user role");
  }
};
