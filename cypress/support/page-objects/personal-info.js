export function personalInfo() {
  cy.visit("invexp/accounts/login/");
  cy.getByTestId("login-email-textbox").type(`${string}@test.com`);
  cy.getByTestId("login-password-textbox").type(`P#${string}@S`);
  cy.log("*** Begin filling out User's personal info ***");
  cy.signin();
  cy.getByTestId("login-email-textbox").type(`${string}@test.com`);
  cy.getByTestId("login-password-textbox").type(`P#${string}@S`);
  cy.get("#btn_login").click();
  cy.getByTestId("verify-mfa-skip").click();
  cy.url().should("include", "/invexp/properties/all");
  cy.get("a[href='/invexp/account/profile/']").first().click({ force: true });
  cy.url().should("include", "/invexp/account/profile/");
  cy.getByTestId("user-profile-first-name").clearThenType("YYY");
  cy.getByTestId("user-profile-first-name").clearThenType("Doe");
  cy.getByTestId("user-profile-ssn").clearThenType("112-12-1234");

  cy.getByTestId("user-profile-residence-status-select")
    .select("I'm a U.S. citizen", { force: true })
    .should("have.value", "I'm a U.S. citizen");

  cy.getByTestId("user-profile-marital-status-select")
    .select("Married", { force: true })
    .should("have.value", "Married");

  cy.getByTestId("user-profile-citizenship-country-select")
    .select("United States of America", { force: true })
    .should("have.value", "United States of America");

  cy.getByTestId("user-profile-dob").clearThenType("01/01/2000");
  cy.getByTestId("user-profile-email").clearThenType("test10@test.com");
  cy.log("*** User's personal info has been filled ***");
}
