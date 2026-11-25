import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ComponentProps, ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import InteractivePriceMatrix from "@/components/orders/InteractivePriceMatrix";
import { LocaleProvider } from "@/context/LocaleContext";

vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();
  type MotionListProps = ComponentProps<"ul"> & {
    initial?: unknown;
    animate?: unknown;
    exit?: unknown;
    transition?: unknown;
  };

  function MotionList({ children, ...rest }: MotionListProps) {
    void rest;
    return <ul data-motion="ul">{children}</ul>;
  }

  return {
    ...actual,
    motion: { ul: MotionList },
    AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
  };
});

function renderMatrix() {
  return render(
    <LocaleProvider>
      <InteractivePriceMatrix />
    </LocaleProvider>,
  );
}

beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => {
  cleanup();
});

describe("InteractivePriceMatrix", () => {
  it("should switch active category when a segmented tab is clicked", async () => {
    const user = userEvent.setup();
    renderMatrix();
    const premiumTab = screen.getByRole("tab", { name: "Premium" });
    await user.click(premiumTab);
    expect(premiumTab).toHaveAttribute("aria-selected", "true");
    expect(
      screen.getByRole("button", { name: /Tradicional \(com verso\)/i }),
    ).toHaveTextContent("R$ 3,50");
  });

  it("should render Simples category reference prices", () => {
    renderMatrix();
    expect(
      screen.getByRole("button", { name: /Tradicional \(com verso\)/i }),
    ).toHaveTextContent("R$ 2,50");
    expect(
      screen.getByRole("button", { name: /Mini \(sem verso\)/i }),
    ).toHaveTextContent("R$ 1,00");
  });

  it("should render Holográfico prices when that tab is active", async () => {
    const user = userEvent.setup();
    renderMatrix();
    await user.click(screen.getByRole("tab", { name: "Holográfico" }));
    expect(
      screen.getByRole("button", {
        name: /Tradicional \(com verso\)/i,
      }),
    ).toHaveTextContent("R$ 5,00");
  });

  it("should render Outros format prices when that tab is active", async () => {
    const user = userEvent.setup();
    renderMatrix();
    await user.click(screen.getByRole("tab", { name: "Outros" }));
    expect(
      screen.getByRole("button", { name: /Estilo polaroid/i }),
    ).toHaveTextContent("R$ 3,00");
    expect(
      screen.getByRole("button", { name: /Foto 20x30 cm/i }),
    ).toHaveTextContent("R$ 9,00");
  });

  it("should render shipping notice for Brazil delivery and regional pickup", () => {
    renderMatrix();
    expect(screen.getByText(/todo o Brasil via Correios/i)).toBeInTheDocument();
    expect(screen.getByText(/Retirada em Sumaré/i)).toBeInTheDocument();
  });

  it("should format currency with en-US locale rules when language is English", async () => {
    window.localStorage.setItem("bricrise-locale", "en-US");
    const user = userEvent.setup();
    renderMatrix();
    const item = screen
      .getAllByRole("button")
      .find((button) => button.textContent?.includes("Mini (no back)"));
    expect(item).toBeDefined();
    await user.click(item!);
    const quantity = screen.getByRole("spinbutton", { name: /Quantity/i });
    fireEvent.change(quantity, { target: { value: "2" } });
    const calculator = screen
      .getByText("Estimate your order")
      .closest("div");
    expect(calculator).toBeTruthy();
    expect(within(calculator!).getByText(/2\.00/)).toBeInTheDocument();
  });

  it("should clamp invalid quantity input to at least one unit", async () => {
    const user = userEvent.setup();
    renderMatrix();
    const item = screen
      .getAllByRole("button")
      .find((button) => button.textContent?.includes("Mini (sem verso)"));
    expect(item).toBeDefined();
    await user.click(item!);
    const quantity = screen.getByRole("spinbutton", { name: /Quantidade/i });
    fireEvent.change(quantity, { target: { value: "" } });
    const estimateLine = screen.getByText(/Estimativa/i).closest("p");
    expect(estimateLine?.textContent?.replace(/\s/g, "")).toMatch(/1,00/);
  });

  it("should compute estimate when an item and quantity are selected", async () => {
    const user = userEvent.setup();
    renderMatrix();
    const simplesItem = screen
      .getAllByRole("button")
      .find(
        (button) =>
          button.textContent?.includes("Tradicional (com verso)") &&
          button.textContent?.includes("R$ 2,50"),
      );
    expect(simplesItem).toBeDefined();
    await user.click(simplesItem!);
    const quantity = screen.getByRole("spinbutton", { name: /Quantidade/i });
    fireEvent.change(quantity, { target: { value: "2" } });
    const estimateLine = screen.getByText(/Estimativa/i).closest("p");
    expect(estimateLine?.textContent?.replace(/\s/g, "")).toMatch(/5,00/);
  });
});