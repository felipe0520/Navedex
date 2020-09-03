import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export class TokenGenerator {
  private static expiresIn: number = 12000;

  public generate = (input: string): string => {
    const newToken = jwt.sign(
      {
        input,
      },
      process.env.JWT_KEY as string,
      {
        expiresIn: TokenGenerator.expiresIn,
      }
    );
    return newToken;
  };

  public verify(token: string) {
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
    const result = { id: payload };
    return result;
  }
}
