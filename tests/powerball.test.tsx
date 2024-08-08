// Powerball.test.tsx
import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Powerball from "../src/components/Powerball";
import { PowerBallResponse } from "../src/types/powerballResponse";
import { mockApiResponse } from "./mocks/apiMock";

const mockDrawResults: PowerBallResponse = mockApiResponse;

beforeEach(() => {
  jest.clearAllMocks();
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockDrawResults),
    })
  ) as jest.Mock;
});

describe("Testing the different rendering situations the powerball component will encounter", () => {
  test("should render correctly", async () => {
    const { container } = render(<Powerball />);
    await waitForElementToBeRemoved(() => screen.getByText("Loading...."));
    const powerballNumbers = container.querySelector(".hidden");
    const primaryNumbers = container.querySelector(".number");
    const lightningButton = container.querySelector("#lightningButton");
    expect(powerballNumbers).toBeInTheDocument();
    expect(powerballNumbers?.textContent).toBe("30");
    expect(primaryNumbers).toBeInTheDocument();
    expect(primaryNumbers?.textContent).toBe("1");
    expect(lightningButton).toBeInTheDocument();
  });

  test("clicking the lightning icon should display the powerball numbers", async () => {
    const { container } = render(<Powerball />);
    await waitForElementToBeRemoved(() => screen.getByText("Loading...."));
    const lightningButton = container.querySelector("#lightningButton");
    const primaryNumbers = container.querySelector(".number");
    fireEvent.click(lightningButton!);
    const powerballNumbers = container.querySelector(
      ".drawnNumbersCircle.primaryNumbers"
    );
    expect(powerballNumbers).toBeInTheDocument();
  });

  test("clicking the trash icon should clear the powerball numbers", async () => {
    const { container } = render(<Powerball />);
    await waitForElementToBeRemoved(() => screen.getByText("Loading...."));
    const lightningButton = container.querySelector("#lightningButton");
    fireEvent.click(lightningButton!);
    const powerballNumbers = container.querySelector(
      ".drawnNumbersCircle.primaryNumbers"
    );
    expect(powerballNumbers).toBeInTheDocument();
    const clearButton = container.querySelector("#trashbutton");
    fireEvent.click(clearButton!);
    const powerballNumbersHidden = container.querySelector(".hidden");
    expect(powerballNumbersHidden).toBeInTheDocument();
  });
  test("Invalid Api response should display error message", async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Simulated API failure'))
    ) as jest.Mock;    
    const { container } = render(<Powerball />);
    await waitForElementToBeRemoved(() => screen.getByText("Loading...."));
    const errorComponent =container.querySelector(".error");    
    expect(errorComponent).toBeInTheDocument();
    const errorMessage = await screen.findByText("Unable to retrieve powerball numbers at this time");
    expect(errorMessage).toBeInTheDocument();
  });

});
