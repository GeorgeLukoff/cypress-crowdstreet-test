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
import "cypress-wait-until";
// -- This is a parent command --

// First time login
Cypress.Commands.add("loginCreate", (email, password) => {
  cy.get("[data-testid='email']").type(email);
  cy.get("[data-testid='password']").type(password);
});

// Signing into existing account
Cypress.Commands.add("signin", (email, password) => {
  cy.getByTestId("login-email-textbox").type(email);
  cy.getByTestId("login-password-textbox").type(password);
  cy.get("#btn_login").click();
});

//cy.getBySel() will return the DOM element using cy.get.
Cypress.Commands.add("getByTestId", (selector) => {
  return cy.get(`[data-testid=${selector}]`);
});

//This command takes in a selector wildcard * and returns the DOM element using cy.get(). This command will return multiple elements.
Cypress.Commands.add("getByTestIds", (selector) => {
  return cy.get(`[data-testid*=${selector}]`);
});

// Bypassing reCaptcha
Cypress.Commands.add("bypassRecaptcha", () => {
  cy.wait(5000);
  cy.get("iframe[title='reCAPTCHA']").then((recaptchaIframe) => {
    const body = recaptchaIframe.contents();
    cy.wrap(body)
      .find("div.recaptcha-checkbox-border")
      .should((captcha) => {
        expect(captcha).to.be.visible;
      });
  });
});

// Randomizes fixuture data
Cypress.Commands.add("randomize", () => {
  const randomString = Math.random().toString(36).substring(2, 8);
  cy.readFile("cypress/fixtures/data.json", (err, data) => {
    if (err) {
      return console.error(err);
    }
  }).then((data) => {
    data.string = randomString;
    cy.writeFile("cypress/fixtures/data.json", JSON.stringify(data));
  });
});

// Clears a field and then types to it
Cypress.Commands.add(
  "clearThenType",
  { prevSubject: true },
  (subject, text) => {
    cy.wrap(subject).clear().type(text);
  }
);

// Cypress.Commands.add("randomString", function () {
//   function genRandomString(length) {
//     let result = "";
//     const characters =
//       "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//     let charactersLength = characters.length;
//     for (let i = 0; i < length; i++) {
//       result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
//   }

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
