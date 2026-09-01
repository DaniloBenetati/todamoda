"use client";

import React, { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { X, AlertTriangle } from "lucide-react";

export type ImportChannel = "tiendas" | "produto" | "franquias";

export interface ImportProjSummaryEntry {
  proj: string; // chave normalizada (maiúscula, trim; "(SEM PROJETO)" se vazio)
  rawLabel: string; // rótulo original tal como aparece no arquivo
  count: number;
  amount: number;
  channel: ImportChannel;
  isNew: boolean; // true = não existia no mapeamento salvo, precisa de revisão
}

const CHANNEL_LABELS: Record<ImportChannel, string> = {
  tiendas: "Tiendas Propias",
  produto: "Venta Producto",
  franquias: "Franquicias",
};

interface ImportReviewModalProps {
  fileName: string;
  summary: ImportProjSummaryEntry[];
  onCancel: () => void;
  onConfirm: (mapping: Record<string, ImportChannel>) => void;
}

export function ImportReviewModal({ fileName, summary, onCancel, onConfirm }: ImportReviewModalProps) {
  const [mapping, setMapping] = useState<Record<string, ImportChannel>>(() =>
    Object.fromEntries(summary.map((s) => [s.proj, s.channel]))
  );

  const totalCount = summary.reduce((acc, s) => acc + s.count, 0);
  const totalAmount = summary.reduce((acc, s) => acc + s.amount, 0);
  const newCount = summary.filter((s) => s.isNew).length;

  const setChannel = (proj: string, channel: ImportChannel) => {
    setMapping((prev) => ({ ...prev, [proj]: channel }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card w-full max-w-3xl max-h-[85vh] rounded-2xl border border-border shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-border flex items-center justify-between bg-neutral-50/80 dark:bg-neutral-900/80">
          <div>
            <h3 className="text-sm font-bold text-foreground">Revisar Importação</h3>
            <p className="text-xs text-muted-foreground">{fileName}</p>
          </div>
          <button
            onClick={onCancel}
            className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 hover:text-foreground transition-colors rounded-lg"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Summary bar */}
        <div className="px-5 py-3 border-b border-border grid grid-cols-3 gap-4 bg-card">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Lançamentos</div>
            <div className="text-sm font-bold text-foreground">{totalCount}</div>
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Valor Total</div>
            <div className="text-sm font-bold text-foreground">{formatCurrency(totalAmount)}</div>
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Projetos Novos</div>
            <div className="text-sm font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
              {newCount > 0 && <AlertTriangle className="h-3.5 w-3.5" />}
              {newCount}
            </div>
          </div>
        </div>

        {newCount > 0 && (
          <div className="px-5 py-2.5 bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-900/50 text-xs text-amber-800 dark:text-amber-300">
            {newCount} {newCount === 1 ? "projeto ainda não tem" : "projetos ainda não têm"} um canal salvo — confira o mapeamento sugerido abaixo. Depois de confirmar, fica salvo e as próximas importações com esses mesmos projetos não perguntam de novo.
          </div>
        )}

        {/* Table */}
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="sticky top-0 bg-zinc-100/95 dark:bg-zinc-900/95 backdrop-blur-xs text-muted-foreground font-semibold uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-2 px-4">Projeto (arquivo)</th>
                <th className="py-2 px-3 text-right">Lançamentos</th>
                <th className="py-2 px-3 text-right">Valor</th>
                <th className="py-2 px-4">Canal de destino</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200/70 dark:divide-zinc-800/70">
              {summary.map((s) => (
                <tr key={s.proj} className={s.isNew ? "bg-amber-50/50 dark:bg-amber-950/10" : ""}>
                  <td className="py-2 px-4 font-medium text-foreground">
                    <div className="flex items-center gap-2">
                      {s.rawLabel || "(sem projeto)"}
                      {s.isNew && (
                        <Badge variant="warning" className="text-[9px] py-0">
                          NOVO
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="py-2 px-3 text-right font-mono text-muted-foreground">{s.count}</td>
                  <td className="py-2 px-3 text-right font-mono">{formatCurrency(s.amount)}</td>
                  <td className="py-2 px-4">
                    <select
                      value={mapping[s.proj]}
                      onChange={(e) => setChannel(s.proj, e.target.value as ImportChannel)}
                      className="w-full h-8 border border-zinc-300 dark:border-zinc-700 bg-card px-2 text-xs focus:ring-1 focus:ring-ring text-foreground rounded-md"
                    >
                      {(Object.keys(CHANNEL_LABELS) as ImportChannel[]).map((ch) => (
                        <option key={ch} value={ch}>
                          {CHANNEL_LABELS[ch]}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border flex items-center justify-end gap-2 bg-neutral-50/80 dark:bg-neutral-900/80">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(mapping)}
            className="px-4 py-2 bg-zinc-700 hover:bg-zinc-800 text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
          >
            Confirmar e Importar
          </button>
        </div>
      </div>
    </div>
  );
}
