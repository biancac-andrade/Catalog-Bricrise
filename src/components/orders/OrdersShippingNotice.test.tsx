import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import OrdersShippingNotice from "@/components/orders/OrdersShippingNotice";
import { LocaleProvider, useLocale } from "@/context/LocaleContext";

describe("OrdersShippingNotice", () => {
  it("should render nationwide shipping and Sumaré pickup copy from locale", () => {
    render(
      <LocaleProvider>
        <ShippingProbe />
      </LocaleProvider>,
    );
    expect(screen.getByText(/Obs\./)).toBeInTheDocument();
    expect(
      screen.getByText(/todo o Brasil via Correios/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Retirada em Sumaré/i)).toBeInTheDocument();
  });
});

function ShippingProbe() {
  const { copy } = useLocale();
  return (
    <OrdersShippingNotice
      label={copy.orders.shipping.label}
      notice={copy.orders.shipping.notice}
    />
  );
}