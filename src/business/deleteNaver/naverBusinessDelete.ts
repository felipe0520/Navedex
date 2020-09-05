import { TokenGenerator } from "../../services/tokenGenerator";
import { NaverDataBase } from "../../data/NaverDataBase";
import { DeleteNaverData } from "./interfaceIdUser";

export class NaverBusinessDelete {
  constructor(
    private tokenGenerator: TokenGenerator,
    private naveDataBase: NaverDataBase
  ) {}

  public async delete(naverData: DeleteNaverData) {
    const idAdmin = this.tokenGenerator.verify(naverData.token).id.input;

    const oldUser = await this.naveDataBase.checkIfUserIsRequiredByTheAdministrator(
      naverData.idUser,
      idAdmin
    );

    if (!oldUser) {
      throw new Error("You no have permission");
    }

    await this.naveDataBase.deleteUser(naverData.idUser);

    return "user successfully deleted";
  }
}
