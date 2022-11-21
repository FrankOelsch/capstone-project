import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MyButton from "./MyButton";

describe("MyButton component", () => {
  it("should render", () => {
    render(
      <>
        <MyButton>"Speichern"</MyButton>
        <MyButton>"Anwenden"</MyButton>
        <MyButton>"Löschen"</MyButton>
      </>
    );

    const button = screen.getByRole("button", {
      name: /anwenden/i,
    });
    expect(button).toBeInTheDocument();
  });

  it("should allow setting an id", () => {
    const id = "blub";
    render(
      <>
        <MyButton>"Anwenden"</MyButton>
        <MyButton id={id}>Speichern</MyButton>
      </>
    );

    const button = screen.getByText(/speichern/i);
    expect(button).toHaveAttribute("id", id);
  });

  it("should allow clicks", async () => {
    const handleClick = jest.fn();
    const text = "Löschen";
    render(<MyButton onClick={handleClick}>{text}</MyButton>);

    const button = screen.getByText(text);
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should allow focus", async () => {
    const handleClick = jest.fn();
    const text = "Löschen";
    render(
      <>
        <MyButton>"Speichern"</MyButton>
        <MyButton onClick={handleClick}>{text}</MyButton>
        <MyButton>"Bearbeiten"</MyButton>
      </>
    );

    const input = screen.getByText(text);
    await userEvent.click(input);
    expect(input).toHaveFocus();
  });

  it("should trigger form-onSubmit", async () => {
    const handleSubmit = jest.fn((e) => e.preventDefault());
    const handleChange = jest.fn();

    render(
      <form data-testid="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value="Frank"
          onChange={handleChange}
        ></input>
        <MyButton type="submit">Submit</MyButton>
      </form>
    );

    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
