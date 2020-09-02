import { UserDatabase } from "../data/UserDataBase";
import { IdGenerator } from "../services/idGenerator";
import { HashGenerator } from "../services/hashGenerator";
import { TokenGenerator } from "../services/tokenGenerator";
import { UserInterface } from "./userInterface";
import { stringToUserRole, User } from "../model/User";
import { BusinessRules } from "./BusinessRules";
import moment from "moment";

export class UserBusinessSignup {
  constructor(
    private userDatabase: UserDatabase,
    private hashGenerator: HashGenerator,
    private tokenGenerator: TokenGenerator,
    private idGenerator: IdGenerator,
    private businessRules: BusinessRules
  ) {}

  public async signup(user: UserInterface) {
    const id = this.idGenerator.generate();
    const hash = await this.hashGenerator.hash(user.password);

    const invalidEmail = this.businessRules.validateEmail(user.email);

    if (invalidEmail) {
      throw new Error("invalid email");
    }

    const invalidFormatAdmissionDate = this.businessRules.validateFormatDate(
      user.admissionDate
    );

    if (invalidFormatAdmissionDate) {
      throw new Error("invalid format admission date");
    }

    const invalidAdmissionDate = this.businessRules.dateIsAfterToActual(
      user.admissionDate
    );

    if (invalidAdmissionDate) {
      throw new Error("Date is admission is after to actual");
    }

    const invalidFormatBirthDate = this.businessRules.validateFormatDate(
      user.birthDate
    );

    if (invalidFormatBirthDate) {
      throw new Error("invalid format birth date");
    }

    const invalidBirthDate = this.businessRules.dateIsAfterToActual(
      user.birthDate
    );

    if (invalidBirthDate) {
      throw new Error("Birth date date is after to actual ");
    }

    const birthDate = new Date(user.birthDate);
    const admissionDate = new Date(user.admissionDate);

    await this.userDatabase.createUser(
      new User(
        id,
        user.name,
        user.email,
        hash,
        moment(birthDate).format("YYYY-MM-DD"),
        stringToUserRole(user.jobRole.toUpperCase()),
        moment(admissionDate).format("YYYY-MM-DD")
      )
    );

    const accessToken = this.tokenGenerator.generate({
      id,
      role: user.jobRole,
    });
    return { accessToken };
  }
}
