import { HashGenerator } from "../../services/hashGenerator";
import { TokenGenerator } from "../../services/tokenGenerator";
import { UserLogin } from "./interfaceUserLogin";
import { BusinessRules } from "../BusinessRules";
import { UserDatabase } from "../../data/UserDataBase";

export class UserBusinessLogin {
  constructor(
    private hashGenerator: HashGenerator,
    private tokenGenerator: TokenGenerator,
    private businessRule: BusinessRules,
    private userDataBase: UserDatabase
  ) {}

  async login(user: UserLogin) {
    const invalidEmail = this.businessRule.validateEmail(user.email);

    if (invalidEmail) {
      throw new Error("invalid email");
    }

    const userData = await this.userDataBase.getUserByEmail(user.email);

    if (!userData) {
      throw new Error("email or password is incorrect");
    }

    const correctPassword = await this.hashGenerator.compareHash(
      user.password,
      userData.getPassword()
    );

    if (!correctPassword) {
      throw new Error("email or password is incorrect");
    }

    const token = this.tokenGenerator.generate(userData.getId());

    return { token };
  }
}
