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

import {
  getCopy,
  getPrimaryNav,
  type LocaleCopy,
  type LocaleId,
} from "@/content";

const STORAGE_KEY = "bricrise-locale";

type LocaleContextValue = {
  locale: LocaleId;
  setLocale: (id: LocaleId) => void;
  copy: LocaleCopy;
  primaryNav: ReturnType<typeof getPrimaryNav>;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readStoredLocale(): LocaleId {
  if (typeof window === "undefined") return "pt-BR";
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return raw === "en-US" ? "en-US" : "pt-BR";
}

export function LocaleProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [locale, setLocaleState] = useState<LocaleId>(readStoredLocale);

  const setLocale = useCallback((id: LocaleId) => {
    setLocaleState(id);
    window.localStorage.setItem(STORAGE_KEY, id);
    document.documentElement.lang = id === "en-US" ? "en" : "pt-BR";
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "en-US" ? "en" : "pt-BR";
  }, [locale]);

  const value = useMemo((): LocaleContextValue => {
    const copy = getCopy(locale);
    return {
      locale,
      setLocale,
      copy,
      primaryNav: getPrimaryNav(locale),
    };
  }, [locale, setLocale]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}