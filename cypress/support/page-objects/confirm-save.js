export function confirmAndSave() {
  cy.getByTestId("user-profile-accredited-true")
    .focus()
    .click({ force: true })
    .should("be.checked");
  cy.getByTestId("submit-button").click({ timeout: 15000 }).click();
}
