"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChannelKey } from "@/data/dre-schema";
import { DRELineItem } from "@/data/mock-dre-data";
import { formatCurrency } from "@/lib/utils";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from "recharts";

interface DREChartProps {
  channel: ChannelKey;
  data: DRELineItem[];
}

export function DREChart({ channel, data }: DREChartProps) {
  // Extract expense categories
  const expenseCategories = [
    { code: "1.1", name: "Sueldos (Pessoal)" },
    { code: "2.1", name: "Aluguel & Ocupação" },
    { code: "3.1", name: "Logística & Fretes" },
    { code: "4.1", name: "Impostos & Tributos" },
    { code: "5.1", name: "Marketing & PDV" },
    { code: "6.1", name: "Serviços & Utilidades" },
    { code: "10.1", name: "Outras Despesas" },
    { code: "13.1", name: "Honorários" },
    { code: "30.1", name: "Resultado Financeiro" },
  ];

  const chartData = expenseCategories.map((cat) => {
    const item = data.find((i) => i.code === cat.code);
    const planned = Math.abs(item?.values?.[channel]?.planned || 0);
    const realized = Math.abs(item?.values?.[channel]?.realized || 0);
    return {
      name: cat.name,
      Orçado: planned,
      Realizado: realized,
    };
  }).filter(d => d.Orçado > 0 || d.Realizado > 0);

  // Channels comparison data for EBITDA & Revenue
  const channelsComparison = [
    {
      name: "Tiendas Propias",
      Receita: Math.abs(data.find((i) => i.code === "42.1")?.values?.tiendas?.realized || 143583),
      Gastos: Math.abs(data.find((i) => i.name.includes("GASTOS CANALES - Tiendas"))?.values?.consolidado?.realized || 16766),
      Ebitda: Math.abs(data.find((i) => i.name.includes("EBITDA - Tiendas"))?.values?.tiendas?.realized || 375542),
    },
    {
      name: "Venta Producto",
      Receita: Math.abs(data.find((i) => i.code === "42.1")?.values?.produto?.realized || 0),
      Gastos: Math.abs(data.find((i) => i.name.includes("GASTOS CANALES - Venta Producto"))?.values?.consolidado?.realized || 204633),
      Ebitda: Math.abs(data.find((i) => i.name.includes("EBITDA - Venta"))?.values?.produto?.realized || 2146826),
    },
    {
      name: "Franquicias",
      Receita: Math.abs(data.find((i) => i.code === "52.1")?.values?.franquias?.realized || 0),
      Gastos: Math.abs(data.find((i) => i.name.includes("GASTOS CANALES - Franquicias"))?.values?.consolidado?.realized || 20200),
      Ebitda: Math.abs(data.find((i) => i.name.includes("EBITDA - Franquicias"))?.values?.franquias?.realized || 100462),
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Expenses Bar Chart */}
      <Card className="border-border shadow-sm">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm font-bold flex items-center justify-between">
            <span>Principais Grupos de Despesas (Orçado vs Realizado)</span>
            <span className="text-xs font-normal text-muted-foreground">Em R$</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 10 }} 
                  angle={-20} 
                  textAnchor="end" 
                  height={40} 
                />
                <YAxis 
                  tick={{ fontSize: 10 }} 
                  tickFormatter={(v) => `R$ ${(v / 1000).toFixed(0)}k`} 
                />
                <Tooltip
                  formatter={(value: any) => [formatCurrency(Number(value)), ""]}
                  contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", color: "#fff", borderRadius: 8, fontSize: 12 }}
                />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 6 }} />
                <Bar dataKey="Orçado" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Realizado" fill="#ec4899" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Channel Comparison Chart */}
      <Card className="border-border shadow-sm">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm font-bold flex items-center justify-between">
            <span>Distribuição por Canal de Negócio</span>
            <span className="text-xs font-normal text-muted-foreground">Visão Comparativa</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelsComparison} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis 
                  tick={{ fontSize: 10 }} 
                  tickFormatter={(v) => `R$ ${(v / 1000).toFixed(0)}k`} 
                />
                <Tooltip
                  formatter={(value: any) => [formatCurrency(Number(value)), ""]}
                  contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", color: "#fff", borderRadius: 8, fontSize: 12 }}
                />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 6 }} />
                <Bar dataKey="Receita" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Gastos" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Ebitda" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
