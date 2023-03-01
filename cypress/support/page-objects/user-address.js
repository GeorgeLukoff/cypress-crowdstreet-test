export function userAddress() {
  cy.log("*** Begin filling out User's address ***");
  cy.getByTestId("user-profile-address").clearThenType("123 Main St.");
  cy.getByTestId("user-profile-city").clearThenType("Portland");
  cy.getByTestId("user-profile-state-select")
    .select("Oregon", { force: true })
    .should("have.value", "Oregon");
  cy.getByTestId("user-profile-postal-code").clearThenType("12345");
  cy.getByTestId("user-profile-citizenship-country-select")
    .select("United States of America", { force: true })
    .should("have.value", "United States of America");
  cy.log("*** Finished filling out User's address ***");
}
