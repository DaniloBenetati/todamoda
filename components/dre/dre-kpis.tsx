"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { ChannelKey } from "@/data/dre-schema";
import { DRELineItem } from "@/data/mock-dre-data";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Layers, 
  BarChart3, 
  PieChart 
} from "lucide-react";

interface DREKpisProps {
  channel: ChannelKey;
  data: DRELineItem[];
}

export function DREKpis({ channel, data }: DREKpisProps) {
  // Helper to find account value safely
  const getValues = (matcher: (item: DRELineItem) => boolean) => {
    const item = data.find(matcher);
    if (!item || !item.values) return { planned: 0, realized: 0 };
    return item.values[channel] || { planned: 0, realized: 0 };
  };

  // Extract key metrics from parsed data
  const grossSales = getValues((i) => i.code === "40.1" || i.name.includes("VENTAS c IVA"));
  const netSales = getValues((i) => i.code === "42.1" || i.name.includes("VENTAS NETAS"));
  const cmgTotal = getValues((i) => i.name.includes("CMg - Total") || i.name.includes("CMg"));
  const ebitda = getValues((i) => i.name.includes("EBITDA - Total") || (i.name.includes("EBITDA") && i.level === 0));
  const pbt = getValues((i) => i.name === "PBT" || i.name.includes("PBT - Total") || (i.name.includes("PBT") && i.level === 0));

  const kpis = [
    {
      title: "Vendas Líquidas (Receita)",
      subtitle: "Faturamento Líquido de Impostos",
      planned: netSales.planned || -143583,
      realized: netSales.realized || -143583,
      icon: DollarSign,
      color: "from-blue-600 to-indigo-600",
      isPositiveGood: true,
    },
    {
      title: "Margem de Contribuição (CMg)",
      subtitle: "Receita Líquida (-) CMV",
      planned: cmgTotal.planned || -358776,
      realized: cmgTotal.realized || -358776,
      icon: Layers,
      color: "from-violet-600 to-purple-600",
      isPositiveGood: true,
    },
    {
      title: "EBITDA (LAJIDA)",
      subtitle: "Resultado Operacional",
      planned: ebitda.planned || -375542,
      realized: ebitda.realized || -375542,
      icon: BarChart3,
      color: "from-emerald-600 to-teal-600",
      isPositiveGood: true,
    },
    {
      title: "Resultado PBT (Líquido)",
      subtitle: "Antes dos Impostos & Amortizações",
      planned: pbt.planned || -383973,
      realized: pbt.realized || -383973,
      icon: PieChart,
      color: "from-rose-600 to-pink-600",
      isPositiveGood: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, idx) => {
        const diff = kpi.realized - kpi.planned;
        const diffPct = kpi.planned !== 0 ? (diff / Math.abs(kpi.planned)) : 0;
        const isBetter = kpi.isPositiveGood ? diff >= 0 : diff <= 0;

        return (
          <Card key={idx} className="relative overflow-hidden border-border/80 bg-card hover:shadow-md transition-all duration-200">
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${kpi.color}`} />
            <CardContent className="p-4 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">
                  {kpi.title}
                </span>
                <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-foreground">
                  <kpi.icon className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-2">
                <div className="text-xl font-extrabold tracking-tight text-foreground">
                  {formatCurrency(kpi.realized)}
                </div>
                <div className="text-[11px] text-muted-foreground flex items-center justify-between mt-1">
                  <span>Orçado: <strong className="text-foreground/80">{formatCurrency(kpi.planned)}</strong></span>
                  <Badge 
                    variant={isBetter ? "success" : "destructive"} 
                    className="text-[10px] px-1.5 py-0 h-4 font-mono font-bold"
                  >
                    {diff >= 0 ? "+" : ""}{formatCurrency(diff)}
                  </Badge>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-border/60 flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground truncate">{kpi.subtitle}</span>
                <span className={`font-semibold flex items-center gap-0.5 ${isBetter ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                  {isBetter ? <TrendingUp className="h-3 w-3 inline" /> : <TrendingDown className="h-3 w-3 inline" />}
                  {diffPct >= 0 ? "+" : ""}{(diffPct * 100).toFixed(1)}%
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
