import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Footer from "@/components/layout/Footer";
import { LocaleProvider } from "@/context/LocaleContext";

function renderFooter() {
  return render(
    <LocaleProvider>
      <Footer />
    </LocaleProvider>,
  );
}

describe("Footer", () => {
  it("should render the current year and brand without tagline", () => {
    renderFooter();
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${year} Bricrisê`))).toBeInTheDocument();
    expect(screen.queryByText(/Feito com carinho/i)).not.toBeInTheDocument();
  });

  it("should link the knot mark to home", () => {
    const { container } = renderFooter();
    const footer = container.querySelector("footer");
    expect(footer).not.toBeNull();
    expect(
      within(footer!).getByRole("link", { name: "Bricrisê" }),
    ).toHaveAttribute("href", "/");
  });
});