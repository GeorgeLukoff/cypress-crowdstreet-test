export function uploadPhotoId() {
  cy.getByTestId("id-dropzone-button")
    .should("be.visible")
    .each(($el, index) => {
      if (index === 1) {
        cy.wrap($el).selectFile("Cypress/fixtures/photoid.png", {
          action: "drag-drop",
        });
      }
    });
  cy.getByTestId("id-doc-0-status").should("have.text", "Uploaded");
  // cy.getByTestId("id-doc-0-title").should(
  //   "have.text",
  //   `photoid.pngUploaded on ${new Date().toLocaleDateString()}`
  // );
}
