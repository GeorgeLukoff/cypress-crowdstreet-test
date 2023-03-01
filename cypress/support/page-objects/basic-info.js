import { string } from "../e2e/fixtures/data";

export function basicInfo() {
  cy.visit("/invexp/accounts/create-account");
  cy.get(".tablet-menu").click();
  cy.contains("Create An Account").click({ force: true });
  cy.getByTestId("firstName").type(`G${string}`);
  cy.getByTestId("lastName").type(`L${string}`);
  cy.loginCreate(`${string}@test.com`, `P#${string}@S`);
  cy.getByTestId("confirm-password").type(`P#${string}@S`);
  cy.getByTestId("accreditedOptionNo").check();
  cy.getByTestId("hasAgreedTos").check();
  cy.bypassRecaptcha().click();
  cy.getByTestId(".recaptcha-checkbox-checkmark").should("be.checked");

  cy.get("span.leading-4").should((login_button) => {
    expect(login_button).to.be.visible().click(login_button);

    cy.getByTestId("verify-mfa-skip").should((skip_button) => {
      expect(skip_button).to.be.visible().click(skip_button);
    });
  });
  cy.url().should("include", "invexp/properties/all");
}
