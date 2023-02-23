/// <reference types="Cypress" />

describe("Create CrowdStreet account", () => {
  it("Creates an account", () => {
    cy.visit("/");
    cy.get(".tablet-menu").click();
    cy.contains("Create An Account").click({ force: true });
    cy.getByTestId("firstName").type("Y");
    cy.getByTestId("lastName").type("L");
    cy.getByTestId("email").type("test10@test.com");
    cy.getByTestId("password").type("X0x0tD@!");
    cy.getByTestId("confirm-password").type("X0x0tD@!");
    cy.getByTestId("accreditedOptionNo").check();
    cy.getByTestId("hasAgreedTos").check();
    cy.bypassRecaptcha();
    cy.get(".leading-4").should((button) => {
      expect(button).to.be.visible.click(button);
    cy.getByTestId("verify-mfa-skip").click();
    });
  });

  it("Navigates to the Profile and fills out Personal info", () => {
    cy.visit("invexp/accounts/login/");
    cy.getByTestId("login-email-textbox").type("test10@test.com");
    cy.getByTestId("login-password-textbox").type("X0x0tD@!");
    cy.get("#btn_login").click();
    cy.getByTestId("verify-mfa-skip").click();
    cy.location("pathname").should("eq", "/invexp/properties/all");
    cy.get(".user-button > .head-link").first().click({ force: true });
    cy.get("a[href='/invexp/account/profile/']").first().click({ force: true });
    // });

    // it("Fills out Personal information", () => {
    cy.getByTestId("user-profile-first-name").clearThenType("YYY");
    cy.getByTestId("user-profile-first-name").clearThenType("Doe");
    cy.getByTestId("user-profile-ssn").clearThenType("112-12-1234");
    cy.get("button[name='residenceStatus']").click();
    cy.get("#headlessui-listbox-option-30").click();
    cy.get("button[name='maritalStatus']").click();
    cy.get("#headlessui-listbox-option-35").click();
    cy.get("button[name='citizenshipCountry']").click();
    cy.get("#headlessui-listbox-option-272").click();
    cy.getByTestId("user-profile-dob").clearThenType("01/01/2000");
    cy.getByTestId("user-profile-email").clearThenType("test10@test.com");
    // });

    // it("Fills out Personal address", () => {
    cy.getByTestId("user-profile-address").clearThenType("123 Main St.");
    cy.getByTestId("user-profile-city").clearThenType("Portland");
    cy.get("button[name='state']").click(0);
    cy.getByTestId("user-profile-postal-code").clearThenType("12345");
    cy.get("button[name='country']").click(0);
    cy.getByTestId("user-profile-has-regulatory-associations-true").click();
    cy.getByTestId("user-profile-regulatory-associations-broker_dealer").click();
    cy.getByTestId("id-dropzone-input").selectFile("minion-super-hero.png", {
      action: "drag-drop",
    });
    cy.getByTestId("user-profile-accredited-false").check();
    cy.getByTestId("submit-button").click();
  });
});
// });
