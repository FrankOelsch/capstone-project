import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SelectWithLabel from "./SelectWithLabel";

describe("Check SelectWithLabel component", () => {
  it("should render children", () => {
    render(
      <SelectWithLabel
        options={[{ id: "123", name: "name" }]}
      ></SelectWithLabel>
    );
    const option = screen.getByRole("option");

    expect(option).toBeInTheDocument();
  });

  it("should have min 1 option", () => {
    render(<SelectWithLabel options={"jhgjhg"}></SelectWithLabel>);
    const option = screen.getByRole("option");

    expect(option).toBeInTheDocument();
  });

  it("should have min 1 valid option", () => {
    render(<SelectWithLabel options={[{ name: "uzuz" }]}></SelectWithLabel>);
    const option = screen.getByRole("option");

    expect(option).toBeInTheDocument();
  });

  it("should allow select options", async () => {
    const handleChange = jest.fn();
    render(
      <SelectWithLabel
        onChange={handleChange}
        options={[
          { id: "1", name: "name1" },
          { id: "2", name: "name2" },
        ]}
      ></SelectWithLabel>
    );
    const select = screen.getByRole("combobox");
    await userEvent.selectOptions(select, "name2");

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
