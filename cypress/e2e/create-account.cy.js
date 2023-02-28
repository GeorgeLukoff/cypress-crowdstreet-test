/// <reference types="Cypress" />

// import { includes } from "cypress/types/lodash";
// import { contains } from "cypress/types/jquery";
import { readFile } from "fs";
import { string } from "../fixtures/data";

describe("Create CrowdStreet account", () => {
  before(() => {
    cy.randomize();
  });

  // it("logs in", () => {
  //   cy.visit("/login");
  //   cy.login("username", "password");
  // });

  context("Create an Account", () => {
    it("Fills out basic info", () => {
      cy.visit("/invexp/accounts/create-account");
      cy.get(".tablet-menu").click();
      cy.contains("Create An Account").click({ force: true });
      cy.getByTestId("firstName").type("G");
      cy.getByTestId("lastName").type("L");
      cy.getByTestId("email").type(`${string}@test.com`);
      cy.getByTestId("password").type(`P#${string}@S`);
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
        cy.url().should("include", "invexp/properties/all");
      });

      it("Logs in to Profile page and fills out Personal info", () => {
        cy.visit("invexp/accounts/login/");
        cy.getByTestId("login-email-textbox").type(`${string}@test.com`);
        cy.getByTestId("login-password-textbox").type(`P#${string}@S`);
        cy.log("*** Begin filling out User's personal info ***");
        cy.getByTestId("login-email-textbox").type(`${string}@test.com`);
        cy.getByTestId("login-password-textbox").type(`P#${string}@S`);
        cy.get("#btn_login").click();
        cy.getByTestId("verify-mfa-skip").click();
        cy.url().should("include", "/invexp/properties/all");
        cy.get("a[href='/invexp/account/profile/']")
          .first()
          .click({ force: true });
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

        // Begin filling out User's address
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

        // Upload authorization letter
        cy.getByTestId("user-profile-has-regulatory-associations-true").click();
        cy.getByTestId(
          "user-profile-regulatory-associations-broker_dealer"
        ).check();
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

        // Upload photo id
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

        cy.getByTestId("user-profile-accredited-true")
          .focus()
          .click({ force: true })
          .should("be.checked");
        cy.getByTestId("submit-button").click({ timeout: 15000 }).click();
      });
    });
  });
});
