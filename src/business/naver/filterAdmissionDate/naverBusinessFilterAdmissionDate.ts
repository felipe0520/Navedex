import { TokenGenerator } from "../../../services/tokenGenerator";
import { FilterAdmissionDate } from "./interfaceFilterAdmissionDate";
import { BusinessRules } from "../../BusinessRules";
import { NaverDataBase } from "../../../data/NaverDataBase";

export class NaverBusinessFilterAdmissionDate {
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

    const users = await this.naverDataBase.getFilterByAdmissionDate(
      dataFilter.AdmissionDate
    );

    if (users.length === 0) {
      return "filter did not find result";
    }

    return this.businessRules.naverDataBaseForScreen(users);
  }
}
