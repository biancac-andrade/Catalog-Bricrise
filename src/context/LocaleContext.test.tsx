import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { LocaleProvider, useLocale } from "@/context/LocaleContext";

const STORAGE_KEY = "bricrise-locale";

function LocaleProbe() {
  const { locale, setLocale, copy } = useLocale();
  return (
    <div>
      <span data-testid="locale-id">{locale}</span>
      <span data-testid="about-kicker">{copy.about.header.kicker}</span>
      <button type="button" onClick={() => setLocale("en-US")}>
        switch-en
      </button>
      <button type="button" onClick={() => setLocale("pt-BR")}>
        switch-pt
      </button>
    </div>
  );
}

describe("LocaleContext", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.lang = "pt-BR";
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("should default to pt-BR when localStorage is empty", () => {
    render(
      <LocaleProvider>
        <LocaleProbe />
      </LocaleProvider>,
    );
    expect(screen.getByTestId("locale-id")).toHaveTextContent("pt-BR");
    expect(screen.getByTestId("about-kicker")).toHaveTextContent("Sobre");
  });

  it("should fall back to pt-BR when stored locale is unknown", () => {
    window.localStorage.setItem(STORAGE_KEY, "fr-FR");
    render(
      <LocaleProvider>
        <LocaleProbe />
      </LocaleProvider>,
    );
    expect(screen.getByTestId("locale-id")).toHaveTextContent("pt-BR");
  });

  it("should hydrate locale from stored en-US preference", () => {
    window.localStorage.setItem(STORAGE_KEY, "en-US");
    render(
      <LocaleProvider>
        <LocaleProbe />
      </LocaleProvider>,
    );
    expect(screen.getByTestId("locale-id")).toHaveTextContent("en-US");
  });

  it("should restore pt-BR document language when locale is switched back", () => {
    window.localStorage.setItem(STORAGE_KEY, "en-US");
    render(
      <LocaleProvider>
        <LocaleProbe />
      </LocaleProvider>,
    );
    act(() => {
      screen.getByRole("button", { name: "switch-pt" }).click();
    });
    expect(document.documentElement.lang).toBe("pt-BR");
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("pt-BR");
  });

  it("should persist locale changes and update document language", () => {
    render(
      <LocaleProvider>
        <LocaleProbe />
      </LocaleProvider>,
    );
    act(() => {
      screen.getByRole("button", { name: "switch-en" }).click();
    });
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("en-US");
    expect(document.documentElement.lang).toBe("en");
  });

  it("should fall back to pt-BR when stored value is invalid", () => {
    window.localStorage.setItem(STORAGE_KEY, "fr-FR");
    render(
      <LocaleProvider>
        <LocaleProbe />
      </LocaleProvider>,
    );
    expect(screen.getByTestId("locale-id")).toHaveTextContent("pt-BR");
  });

  it("should throw when useLocale runs outside LocaleProvider", () => {
    const Broken = () => {
      useLocale();
      return null;
    };
    expect(() => render(<Broken />)).toThrow(
      /useLocale must be used within LocaleProvider/i,
    );
  });

  it("should read pt-BR when localStorage getItem throws", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("storage blocked");
    });
    expect(() =>
      render(
        <LocaleProvider>
          <LocaleProbe />
        </LocaleProvider>,
      ),
    ).toThrow(/storage blocked/i);
  });
});