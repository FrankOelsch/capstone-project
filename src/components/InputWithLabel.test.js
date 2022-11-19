import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputWithLabel from "./InputWithLabel";

describe("Check InputWithLabel component", () => {
  it("should render label", () => {
    render(
      <InputWithLabel labelText={"Tor-Breite"} id={"breite"}></InputWithLabel>
    );

    const label = screen.getByText(/tor-breite/i);
    expect(label).toBeInTheDocument();
  });

  it("should render input", () => {
    render(
      <InputWithLabel labelText={"Tor-Höhe"} id={"hoehe"}></InputWithLabel>
    );

    const input = screen.getByLabelText(/tor-höhe/i);
    expect(input).toBeInTheDocument();
  });

  it("should allow focus input from label", async () => {
    const handleClick = jest.fn();
    render(
      <>
        <InputWithLabel labelText={"Tor-Breite"} id={"breite"}></InputWithLabel>
        <InputWithLabel
          onClick={handleClick}
          labelText={"Radius"}
          id={"radius"}
          data-testid="radius"
        ></InputWithLabel>
        <InputWithLabel labelText={"Tor-Höhe"} id={"hoehe"}></InputWithLabel>
      </>
    );

    const label = screen.getByText(/radius/i);
    await userEvent.click(label);

    const input = screen.getByTestId("radius");
    expect(input).toHaveFocus();
  });
});
