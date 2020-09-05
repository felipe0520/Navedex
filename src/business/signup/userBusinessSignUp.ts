import { IdGenerator } from "../../services/idGenerator";
import { BusinessRules } from "../BusinessRules";
import { UserDatabase } from "../../data/UserDataBase";
import { UserInterfaceSignup } from "./userInterface";
import { HashGenerator } from "../../services/hashGenerator";
import { User } from "../../model/User";
import { TokenGenerator } from "../../services/tokenGenerator";

export class UserBusinessSignup {
  constructor(
    private userDataBase: UserDatabase,
    private idGenerator: IdGenerator,
    private hashGenerator: HashGenerator,
    private tokenGenerator: TokenGenerator,
    private businessRules: BusinessRules
  ) {}

  public async signup(user: UserInterfaceSignup) {
    const invalidEmail = this.businessRules.validateEmail(user.email);

    if (invalidEmail) {
      throw new Error("Invalid Email");
    }

    if (user.password.length < 6) {
      throw new Error("Password no has 6 characters or more ");
    }

    const existentUser = await this.userDataBase.getUserByEmail(user.email);

    if (existentUser) {
      throw new Error("Invalid Email");
    }

    const id = this.idGenerator.generate();
    const hash = await this.hashGenerator.hash(user.password);

    await this.userDataBase.createUser(new User(id, user.email, hash));

    const token = this.tokenGenerator.generate(id);

    return { token };
  }
}
