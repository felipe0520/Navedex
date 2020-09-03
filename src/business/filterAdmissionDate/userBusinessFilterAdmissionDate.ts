import { TokenGenerator } from "../../services/tokenGenerator";
import { FilterAdmissionDate } from "./interfaceFilterAdmissionDate";
import { BusinessRules } from "../BusinessRules";
import { NaverDataBase } from "../../data/NaverDataBase";

export class UserBusinessFilterAdmissionDate {
  constructor(
    private tokenGenerator: TokenGenerator,
    private naverDataBase: NaverDataBase,
    private businessRules: BusinessRules
  ) {}

  async getUser(dataFilter: FilterAdmissionDate) {
    this.tokenGenerator.verify(dataFilter.token);

    const invalidFormatDate = this.businessRules.validateFormatDate(
      dataFilter.AdmissionDate
    );

    if (invalidFormatDate) {
      throw new Error("Invalid format date");
    }

    const invalidFormatBirthDate = this.businessRules.dateIsAfterToActual(
      dataFilter.AdmissionDate
    );

    if (invalidFormatBirthDate) {
      throw new Error("Date is admission is after to actual");
    }

    const users = await this.naverDataBase.getFilterByAdmissionDate(
      dataFilter.AdmissionDate
    );

    if (users.length === 0) {
      return "filter did not find result";
    }

    return this.businessRules.dataBaseForScreen(users);
  }
}
