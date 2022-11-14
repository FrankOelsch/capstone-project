import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Select from "./Select";

describe("Check Select component", () => {
  it("should render children", () => {
    render(<Select options={[{ id: "123", name: "name" }]}></Select>);
    const option = screen.getByRole("option");

    expect(option).toBeInTheDocument();
  });

  it("should have min 1 option", async () => {
    render(<Select options={"jhgjhg"}></Select>);
    const option = screen.getByRole("option");

    expect(option).toBeInTheDocument();
  });

  it("should have min 1 valid option", async () => {
    render(<Select options={[{ name: "uzuz" }]}></Select>);
    const option = screen.getByRole("option");

    expect(option).toBeInTheDocument();
  });

  it("should allow select options", async () => {
    const handleChange = jest.fn();
    render(
      <Select
        onChange={handleChange}
        options={[
          { id: "1", name: "name1" },
          { id: "2", name: "name2" },
        ]}
      ></Select>
    );
    const select = screen.getByRole("combobox");
    await userEvent.selectOptions(select, "name2");

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
