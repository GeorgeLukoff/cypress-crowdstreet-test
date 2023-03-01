export function uploadAuthLetter() {
cy.getByTestId("user-profile-has-regulatory-associations-true").click();
cy.getByTestId("user-profile-regulatory-associations-broker_dealer").check();
cy.getByTestId("id-dropzone-button")
  .should("be.visible")
  .each(($el, index) => {
    if (index === 0) {
      cy.wrap($el).selectFile("Cypress/fixtures/letter.pdf", {
        action: "drag-drop",
      });
    }
  });
cy.getByTestId("auth-doc-0-status").should("have.text", "Uploaded");
// cy.getByTestId("id-doc-0-title").should(
//   "have.text",
//   `photoid.pngUploaded on ${new Date().toLocaleDateString()}`
// );
}
