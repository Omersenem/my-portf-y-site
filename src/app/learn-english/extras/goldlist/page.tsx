"use client";

import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../_components/Providers";
import { useLearnT } from "../../_lib/translations";
import { useGoldlists, useUpsertCheck, today } from "../../_lib/queries";
import { supabase } from "../../_lib/supabase";
import type { GoldlistItem, GoldlistList } from "../../_lib/types";

export default function GoldlistPage() {
  const { user } = useAuth();
  const t = useLearnT();
  const qc = useQueryClient();
  const { data } = useGoldlists(user?.id);
  const upsertCheck = useUpsertCheck(user?.id);

  const [showNew, setShowNew] = useState(false);
  const [rows, setRows] = useState<{ en: string; tr: string }[]>(
    Array.from({ length: 5 }, () => ({ en: "", tr: "" }))
  );
  const [distillOf, setDistillOf] = useState<GoldlistList | null>(null);
  const [remembered, setRemembered] = useState<Set<string>>(new Set());

  const itemsByList = useMemo(() => {
    const m = new Map<string, GoldlistItem[]>();
    for (const item of data?.items ?? []) {
      const arr = m.get(item.list_id) ?? [];
      arr.push(item);
      m.set(item.list_id, arr);
    }
    return m;
  }, [data]);

  const createList = useMutation({
    mutationFn: async (items: { en: string; tr: string }[]) => {
      const maxNo = Math.max(0, ...(data?.lists ?? []).map((l) => l.list_no));
      const { data: list, error } = await supabase
        .from("goldlist_lists")
        .insert({ user_id: user!.id, list_no: maxNo + 1 })
        .select()
        .single();
      if (error) throw error;
      const { error: itemsErr } = await supabase.from("goldlist_items").insert(
        items.map((r) => ({
          list_id: list.id,
          user_id: user!.id,
          text_en: r.en,
          text_tr: r.tr,
        }))
      );
      if (itemsErr) throw itemsErr;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["goldlists"] });
      upsertCheck.mutate({ item_key: "goldlist", checked: true });
      setShowNew(false);
      setRows(Array.from({ length: 5 }, () => ({ en: "", tr: "" })));
    },
  });

  const distill = useMutation({
    mutationFn: async ({
      list,
      rememberedIds,
    }: {
      list: GoldlistList;
      rememberedIds: Set<string>;
    }) => {
      const items = itemsByList.get(list.id) ?? [];
      const forgotten = items.filter((i) => !rememberedIds.has(i.id) && !i.distilled);
      // Hatırlananlar damıtıldı olarak işaretlenir; unutulanlar yeni (çocuk) listeye taşınır
      const rememberedItems = items.filter((i) => rememberedIds.has(i.id));
      if (rememberedItems.length) {
        const { error } = await supabase
          .from("goldlist_items")
          .update({ distilled: true })
          .in("id", rememberedItems.map((i) => i.id));
        if (error) throw error;
      }
      if (forgotten.length) {
        const maxNo = Math.max(0, ...(data?.lists ?? []).map((l) => l.list_no));
        const { data: child, error } = await supabase
          .from("goldlist_lists")
          .insert({ user_id: user!.id, list_no: maxNo + 1, parent_list_id: list.id })
          .select()
          .single();
        if (error) throw error;
        const { error: moveErr } = await supabase.from("goldlist_items").insert(
          forgotten.map((i) => ({
            list_id: child.id,
            user_id: user!.id,
            text_en: i.text_en,
            text_tr: i.text_tr,
          }))
        );
        if (moveErr) throw moveErr;
        const { error: markErr } = await supabase
          .from("goldlist_items")
          .update({ distilled: true })
          .in("id", forgotten.map((i) => i.id));
        if (markErr) throw markErr;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["goldlists"] });
      upsertCheck.mutate({ item_key: "goldlist", checked: true });
      setDistillOf(null);
      setRemembered(new Set());
    },
  });

  if (!user) return null;

  const todayStr = today();

  return (
    <div className="flex flex-col gap-6 animate-fade-up">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold">{t.extras.goldlist}</h1>
        <button
          onClick={() => setShowNew((v) => !v)}
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1.5 text-sm transition-colors hover:border-[var(--color-accent)]"
        >
          + {t.extras.glNew}
        </button>
      </div>
      <p className="max-w-lg text-sm text-[var(--color-muted)]">{t.extras.glHint}</p>

      {showNew && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const filled = rows.filter((r) => r.en.trim() && r.tr.trim());
            if (filled.length) createList.mutate(filled);
          }}
          className="flex flex-col gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4"
        >
          {rows.map((row, i) => (
            <div key={i} className="flex gap-2">
              <input
                placeholder={t.extras.glEnPlaceholder}
                value={row.en}
                onChange={(e) =>
                  setRows((rs) => rs.map((r, j) => (j === i ? { ...r, en: e.target.value } : r)))
                }
                className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-1.5 text-sm outline-none focus:border-[var(--color-accent)]"
              />
              <input
                placeholder={t.extras.glTrPlaceholder}
                value={row.tr}
                onChange={(e) =>
                  setRows((rs) => rs.map((r, j) => (j === i ? { ...r, tr: e.target.value } : r)))
                }
                className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-1.5 text-sm outline-none focus:border-[var(--color-accent)]"
              />
            </div>
          ))}
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={() => setRows((rs) => [...rs, { en: "", tr: "" }])}
              className="rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-sm text-[var(--color-muted)]"
            >
              +
            </button>
            <button
              type="submit"
              disabled={createList.isPending}
              className="rounded-lg bg-[var(--color-accent)] px-4 py-1.5 text-sm font-medium text-[#04120c] disabled:opacity-50"
            >
              {t.common.save}
            </button>
          </div>
        </form>
      )}

      <div className="flex flex-col gap-3">
        {(data?.lists ?? []).map((list) => {
          const items = itemsByList.get(list.id) ?? [];
          const activeItems = items.filter((i) => !i.distilled);
          const locked = list.unlocks_on > todayStr;
          const isDistilling = distillOf?.id === list.id;
          return (
            <div
              key={list.id}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)]/50 p-4"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-sm">
                  #{list.list_no} <span className="text-[var(--color-muted)]">({list.created_on})</span>
                </span>
                {locked ? (
                  <span className="rounded-full border border-amber-400/40 px-2 py-0.5 text-xs text-amber-300">
                    🔒 {t.extras.glLocked} — {t.extras.glUnlocks}: {list.unlocks_on}
                  </span>
                ) : activeItems.length > 0 ? (
                  <button
                    onClick={() => {
                      setDistillOf(isDistilling ? null : list);
                      setRemembered(new Set());
                    }}
                    className="rounded-full border border-[var(--color-accent)]/40 px-3 py-0.5 text-xs text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent)]/10"
                  >
                    {t.extras.glDistill}
                  </button>
                ) : (
                  <span className="text-xs text-[var(--color-muted)]">✓</span>
                )}
                <span className="ml-auto font-mono text-xs text-[var(--color-muted)]">
                  {activeItems.length}/{items.length}
                </span>
              </div>

              {(!locked || isDistilling) && activeItems.length > 0 && (
                <ul className="mt-3 flex flex-col gap-1">
                  {activeItems.map((item) => (
                    <li key={item.id} className="flex items-center gap-2 text-sm">
                      {isDistilling && (
                        <input
                          type="checkbox"
                          checked={remembered.has(item.id)}
                          onChange={(e) => {
                            setRemembered((s) => {
                              const next = new Set(s);
                              if (e.target.checked) next.add(item.id);
                              else next.delete(item.id);
                              return next;
                            });
                          }}
                          className="accent-[var(--color-accent)]"
                        />
                      )}
                      <span>{item.text_en}</span>
                      <span className="text-[var(--color-muted)]">— {item.text_tr}</span>
                    </li>
                  ))}
                </ul>
              )}

              {isDistilling && (
                <button
                  onClick={() => distill.mutate({ list, rememberedIds: remembered })}
                  disabled={distill.isPending}
                  className="mt-3 rounded-lg bg-[var(--color-accent)] px-4 py-1.5 text-sm font-medium text-[#04120c] disabled:opacity-50"
                >
                  {t.common.save}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
