import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ComponentProps, ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import ServicesCarousel from "@/components/services/ServicesCarousel";
import { LocaleProvider } from "@/context/LocaleContext";

vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();
  type MotionDivProps = ComponentProps<"div"> & {
    initial?: unknown;
    animate?: unknown;
    exit?: unknown;
    transition?: unknown;
  };

  function MotionDiv({ children, ...rest }: MotionDivProps) {
    void rest;
    return <div data-motion="div">{children}</div>;
  }

  return {
    ...actual,
    motion: { div: MotionDiv },
    AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
    useReducedMotion: vi.fn(() => false),
  };
});

function renderCarousel() {
  return render(
    <LocaleProvider>
      <ServicesCarousel />
    </LocaleProvider>,
  );
}

beforeEach(() => {
  vi.mocked(useReducedMotion).mockReturnValue(false);
});

afterEach(() => {
  cleanup();
});

describe("ServicesCarousel", () => {
  it("should render the first slide title and official badge", () => {
    renderCarousel();
    expect(
      screen.getByRole("heading", { name: "Linhas, Pulseiras & Colares" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Cordões 1mm & Seda")).toBeInTheDocument();
    expect(screen.getByText("01 / 03")).toBeInTheDocument();
  });

  it("should advance to the next slide when the right arrow is clicked", async () => {
    const user = userEvent.setup();
    renderCarousel();
    await user.click(screen.getByRole("button", { name: /Próximo slide/i }));
    expect(
      screen.getByRole("heading", { name: "PhotoCards" }),
    ).toBeInTheDocument();
    expect(screen.getByText("02 / 03")).toBeInTheDocument();
  });

  it("should move to the previous slide when the left arrow is clicked", async () => {
    const user = userEvent.setup();
    renderCarousel();
    await user.click(screen.getByRole("button", { name: /Slide anterior/i }));
    expect(
      screen.getByRole("heading", { name: "Dicas & Regras de Envio" }),
    ).toBeInTheDocument();
    expect(screen.getByText("03 / 03")).toBeInTheDocument();
  });

  it("should loop from the last slide back to the first", async () => {
    const user = userEvent.setup();
    renderCarousel();
    await user.click(screen.getByRole("button", { name: /Ir para o slide 3/i }));
    await user.click(screen.getByRole("button", { name: /Próximo slide/i }));
    expect(
      screen.getByRole("heading", { name: "Linhas, Pulseiras & Colares" }),
    ).toBeInTheDocument();
  });

  it("should render slides without motion transitions when reduced motion is preferred", () => {
    vi.mocked(useReducedMotion).mockReturnValue(true);
    renderCarousel();
    expect(
      screen.getByRole("heading", { name: "Linhas, Pulseiras & Colares" }),
    ).toBeInTheDocument();
  });

  it("should expose English carousel controls when locale is en-US", () => {
    window.localStorage.setItem("bricrise-locale", "en-US");
    renderCarousel();
    expect(
      screen.getByRole("button", { name: "Previous slide" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next slide" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Go to slide 2" }),
    ).toBeInTheDocument();
    window.localStorage.clear();
  });

  it("should jump to the selected slide when a dot indicator is clicked", async () => {
    const user = userEvent.setup();
    renderCarousel();
    await user.click(screen.getByRole("button", { name: /Ir para o slide 2/i }));
    expect(
      screen.getByRole("heading", { name: "PhotoCards" }),
    ).toBeInTheDocument();
    expect(screen.getByText("02 / 03")).toBeInTheDocument();
  });
});