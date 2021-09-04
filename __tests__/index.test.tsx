/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import Index from "../src/pages/index";

describe("Home page", () => {
  it("renders a page with Home Page content", () => {
    render(<Index />);

    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });
});
