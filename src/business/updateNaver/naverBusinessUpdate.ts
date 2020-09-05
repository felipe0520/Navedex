import {
  NaverInterfaceUpdate,
  NaverAuthenticationData,
} from "./naverUpdateIntarface";
import { TokenGenerator } from "../../services/tokenGenerator";
import { NaverDataBase } from "../../data/NaverDataBase";
import { Naver, stringToUserRole } from "../../model/Naver";
import { BusinessRules } from "../BusinessRules";

export class NaverBusinessUpdate {
  constructor(
    private tokenGenerator: TokenGenerator,
    private naverDataBase: NaverDataBase,
    private businessRules: BusinessRules
  ) {}

  async update(
    user: NaverInterfaceUpdate,
    authentication: NaverAuthenticationData
  ) {
    const idAdmin = await this.tokenGenerator.verify(authentication.token).id
      .input;

    const oldUser = await this.naverDataBase.checkIfUserIsRequiredByTheAdministrator(
      authentication.id,
      idAdmin
    );

    if (!oldUser) {
      throw new Error("You no have permission");
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

    const newUser = new Naver(
      authentication.id,
      oldUser.getIdAdmin(),
      user.name,
      birthDate,
      stringToUserRole(user.jobRole.toUpperCase()),
      admissionDate,
      user.projects
    );

    await this.naverDataBase.alterUser(newUser);

    return newUser;
  }
}
