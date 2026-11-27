import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import ProductQuickView from "./ProductQuickView";

afterEach(() => {
  cleanup();
});

describe("ProductQuickView", () => {
  it("should render custom trigger from renderTrigger", () => {
    render(
      <ProductQuickView
        imageUrl="/products/x.png"
        name="Pulseira Aurora"
        renderTrigger={({ onOpen }) => (
          <button type="button" onClick={onOpen}>
            custom-trigger
          </button>
        )}
      />,
    );
    expect(
      screen.getByRole("button", { name: "custom-trigger" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("dialog", { hidden: true })).toBeInTheDocument();
  });

  it("should keep the modal closed on first render", () => {
    render(
      <ProductQuickView
        imageUrl="/products/x.png"
        name="Pulseira Aurora"
        renderTrigger={({ onOpen }) => (
          <button type="button" onClick={onOpen}>
            open-quick-view
          </button>
        )}
      />,
    );
    expect(screen.getByRole("dialog", { hidden: true })).toBeInTheDocument();
    expect(screen.queryByText("Pulseira Aurora")).not.toBeInTheDocument();
  });

  it("should open the modal when onOpen is invoked", async () => {
    const user = userEvent.setup();
    render(
      <ProductQuickView
        imageUrl="/products/x.png"
        name="Pulseira Aurora"
        renderTrigger={({ onOpen }) => (
          <button type="button" onClick={onOpen}>
            open-quick-view
          </button>
        )}
      />,
    );
    await user.click(screen.getByRole("button", { name: "open-quick-view" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Pulseira Aurora")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Pulseira Aurora" })).toHaveAttribute(
      "src",
      "/products/x.png",
    );
  });

  it("should close the modal when onClose is triggered without leaving the trigger mounted", async () => {
    const user = userEvent.setup();
    render(
      <ProductQuickView
        imageUrl="/products/x.png"
        name="Pulseira Aurora"
        renderTrigger={({ onOpen }) => (
          <button type="button" onClick={onOpen}>
            open-quick-view
          </button>
        )}
      />,
    );
    await user.click(screen.getByRole("button", { name: "open-quick-view" }));
    await user.click(
      screen.getByRole("button", { name: /Fechar ampliação/i }),
    );
    expect(screen.getByRole("dialog", { hidden: true })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "open-quick-view" }),
    ).toBeInTheDocument();
  });

  it("should close the modal when the backdrop is clicked", async () => {
    const user = userEvent.setup();
    render(
      <ProductQuickView
        imageUrl="/products/x.png"
        name="Pulseira Aurora"
        renderTrigger={({ onOpen }) => (
          <button type="button" onClick={onOpen}>
            open-quick-view
          </button>
        )}
      />,
    );
    await user.click(screen.getByRole("button", { name: "open-quick-view" }));
    const dialog = screen.getByRole("dialog");
    await user.click(dialog);
    expect(screen.getByRole("dialog", { hidden: true })).toBeInTheDocument();
    expect(screen.queryByText("Pulseira Aurora")).not.toBeInTheDocument();
  });
});