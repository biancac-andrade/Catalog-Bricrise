import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getCopy, getPrimaryNav } from "@/content";

import ServicesCarousel from "@/components/services/ServicesCarousel";
import * as LocaleContext from "@/context/LocaleContext";
import { LocaleProvider } from "@/context/LocaleContext";

vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();

  return {
    ...actual,
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
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe("ServicesCarousel", () => {
  it("should render the first slide content and slide counter", () => {
    renderCarousel();
    expect(
      screen.getByText(/Viu algo no catálogo\? A gente adapta/i),
    ).toBeInTheDocument();
    expect(screen.getByText("01 / 03")).toBeInTheDocument();
  });

  it("should advance to the next slide when the right arrow is clicked", async () => {
    const user = userEvent.setup();
    renderCarousel();
    await user.click(screen.getByRole("button", { name: /Próximo slide/i }));
    expect(
      screen.getByText(/photocards, polaroids, impressões para quadros/i),
    ).toBeInTheDocument();
    expect(screen.getByText("02 / 03")).toBeInTheDocument();
  });

  it("should move to the previous slide when the left arrow is clicked", async () => {
    const user = userEvent.setup();
    renderCarousel();
    await user.click(screen.getByRole("button", { name: /Slide anterior/i }));
    expect(
      screen.getByText(/Para sua encomenda desenrolar lisinho/i),
    ).toBeInTheDocument();
    expect(screen.getByText("03 / 03")).toBeInTheDocument();
  });

  it("should loop from the last slide back to the first", async () => {
    const user = userEvent.setup();
    renderCarousel();
    await user.click(screen.getByRole("button", { name: /Ir para o slide 3/i }));
    await user.click(screen.getByRole("button", { name: /Próximo slide/i }));
    expect(screen.getByText("01 / 03")).toBeInTheDocument();
    expect(
      screen.getByText(/Viu algo no catálogo\? A gente adapta/i),
    ).toBeInTheDocument();
  });

  it("should render slides without motion transitions when reduced motion is preferred", () => {
    vi.mocked(useReducedMotion).mockReturnValue(true);
    renderCarousel();
    expect(
      screen.getByText(/Viu algo no catálogo\? A gente adapta/i),
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
      screen.getByText(/photocards, polaroids, impressões para quadros/i),
    ).toBeInTheDocument();
    expect(screen.getByText("02 / 03")).toBeInTheDocument();
  });

  it("should switch slides when a tab is activated", async () => {
    const user = userEvent.setup();
    renderCarousel();
    await user.click(screen.getByRole("tab", { name: "Dicas" }));
    expect(
      screen.getByText(/Na dúvida na hora de enviar a foto/i),
    ).toBeInTheDocument();
    expect(screen.getByText("03 / 03")).toBeInTheDocument();
    expect(screen.getByText(/Qualidade original/i)).toBeInTheDocument();
  });

  it("should announce autoplay pause when the carousel is hovered", async () => {
    const user = userEvent.setup();
    renderCarousel();
    const region = screen.getByRole("region", { name: /Serviços do ateliê/i });
    await user.hover(region);
    expect(
      screen.getByText(/Reprodução automática pausada/i),
    ).toBeInTheDocument();
    await user.unhover(region);
    expect(screen.getByText(/Reprodução automática ativa/i)).toBeInTheDocument();
  });

  it("should keep the textile step list on the first slide", () => {
    renderCarousel();
    expect(
      screen.getByText(/Defina a peça \(pulseira, cordão ou colar\)/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Consulte a cartela de cores/i)).toBeInTheDocument();
  });

  it("should render optional badge and title when slide data includes them", () => {
    const copy = getCopy("pt-BR");
    const enriched = {
      ...copy.services.slides[0]!,
      badge: "Destaque ateliê",
      title: "Peças sob medida",
    };
    vi.spyOn(LocaleContext, "useLocale").mockReturnValue({
      locale: "pt-BR",
      setLocale: vi.fn(),
      copy: {
        ...copy,
        services: {
          ...copy.services,
          slides: [enriched, copy.services.slides[1]!, copy.services.slides[2]!],
        },
      },
      primaryNav: getPrimaryNav("pt-BR"),
    });
    render(<ServicesCarousel />);
    expect(screen.getByText("Destaque ateliê")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Peças sob medida" }),
    ).toBeInTheDocument();
  });

  it("should unpause when focus leaves the carousel region", () => {
    renderCarousel();
    const region = screen.getByRole("region", { name: /Serviços do ateliê/i });
    fireEvent.focusIn(region);
    fireEvent.blur(region, { relatedTarget: document.body });
    expect(screen.getByText(/Reprodução automática ativa/i)).toBeInTheDocument();
  });

  it("should use English autoplay status copy when locale is en-US", async () => {
    window.localStorage.setItem("bricrise-locale", "en-US");
    const user = userEvent.setup();
    renderCarousel();
    const region = screen.getByRole("region", { name: /Studio services/i });
    await user.hover(region);
    expect(screen.getByText("Autoplay paused")).toBeInTheDocument();
    window.localStorage.clear();
  });

  it("should advance automatically when autoplay interval elapses", async () => {
    vi.useFakeTimers();
    renderCarousel();
    expect(screen.getByText("01 / 03")).toBeInTheDocument();
    await act(async () => {
      vi.advanceTimersByTime(6_000);
    });
    expect(screen.getByText("02 / 03")).toBeInTheDocument();
  });

  it("should keep the current slide when the active tab is pressed again", () => {
    renderCarousel();
    const tab = screen.getByRole("tab", { name: "Ateliê têxtil" });
    fireEvent.click(tab);
    expect(screen.getByText("01 / 03")).toBeInTheDocument();
  });

  it("should move to the previous slide when not on the first slide", async () => {
    const user = userEvent.setup();
    renderCarousel();
    await user.click(screen.getByRole("button", { name: /Próximo slide/i }));
    await user.click(screen.getByRole("button", { name: /Slide anterior/i }));
    expect(screen.getByText("01 / 03")).toBeInTheDocument();
  });

  it("should move backward when an earlier tab is selected", async () => {
    const user = userEvent.setup();
    renderCarousel();
    await user.click(screen.getByRole("tab", { name: "Dicas" }));
    await user.click(screen.getByRole("tab", { name: "Ateliê têxtil" }));
    expect(screen.getByText("01 / 03")).toBeInTheDocument();
  });

  it("should wrap to the last slide when previous is pressed on the first slide", async () => {
    const user = userEvent.setup();
    renderCarousel();
    await user.click(screen.getByRole("button", { name: /Slide anterior/i }));
    expect(screen.getByText("03 / 03")).toBeInTheDocument();
  });

  it("should wrap autoplay from the last slide back to the first", async () => {
    vi.useFakeTimers();
    renderCarousel();
    fireEvent.click(screen.getByRole("button", { name: /Ir para o slide 3/i }));
    expect(screen.getByText("03 / 03")).toBeInTheDocument();
    await act(async () => {
      vi.advanceTimersByTime(6_000);
    });
    expect(screen.getByText("01 / 03")).toBeInTheDocument();
  });

  it("should fall back to default stickers for unknown slide ids", () => {
    const copy = getCopy("pt-BR");
    const orphan = {
      ...copy.services.slides[0]!,
      id: "custom-line",
    };
    vi.spyOn(LocaleContext, "useLocale").mockReturnValue({
      locale: "pt-BR",
      setLocale: vi.fn(),
      copy: {
        ...copy,
        services: {
          ...copy.services,
          slides: [orphan],
        },
      },
      primaryNav: getPrimaryNav("pt-BR"),
    });
    render(<ServicesCarousel />);
    expect(screen.getByText("01 / 01")).toBeInTheDocument();
  });
});