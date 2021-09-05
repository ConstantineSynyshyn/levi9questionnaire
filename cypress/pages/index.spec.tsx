import React from "react";
import { mount } from "@cypress/react";
import Index from "../../src/pages/index";

it("renders Home Page", () => {
  mount(<Index />);
  cy.contains("Home Page");
});
