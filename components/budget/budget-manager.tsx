"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { DRE_ACCOUNTS_DATA, DREAccountItem, ChannelType } from "@/data/mock-dre-data";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Save, 
  RotateCcw, 
  Download, 
  CheckCircle2, 
  X, 
  SlidersHorizontal,
  ChevronDown,
  ChevronRight,
  ChevronsDown,
  ChevronsUp,
  UploadCloud,
  Search
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as XLSX from "xlsx";
import { MONTHS_FULL } from "@/components/dre-gerencial/dre-gerencial-manager";
import { PeriodFilterDropdown } from "@/components/ui/period-filter";

const STORAGE_KEY_BUDGET = "toda_moda_budget_data_v2";
const STORAGE_KEY_DRE = "toda_moda_dre_gerencial_v7";

export function BudgetManager() {
  const [budgetAccounts, setBudgetAccounts] = useState<DREAccountItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedChannel, setSelectedChannel] = useState<ChannelType>("consolidado");
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [collapsedIds, setCollapsedIds] = useState<Set<string>>(new Set());
  const [savedSuccess, setSavedSuccess] = useState<string | null>(null);

  // Active visible months
  const [visibleMonths, setVisibleMonths] = useState<Record<string, boolean>>({
    "01": true,
    "02": true,
    "03": true,
    "04": true,
    "05": true,
    "06": true,
    "07": true,
    "08": true,
    "09": true,
    "10": true,
    "11": true,
    "12": true,
    "total": true,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load from storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BUDGET);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBudgetAccounts(parsed);
          return;
        }
      }

      // Default: clean 0 planned values
      const clean = DRE_ACCOUNTS_DATA.map((item) => ({
        ...item,
        values: {
          tiendas: { planned: 0, realized: 0 },
          produto: { planned: 0, realized: 0 },
          franquias: { planned: 0, realized: 0 },
          consolidado: { planned: 0, realized: 0 },
        },
      }));
      setBudgetAccounts(clean);
    } catch (e) {
      console.warn("Usando Budget inicial limpo.");
    }
  }, []);

  const saveBudget = (data: DREAccountItem[], msg = "Budget salvo e sincronizado com a DRE com sucesso!") => {
    setBudgetAccounts(data);
    try {
      localStorage.setItem(STORAGE_KEY_BUDGET, JSON.stringify(data));

      // Also sync planned into DRE storage
      const savedDRE = localStorage.getItem(STORAGE_KEY_DRE);
      let currentDRE: DREAccountItem[] = savedDRE ? JSON.parse(savedDRE) : DRE_ACCOUNTS_DATA;
      const budgetMap = new Map(data.map((d) => [d.id, d.values]));

      const updatedDRE = currentDRE.map((account) => {
        const bVal = budgetMap.get(account.id);
        return {
          ...account,
          values: {
            tiendas: {
              planned: bVal?.tiendas?.planned || 0,
              realized: account.values?.tiendas?.realized || 0,
            },
            produto: {
              planned: bVal?.produto?.planned || 0,
              realized: account.values?.produto?.realized || 0,
            },
            franquias: {
              planned: bVal?.franquias?.planned || 0,
              realized: account.values?.franquias?.realized || 0,
            },
            consolidado: {
              planned: bVal?.consolidado?.planned || 0,
              realized: account.values?.consolidado?.realized || 0,
            },
          },
        };
      });

      localStorage.setItem(STORAGE_KEY_DRE, JSON.stringify(updatedDRE));
      setSavedSuccess(msg);
      setTimeout(() => setSavedSuccess(null), 4000);
    } catch (e) {
      console.error("Erro ao salvar budget:", e);
    }
  };

  const handleBudgetChange = (
    id: string,
    valueStr: string
  ) => {
    const numericVal = parseFloat(valueStr.replace(/[^0-9.-]/g, "")) || 0;

    const updated = budgetAccounts.map((item) => {
      if (item.id === id) {
        const currentVals = item.values || {
          tiendas: { planned: 0, realized: 0 },
          produto: { planned: 0, realized: 0 },
          franquias: { planned: 0, realized: 0 },
          consolidado: { planned: 0, realized: 0 },
        };

        const targetChannel = selectedChannel === "consolidado" ? "tiendas" : selectedChannel;
        const updatedChannel = {
          ...currentVals[targetChannel],
          planned: numericVal,
        };

        const newTiendas = targetChannel === "tiendas" ? updatedChannel : currentVals.tiendas;
        const newProduto = targetChannel === "produto" ? updatedChannel : currentVals.produto;
        const newFranquias = targetChannel === "franquias" ? updatedChannel : currentVals.franquias;

        const newConsolidado = {
          ...currentVals.consolidado,
          planned: (newTiendas?.planned || 0) + (newProduto?.planned || 0) + (newFranquias?.planned || 0),
        };

        return {
          ...item,
          values: {
            tiendas: newTiendas,
            produto: newProduto,
            franquias: newFranquias,
            consolidado: newConsolidado,
          },
        };
      }
      return item;
    });

    setBudgetAccounts(updated);
  };

  const handleReset = () => {
    if (confirm("Deseja redefinir o Budget para os valores padrão?")) {
      saveBudget(DRE_ACCOUNTS_DATA, "Budget redefinido com sucesso!");
    }
  };

  const handleManualSave = () => {
    saveBudget(budgetAccounts, "Budget salvo e refletido na DRE Gerencial!");
  };

  const handleExpandAll = () => {
    setCollapsedIds(new Set());
  };

  const handleCollapseAll = () => {
    const parentIds = new Set<string>();
    budgetAccounts.forEach((item) => {
      if (item.level === 1 || item.level === 2) {
        parentIds.add(item.id);
      }
    });
    setCollapsedIds(parentIds);
  };

  const toggleCollapse = (id: string) => {
    setCollapsedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const hasSubaccounts = (account: DREAccountItem) => {
    return budgetAccounts.some(a => a.level > account.level && a.code.startsWith(account.code + "."));
  };

  const categories = useMemo(() => {
    const set = new Set<string>();
    budgetAccounts.forEach((a) => {
      if (a.category) set.add(a.category);
    });
    return Array.from(set).sort();
  }, [budgetAccounts]);

  const isItemVisible = (item: DREAccountItem): boolean => {
    if (searchTerm || selectedCategory !== "all") {
      return true;
    }
    if (item.level <= 1 || item.isMainResult) return true;

    for (const parent of budgetAccounts) {
      if (parent.id !== item.id && parent.level < item.level && item.code.startsWith(parent.code + ".")) {
        if (collapsedIds.has(parent.id)) {
          return false;
        }
      }
    }
    return true;
  };

  const filteredAccounts = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    return budgetAccounts.filter((item) => {
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      if (term) {
        return (
          item.name.toLowerCase().includes(term) ||
          item.code.toLowerCase().includes(term) ||
          (item.category && item.category.toLowerCase().includes(term))
        );
      }
      return isItemVisible(item);
    });
  }, [budgetAccounts, searchTerm, selectedCategory, collapsedIds]);

  const activeMonthsList = useMemo(() => {
    return MONTHS_FULL.filter(m => visibleMonths[m.id]);
  }, [visibleMonths]);


  const handleExportBudget = () => {
    let csv = "Nivel,Codigo,Descricao,Categoria";
    activeMonthsList.forEach(m => {
      csv += `,${m.short}_Orcado`;
    });
    csv += ",Total_Anual_Orcado\n";

    filteredAccounts.forEach(a => {
      const val = a.values[selectedChannel]?.planned || 0;
      csv += `${a.level},"${a.code}","${a.name}","${a.category}"`;
      activeMonthsList.forEach(() => {
        csv += `,${(val / 12).toFixed(2)}`;
      });
      csv += `,${val.toFixed(2)}\n`;
    });

    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csv);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `budget_anual_${selectedChannel}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex gap-4 items-start w-full relative">
      {/* Main Budget Area */}
      <div className="flex-1 min-w-0 space-y-4">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between gap-4 bg-card px-4 py-3 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-foreground tracking-tight">
              Planejamento Orçamentário (Budget Anual por Meses)
            </h1>
            <Badge variant="secondary" className="font-mono text-[10px]">
              {filteredAccounts.length} contas
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Channel Selector */}
            <div className="flex items-center border border-zinc-300 dark:border-zinc-700 bg-card p-0.5">
              <button
                onClick={() => setSelectedChannel("consolidado")}
                className={`px-2.5 py-1 text-xs font-bold transition-colors ${
                  selectedChannel === "consolidado" ? "bg-zinc-700 text-white" : "text-zinc-600 dark:text-zinc-400 hover:text-foreground"
                }`}
              >
                Consolidado
              </button>
              <button
                onClick={() => setSelectedChannel("tiendas")}
                className={`px-2.5 py-1 text-xs font-bold transition-colors ${
                  selectedChannel === "tiendas" ? "bg-zinc-700 text-white" : "text-zinc-600 dark:text-zinc-400 hover:text-foreground"
                }`}
              >
                Tiendas
              </button>
              <button
                onClick={() => setSelectedChannel("produto")}
                className={`px-2.5 py-1 text-xs font-bold transition-colors ${
                  selectedChannel === "produto" ? "bg-zinc-700 text-white" : "text-zinc-600 dark:text-zinc-400 hover:text-foreground"
                }`}
              >
                Produto
              </button>
              <button
                onClick={() => setSelectedChannel("franquias")}
                className={`px-2.5 py-1 text-xs font-bold transition-colors ${
                  selectedChannel === "franquias" ? "bg-zinc-700 text-white" : "text-zinc-600 dark:text-zinc-400 hover:text-foreground"
                }`}
              >
                Franquias
              </button>
            </div>

            <Button
              size="sm"
              onClick={handleManualSave}
              className="flex items-center gap-1.5 bg-zinc-700 hover:bg-zinc-800 text-white text-xs font-bold shadow-xs h-8"
            >
              <Save className="h-3.5 w-3.5" />
              <span>SALVAR BUDGET</span>
            </Button>

            {!isFilterPanelOpen && (
              <button
                onClick={() => setIsFilterPanelOpen(true)}
                className="flex items-center gap-2 px-3.5 py-1.5 border border-zinc-300 dark:border-zinc-700 bg-card hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 shadow-xs transition-all"
                title="Abrir painel lateral de filtros"
              >
                <SlidersHorizontal className="h-3.5 w-3.5 text-zinc-700 dark:text-zinc-300" />
                <span>Filtrar</span>
              </button>
            )}
          </div>
        </div>

        {/* Success Alert */}
        {savedSuccess && (
          <div className="flex items-center gap-2 p-3 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>{savedSuccess}</span>
          </div>
        )}

        {/* Budget Table with Side by Side Months */}
        <div className="border border-zinc-200 dark:border-zinc-800 bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-200/90 dark:bg-zinc-800/90 text-[11px] font-extrabold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                  <th className="w-[300px] min-w-[300px] max-w-[300px] py-2.5 px-3 border-r-2 border-zinc-400 dark:border-zinc-600 sticky left-0 z-30 bg-zinc-200 dark:bg-zinc-800 shadow-[2px_0_4px_-1px_rgba(0,0,0,0.1)]">
                    Conta / Descrição
                  </th>
                  {activeMonthsList.map((m) => (
                    <th key={m.id} className="py-2.5 px-2 text-right border-r border-zinc-300 dark:border-zinc-700 font-bold min-w-[90px]">
                      {m.short} (R$)
                    </th>
                  ))}
                  {visibleMonths.total && (
                    <th className="py-2.5 px-3 text-right bg-zinc-300 dark:bg-zinc-700 font-black min-w-[110px] text-zinc-950 dark:text-white">
                      TOTAL ANUAL (R$)
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/70 dark:divide-zinc-800/70">
                {filteredAccounts.length === 0 ? (
                  <tr>
                    <td colSpan={1 + activeMonthsList.length + (visibleMonths.total ? 1 : 0)} className="py-12 text-center text-muted-foreground">
                      Nenhuma conta encontrada para o filtro.
                    </td>
                  </tr>
                ) : (
                  filteredAccounts.map((item) => {
                    const isLevel1 = item.level === 1;
                    const isLevel2 = item.level === 2;
                    const isLevel3 = item.level === 3;
                    const isResult = item.level === 0 || item.isMainResult;
                    const hasSubs = hasSubaccounts(item);
                    const isCollapsed = collapsedIds.has(item.id);

                    const indentPx = isResult ? 0 : Math.max(0, (item.level - 1) * 16);
                    const val = item.values[selectedChannel]?.planned || 0;
                    const monthVal = val / 12;

                    let rowBg = "hover:bg-zinc-50/80 dark:hover:bg-zinc-900/60 transition-colors";
                    let stickyBg = "bg-card";
                    if (isResult) {
                      rowBg = "bg-zinc-100/95 dark:bg-zinc-900/95 font-bold border-y border-zinc-300 dark:border-zinc-700";
                      stickyBg = "bg-zinc-100/95 dark:bg-zinc-900/95 font-bold";
                    } else if (isLevel1) {
                      rowBg = "bg-zinc-100/60 dark:bg-zinc-900/60 font-extrabold text-foreground";
                      stickyBg = "bg-zinc-100 dark:bg-zinc-900 font-extrabold";
                    } else if (isLevel2) {
                      rowBg = "bg-zinc-50/30 dark:bg-zinc-950/30 font-semibold";
                      stickyBg = "bg-zinc-50 dark:bg-zinc-950 font-semibold";
                    }

                    return (
                      <tr key={item.id} className={rowBg}>
                        {/* Description (Sticky) */}
                        <td className={`w-[300px] min-w-[300px] max-w-[300px] py-2 px-3 border-r-2 border-zinc-400 dark:border-zinc-600 sticky left-0 z-10 ${stickyBg} shadow-[2px_0_4px_-1px_rgba(0,0,0,0.1)]`}>
                          <div
                            className="flex items-center gap-1.5"
                            style={{ paddingLeft: `${indentPx}px` }}
                          >
                            {hasSubs ? (
                              <button
                                onClick={() => toggleCollapse(item.id)}
                                className="p-0.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors shrink-0"
                                title={isCollapsed ? "Expandir" : "Recolher"}
                              >
                                {isCollapsed ? (
                                  <ChevronRight className="h-3.5 w-3.5" />
                                ) : (
                                  <ChevronDown className="h-3.5 w-3.5" />
                                )}
                              </button>
                            ) : !isResult && item.level > 1 ? (
                              <div className="flex items-center text-muted-foreground select-none shrink-0 w-3.5 justify-center">
                                <span className="font-mono text-xs font-bold text-zinc-400 dark:text-zinc-500">
                                  └
                                </span>
                              </div>
                            ) : null}

                            <span 
                              className={`${isResult ? "text-xs font-bold text-foreground" : isLevel1 ? "text-xs text-foreground font-extrabold" : isLevel2 ? "text-xs font-semibold text-foreground/95" : "text-[11px] text-foreground/85 font-normal"} ${hasSubs ? "cursor-pointer" : ""}`}
                              onClick={() => hasSubs && toggleCollapse(item.id)}
                            >
                              {item.name}
                            </span>
                          </div>
                        </td>

                        {/* 12 Months Columns */}
                        {activeMonthsList.map((m) => (
                          <td key={m.id} className="py-1 px-1.5 text-right border-r border-zinc-200 dark:border-zinc-800 font-mono text-[11px]">
                            {isResult ? (
                              <span className="font-bold">{formatCurrency(monthVal)}</span>
                            ) : (
                              <span>{monthVal !== 0 ? formatCurrency(monthVal) : "-"}</span>
                            )}
                          </td>
                        ))}

                        {/* Total Anual Input */}
                        {visibleMonths.total && (
                          <td className="py-1 px-2 text-right bg-zinc-100/50 dark:bg-zinc-900/50">
                            {isResult ? (
                              <span className="font-mono font-black text-xs">{formatCurrency(val)}</span>
                            ) : (
                              <input
                                type="number"
                                step="any"
                                value={val !== 0 ? val : ""}
                                placeholder="0,00"
                                onChange={(e) => handleBudgetChange(item.id, e.target.value)}
                                className="w-full text-right font-mono text-xs px-1.5 py-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:outline-hidden focus:ring-1 focus:ring-zinc-600 font-semibold"
                              />
                            )}
                          </td>
                        )}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right-Side Filter Panel */}
      <AnimatePresence>
        {isFilterPanelOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, width: 0 }}
            animate={{ opacity: 1, x: 0, width: 310 }}
            exit={{ opacity: 0, x: 20, width: 0 }}
            transition={{ duration: 0.2 }}
            className="w-[310px] shrink-0 border border-zinc-200 dark:border-zinc-800 bg-card p-4 space-y-4 sticky top-0 self-start shadow-sm"
          >
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-foreground tracking-tight">
                  Filtrar Budget
                </h3>
                <span className="text-xs text-muted-foreground font-mono">
                  {filteredAccounts.length} linhas
                </span>
              </div>
              <button
                onClick={() => setIsFilterPanelOpen(false)}
                className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 hover:text-foreground transition-colors"
                title="Fechar painel"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleManualSave}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-zinc-700 hover:bg-zinc-800 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>SALVAR E ATUALIZAR DRE</span>
              </button>

              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={handleExpandAll}
                  className="flex items-center justify-center gap-1.5 py-2 px-2 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-[11px] font-semibold text-zinc-800 dark:text-zinc-200 transition-colors"
                >
                  <ChevronsDown className="h-3.5 w-3.5" />
                  <span>EXPANDIR</span>
                </button>

                <button
                  onClick={handleCollapseAll}
                  className="flex items-center justify-center gap-1.5 py-2 px-2 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-[11px] font-semibold text-zinc-800 dark:text-zinc-200 transition-colors"
                >
                  <ChevronsUp className="h-3.5 w-3.5" />
                  <span>FECHAR</span>
                </button>
              </div>

              <button
                onClick={handleReset}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>REDEFINIR BUDGET</span>
              </button>

              <button
                onClick={handleExportBudget}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                <span>EXPORTAR BUDGET (CSV)</span>
              </button>
            </div>

            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3 space-y-3">
              {/* Month Filters */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Período
                </label>
                <PeriodFilterDropdown year="2026" months={MONTHS_FULL} value={visibleMonths} onChange={setVisibleMonths} />
              </div>

              {/* Search Filter */}
              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Buscar Conta no Budget
                </label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Código ou descrição..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 text-xs h-8 bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-300 dark:border-zinc-700"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Categoria / Macro Grupo
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full h-8 border border-zinc-300 dark:border-zinc-700 bg-card px-2 text-xs focus:ring-1 focus:ring-ring text-foreground"
                >
                  <option value="all">Todas as Categorias ({categories.length})</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="dark:bg-zinc-900">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
