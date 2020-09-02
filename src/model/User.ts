export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private birthdate: string,
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
    return this.birthdate;
  }

  public getAdmissionDate(): String {
    return this.admission_date;
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
