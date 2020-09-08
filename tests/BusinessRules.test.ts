import { BusinessRules } from "../src/business/BusinessRules";

describe("testing class BusinessRules", () => {
  const businessRules = new BusinessRules();

  test("should return true when email is invalid ", () => {
    let invalidEmail = "felipe@bdasda";

    expect(businessRules.validateEmail(invalidEmail)).toBe(true);

    invalidEmail = "emailInvalid@invalidemail";

    expect(businessRules.validateEmail(invalidEmail)).toBe(true);
  });

  test("should return false when email is not invalid ", () => {
    let invalidEmail = "felipe@email.com.br";
    expect(businessRules.validateEmail(invalidEmail)).toBe(false);

    invalidEmail = "emailInvalid@test.org";
    expect(businessRules.validateEmail(invalidEmail)).toBe(false);
  });

  test("should return true when date is invalid ", () => {
    let invalidDate = "2010-30-10";

    expect(businessRules.validateFormatDate(invalidDate)).toBe(true);

    invalidDate = "20/14/2000";

    expect(businessRules.validateFormatDate(invalidDate)).toBe(true);
  });

  test("should return false when date is not invalid ", () => {
    const invalidDate2 = "2000-10/30";
    expect(businessRules.validateFormatDate(invalidDate2)).toBe(false);

    const invalidData = "10/10-1990";
    expect(businessRules.validateFormatDate(invalidData)).toBe(false);
  });

  test("should return true when date is greater than the current day ", () => {
    const invalidDate = "2050-10-30";
    expect(businessRules.dateIsAfterToActual(invalidDate)).toBe(true);
  });

  test("should return false when date is less than the current day ", () => {
    const invalidDate = "1990-10-30";
    expect(businessRules.dateIsAfterToActual(invalidDate)).toBe(false);
  });
});
