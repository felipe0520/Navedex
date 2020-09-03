import { Naver } from "../model/Naver";

export class BusinessRules {
  public validateEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(String(email).toLowerCase());
  }

  public validateFormatDate(date: string): boolean {
    return new Date(date).toString() === "Invalid Date";
  }

  public dateIsAfterToActual(date: string): boolean {
    return new Date(date) > new Date();
  }
}
