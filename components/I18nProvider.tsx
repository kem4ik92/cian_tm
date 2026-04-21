"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { DICT, type Lang, type TKey } from "@/lib/i18n";

type AuthUser = {
  role: "buyer" | "seller";
  name: string;
  email: string;
} | null;

interface AppCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TKey) => string;
  user: AuthUser;
  login: (u: NonNullable<AuthUser>) => void;
  logout: () => void;
}

const Ctx = createContext<AppCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru");
  const [user, setUser] = useState<AuthUser>(null);

  useEffect(() => {
    try {
      const stored = (localStorage.getItem("jay.lang") as Lang | null) ?? null;
      if (stored && ["ru", "tk", "en"].includes(stored)) setLangState(stored);
      const u = localStorage.getItem("jay.user");
      if (u) setUser(JSON.parse(u));
    } catch {}
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("jay.lang", l);
      document.documentElement.lang = l;
    } catch {}
  }, []);

  const login = useCallback((u: NonNullable<AuthUser>) => {
    setUser(u);
    try {
      localStorage.setItem("jay.user", JSON.stringify(u));
    } catch {}
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem("jay.user");
    } catch {}
  }, []);

  const t = useCallback(
    (key: TKey) =>
      (DICT[lang] as Record<string, string>)[key] ??
      (DICT.ru as Record<string, string>)[key] ??
      key,
    [lang],
  );

  return (
    <Ctx.Provider value={{ lang, setLang, t, user, login, logout }}>
      {children}
    </Ctx.Provider>
  );
}

export function useApp(): AppCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error("useApp must be used within I18nProvider");
  return v;
}

export function useT() {
  return useApp().t;
}
