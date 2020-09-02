import moment from "moment";

export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private birth_date: string,
    private job_role: UserRole,
    private admission_date: string
  ) {}

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public getJobRole(): UserRole {
    return this.job_role;
  }

  public getBirthDate(): String {
    return moment(this.birth_date).format("YYYY-MM-DD");
  }

  public getAdmissionDate(): String {
    return moment(this.admission_date).format("YYYY-MM-DD");
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
