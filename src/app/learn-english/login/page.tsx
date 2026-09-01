"use client";

import { useState, type FormEvent } from "react";
import { supabase } from "../_lib/supabase";
import { useLearnT } from "../_lib/translations";

export default function LoginPage() {
  const t = useLearnT();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(false);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setError(true);
    // Başarılıysa Providers'taki yönlendirme dashboard'a götürür
  }

  return (
    <div className="mx-auto mt-16 max-w-sm">
      <h1 className="mb-6 text-2xl font-semibold">
        <span className="gradient-text">{t.login.title}</span>
      </h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm text-[var(--color-muted)]">
          {t.login.email}
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-[var(--color-muted)]">
          {t.login.password}
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
          />
        </label>
        {error && <p className="text-sm text-red-400">{t.login.failed}</p>}
        <button
          type="submit"
          disabled={busy}
          className="rounded-lg bg-[var(--color-accent)] px-4 py-2 font-medium text-[#04120c] transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {busy ? "…" : t.login.submit}
        </button>
      </form>
    </div>
  );
}
