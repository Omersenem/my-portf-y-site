"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useAuth } from "./_components/Providers";
import { Heatmap } from "./_components/Heatmap";
import { useLearnT } from "./_lib/translations";
import { useChecks, useProfile, useUpsertCheck, today } from "./_lib/queries";
import { ROUTINE, FIRST_MILESTONE_DAYS } from "./_lib/routine";
import { toDateString, addDays } from "./_lib/srs";

export default function DashboardPage() {
  const { user } = useAuth();
  const t = useLearnT();
  const { data: profile } = useProfile(user?.id);
  const { data: checks } = useChecks(user?.id);
  const upsert = useUpsertCheck(user?.id);

  const todayKey = today();
  const todayChecks = useMemo(
    () => new Map((checks ?? []).filter((c) => c.date === todayKey).map((c) => [c.item_key, c])),
    [checks, todayKey]
  );

  // Gün bazında işaretli rutin sayısı → heatmap + streak
  const dayCounts = useMemo(() => {
    const m = new Map<string, number>();
    for (const c of checks ?? []) {
      if (c.checked) m.set(c.date, (m.get(c.date) ?? 0) + 1);
    }
    return m;
  }, [checks]);

  const streak = useMemo(() => {
    let s = 0;
    let d = new Date();
    // Bugün henüz boşsa dünden başla
    if (!dayCounts.get(toDateString(d))) d = addDays(d, -1);
    while (dayCounts.get(toDateString(d))) {
      s++;
      d = addDays(d, -1);
    }
    return s;
  }, [dayCounts]);

  const dayNumber = useMemo(() => {
    if (!profile) return null;
    const start = new Date(profile.start_date + "T00:00:00");
    const diff = Math.floor((Date.now() - start.getTime()) / 86_400_000) + 1;
    return Math.max(1, diff);
  }, [profile]);

  if (!user) return null;

  return (
    <div className="flex flex-col gap-8 animate-fade-up">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-3xl font-semibold">{t.dashboard.title}</h1>
        <div className="flex gap-3 text-sm">
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2">
            🔥 {t.dashboard.streak}: <b className="gradient-text">{streak}</b> {t.dashboard.days}
          </div>
          {dayNumber !== null && dayNumber <= FIRST_MILESTONE_DAYS && (
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2">
              🎯 {t.dashboard.hundredDays}: <b className="gradient-text">{dayNumber}</b>/{FIRST_MILESTONE_DAYS}
            </div>
          )}
        </div>
      </div>

      <section>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-[var(--color-muted)]">
          {t.dashboard.routineTitle}
        </h2>
        <div className="flex flex-col gap-2">
          {ROUTINE.map((item) => {
            const check = todayChecks.get(item.key);
            const info = t.dashboard.items[item.key];
            const minutes = check?.minutes_done ?? 0;
            const done = check?.checked ?? false;
            const autoDone =
              item.targetMin !== null && minutes >= item.targetMin;
            return (
              <div
                key={item.key}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                  done || autoDone
                    ? "border-[var(--color-accent)]/40 bg-[var(--color-card)]"
                    : "border-[var(--color-border)] bg-[var(--color-card)]/50"
                }`}
              >
                <button
                  aria-label={info.name}
                  onClick={() =>
                    upsert.mutate({ item_key: item.key, checked: !done })
                  }
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs transition-colors ${
                    done || autoDone
                      ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[#04120c]"
                      : "border-[var(--color-border)] text-transparent hover:border-[var(--color-accent)]"
                  }`}
                >
                  ✓
                </button>
                <Link href={item.href} className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-[var(--color-muted)]">
                      {item.stage}
                    </span>
                    <span className="truncate font-medium">{info.name}</span>
                  </div>
                  <p className="truncate text-xs text-[var(--color-muted)]">{info.hint}</p>
                </Link>
                {item.targetMin !== null && (
                  <span className="shrink-0 font-mono text-xs text-[var(--color-muted)]">
                    {minutes}/{item.targetMin} {t.dashboard.minutesOf}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-[var(--color-muted)]">
          {t.dashboard.heatmapTitle}
        </h2>
        <Heatmap counts={dayCounts} />
      </section>
    </div>
  );
}
