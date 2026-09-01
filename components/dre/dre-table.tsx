"use client";

import React, { useState, useMemo } from "react";
import { ChannelKey } from "@/data/dre-schema";
import { DRELineItem } from "@/data/mock-dre-data";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronDown, 
  ChevronRight, 
  ExternalLink
} from "lucide-react";

interface DRETableProps {
  data: DRELineItem[];
  selectedChannel: ChannelKey;
  searchTerm: string;
  isAllExpanded: boolean;
  onSelectAccount: (account: DRELineItem) => void;
}

export function DRETable({
  data,
  selectedChannel,
  searchTerm,
  isAllExpanded,
  onSelectAccount,
}: DRETableProps) {
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());

  const toggleGroup = (groupCode: string) => {
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupCode)) {
        next.delete(groupCode);
      } else {
        next.add(groupCode);
      }
      return next;
    });
  };

  const processedData = useMemo(() => {
    let currentParentCode = "";
    return data.map((item) => {
      if (item.level === 1 || item.isGroupHeader) {
        currentParentCode = item.code || item.name;
        return { ...item, parentCode: "" };
      }
      return { ...item, parentCode: currentParentCode };
    });
  }, [data]);

  const visibleRows = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    return processedData.filter((item) => {
      if (term) {
        return (
          item.name.toLowerCase().includes(term) ||
          item.code.toLowerCase().includes(term)
        );
      }

      if (isAllExpanded || item.level === 0 || item.level === 1 || !item.parentCode) {
        return true;
      }

      if (collapsedGroups.has(item.parentCode)) {
        return false;
      }

      return true;
    });
  }, [processedData, searchTerm, isAllExpanded, collapsedGroups]);

  const netSalesRow = data.find((i) => i.code === "42.1" || i.name.includes("VENTAS NETAS"));
  const netSalesVal = Math.abs(netSalesRow?.values?.[selectedChannel]?.realized || 143583);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-border bg-neutral-50/80 dark:bg-neutral-900/80 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              <th className="py-3 px-4 w-28">Código</th>
              <th className="py-3 px-4 min-w-[280px]">Conta Contábil / Descrição</th>
              <th className="py-3 px-4 text-right min-w-[130px]">Orçado (Planned)</th>
              <th className="py-3 px-4 text-right min-w-[130px]">Realizado (Realized)</th>
              <th className="py-3 px-4 text-right min-w-[120px]">Desvio (R$)</th>
              <th className="py-3 px-4 text-right min-w-[90px]">Desvio (%)</th>
              <th className="py-3 px-4 text-right min-w-[80px]">Margem %</th>
              <th className="py-3 px-3 text-center w-16">Razão</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {visibleRows.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-muted-foreground">
                  Nenhuma conta contábil encontrada para o termo "{searchTerm}".
                </td>
              </tr>
            ) : (
              visibleRows.map((item, idx) => {
                const values = item?.values?.[selectedChannel] || { planned: 0, realized: 0 };
                const planned = values.planned || 0;
                const realized = values.realized || 0;
                const variance = realized - planned;
                const variancePct = planned !== 0 ? (variance / Math.abs(planned)) : 0;
                const marginPct = netSalesVal !== 0 ? (realized / netSalesVal) : 0;

                const isMajorResult = item.isMainResult || item.level === 0;
                const isGroupHeader = item.level === 1 || item.isGroupHeader;
                const isSubAccount = item.level === 2;

                const isCollapsed = collapsedGroups.has(item.code || item.name);

                let rowClass = "hover:bg-neutral-50/60 dark:hover:bg-neutral-800/40 transition-colors";
                if (isMajorResult) {
                  rowClass = "bg-pink-500/5 dark:bg-pink-500/10 font-bold border-y-2 border-pink-500/30 text-foreground";
                } else if (isGroupHeader) {
                  rowClass = "bg-neutral-100/60 dark:bg-neutral-900/60 font-semibold text-foreground";
                } else if (isSubAccount) {
                  rowClass = "text-foreground/90 font-medium";
                } else {
                  rowClass = "text-muted-foreground text-xs";
                }

                const isRevenue = item.code.startsWith("40") || item.code.startsWith("42") || item.code.startsWith("50") || item.code.startsWith("52") || item.name.includes("VENTAS") || item.name.includes("INGRESSO");
                const isBetter = isRevenue ? variance >= 0 : variance <= 0;

                return (
                  <tr key={`${item.row}-${idx}`} className={rowClass}>
                    {/* Code */}
                    <td className="py-2.5 px-4 font-mono text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground/80">{item.code}</span>
                    </td>

                    {/* Description with indent and collapse chevron */}
                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-1.5" style={{ paddingLeft: `${(item.level > 1 ? (item.level - 1) * 16 : 0)}px` }}>
                        {isGroupHeader && (
                          <button
                            onClick={() => toggleGroup(item.code || item.name)}
                            className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded text-muted-foreground"
                            title={isCollapsed ? "Expandir grupo" : "Recolher grupo"}
                          >
                            {isCollapsed ? (
                              <ChevronRight className="h-3.5 w-3.5" />
                            ) : (
                              <ChevronDown className="h-3.5 w-3.5" />
                            )}
                          </button>
                        )}
                        <span className={isMajorResult ? "text-pink-600 dark:text-pink-400 font-extrabold uppercase tracking-wide text-xs md:text-sm" : ""}>
                          {item.name}
                        </span>
                      </div>
                    </td>

                    {/* Planned */}
                    <td className="py-2.5 px-4 text-right font-mono text-xs">
                      {planned !== 0 ? formatCurrency(planned) : <span className="text-muted-foreground/40">-</span>}
                    </td>

                    {/* Realized */}
                    <td className="py-2.5 px-4 text-right font-mono text-xs font-semibold">
                      {realized !== 0 ? (
                        <span>{formatCurrency(realized)}</span>
                      ) : (
                        <span className="text-muted-foreground/40">-</span>
                      )}
                    </td>

                    {/* Variance R$ */}
                    <td className="py-2.5 px-4 text-right font-mono text-xs">
                      {variance !== 0 ? (
                        <span className={`font-semibold ${isBetter ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                          {variance > 0 ? "+" : ""}{formatCurrency(variance)}
                        </span>
                      ) : (
                        <span className="text-muted-foreground/40">-</span>
                      )}
                    </td>

                    {/* Variance % */}
                    <td className="py-2.5 px-4 text-right font-mono text-xs">
                      {planned !== 0 && variance !== 0 ? (
                        <Badge
                          variant={isBetter ? "success" : "destructive"}
                          className="text-[10px] px-1.5 py-0 font-mono font-medium"
                        >
                          {variancePct > 0 ? "+" : ""}{(variancePct * 100).toFixed(1)}%
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground/40">-</span>
                      )}
                    </td>

                    {/* Margin % */}
                    <td className="py-2.5 px-4 text-right font-mono text-xs text-muted-foreground">
                      {marginPct !== 0 ? (
                        <span>{formatPercent(Math.abs(marginPct))}</span>
                      ) : (
                        <span className="text-muted-foreground/40">-</span>
                      )}
                    </td>

                    {/* Action button to open analytical entries */}
                    <td className="py-2.5 px-3 text-center">
                      <button
                        onClick={() => onSelectAccount(item)}
                        className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 text-muted-foreground hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                        title="Ver Lançamentos Analíticos desta conta"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
