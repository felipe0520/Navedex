import { IdGenerator } from "../../../services/idGenerator";
import { NaverInterfaceSignup } from "./naverInterface";
import { stringToUserRole, Naver } from "../../../model/Naver";
import { BusinessRules } from "../../BusinessRules";
import { NaverDataBase } from "../../../data/NaverDataBase";
import { TokenGenerator } from "../../../services/tokenGenerator";

export class NaverBusinessStore {
  constructor(
    private naverDataBase: NaverDataBase,
    private idGenerator: IdGenerator,
    private businessRules: BusinessRules,
    private tokenGenerator: TokenGenerator
  ) {}

  public async signup(user: NaverInterfaceSignup) {
    const id = this.idGenerator.generate();

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
    const idAdmin = await this.tokenGenerator.verify(user.token).id.input;

    const naver = new Naver(
      id,
      idAdmin,
      user.name,
      birthDate,
      stringToUserRole(user.jobRole.toUpperCase()),
      admissionDate,
      user.projects ? user.projects : []
    );

    await this.naverDataBase.createUser(naver);

    return { naver };
  }
}
