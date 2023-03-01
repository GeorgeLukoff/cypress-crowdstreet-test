export function confirmAndSave() {
  cy.waitUntil(() =>
    cy.getByTestId("toast-alert-success").each((item) => {
      cy.wrap(item).should("have.length", 0);
    })
  );
  cy.getByTestId("user-profile-accredited-true").click().should("be.checked");
  cy.getByTestId("submit-button").click({ timeout: 1000 });
  cy.get("button[data-react-toolbox='button']").eq(0).click();
  cy.get("button[data-react-toolbox='button']").eq(0).click({ force: true });
  cy.url().should("include", "/invexp/accounts/login");
  cy.log("*** User's account has been successfully created ***");
}
