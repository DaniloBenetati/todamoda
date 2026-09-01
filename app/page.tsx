"use client";

import React, { useState, useEffect } from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { DREGerencialManager } from "@/components/dre-gerencial/dre-gerencial-manager";
import { BudgetManager } from "@/components/budget/budget-manager";
import { PlanoContasManager } from "@/components/plano-contas/plano-contas-manager";
import { FluxoCaixaManager } from "@/components/fluxo-caixa/fluxo-caixa-manager";
import { DRE_TRANSACTIONS_DATA } from "@/data/mock-dre-data";
import { Badge } from "@/components/ui/badge";
import {
  ReceiptText,
  Calendar,
  Clock,
  ChevronDown
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("contabil_dre");
  // Só monta um painel na primeira vez que ele é visitado (evita pagar o custo de montagem
  // dos 4 módulos de uma vez no carregamento inicial); depois de visitado, fica sempre montado
  // e só alterna visibilidade via `hidden`, então voltar a uma aba já visitada é instantâneo.
  const [visitedTabs, setVisitedTabs] = useState<Set<string>>(() => new Set(["contabil_dre"]));
  const handleSetActiveTab = (tab: string) => {
    setActiveTab(tab);
    setVisitedTabs((prev) => (prev.has(tab) ? prev : new Set(prev).add(tab)));
  };
  const [isDark, setIsDark] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDateStr, setCurrentDateStr] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      
      const weekday = now.toLocaleDateString("pt-BR", { weekday: "long" }).toUpperCase();
      const day = now.getDate();
      const month = now.toLocaleDateString("pt-BR", { month: "long" }).toUpperCase();
      const year = now.getFullYear();
      setCurrentDateStr(`${weekday}, ${day} ${month} ${year}`);

      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 10000);
    
    // Ensure light theme is active by default
    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("dark");
    }

    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev;
      if (typeof document !== "undefined") {
        if (next) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
      return next;
    });
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Sidebar with theme toggle in bottom */}
      <AppSidebar
        activeTab={activeTab}
        setActiveTab={handleSetActiveTab}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-zinc-50/50 dark:bg-zinc-950/50">
        {/* Top Header */}
        <header className="h-14 border-b border-zinc-200 dark:border-zinc-800 bg-card/90 backdrop-blur-md px-6 flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-foreground tracking-tight">
                TODA MODA
              </span>
              <span className="text-zinc-400 dark:text-zinc-600 text-xs">/</span>
              <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 border border-zinc-200 dark:border-zinc-700">
                {activeTab === "contabil_dre"
                  ? "DRE Gerencial"
                  : activeTab === "contabil_budget"
                  ? "Budget / Planejamento Orçamentário"
                  : activeTab === "contabil_plano"
                  ? "Plano de Contas Financeiro"
                  : activeTab === "contabil_lancamentos"
                  ? "Lançamentos Contábeis Analíticos"
                  : activeTab === "fluxo_caixa"
                  ? "Fluxo de Caixa"
                  : "Módulo Financeiro"}
              </span>
            </div>
          </div>

          {/* Right Header Info: Date • Time • Administrator */}
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
            {/* Date */}
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-zinc-500" />
              <span>{currentDateStr || "SEXTA, 21 AGOSTO 2026"}</span>
            </div>

            <span className="text-zinc-300 dark:text-zinc-700 select-none">•</span>

            {/* Time */}
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-zinc-500" />
              <span>{currentTime || "11:09"}</span>
            </div>

            <span className="text-zinc-300 dark:text-zinc-700 select-none">•</span>

            {/* User Administrator */}
            <button 
              className="flex items-center gap-1 text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 transition-colors font-bold"
              title="Perfil do Administrador"
            >
              <span>ADMINISTRADOR</span>
              <ChevronDown className="h-3 w-3 text-zinc-500" />
            </button>
          </div>
        </header>

        {/* Scrollable Main Body */}
        {/*
          Cada painel só monta na primeira vez que é visitado (`visitedTabs`) e, a partir daí,
          fica sempre montado — só alterna visibilidade via `hidden` em vez de desmontar via
          `{condition && <Componente/>}`. Isso evita que voltar a uma aba já visitada force um
          remount completo (recarregar do localStorage, recomputar totais, reconstruir uma
          tabela de centenas de linhas do zero) sem pagar o custo de montar os 4 módulos de
          uma vez logo no carregamento inicial.
        */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* DRE Gerencial */}
          {visitedTabs.has("contabil_dre") && (
            <div hidden={activeTab !== "contabil_dre"}>
              <DREGerencialManager />
            </div>
          )}

          {/* Budget / Orçamento */}
          {visitedTabs.has("contabil_budget") && (
            <div hidden={activeTab !== "contabil_budget"}>
              <BudgetManager />
            </div>
          )}

          {/* Plano de Contas Editável */}
          {visitedTabs.has("contabil_plano") && (
            <div hidden={activeTab !== "contabil_plano"}>
              <PlanoContasManager />
            </div>
          )}

          {/* Lançamentos Analíticos */}
          {visitedTabs.has("contabil_lancamentos") && (
          <div hidden={activeTab !== "contabil_lancamentos"} className="space-y-4">
              <div className="flex items-center justify-between bg-card p-4 border border-zinc-200 dark:border-zinc-800 shadow-xs">
                <div>
                  <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                    <ReceiptText className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                    Lançamentos Contábeis Analíticos
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Extrato contábil analítico ({DRE_TRANSACTIONS_DATA.length} transações mapeadas).
                  </p>
                </div>
              </div>

              {/* Transactions Table */}
              <div className="border border-zinc-200 dark:border-zinc-800 bg-card shadow-xs overflow-hidden">
                <div className="overflow-x-auto max-h-[650px]">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="sticky top-0 bg-zinc-100/95 dark:bg-zinc-900/95 backdrop-blur-xs text-muted-foreground font-semibold uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-800">
                      <tr>
                        <th className="py-2.5 px-4">Data</th>
                        <th className="py-2.5 px-4">Entidade</th>
                        <th className="py-2.5 px-4">Fornecedor / Favorecido</th>
                        <th className="py-2.5 px-4">Conta Contábil</th>
                        <th className="py-2.5 px-4">Documento</th>
                        <th className="py-2.5 px-4 text-center">Tipo</th>
                        <th className="py-2.5 px-4 text-right">Valor (R$)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200/70 dark:divide-zinc-800/70">
                      {DRE_TRANSACTIONS_DATA.map((tx) => (
                        <tr key={tx.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                          <td className="py-2.5 px-4 font-mono text-muted-foreground">{tx.date}</td>
                          <td className="py-2.5 px-4 font-medium">{tx.entity}</td>
                          <td className="py-2.5 px-4 font-semibold text-foreground">{tx.supplier}</td>
                          <td className="py-2.5 px-4 font-mono">
                            <span className="text-zinc-700 dark:text-zinc-300 font-bold mr-1.5">{tx.code}</span>
                            <span className="text-muted-foreground">{tx.categoryName}</span>
                          </td>
                          <td className="py-2.5 px-4 font-mono text-muted-foreground">{tx.doc}</td>
                          <td className="py-2.5 px-4 text-center">
                            <Badge variant={tx.type === "Crédito" ? "success" : "secondary"} className="text-[10px] py-0">
                              {tx.type}
                            </Badge>
                          </td>
                          <td className="py-2.5 px-4 text-right font-mono font-bold">
                            <span className={tx.amount < 0 ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"}>
                              {tx.amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
          </div>
          )}

          {/* Fluxo de Caixa */}
          {visitedTabs.has("fluxo_caixa") && (
            <div hidden={activeTab !== "fluxo_caixa"}>
              <FluxoCaixaManager />
            </div>
          )}

          {visitedTabs.has("config") && (
            <div hidden={activeTab !== "config"} className="p-8 border border-zinc-200 dark:border-zinc-800 bg-card space-y-3">
              <h2 className="text-base font-bold text-foreground">Configurações do Sistema</h2>
              <p className="text-xs text-muted-foreground">
                Parâmetros globais contábeis, canais e integrações financeiras.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
