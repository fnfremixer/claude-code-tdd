import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "../src/App";

// ─── Unit tests — App component rendering ───────────────────────────────────

describe("App — initial render", () => {
  // Scenario 1: Green button is visible on initial render
  it("renders a green button", () => {
    render(<App />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  // Scenario 2: No message initially
  it('does not show "My divine website!" text initially', () => {
    render(<App />);
    expect(screen.queryByText("My divine website!")).not.toBeInTheDocument();
  });

  // Scenario 3: No close button initially
  it('does not show a "Close" button initially', () => {
    render(<App />);
    expect(screen.queryByRole("button", { name: /close/i })).not.toBeInTheDocument();
  });

  // Scenario 4: Button is green (inline style or CSS class)
  it("has green styling on the button (inline style or CSS class)", () => {
    render(<App />);
    const button = screen.getByRole("button");

    const hasInlineGreen =
      button.style.backgroundColor === "green" ||
      button.style.backgroundColor === "#008000" ||
      button.style.backgroundColor === "rgb(0, 128, 0)";

    const hasGreenClass = button.classList.contains("green-button");

    expect(hasInlineGreen || hasGreenClass).toBe(true);
  });
});

// ─── Integration tests — user interaction flow ──────────────────────────────

describe("App — user interaction", () => {
  // Scenario 5: Click shows message
  it('shows "My divine website!" after clicking the green button', async () => {
    const user = userEvent.setup();
    render(<App />);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(screen.getByText("My divine website!")).toBeInTheDocument();
  });

  // Scenario 6: Click shows close button
  it('shows a "Close" button after clicking the green button', async () => {
    const user = userEvent.setup();
    render(<App />);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });

  // Scenario 7: Close hides message
  it('hides "My divine website!" after clicking Close', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Open message
    const greenButton = screen.getByRole("button");
    await user.click(greenButton);
    expect(screen.getByText("My divine website!")).toBeInTheDocument();

    // Close message
    const closeButton = screen.getByRole("button", { name: /close/i });
    await user.click(closeButton);

    expect(screen.queryByText("My divine website!")).not.toBeInTheDocument();
  });

  // Scenario 8: Close hides close button
  it("hides the Close button after clicking Close", async () => {
    const user = userEvent.setup();
    render(<App />);

    // Open
    const greenButton = screen.getByRole("button");
    await user.click(greenButton);

    // Close
    const closeButton = screen.getByRole("button", { name: /close/i });
    await user.click(closeButton);

    expect(screen.queryByRole("button", { name: /close/i })).not.toBeInTheDocument();
  });

  // Scenario 9: Green button remains after close
  it("keeps the green button visible after closing the message", async () => {
    const user = userEvent.setup();
    render(<App />);

    const greenButton = screen.getByRole("button");
    await user.click(greenButton);

    const closeButton = screen.getByRole("button", { name: /close/i });
    await user.click(closeButton);

    // The green button should still be in the document
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(1);

    // Verify the remaining button is the green one (not a Close button)
    expect(screen.queryByRole("button", { name: /close/i })).not.toBeInTheDocument();
    const remainingButton = screen.getByRole("button");
    expect(remainingButton).toBeInTheDocument();
  });
});

// ─── Lifecycle tests — repeated interactions ─────────────────────────────────

describe("App — repeated interactions", () => {
  // Scenario 10: Re-open after close
  it("shows the message again after close and re-click", async () => {
    const user = userEvent.setup();
    render(<App />);

    // First open
    const greenButton = screen.getByRole("button");
    await user.click(greenButton);
    expect(screen.getByText("My divine website!")).toBeInTheDocument();

    // Close
    const closeButton = screen.getByRole("button", { name: /close/i });
    await user.click(closeButton);
    expect(screen.queryByText("My divine website!")).not.toBeInTheDocument();

    // Re-open — find the green button again (it should be the only button now)
    const greenButtonAgain = screen.getByRole("button");
    await user.click(greenButtonAgain);

    expect(screen.getByText("My divine website!")).toBeInTheDocument();
  });

  // Scenario 11: Multiple cycles (open → close → open → close → open)
  it("works correctly through multiple open/close cycles", async () => {
    const user = userEvent.setup();
    render(<App />);

    // Cycle 1: open
    await user.click(screen.getByRole("button"));
    expect(screen.getByText("My divine website!")).toBeInTheDocument();

    // Cycle 1: close
    await user.click(screen.getByRole("button", { name: /close/i }));
    expect(screen.queryByText("My divine website!")).not.toBeInTheDocument();

    // Cycle 2: open
    await user.click(screen.getByRole("button"));
    expect(screen.getByText("My divine website!")).toBeInTheDocument();

    // Cycle 2: close
    await user.click(screen.getByRole("button", { name: /close/i }));
    expect(screen.queryByText("My divine website!")).not.toBeInTheDocument();

    // Cycle 3: open — message should be visible after the last click
    await user.click(screen.getByRole("button"));
    expect(screen.getByText("My divine website!")).toBeInTheDocument();
  });
});
