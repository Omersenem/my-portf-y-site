"use client";

import { toDateString, addDays } from "../_lib/srs";

// GitHub tarzı katkı haritası: gün başına işaretli rutin sayısı (0-6)
export function Heatmap({ counts, weeks = 18 }: { counts: Map<string, number>; weeks?: number }) {
  const end = new Date();
  // Haftanın pazartesiyle hizalanması için sona git
  const days = weeks * 7;
  const start = addDays(end, -(days - 1));

  const cells: { date: string; count: number }[] = [];
  for (let i = 0; i < days; i++) {
    const d = addDays(start, i);
    const key = toDateString(d);
    cells.push({ date: key, count: counts.get(key) ?? 0 });
  }

  const color = (c: number) => {
    if (c === 0) return "var(--color-card)";
    if (c <= 1) return "rgba(52, 211, 153, 0.25)";
    if (c <= 3) return "rgba(52, 211, 153, 0.5)";
    if (c <= 5) return "rgba(52, 211, 153, 0.75)";
    return "#34d399";
  };

  // Sütun = hafta
  const columns: { date: string; count: number }[][] = [];
  for (let w = 0; w < weeks; w++) {
    columns.push(cells.slice(w * 7, w * 7 + 7));
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-1">
        {columns.map((col, i) => (
          <div key={i} className="flex flex-col gap-1">
            {col.map((cell) => (
              <div
                key={cell.date}
                title={`${cell.date}: ${cell.count}`}
                className="h-3 w-3 rounded-[3px]"
                style={{ background: color(cell.count) }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
