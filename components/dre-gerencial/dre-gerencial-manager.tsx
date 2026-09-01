"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { DRE_ACCOUNTS_DATA, DREAccountItem, ChannelType } from "@/data/mock-dre-data";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  RotateCcw, 
  Download, 
  CheckCircle2, 
  X, 
  SlidersHorizontal,
  ChevronDown,
  ChevronRight,
  ChevronsDown,
  ChevronsUp,
  UploadCloud
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as XLSX from "xlsx";
import { ImportReviewModal, ImportChannel, ImportProjSummaryEntry } from "./import-review-modal";
import { PeriodFilterDropdown } from "@/components/ui/period-filter";

const STORAGE_KEY_DRE = "toda_moda_dre_gerencial_v7";
const STORAGE_KEY_BUDGET = "toda_moda_budget_data_v2";
const STORAGE_KEY_PROJ_MAP = "toda_moda_dre_proj_channel_map_v1";

function loadProjChannelMap(): Record<string, ImportChannel> {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_PROJ_MAP);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

function saveProjChannelMap(map: Record<string, ImportChannel>) {
  try {
    localStorage.setItem(STORAGE_KEY_PROJ_MAP, JSON.stringify(map));
  } catch (e) {
    console.error("Erro ao salvar mapeamento de projeto -> canal:", e);
  }
}

function suggestChannel(proj: string): ImportChannel {
  if (proj.includes("FRANQUIA") || proj.includes("FRANQUICIA")) return "franquias";
  if (proj.includes("PRODUCTO") || proj.includes("BSB") || proj.includes("MTZ") || proj.includes("BSG")) return "produto";
  return "tiendas";
}

export const MONTHS_FULL = [
  { id: "01", label: "Janeiro 2026", short: "JAN" },
  { id: "02", label: "Fevereiro 2026", short: "FEV" },
  { id: "03", label: "Março 2026", short: "MAR" },
  { id: "04", label: "Abril 2026", short: "ABR" },
  { id: "05", label: "Maio 2026", short: "MAI" },
  { id: "06", label: "Junho 2026", short: "JUN" },
  { id: "07", label: "Julho 2026", short: "JUL" },
  { id: "08", label: "Agosto 2026", short: "AGO" },
  { id: "09", label: "Setembro 2026", short: "SET" },
  { id: "10", label: "Outubro 2026", short: "OUT" },
  { id: "11", label: "Novembro 2026", short: "NOV" },
  { id: "12", label: "Dezembro 2026", short: "DEZ" },
];

export function DREGerencialManager() {
  const [dreAccounts, setDreAccounts] = useState<DREAccountItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [collapsedIds, setCollapsedIds] = useState<Set<string>>(new Set());
  const [savedSuccess, setSavedSuccess] = useState<string | null>(null);

  // Visible Months Filter
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

  // Visible Channels / Projects under each month
  const [visibleChannels, setVisibleChannels] = useState<{
    tiendas: boolean;
    produto: boolean;
    franquias: boolean;
    consolidado: boolean;
  }>({
    tiendas: true,
    produto: true,
    franquias: true,
    consolidado: true,
  });

  // Metrics Columns Filter
  const [showPlanned, setShowPlanned] = useState<boolean>(true);
  const [showRealized, setShowRealized] = useState<boolean>(true);
  const [showVariance, setShowVariance] = useState<boolean>(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [pendingImport, setPendingImport] = useState<{
    fileName: string;
    data: any[][];
    summary: ImportProjSummaryEntry[];
  } | null>(null);

  // Load DRE and synchronize Planned strictly from Budget and Realized strictly from Imports
  useEffect(() => {
    try {
      // 1. Get budget map
      let budgetMap: Record<string, { tiendas: number; produto: number; franquias: number; consolidado: number }> = {};
      const savedBudget = localStorage.getItem(STORAGE_KEY_BUDGET);
      if (savedBudget) {
        const parsedBudget = JSON.parse(savedBudget);
        if (Array.isArray(parsedBudget)) {
          parsedBudget.forEach((b: DREAccountItem) => {
            budgetMap[b.id] = {
              tiendas: b.values?.tiendas?.planned || 0,
              produto: b.values?.produto?.planned || 0,
              franquias: b.values?.franquias?.planned || 0,
              consolidado: b.values?.consolidado?.planned || 0,
            };
          });
        }
      }

      // Check if user has imported Excel
      const hasImported = localStorage.getItem("toda_moda_dre_has_imported_v1") === "true";
      const savedDRE = localStorage.getItem(STORAGE_KEY_DRE);
      let baseData: DREAccountItem[] = DRE_ACCOUNTS_DATA;
      if (hasImported && savedDRE) {
        const parsedDRE = JSON.parse(savedDRE);
        if (Array.isArray(parsedDRE) && parsedDRE.length > 0) {
          baseData = parsedDRE;
        }
      }

      // Realized is strictly 0 unless imported!
      // Planned is strictly 0 unless filled in Budget!
      const sanitized = baseData.map((item) => {
        const bg = budgetMap[item.id] || { tiendas: 0, produto: 0, franquias: 0, consolidado: 0 };
        const realTiendas = hasImported ? (item.values?.tiendas?.realized || 0) : 0;
        const realProduto = hasImported ? (item.values?.produto?.realized || 0) : 0;
        const realFranquias = hasImported ? (item.values?.franquias?.realized || 0) : 0;
        const realConsolidado = realTiendas + realProduto + realFranquias;

        return {
          ...item,
          values: {
            tiendas: {
              planned: bg.tiendas,
              realized: realTiendas,
            },
            produto: {
              planned: bg.produto,
              realized: realProduto,
            },
            franquias: {
              planned: bg.franquias,
              realized: realFranquias,
            },
            consolidado: {
              planned: bg.consolidado,
              realized: realConsolidado,
            },
          },
        };
      });

      setDreAccounts(sanitized);
    } catch (e) {
      console.warn("Usando DRE inicial limpa.");
    }
  }, []);

  const saveDRE = (data: DREAccountItem[], message = "DRE Gerencial atualizada com sucesso!") => {
    setDreAccounts(data);
    try {
      localStorage.setItem(STORAGE_KEY_DRE, JSON.stringify(data));
      setSavedSuccess(message);
      setTimeout(() => setSavedSuccess(null), 4000);
    } catch (e) {
      console.error("Erro ao salvar DRE:", e);
    }
  };

  const handleReset = () => {
    if (confirm("Deseja restaurar e zerar todos os lançamentos da DRE?")) {
      localStorage.removeItem("toda_moda_dre_has_imported_v1");
      const clean = DRE_ACCOUNTS_DATA.map((item) => ({
        ...item,
        values: {
          tiendas: { planned: 0, realized: 0 },
          produto: { planned: 0, realized: 0 },
          franquias: { planned: 0, realized: 0 },
          consolidado: { planned: 0, realized: 0 },
        },
      }));
      saveDRE(clean, "DRE zerada com sucesso!");
      setCollapsedIds(new Set());
    }
  };

  const handleExpandAll = () => {
    setCollapsedIds(new Set());
  };

  const handleCollapseAll = () => {
    const parentIds = new Set<string>();
    dreAccounts.forEach((item) => {
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
    return dreAccounts.some(a => a.level > account.level && a.code.startsWith(account.code + "."));
  };

  const categories = useMemo(() => {
    const set = new Set<string>();
    dreAccounts.forEach((a) => {
      if (a.category) set.add(a.category);
    });
    return Array.from(set).sort();
  }, [dreAccounts]);

  const isItemVisible = (item: DREAccountItem): boolean => {
    if (searchTerm || selectedCategory !== "all") {
      return true;
    }
    if (item.level <= 1 || item.isMainResult) return true;

    for (const parent of dreAccounts) {
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

    return dreAccounts.filter((item) => {
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
  }, [dreAccounts, searchTerm, selectedCategory, collapsedIds]);

  const kpis = useMemo(() => {
    const revenueAccount = dreAccounts.find(a => a.code === "40.1") || dreAccounts.find(a => a.code === "42.1");
    const netRevenueAccount = dreAccounts.find(a => a.code === "42.1");
    const ebitdaAccount = dreAccounts.find(a => a.code === "49.1");
    const netResultAccount = dreAccounts.find(a => a.code === "54.1");

    const plannedRevenue = revenueAccount ? (revenueAccount.values.consolidado?.planned || 0) : 0;
    const realizedRevenue = revenueAccount ? (revenueAccount.values.consolidado?.realized || 0) : 0;

    const plannedNet = netRevenueAccount ? (netRevenueAccount.values.consolidado?.planned || 0) : 0;
    const realizedNet = netRevenueAccount ? (netRevenueAccount.values.consolidado?.realized || 0) : 0;

    const realizedEbitda = ebitdaAccount ? (ebitdaAccount.values.consolidado?.realized || 0) : 0;
    const realizedNetResult = netResultAccount ? (netResultAccount.values.consolidado?.realized || 0) : 0;

    const marginNet = realizedRevenue > 0 ? (realizedNet / realizedRevenue) * 100 : 0;
    const marginEbitda = realizedNet > 0 ? (realizedEbitda / realizedNet) * 100 : 0;

    return {
      plannedRevenue,
      realizedRevenue,
      revDiff: realizedRevenue - plannedRevenue,
      plannedNet,
      realizedNet,
      marginNet,
      realizedEbitda,
      marginEbitda,
      realizedNetResult
    };
  }, [dreAccounts]);

  const activeMonthsList = useMemo(() => {
    return MONTHS_FULL.filter(m => visibleMonths[m.id]);
  }, [visibleMonths]);

  // Project metrics count
  const projectMetricsCount = useMemo(() => {
    let count = 0;
    if (showPlanned) count += 1;
    if (showRealized) count += 1;
    return Math.max(1, count);
  }, [showPlanned, showRealized]);

  // Consolidado metrics count
  const consolidadoMetricsCount = useMemo(() => {
    let count = 0;
    if (showPlanned) count += 1;
    if (showRealized) count += 1;
    if (showVariance) count += 1;
    return Math.max(1, count);
  }, [showPlanned, showRealized, showVariance]);

  // Number of column cells per Month super-header (individual months only have Tiendas, Produto, Franquias)
  const monthChannelsColSpan = useMemo(() => {
    let span = 0;
    if (visibleChannels.tiendas) span += projectMetricsCount;
    if (visibleChannels.produto) span += projectMetricsCount;
    if (visibleChannels.franquias) span += projectMetricsCount;
    return Math.max(1, span);
  }, [visibleChannels, projectMetricsCount]);

  // Total Anual has Tiendas, Produto, Franquias + CONSOLIDADO FINAL
  const totalAnualChannelsColSpan = useMemo(() => {
    let span = 0;
    if (visibleChannels.tiendas) span += projectMetricsCount;
    if (visibleChannels.produto) span += projectMetricsCount;
    if (visibleChannels.franquias) span += projectMetricsCount;
    if (visibleChannels.consolidado) span += consolidadoMetricsCount;
    return Math.max(1, span);
  }, [visibleChannels, projectMetricsCount, consolidadoMetricsCount]);

  const toggleAllMonths = (enable: boolean) => {
    const updated: Record<string, boolean> = { total: true };
    MONTHS_FULL.forEach(m => {
      updated[m.id] = enable;
    });
    setVisibleMonths(updated);
  };

  // Aplica o mapeamento projeto -> canal já confirmado (persistido ou recém-revisado) sobre os
  // dados já lidos do arquivo, faz o rollup por código de conta (igual ao fluxo anterior) e salva.
  const finalizeImport = (
    data: any[][],
    mapping: Record<string, ImportChannel>,
    fileName: string,
    summary: ImportProjSummaryEntry[]
  ) => {
    const channelTotalsByCode: Record<string, { tiendas: number; produto: number; franquias: number }> = {};
    let updatedCount = 0;

    for (let i = 2; i < data.length; i++) {
      const row = data[i];
      const cat = String(row[6] || "").trim();
      const amount = Math.abs(Number(row[4])) || 0;
      if (!cat || amount === 0) continue;

      const match = cat.match(/^([0-9.]+)/);
      const code = match ? match[1] : "";
      if (!code) continue;

      const rawProj = String(row[7] || row[8] || "").trim();
      const proj = rawProj.toUpperCase() || "(SEM PROJETO)";
      const channel = mapping[proj] || suggestChannel(proj);

      if (!channelTotalsByCode[code]) {
        channelTotalsByCode[code] = { tiendas: 0, produto: 0, franquias: 0 };
      }
      channelTotalsByCode[code][channel] += amount;
      updatedCount++;
    }

    const updatedAccounts = dreAccounts.map(account => {
      let addTiendas = 0;
      let addProduto = 0;
      let addFranquias = 0;

      Object.entries(channelTotalsByCode).forEach(([code, vals]) => {
        if (code === account.code || code.startsWith(account.code + ".")) {
          addTiendas += vals.tiendas;
          addProduto += vals.produto;
          addFranquias += vals.franquias;
        }
      });

      if (addTiendas > 0 || addProduto > 0 || addFranquias > 0) {
        const currentTiendas = account.values.tiendas || { planned: 0, realized: 0 };
        const currentProduto = account.values.produto || { planned: 0, realized: 0 };
        const currentFranquias = account.values.franquias || { planned: 0, realized: 0 };
        const currentConsolidado = account.values.consolidado || { planned: 0, realized: 0 };

        const newTiendas = { planned: currentTiendas.planned, realized: addTiendas };
        const newProduto = { planned: currentProduto.planned, realized: addProduto };
        const newFranquias = { planned: currentFranquias.planned, realized: addFranquias };
        const newConsolidado = {
          planned: currentConsolidado.planned,
          realized: newTiendas.realized + newProduto.realized + newFranquias.realized,
        };

        return {
          ...account,
          values: { tiendas: newTiendas, produto: newProduto, franquias: newFranquias, consolidado: newConsolidado },
        };
      }
      return account;
    });

    // Guarda o mapeamento confirmado para as próximas importações não perguntarem de novo pelos mesmos projetos.
    saveProjChannelMap({ ...loadProjChannelMap(), ...mapping });

    const totals = summary.reduce(
      (acc, s) => {
        const ch = mapping[s.proj] || s.channel;
        acc[ch] += s.amount;
        return acc;
      },
      { tiendas: 0, produto: 0, franquias: 0 } as Record<ImportChannel, number>
    );

    localStorage.setItem("toda_moda_dre_has_imported_v1", "true");
    saveDRE(
      updatedAccounts,
      `Arquivo "${fileName}" importado: ${updatedCount} lançamentos (Tiendas ${formatCurrency(totals.tiendas)}, Produto ${formatCurrency(totals.produto)}, Franquias ${formatCurrency(totals.franquias)}).`
    );
    setPendingImport(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });

        if (data.length < 3) {
          alert("Arquivo Excel não possui registros suficientes.");
          return;
        }

        // 1ª passada: só agrupa por "Projeto" para montar o resumo/revisão (o rollup por conta
        // acontece depois, em finalizeImport, já com o mapeamento confirmado).
        const projGroups: Record<string, { rawLabel: string; count: number; amount: number }> = {};
        for (let i = 2; i < data.length; i++) {
          const row = data[i];
          const cat = String(row[6] || "").trim();
          const amount = Math.abs(Number(row[4])) || 0;
          if (!cat || amount === 0) continue;

          const rawProj = String(row[7] || row[8] || "").trim();
          const proj = rawProj.toUpperCase() || "(SEM PROJETO)";
          if (!projGroups[proj]) {
            projGroups[proj] = { rawLabel: rawProj || "(sem projeto)", count: 0, amount: 0 };
          }
          projGroups[proj].count += 1;
          projGroups[proj].amount += amount;
        }

        const persistedMap = loadProjChannelMap();
        const distinctProjs = Object.keys(projGroups);

        const summary: ImportProjSummaryEntry[] = distinctProjs
          .map((proj) => ({
            proj,
            rawLabel: projGroups[proj].rawLabel,
            count: projGroups[proj].count,
            amount: projGroups[proj].amount,
            channel: persistedMap[proj] || suggestChannel(proj),
            isNew: !persistedMap[proj],
          }))
          .sort((a, b) => b.amount - a.amount);

        const hasNew = summary.some((s) => s.isNew);

        if (!hasNew) {
          // Todos os projetos do arquivo já têm canal salvo de uma importação anterior: importa direto.
          const mapping = Object.fromEntries(summary.map((s) => [s.proj, s.channel])) as Record<string, ImportChannel>;
          finalizeImport(data, mapping, file.name, summary);
        } else {
          setPendingImport({ fileName: file.name, data, summary });
        }
      } catch (err) {
        console.error("Erro ao importar arquivo Excel:", err);
        alert("Ocorreu um erro ao processar o arquivo Excel.");
      } finally {
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleExportDRE = () => {
    let csv = "Nivel,Codigo,Descricao,Categoria";
    activeMonthsList.forEach(m => {
      csv += `,${m.short}_Tiendas_Real,${m.short}_Produto_Real,${m.short}_Franquias_Real,${m.short}_Consolidado_Real`;
    });
    csv += ",Total_Consolidado_Real\n";

    filteredAccounts.forEach(a => {
      const c = a.values.consolidado || { planned: 0, realized: 0 };
      const t = a.values.tiendas || { planned: 0, realized: 0 };
      const p = a.values.produto || { planned: 0, realized: 0 };
      const f = a.values.franquias || { planned: 0, realized: 0 };

      csv += `${a.level},"${a.code}","${a.name}","${a.category}"`;
      activeMonthsList.forEach(() => {
        csv += `,${(t.realized / 12).toFixed(2)},${(p.realized / 12).toFixed(2)},${(f.realized / 12).toFixed(2)},${(c.realized / 12).toFixed(2)}`;
      });
      csv += `,${c.realized.toFixed(2)}\n`;
    });

    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csv);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `dre_gerencial_multicanais_meses_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex gap-4 items-start w-full relative">
      {/* Main DRE Area */}
      <div className="flex-1 min-w-0 space-y-4">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between gap-4 bg-card px-4 py-3 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-foreground tracking-tight">
              Demonstração do Resultado (DRE Anual — Meses & Projetos)
            </h1>
            <Badge variant="secondary" className="font-mono text-[10px]">
              {filteredAccounts.length} contas
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            {!isFilterPanelOpen && (
              <button
                onClick={() => setIsFilterPanelOpen(true)}
                className="flex items-center gap-2 px-3.5 py-1.5 border border-zinc-300 dark:border-zinc-700 bg-card hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 shadow-xs transition-all"
                title="Abrir painel lateral de filtros e importação"
              >
                <SlidersHorizontal className="h-3.5 w-3.5 text-zinc-700 dark:text-zinc-300" />
                <span>Filtrar</span>
              </button>
            )}
          </div>
        </div>

        {/* Top Financial KPI Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-card p-3.5 border border-zinc-200 dark:border-zinc-800 space-y-1">
            <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
              Vendas Brutas (Realizado)
            </div>
            <div className="text-base font-extrabold text-foreground tracking-tight">
              {formatCurrency(kpis.realizedRevenue)}
            </div>
            <div className="flex items-center gap-1 text-[11px] font-mono">
              <span className="text-zinc-500">Orçado:</span>
              <span>{formatCurrency(kpis.plannedRevenue)}</span>
            </div>
          </div>

          <div className="bg-card p-3.5 border border-zinc-200 dark:border-zinc-800 space-y-1">
            <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
              Receita Líquida
            </div>
            <div className="text-base font-extrabold text-foreground tracking-tight">
              {formatCurrency(kpis.realizedNet)}
            </div>
            <div className="text-[11px] text-zinc-600 dark:text-zinc-400">
              Margem Líquida: <strong className="font-mono">{kpis.marginNet.toFixed(1)}%</strong>
            </div>
          </div>

          <div className="bg-card p-3.5 border border-zinc-200 dark:border-zinc-800 space-y-1">
            <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
              EBITDA Operacional
            </div>
            <div className="text-base font-extrabold text-foreground tracking-tight">
              {formatCurrency(kpis.realizedEbitda)}
            </div>
            <div className="text-[11px] text-zinc-600 dark:text-zinc-400">
              Margem EBITDA: <strong className="font-mono">{kpis.marginEbitda.toFixed(1)}%</strong>
            </div>
          </div>

          <div className="bg-card p-3.5 border border-zinc-200 dark:border-zinc-800 space-y-1">
            <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
              Resultado Líquido (Exercício)
            </div>
            <div className="text-base font-extrabold text-foreground tracking-tight">
              {formatCurrency(kpis.realizedNetResult)}
            </div>
            <div className="text-[11px] text-zinc-500">
              Meses: <span className="font-semibold text-foreground">{activeMonthsList.length} ativos</span>
            </div>
          </div>
        </div>

        {/* Success Alert */}
        {savedSuccess && (
          <div className="flex items-center gap-2 p-3 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>{savedSuccess}</span>
          </div>
        )}

        {/* Complete 3-Tier Multi-Month & Multi-Project Table */}
        <div className="border border-zinc-200 dark:border-zinc-800 bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                {/* Level 1: Super Header - MONTHS / DATES */}
                <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-200/90 dark:bg-zinc-800/90 text-[11px] font-extrabold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                  <th className="w-[300px] min-w-[300px] max-w-[300px] py-2.5 px-3 border-r-2 border-zinc-400 dark:border-zinc-600 sticky left-0 z-30 bg-zinc-200 dark:bg-zinc-800 shadow-[2px_0_4px_-1px_rgba(0,0,0,0.1)]">
                    Plano de Contas DRE
                  </th>

                  {activeMonthsList.map((m) => (
                    <th
                      key={m.id}
                      colSpan={monthChannelsColSpan}
                      className="py-2.5 px-3 text-center border-r-2 border-zinc-400 dark:border-zinc-600 font-black tracking-widest text-zinc-900 dark:text-zinc-100 bg-zinc-300/70 dark:bg-zinc-700/70"
                    >
                      {m.label.toUpperCase()}
                    </th>
                  ))}

                  {visibleMonths.total && (
                    <th
                      colSpan={totalAnualChannelsColSpan}
                      className="py-2.5 px-3 text-center bg-zinc-400/80 dark:bg-zinc-600/80 font-black tracking-widest text-zinc-950 dark:text-white"
                    >
                      TOTAL EXERCÍCIO ANUAL 2026
                    </th>
                  )}
                </tr>

                {/* Level 2: Sub Header - PROJECTS / CHANNELS UNDER EACH MONTH */}
                <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="w-[300px] min-w-[300px] max-w-[300px] py-2 px-3 border-r-2 border-zinc-400 dark:border-zinc-600 sticky left-0 z-30 bg-zinc-100 dark:bg-zinc-900 shadow-[2px_0_4px_-1px_rgba(0,0,0,0.1)]">
                    Estrutura Contábil
                  </th>

                  {/* Render Projects for each active Month (Consolidado is only at the end) */}
                  {activeMonthsList.map((m) => (
                    <React.Fragment key={m.id}>
                      {visibleChannels.tiendas && (
                        <th colSpan={projectMetricsCount} className="py-2 px-2 text-center border-r border-zinc-200 dark:border-zinc-800 bg-zinc-200/40 dark:bg-zinc-800/40 text-foreground font-bold">
                          Tiendas Propias
                        </th>
                      )}
                      {visibleChannels.produto && (
                        <th colSpan={projectMetricsCount} className="py-2 px-2 text-center border-r border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/60 text-foreground font-bold">
                          Venta Producto
                        </th>
                      )}
                      {visibleChannels.franquias && (
                        <th colSpan={projectMetricsCount} className="py-2 px-2 text-center border-r-2 border-zinc-400 dark:border-zinc-600 bg-zinc-200/40 dark:bg-zinc-800/40 text-foreground font-bold">
                          Franquicias
                        </th>
                      )}
                    </React.Fragment>
                  ))}

                  {/* Channels for Total Anual (Including CONSOLIDADO FINAL) */}
                  {visibleMonths.total && (
                    <React.Fragment key="total-channels">
                      {visibleChannels.tiendas && (
                        <th colSpan={projectMetricsCount} className="py-2 px-2 text-center border-r border-zinc-200 dark:border-zinc-800 bg-zinc-300/40 dark:bg-zinc-700/40 text-foreground font-bold">
                          Tiendas Propias
                        </th>
                      )}
                      {visibleChannels.produto && (
                        <th colSpan={projectMetricsCount} className="py-2 px-2 text-center border-r border-zinc-200 dark:border-zinc-800 bg-zinc-200/60 dark:bg-zinc-800/60 text-foreground font-bold">
                          Venta Producto
                        </th>
                      )}
                      {visibleChannels.franquias && (
                        <th colSpan={projectMetricsCount} className="py-2 px-2 text-center border-r border-zinc-200 dark:border-zinc-800 bg-zinc-300/40 dark:bg-zinc-700/40 text-foreground font-bold">
                          Franquicias
                        </th>
                      )}
                      {visibleChannels.consolidado && (
                        <th colSpan={consolidadoMetricsCount} className="py-2 px-2 text-center bg-zinc-400/50 dark:bg-zinc-600/50 text-foreground font-black">
                          CONSOLIDADO FINAL
                        </th>
                      )}
                    </React.Fragment>
                  )}
                </tr>

                {/* Level 3: Metric Subheaders (Orçado | Realizado | Desvio) */}
                <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-900/70 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="w-[300px] min-w-[300px] max-w-[300px] py-2 px-3 border-r-2 border-zinc-400 dark:border-zinc-600 sticky left-0 z-30 bg-zinc-100 dark:bg-zinc-900 shadow-[2px_0_4px_-1px_rgba(0,0,0,0.1)]">Conta / Descrição</th>

                  {/* Metrics under each Month */}
                  {activeMonthsList.map((m) => (
                    <React.Fragment key={m.id}>
                      {visibleChannels.tiendas && (
                        <>
                          {showPlanned && <th className="py-1.5 px-2 text-center w-[76px] min-w-[76px]">Orç.</th>}
                          {showRealized && <th className="py-1.5 px-2 text-center w-[76px] min-w-[76px] border-r border-zinc-200 dark:border-zinc-800 font-bold text-foreground">Real.</th>}
                        </>
                      )}
                      {visibleChannels.produto && (
                        <>
                          {showPlanned && <th className="py-1.5 px-2 text-center w-[76px] min-w-[76px]">Orç.</th>}
                          {showRealized && <th className="py-1.5 px-2 text-center w-[76px] min-w-[76px] border-r border-zinc-200 dark:border-zinc-800 font-bold text-foreground">Real.</th>}
                        </>
                      )}
                      {visibleChannels.franquias && (
                        <>
                          {showPlanned && <th className="py-1.5 px-2 text-center w-[76px] min-w-[76px]">Orç.</th>}
                          {showRealized && <th className="py-1.5 px-2 text-center w-[76px] min-w-[76px] border-r-2 border-zinc-400 dark:border-zinc-600 font-bold text-foreground">Real.</th>}
                        </>
                      )}
                    </React.Fragment>
                  ))}

                  {/* Metrics for Total Anual */}
                  {visibleMonths.total && (
                    <React.Fragment key="total-metrics">
                      {visibleChannels.tiendas && (
                        <>
                          {showPlanned && <th className="py-1.5 px-2 text-center w-[80px] min-w-[80px] bg-zinc-200/40 dark:bg-zinc-800/40">Orç.</th>}
                          {showRealized && <th className="py-1.5 px-2 text-center w-[80px] min-w-[80px] border-r border-zinc-200 dark:border-zinc-800 bg-zinc-200/40 dark:bg-zinc-800/40 font-bold text-foreground">Real.</th>}
                        </>
                      )}
                      {visibleChannels.produto && (
                        <>
                          {showPlanned && <th className="py-1.5 px-2 text-center w-[80px] min-w-[80px] bg-zinc-200/40 dark:bg-zinc-800/40">Orç.</th>}
                          {showRealized && <th className="py-1.5 px-2 text-center w-[80px] min-w-[80px] border-r border-zinc-200 dark:border-zinc-800 bg-zinc-200/40 dark:bg-zinc-800/40 font-bold text-foreground">Real.</th>}
                        </>
                      )}
                      {visibleChannels.franquias && (
                        <>
                          {showPlanned && <th className="py-1.5 px-2 text-center w-[80px] min-w-[80px] bg-zinc-200/40 dark:bg-zinc-800/40">Orç.</th>}
                          {showRealized && <th className="py-1.5 px-2 text-center w-[80px] min-w-[80px] border-r border-zinc-200 dark:border-zinc-800 bg-zinc-200/40 dark:bg-zinc-800/40 font-bold text-foreground">Real.</th>}
                        </>
                      )}
                      {visibleChannels.consolidado && (
                        <>
                          {showPlanned && <th className="py-1.5 px-2 text-center w-[86px] min-w-[86px] bg-zinc-300/50 dark:bg-zinc-700/50 font-bold">Orçado</th>}
                          {showRealized && <th className="py-1.5 px-2 text-center w-[86px] min-w-[86px] bg-zinc-300/50 dark:bg-zinc-700/50 font-black text-foreground">Realizado</th>}
                          {showVariance && <th className="py-1.5 px-2 text-center w-[80px] min-w-[80px] bg-zinc-300/50 dark:bg-zinc-700/50 font-bold">Desvio</th>}
                        </>
                      )}
                    </React.Fragment>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/70 dark:divide-zinc-800/70">
                {filteredAccounts.length === 0 ? (
                  <tr>
                    <td colSpan={50} className="py-12 text-center text-muted-foreground">
                      Nenhuma conta da DRE encontrada para os filtros selecionados.
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

                    const t = item.values.tiendas || { planned: 0, realized: 0 };
                    const p = item.values.produto || { planned: 0, realized: 0 };
                    const f = item.values.franquias || { planned: 0, realized: 0 };
                    const c = item.values.consolidado || { planned: 0, realized: 0 };

                    // Monthly proportional distribution
                    const t_m_plan = t.planned / 12;
                    const t_m_real = t.realized / 12;

                    const p_m_plan = p.planned / 12;
                    const p_m_real = p.realized / 12;

                    const f_m_plan = f.planned / 12;
                    const f_m_real = f.realized / 12;

                    const c_m_plan = c.planned / 12;
                    const c_m_real = c.realized / 12;
                    const c_m_diff = c_m_real - c_m_plan;

                    const c_total_diff = c.realized - c.planned;

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

                        {/* Month Cells across Channels */}
                        {activeMonthsList.map((m) => (
                          <React.Fragment key={m.id}>
                            {/* Tiendas */}
                            {visibleChannels.tiendas && (
                              <>
                                {showPlanned && (
                                  <td className="w-[76px] min-w-[76px] max-w-[76px] py-2 px-1 text-right font-mono text-[10px] whitespace-nowrap">
                                    {t_m_plan !== 0 ? formatCurrency(t_m_plan) : <span className="text-zinc-400">-</span>}
                                  </td>
                                )}
                                {showRealized && (
                                  <td className="w-[76px] min-w-[76px] max-w-[76px] py-2 px-1 text-right font-mono font-semibold text-[10px] border-r border-zinc-200 dark:border-zinc-800 whitespace-nowrap">
                                    {t_m_real !== 0 ? formatCurrency(t_m_real) : <span className="text-zinc-400">-</span>}
                                  </td>
                                )}
                              </>
                            )}

                            {/* Produto */}
                            {visibleChannels.produto && (
                              <>
                                {showPlanned && (
                                  <td className="w-[76px] min-w-[76px] max-w-[76px] py-2 px-1 text-right font-mono text-[10px] whitespace-nowrap">
                                    {p_m_plan !== 0 ? formatCurrency(p_m_plan) : <span className="text-zinc-400">-</span>}
                                  </td>
                                )}
                                {showRealized && (
                                  <td className="w-[76px] min-w-[76px] max-w-[76px] py-2 px-1 text-right font-mono font-semibold text-[10px] border-r border-zinc-200 dark:border-zinc-800 whitespace-nowrap">
                                    {p_m_real !== 0 ? formatCurrency(p_m_real) : <span className="text-zinc-400">-</span>}
                                  </td>
                                )}
                              </>
                            )}

                            {/* Franquias */}
                            {visibleChannels.franquias && (
                              <>
                                {showPlanned && (
                                  <td className="w-[76px] min-w-[76px] max-w-[76px] py-2 px-1 text-right font-mono text-[10px] whitespace-nowrap">
                                    {f_m_plan !== 0 ? formatCurrency(f_m_plan) : <span className="text-zinc-400">-</span>}
                                  </td>
                                )}
                                {showRealized && (
                                  <td className="w-[76px] min-w-[76px] max-w-[76px] py-2 px-1 text-right font-mono font-semibold text-[10px] border-r-2 border-zinc-400 dark:border-zinc-600 whitespace-nowrap">
                                    {f_m_real !== 0 ? formatCurrency(f_m_real) : <span className="text-zinc-400">-</span>}
                                  </td>
                                )}
                              </>
                            )}
                          </React.Fragment>
                        ))}

                        {/* Total Anual Cells */}
                        {visibleMonths.total && (
                          <React.Fragment key="total-row-cells">
                            {visibleChannels.tiendas && (
                              <>
                                {showPlanned && <td className="w-[80px] min-w-[80px] max-w-[80px] py-2 px-1 text-right font-mono text-[10px] bg-zinc-200/30 dark:bg-zinc-800/30 whitespace-nowrap">{t.planned !== 0 ? formatCurrency(t.planned) : "-"}</td>}
                                {showRealized && <td className="w-[80px] min-w-[80px] max-w-[80px] py-2 px-1 text-right font-mono font-bold text-[10px] bg-zinc-200/30 dark:bg-zinc-800/30 border-r border-zinc-200 dark:border-zinc-800 whitespace-nowrap">{t.realized !== 0 ? formatCurrency(t.realized) : "-"}</td>}
                              </>
                            )}

                            {visibleChannels.produto && (
                              <>
                                {showPlanned && <td className="w-[80px] min-w-[80px] max-w-[80px] py-2 px-1 text-right font-mono text-[10px] bg-zinc-200/30 dark:bg-zinc-800/30 whitespace-nowrap">{p.planned !== 0 ? formatCurrency(p.planned) : "-"}</td>}
                                {showRealized && <td className="w-[80px] min-w-[80px] max-w-[80px] py-2 px-1 text-right font-mono font-bold text-[10px] bg-zinc-200/30 dark:bg-zinc-800/30 border-r border-zinc-200 dark:border-zinc-800 whitespace-nowrap">{p.realized !== 0 ? formatCurrency(p.realized) : "-"}</td>}
                              </>
                            )}

                            {visibleChannels.franquias && (
                              <>
                                {showPlanned && <td className="w-[80px] min-w-[80px] max-w-[80px] py-2 px-1 text-right font-mono text-[10px] bg-zinc-200/30 dark:bg-zinc-800/30 whitespace-nowrap">{f.planned !== 0 ? formatCurrency(f.planned) : "-"}</td>}
                                {showRealized && <td className="w-[80px] min-w-[80px] max-w-[80px] py-2 px-1 text-right font-mono font-bold text-[10px] bg-zinc-200/30 dark:bg-zinc-800/30 border-r border-zinc-200 dark:border-zinc-800 whitespace-nowrap">{f.realized !== 0 ? formatCurrency(f.realized) : "-"}</td>}
                              </>
                            )}

                            {visibleChannels.consolidado && (
                              <>
                                {showPlanned && <td className="w-[86px] min-w-[86px] max-w-[86px] py-2 px-1 text-right font-mono text-[11px] bg-zinc-300/40 dark:bg-zinc-700/40 font-bold whitespace-nowrap">{c.planned !== 0 ? formatCurrency(c.planned) : "-"}</td>}
                                {showRealized && <td className="w-[86px] min-w-[86px] max-w-[86px] py-2 px-1 text-right font-mono text-[11px] bg-zinc-300/40 dark:bg-zinc-700/40 font-black text-foreground whitespace-nowrap">{c.realized !== 0 ? formatCurrency(c.realized) : "-"}</td>}
                                {showVariance && (
                                  <td className="w-[80px] min-w-[80px] max-w-[80px] py-2 px-1 text-right font-mono text-[11px] bg-zinc-300/40 dark:bg-zinc-700/40 font-bold whitespace-nowrap">
                                    {c_total_diff !== 0 ? (
                                      <span className={c_total_diff > 0 ? "text-emerald-600 dark:text-emerald-400 font-black" : "text-rose-600 dark:text-rose-400 font-black"}>
                                        {c_total_diff > 0 ? `+${formatCurrency(c_total_diff)}` : formatCurrency(c_total_diff)}
                                      </span>
                                    ) : (
                                      <span className="text-zinc-400">-</span>
                                    )}
                                  </td>
                                )}
                              </>
                            )}
                          </React.Fragment>
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

      {/* Hidden File Input for Excel Import */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".xlsx,.xls,.csv"
        className="hidden"
      />

      {/* Right-Side Filter & Action Panel (Drawer) */}
      <AnimatePresence>
        {isFilterPanelOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, width: 0 }}
            animate={{ opacity: 1, x: 0, width: 320 }}
            exit={{ opacity: 0, x: 20, width: 0 }}
            transition={{ duration: 0.2 }}
            className="w-[320px] shrink-0 border border-zinc-200 dark:border-zinc-800 bg-card p-4 space-y-4 sticky top-0 self-start shadow-sm"
          >
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-foreground tracking-tight">
                  Filtrar DRE
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
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-zinc-700 hover:bg-zinc-800 text-white text-xs font-bold shadow-xs transition-colors"
                title="Importar planilha Contas Pagas (.xlsx)"
              >
                <UploadCloud className="h-4 w-4" />
                <span>IMPORTAR EXCEL (.XLSX)</span>
              </button>

              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={handleExpandAll}
                  className="flex items-center justify-center gap-1.5 py-2 px-2 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-[11px] font-semibold text-zinc-800 dark:text-zinc-200 transition-colors"
                  title="Expandir todas as contas da DRE"
                >
                  <ChevronsDown className="h-3.5 w-3.5" />
                  <span>EXPANDIR</span>
                </button>

                <button
                  onClick={handleCollapseAll}
                  className="flex items-center justify-center gap-1.5 py-2 px-2 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-[11px] font-semibold text-zinc-800 dark:text-zinc-200 transition-colors"
                  title="Recolher subcontas"
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
                <span>RESTAURAR PADRÃO</span>
              </button>

              <button
                onClick={handleExportDRE}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                <span>EXPORTAR DRE (CSV)</span>
              </button>
            </div>

            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3 space-y-3">
              {/* Filter: Visible Channels / Projects */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Projetos / Canais Visíveis
                </label>
                <div className="space-y-1 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={visibleChannels.tiendas}
                      onChange={(e) => setVisibleChannels({ ...visibleChannels, tiendas: e.target.checked })}
                      className="border-zinc-400 text-zinc-700"
                    />
                    <span>Tiendas Propias</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={visibleChannels.produto}
                      onChange={(e) => setVisibleChannels({ ...visibleChannels, produto: e.target.checked })}
                      className="border-zinc-400 text-zinc-700"
                    />
                    <span>Venta Producto</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={visibleChannels.franquias}
                      onChange={(e) => setVisibleChannels({ ...visibleChannels, franquias: e.target.checked })}
                      className="border-zinc-400 text-zinc-700"
                    />
                    <span>Franquicias</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={visibleChannels.consolidado}
                      onChange={(e) => setVisibleChannels({ ...visibleChannels, consolidado: e.target.checked })}
                      className="border-zinc-400 text-zinc-700"
                    />
                    <span>Consolidado Mensual</span>
                  </label>
                </div>
              </div>

              {/* Filter: Visible Months */}
              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Período
                </label>
                <PeriodFilterDropdown year="2026" months={MONTHS_FULL} value={visibleMonths} onChange={setVisibleMonths} />
              </div>

              {/* Filter: Metrics Columns */}
              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Colunas de Valores
                </label>
                <div className="space-y-1 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showPlanned}
                      onChange={(e) => setShowPlanned(e.target.checked || (!showRealized ? true : false))}
                      className="border-zinc-400 text-zinc-700"
                    />
                    <span>Exibir Orçado</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showRealized}
                      onChange={(e) => setShowRealized(e.target.checked || (!showPlanned ? true : false))}
                      className="border-zinc-400 text-zinc-700"
                    />
                    <span>Exibir Realizado</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showVariance}
                      onChange={(e) => setShowVariance(e.target.checked)}
                      className="border-zinc-400 text-zinc-700"
                    />
                    <span>Exibir Desvio (R$)</span>
                  </label>
                </div>
              </div>

              {/* Search Filter */}
              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Buscar Conta na DRE
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

              {/* Reset Filters */}
              {(searchTerm !== "" || selectedCategory !== "all" || !showPlanned || !showRealized || !showVariance) && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setShowPlanned(true);
                    setShowRealized(true);
                    setShowVariance(true);
                    toggleAllMonths(true);
                  }}
                  className="w-full py-1.5 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-semibold transition-colors text-center"
                >
                  Limpar Todos os Filtros
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {pendingImport && (
        <ImportReviewModal
          fileName={pendingImport.fileName}
          summary={pendingImport.summary}
          onCancel={() => setPendingImport(null)}
          onConfirm={(mapping) => finalizeImport(pendingImport.data, mapping, pendingImport.fileName, pendingImport.summary)}
        />
      )}
    </div>
  );
}
