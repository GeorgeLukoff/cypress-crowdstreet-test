/// <reference types="Cypress" />

// import { includes } from "cypress/types/lodash";
// import { contains } from "cypress/types/jquery";
// import { readFile } from "fs";
// import { string } from "../fixtures/data";

import { basicInfo } from "../support/page-objects/basic-info";
import { confirmAndSave } from "../support/page-objects/confirm-save-logout";
import { personalInfo } from "../support/page-objects/personal-info";
import { uploadPhotoId } from "../support/page-objects/upload-id";
import { uploadAuthLetter } from "../support/page-objects/upload-letter";
import { userAddress } from "../support/page-objects/user-address";

describe("Create CrowdStreet account", () => {
  before(() => {
    cy.randomize();
  });

  context("Create User Account", () => {
    it("Fills out basic info", () => {
      basicInfo();

      it("Logs in to Profile page and fills out Personal info", () => {
        personalInfo();
        userAddress();
        uploadAuthLetter();
        uploadPhotoId();
        confirmAndSave();
      });
    });
  });
});
