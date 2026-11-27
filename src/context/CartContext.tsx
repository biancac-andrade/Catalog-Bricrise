"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { CartLine } from "@/types/cart";

const STORAGE_KEY = "bricrise-cart-v1";
const MAX_QTY = 99;

type AddPayload = Omit<CartLine, "quantity"> & { quantity?: number };

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  isEmpty: boolean;
  addLine: (payload: AddPayload) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeLine: (productId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function clampQty(n: number): number {
  if (!Number.isFinite(n)) return 1;
  return Math.min(MAX_QTY, Math.max(1, Math.round(n)));
}

function readStoredLines(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (row): row is CartLine =>
        typeof row === "object" &&
        row !== null &&
        typeof (row as CartLine).productId === "string" &&
        typeof (row as CartLine).title === "string" &&
        typeof (row as CartLine).price === "number" &&
        typeof (row as CartLine).imageUrl === "string" &&
        typeof (row as CartLine).quantity === "number",
    );
  } catch {
    return [];
  }
}

function persist(lines: CartLine[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
}

export function CartProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Hidrata do localStorage após o mount para o HTML do servidor bater com o 1º render do cliente.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- bootstrap intencional pós-hidratação
    setLines(readStoredLines());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    persist(lines);
  }, [lines, hydrated]);

  const addLine = useCallback((payload: AddPayload) => {
    const qty = clampQty(payload.quantity ?? 1);
    setLines((prev) => {
      const idx = prev.findIndex((l) => l.productId === payload.productId);
      if (idx === -1) {
        return [
          ...prev,
          {
            productId: payload.productId,
            title: payload.title,
            price: payload.price,
            imageUrl: payload.imageUrl,
            quantity: qty,
          },
        ];
      }
      const next = [...prev];
      const current = next[idx];
      next[idx] = {
        ...current,
        title: payload.title,
        price: payload.price,
        imageUrl: payload.imageUrl,
        quantity: clampQty(current.quantity + qty),
      };
      return next;
    });
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setLines((prev) =>
      prev.map((l) =>
        l.productId === productId ? { ...l, quantity: clampQty(quantity) } : l,
      ),
    );
  }, []);

  const removeLine = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines],
  );

  const value = useMemo(
    (): CartContextValue => ({
      lines,
      itemCount,
      isEmpty: itemCount === 0,
      addLine,
      setQuantity,
      removeLine,
      clearCart,
    }),
    [lines, itemCount, addLine, setQuantity, removeLine, clearCart],
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}