"use client";

import { useState, useEffect } from "react";
import { useApp } from "./I18nProvider";

type Tab = "buyer" | "seller";
type Mode = "login" | "register";

export function AuthButton() {
  const { t, user, login, logout } = useApp();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("buyer");
  const [mode, setMode] = useState<Mode>("register");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "Гость").trim();
    const email = String(fd.get("email") || "").trim();
    login({ role: tab, name, email });
    setSubmitted(true);
  };

  const close = () => {
    setOpen(false);
    setSubmitted(false);
    setMode("register");
  };

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="hidden sm:inline text-sm text-slate-700 dark:text-slate-200 max-w-[8rem] truncate">
          {user.name}
        </span>
        <button
          type="button"
          onClick={logout}
          className="btn-outline text-sm px-3 py-1.5"
        >
          {t("nav.logout")}
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          setMode("login");
        }}
        className="hidden sm:inline-flex items-center text-sm text-slate-700 dark:text-slate-200 hover:text-brand-700 px-2 py-1.5"
      >
        {t("nav.login")}
      </button>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          setMode("register");
        }}
        className="btn-outline text-sm px-3 py-1.5"
      >
        {t("nav.register")}
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4"
          onClick={close}
        >
          <div
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-lg font-bold">{t("auth.title")}</h2>
              <button
                type="button"
                onClick={close}
                className="text-slate-500 dark:text-slate-400 hover:text-slate-800 text-2xl leading-none"
                aria-label={t("auth.close")}
              >
                ×
              </button>
            </div>

            {submitted ? (
              <div className="p-6 text-center">
                <div className="text-4xl mb-2">👋</div>
                <p className="text-slate-700 dark:text-slate-200 mb-4">
                  {tab === "buyer"
                    ? t("auth.success.buyer")
                    : t("auth.success.seller")}
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="btn-primary"
                >
                  {t("auth.close")}
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 border-b border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setTab("buyer")}
                    className={`px-4 py-3 text-sm font-semibold transition-colors ${
                      tab === "buyer"
                        ? "bg-brand-50 text-brand-700 border-b-2 border-brand-600"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    🔑 {t("auth.tab.buyer")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setTab("seller")}
                    className={`px-4 py-3 text-sm font-semibold transition-colors ${
                      tab === "seller"
                        ? "bg-brand-50 text-brand-700 border-b-2 border-brand-600"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    🏠 {t("auth.tab.seller")}
                  </button>
                </div>

                <form className="p-6 space-y-4" onSubmit={handleSubmit}>
                  {mode === "register" ? (
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {t("auth.name")}
                      </label>
                      <input name="name" className="input" required />
                    </div>
                  ) : null}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {t("auth.email")}
                    </label>
                    <input
                      name="email"
                      type="email"
                      className="input"
                      required
                    />
                  </div>
                  {mode === "register" ? (
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {t("auth.phone")}
                      </label>
                      <input
                        name="phone"
                        className="input"
                        placeholder="+993 ..."
                      />
                    </div>
                  ) : null}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {t("auth.password")}
                    </label>
                    <input
                      name="password"
                      type="password"
                      className="input"
                      required
                      minLength={4}
                    />
                  </div>
                  {mode === "register" && tab === "seller" ? (
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {t("auth.company")}
                      </label>
                      <input name="company" className="input" />
                    </div>
                  ) : null}

                  <button type="submit" className="btn-primary w-full">
                    {mode === "login" ? t("auth.login") : t("auth.register")}
                  </button>

                  <div className="text-center text-sm text-slate-600 dark:text-slate-300">
                    {mode === "login" ? (
                      <>
                        {t("auth.no_account")}{" "}
                        <button
                          type="button"
                          onClick={() => setMode("register")}
                          className="text-brand-700 font-medium hover:underline"
                        >
                          {t("auth.to_register")}
                        </button>
                      </>
                    ) : (
                      <>
                        {t("auth.have_account")}{" "}
                        <button
                          type="button"
                          onClick={() => setMode("login")}
                          className="text-brand-700 font-medium hover:underline"
                        >
                          {t("auth.to_login")}
                        </button>
                      </>
                    )}
                  </div>

                  <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3">
                    {t("auth.demo_note")}
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
