"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

export interface PeriodFilterMonth {
  id: string; // "01".."12"
  label: string; // "Janeiro 2026"
  short: string; // "JAN"
}

interface PeriodFilterDropdownProps {
  year: string;
  months: PeriodFilterMonth[]; // 12 meses, ordenados 01..12
  value: Record<string, boolean>;
  onChange: (next: Record<string, boolean>) => void;
}

const QUARTERS: { key: string; label: string; indices: number[] }[] = [
  { key: "T1", label: "Trim 1", indices: [0, 1, 2] },
  { key: "T2", label: "Trim 2", indices: [3, 4, 5] },
  { key: "T3", label: "Trim 3", indices: [6, 7, 8] },
  { key: "T4", label: "Trim 4", indices: [9, 10, 11] },
];

function TriStateCheckbox({
  checked,
  indeterminate,
  onChange,
}: {
  checked: boolean;
  indeterminate: boolean;
  onChange: () => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);
  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      onClick={(e) => e.stopPropagation()}
      className="h-3.5 w-3.5 shrink-0 border-zinc-400 dark:border-zinc-600 text-zinc-700 rounded-sm accent-zinc-700"
    />
  );
}

// Dropdown hierárquico Ano > Trimestre > Mês para filtrar o período visível — mesmo padrão de
// árvore com checkbox de 3 estados (marcado/parcial/vazio) usado em outros sistemas financeiros.
export function PeriodFilterDropdown({ year, months, value, onChange }: PeriodFilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const [yearExpanded, setYearExpanded] = useState(true);
  const [expandedQuarters, setExpandedQuarters] = useState<Set<string>>(new Set(["T1", "T2", "T3", "T4"]));
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectedCount = months.filter((m) => value[m.id]).length;
  const allSelected = selectedCount === months.length && months.length > 0;
  const noneSelected = selectedCount === 0;

  const triggerLabel = allSelected
    ? "Todos os períodos"
    : noneSelected
    ? "Nenhum período"
    : `${selectedCount} de ${months.length} meses`;

  const setMonths = (ids: string[], checked: boolean) => {
    const next = { ...value };
    ids.forEach((id) => (next[id] = checked));
    onChange(next);
  };

  const toggleQuarterExpanded = (key: string) => {
    setExpandedQuarters((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between h-8 border border-zinc-300 dark:border-zinc-700 bg-card px-2.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
      >
        <span>{triggerLabel}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute z-40 mt-1 w-full max-h-64 overflow-y-auto bg-card border border-zinc-300 dark:border-zinc-700 shadow-lg">
          {/* Ano */}
          <div className="flex items-center gap-1.5 px-2 py-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-900">
            <button
              type="button"
              onClick={() => setYearExpanded((v) => !v)}
              className="text-zinc-500 dark:text-zinc-400 shrink-0"
            >
              {yearExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
            </button>
            <TriStateCheckbox
              checked={allSelected}
              indeterminate={!allSelected && !noneSelected}
              onChange={() => setMonths(months.map((m) => m.id), !allSelected)}
            />
            <span className="text-xs font-bold text-foreground">{year}</span>
          </div>

          {yearExpanded &&
            QUARTERS.map((q) => {
              const qMonths = q.indices.map((i) => months[i]).filter(Boolean);
              const qSelected = qMonths.filter((m) => value[m.id]).length;
              const qAll = qSelected === qMonths.length && qMonths.length > 0;
              const qNone = qSelected === 0;
              const qExpanded = expandedQuarters.has(q.key);

              return (
                <div key={q.key}>
                  <div className="flex items-center gap-1.5 pl-6 pr-2 py-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-900">
                    <button
                      type="button"
                      onClick={() => toggleQuarterExpanded(q.key)}
                      className="text-zinc-500 dark:text-zinc-400 shrink-0"
                    >
                      {qExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                    </button>
                    <TriStateCheckbox
                      checked={qAll}
                      indeterminate={!qAll && !qNone}
                      onChange={() => setMonths(qMonths.map((m) => m.id), !qAll)}
                    />
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{q.label}</span>
                  </div>

                  {qExpanded &&
                    qMonths.map((m) => (
                      <label
                        key={m.id}
                        className="flex items-center gap-1.5 pl-12 pr-2 py-1 hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer"
                      >
                        <TriStateCheckbox checked={!!value[m.id]} indeterminate={false} onChange={() => onChange({ ...value, [m.id]: !value[m.id] })} />
                        <span className="text-xs text-foreground/90">{m.label.replace(/\s*\d{4}$/, "")}</span>
                      </label>
                    ))}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
