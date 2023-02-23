// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
/// <reference types="Cypress" />
//
import "cypress-file-upload";
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

//cy.getBySel() will return the DOM element using cy.get.
Cypress.Commands.add("getByTestId", (selector) => {
  return cy.get(`[data-testid=${selector}]`);
});

//This command takes in a selector wildcard * and returns the DOM element using cy.get(). This command will return multiple elements.
Cypress.Commands.add("getByTestIds", (selector) => {
  return cy.get(`[data-testid*=${selector}]`);
});
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("bypassRecaptcha", function () {
  cy.get("iframe[title='reCAPTCHA']").then((recaptchaIframe) => {
    const body = recaptchaIframe.contents();
    cy.wrap(body)
      // .find("#recaptcha-anchor")
      .find("div.recaptcha-checkbox-border")
      .should((captcha) => {
        expect(captcha).to.be.visible;
      })
      .click();
  });
});

Cypress.Commands.add(
  "clearThenType",
  { prevSubject: true },
  (subject, text) => {
    cy.wrap(subject).clear().type(text);
  }
);
