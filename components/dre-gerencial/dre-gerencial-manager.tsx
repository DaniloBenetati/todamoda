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

// Acha, pelo cabeçalho (linha 1 do arquivo, já que os dados começam na linha 2), a coluna cujo
// texto bate com uma das palavras-chave (nessa ordem de prioridade). -1 se nenhuma bater.
function findColIndexByHeader(headerRow: any[] | undefined, keywords: string[]): number {
  if (!headerRow) return -1;
  for (const kw of keywords) {
    for (let i = 0; i < headerRow.length; i++) {
      const h = String(headerRow[i] || "").toLowerCase();
      if (h.includes(kw)) return i;
    }
  }
  return -1;
}

// Converte o valor de uma célula de data (serial do Excel, Date, ou texto dd/mm/aaaa) no id do
// mês ("01".."12"). Retorna null se não conseguir reconhecer o formato.
function parseMonthId(value: any): string | null {
  if (value === null || value === undefined || value === "") return null;

  if (typeof value === "number" && isFinite(value)) {
    // Serial de data do Excel (dias desde 1899-12-30).
    const epoch = Date.UTC(1899, 11, 30);
    const date = new Date(epoch + value * 86400000);
    if (!isNaN(date.getTime())) return String(date.getUTCMonth() + 1).padStart(2, "0");
    return null;
  }

  if (value instanceof Date) {
    return String(value.getMonth() + 1).padStart(2, "0");
  }

  const str = String(value).trim();
  const dmy = str.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})/);
  if (dmy) return String(Number(dmy[2])).padStart(2, "0");

  const ymd = str.match(/^(\d{4})[\/\-.](\d{1,2})[\/\-.](\d{1,2})/);
  if (ymd) return String(Number(ymd[2])).padStart(2, "0");

  return null;
}

// Linhas "indicador" (EBITDA, PBT, Margem, etc.) não têm código de conta próprio — nunca recebem
// lançamento importado direto, então precisam ser calculadas a partir de outras linhas do plano
// (identificadas pelo número de linha original da DRE, campo `row`). Cada entrada é
// {row de origem, sinal}: sinal -1 para uma linha de custo que precisa ser subtraída (as linhas de
// custo em si — Sueldos, Alquileres etc. — ficam sempre positivas, como "quanto foi gasto";
// só o sinal aqui decide se aquilo soma ou reduz o indicador). O cálculo é feito por canal
// (Tiendas/Produto/Franquicias — pense em cada um como uma DRE própria) e depois consolidado.
//
// Desde que o import passou a gravar despesas já negativas (só Receita fica positiva — ver
// `isRevenueCategory` em finalizeImport), todo mundo aqui é somado (sign: 1), igual ao Excel
// original: cada linha de origem já carrega o sinal certo, o totalizador só soma.
const ROLLUP_BY_ROW: Record<number, { row: number; sign: 1 | -1 }[]> = {
  12: [{ row: 4, sign: 1 }, { row: 8, sign: 1 }], // Ventas Netas = Ventas c IVA + IVA (IVA já vem negativo) — no Excel original nunca recebia lançamento próprio
  20: [{ row: 12, sign: 1 }, { row: 16, sign: 1 }], // CMg Operativo = Ventas Netas + CMV (CMV já vem negativo)
  30: [{ row: 22, sign: 1 }, { row: 26, sign: 1 }], // Ingresso Neto Franquicias = Ingresso Bruto + IVA Franquicias (mesmo caso da linha 12)
  34: [{ row: 30, sign: 1 }], // CMg Franquicias = Ingresso Neto Franquicias
  36: [{ row: 20, sign: 1 }, { row: 34, sign: 1 }], // CMg Total
  192: [
    { row: 38, sign: 1 }, { row: 58, sign: 1 }, { row: 66, sign: 1 }, { row: 80, sign: 1 },
    { row: 92, sign: 1 }, { row: 98, sign: 1 }, { row: 109, sign: 1 }, { row: 119, sign: 1 },
    { row: 122, sign: 1 }, { row: 126, sign: 1 }, { row: 174, sign: 1 }, { row: 182, sign: 1 },
    { row: 185, sign: 1 }, { row: 189, sign: 1 },
  ], // Gastos Canales (soma das 14 categorias operacionais, já negativas)
  196: [{ row: 36, sign: 1 }, { row: 192, sign: 1 }], // Margen Operacional = CMg Total + Gastos Canales
  322: [
    { row: 198, sign: 1 }, { row: 218, sign: 1 }, { row: 222, sign: 1 }, { row: 232, sign: 1 },
    { row: 238, sign: 1 }, { row: 242, sign: 1 }, { row: 253, sign: 1 }, { row: 263, sign: 1 },
    { row: 311, sign: 1 }, { row: 319, sign: 1 },
  ], // Gastos AACC (soma das 10 categorias corporativas, já negativas)
  // 324/325/326 (EBITDA por segmento) e 364/365/366 (PBT por segmento) não entram aqui de propósito:
  // no Excel original elas existiam por causa do truque de "uma coluna por segmento"; aqui cada
  // canal já é uma coluna própria em 327/367, então essas linhas ficariam idênticas entre si — só
  // duplicavam visualmente o mesmo número em Tiendas/Produto/Franquicias/Total.
  327: [{ row: 196, sign: 1 }, { row: 322, sign: 1 }], // EBITDA - Total
  367: [{ row: 327, sign: 1 }, { row: 332, sign: 1 }, { row: 334, sign: 1 }, { row: 340, sign: 1 }, { row: 354, sign: 1 }, { row: 357, sign: 1 }], // PBT
};

const ROLLUP_CHANNELS: ChannelType[] = ["tiendas", "produto", "franquias"];

// Recalcula todas as linhas de indicador (ROLLUP_BY_ROW) a partir das linhas de origem já
// existentes em `accounts` (populadas pela importação). Processa em ordem crescente de `row`
// para que indicadores que dependem de outros indicadores (ex: 196 usa 192) já saiam corretos.
function computeIndicatorRows(accounts: DREAccountItem[]): DREAccountItem[] {
  const byRow = new Map<number, DREAccountItem>();
  accounts.forEach((a) => {
    if (a.row !== undefined) byRow.set(a.row, a);
  });

  const order = Object.keys(ROLLUP_BY_ROW).map(Number).sort((a, b) => a - b);

  order.forEach((targetRow) => {
    const target = byRow.get(targetRow);
    const formula = ROLLUP_BY_ROW[targetRow];
    if (!target) return;

    const newValues: any = {};
    const consolByMonth: Record<string, number> = {};

    ROLLUP_CHANNELS.forEach((ch) => {
      const monthIds = new Set<string>();
      formula.forEach((f) => {
        const src = byRow.get(f.row);
        Object.keys(src?.values?.[ch]?.realizedByMonth || {}).forEach((m) => monthIds.add(m));
      });

      const rbm: Record<string, number> = {};
      monthIds.forEach((m) => {
        let sum = 0;
        formula.forEach((f) => {
          const src = byRow.get(f.row);
          sum += f.sign * (src?.values?.[ch]?.realizedByMonth?.[m] || 0);
        });
        rbm[m] = sum;
        consolByMonth[m] = (consolByMonth[m] || 0) + sum;
      });

      newValues[ch] = {
        planned: target.values?.[ch]?.planned || 0,
        realized: Object.values(rbm).reduce((a, b) => a + b, 0),
        realizedByMonth: rbm,
      };
    });

    newValues.consolidado = {
      planned: target.values?.consolidado?.planned || 0,
      realized: Object.values(consolByMonth).reduce((a, b) => a + b, 0),
      realizedByMonth: consolByMonth,
    };

    byRow.set(targetRow, { ...target, values: newValues });
  });

  return accounts.map((a) => (a.row !== undefined && byRow.has(a.row) ? byRow.get(a.row)! : a));
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
  // Começa mostrando os 12 meses (em vez de só o trimestre atual) — enquanto os imports ainda
  // estão sendo validados, esconder meses por padrão só confunde quem está conferindo se os
  // dados caíram no mês certo.
  const [visibleMonths, setVisibleMonths] = useState<Record<string, boolean>>(() => {
    const m: Record<string, boolean> = { total: true };
    MONTHS_FULL.forEach((mo) => (m[mo.id] = true));
    return m;
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
      const sumByMonth = (o?: Record<string, number>) => Object.values(o || {}).reduce((a, b) => a + b, 0);
      const sanitized = baseData.map((item) => {
        const bg = budgetMap[item.id] || { tiendas: 0, produto: 0, franquias: 0, consolidado: 0 };
        const rbmTiendas = hasImported ? (item.values?.tiendas?.realizedByMonth || {}) : {};
        const rbmProduto = hasImported ? (item.values?.produto?.realizedByMonth || {}) : {};
        const rbmFranquias = hasImported ? (item.values?.franquias?.realizedByMonth || {}) : {};
        const realTiendas = sumByMonth(rbmTiendas);
        const realProduto = sumByMonth(rbmProduto);
        const realFranquias = sumByMonth(rbmFranquias);
        const realConsolidado = realTiendas + realProduto + realFranquias;

        return {
          ...item,
          values: {
            tiendas: {
              planned: bg.tiendas,
              realized: realTiendas,
              realizedByMonth: rbmTiendas,
            },
            produto: {
              planned: bg.produto,
              realized: realProduto,
              realizedByMonth: rbmProduto,
            },
            franquias: {
              planned: bg.franquias,
              realized: realFranquias,
              realizedByMonth: rbmFranquias,
            },
            consolidado: {
              planned: bg.consolidado,
              realized: realConsolidado,
            },
          },
        };
      });

      setDreAccounts(computeIndicatorRows(sanitized));
    } catch (e) {
      console.warn("Usando DRE inicial limpa.");
    }
  }, []);

  const saveDRE = (data: DREAccountItem[], message = "DRE Gerencial atualizada com sucesso!") => {
    const withIndicators = computeIndicatorRows(data);
    setDreAccounts(withIndicators);
    try {
      localStorage.setItem(STORAGE_KEY_DRE, JSON.stringify(withIndicators));
      setSavedSuccess(message);
      setTimeout(() => setSavedSuccess(null), 4000);
    } catch (e) {
      console.error("Erro ao salvar DRE:", e);
    }
  };

  const handleReset = () => {
    if (confirm("Deseja restaurar e zerar todos os lançamentos da DRE?")) {
      localStorage.removeItem("toda_moda_dre_has_imported_v1");
      // Também esquece o mapeamento Projeto -> Canal já confirmado, senão a próxima importação
      // reconhece os mesmos projetos como "já conhecidos" e pula a tela de revisão.
      localStorage.removeItem(STORAGE_KEY_PROJ_MAP);
      const clean = DRE_ACCOUNTS_DATA.map((item) => ({
        ...item,
        values: {
          tiendas: { planned: 0, realized: 0, realizedByMonth: {} },
          produto: { planned: 0, realized: 0, realizedByMonth: {} },
          franquias: { planned: 0, realized: 0, realizedByMonth: {} },
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

    const plannedRevenue = revenueAccount ? (revenueAccount.values?.consolidado?.planned || 0) : 0;
    const realizedRevenue = revenueAccount ? (revenueAccount.values?.consolidado?.realized || 0) : 0;

    const plannedNet = netRevenueAccount ? (netRevenueAccount.values?.consolidado?.planned || 0) : 0;
    const realizedNet = netRevenueAccount ? (netRevenueAccount.values?.consolidado?.realized || 0) : 0;

    const realizedEbitda = ebitdaAccount ? (ebitdaAccount.values?.consolidado?.realized || 0) : 0;
    const realizedNetResult = netResultAccount ? (netResultAccount.values?.consolidado?.realized || 0) : 0;

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
    // Descobre a coluna de data pelo cabeçalho (linha 1 do arquivo) para poder separar o
    // Realizado por mês. Se não achar nenhuma coluna de data reconhecível, cai no mês atual
    // (e avisa no final) em vez de travar a importação.
    const headerRow = data[1] || [];
    const colData = findColIndexByHeader(headerRow, [
      "previs", // "Previsão" / "Previsao" — coluna de data usada nos arquivos de Contas a Pagar/Pagas
      "data de pagamento",
      "data pagamento",
      "data vencimento",
      "data emiss",
      "data",
    ]);
    const currentMonthFallback = String(new Date().getMonth() + 1).padStart(2, "0");

    // code -> canal -> mês -> soma
    const channelTotalsByCode: Record<string, Record<ImportChannel, Record<string, number>>> = {};
    let updatedCount = 0;
    let missingDateCount = 0;
    let noCodeTotal = 0;
    let noCodeCount = 0;
    const monthsInFile = new Set<string>();

    for (let i = 2; i < data.length; i++) {
      const row = data[i];
      const cat = String(row[6] || "").trim();
      const amount = Math.abs(Number(row[4])) || 0;
      if (!cat || amount === 0) continue;

      // A maioria dos códigos é numérica ("24.1.2"), mas alguns (ex: "E. E." de Efectos
      // Especiales) não são — nesses casos, usa o trecho antes do primeiro " - " como código.
      const numericMatch = cat.match(/^([0-9.]+)/);
      const code = numericMatch ? numericMatch[1] : cat.split(" - ")[0].trim();
      if (!code) {
        noCodeTotal += amount;
        noCodeCount++;
        continue;
      }

      const rawProj = String(row[7] || row[8] || "").trim();
      const proj = rawProj.toUpperCase() || "(SEM PROJETO)";
      const channel = mapping[proj] || suggestChannel(proj);

      let monthId = colData >= 0 ? parseMonthId(row[colData]) : null;
      if (!monthId) {
        missingDateCount++;
        monthId = currentMonthFallback;
      }
      monthsInFile.add(monthId);

      if (!channelTotalsByCode[code]) {
        channelTotalsByCode[code] = { tiendas: {}, produto: {}, franquias: {} };
      }
      channelTotalsByCode[code][channel][monthId] = (channelTotalsByCode[code][channel][monthId] || 0) + amount;
      updatedCount++;
    }

    // Se algum dos meses presentes neste arquivo já tem Realizado importado antes, avisa antes
    // de sobrescrever (só os meses em conflito são afetados — os demais meses ficam intactos).
    const monthLabel = (id: string) => MONTHS_FULL.find((m) => m.id === id)?.label || id;
    const monthsToOverwrite = Array.from(monthsInFile).filter((id) =>
      dreAccounts.some(
        (a) =>
          (a.values?.tiendas?.realizedByMonth?.[id] || 0) !== 0 ||
          (a.values?.produto?.realizedByMonth?.[id] || 0) !== 0 ||
          (a.values?.franquias?.realizedByMonth?.[id] || 0) !== 0
      )
    );
    if (monthsToOverwrite.length > 0) {
      const names = monthsToOverwrite.sort().map(monthLabel).join(", ");
      const proceed = confirm(
        `Os meses ${names} já têm Realizado importado anteriormente. Reimportar vai SUBSTITUIR os valores desses meses (os demais meses não são afetados). Deseja continuar?`
      );
      if (!proceed) {
        setPendingImport(null);
        return;
      }
    }

    const sumByMonth = (o: Record<string, number>) => Object.values(o).reduce((a, b) => a + b, 0);

    // Só contas de Receita (Vendas / Franquias) ficam positivas; todo o resto (impostos, CMV,
    // despesas) entra negativo — igual ao modelo original em Excel, onde cada linha já carrega o
    // sinal certo e os totalizadores só somam. Sem isso, uma despesa aparecia "positiva" em toda
    // linha e só a soma final (PBT) mostrava sinal de menos.
    const isRevenueCategory = (category?: string) => !!category && category.startsWith("Receita");

    // Diagnóstico: quanto do arquivo caiu em conta de Receita (fica positivo) vs conta de
    // custo/despesa (fica negativo) — se aparecer valor de Receita num arquivo de Contas a Pagar,
    // isso "cancela" parte do total negativo em vez de somar, e explica um EBITDA menos negativo
    // do que o Valor Total do import.
    let revenueTaggedTotal = 0;
    let revenueTaggedCount = 0;
    let grandMatchedTotal = 0;
    const revenueTaggedAccounts = new Set<string>();

    const updatedAccounts = dreAccounts.map((account) => {
      // meses tocados por este arquivo, para esta conta, por canal
      const monthsAdd: Record<string, { tiendas: number; produto: number; franquias: number }> = {};
      const sign = isRevenueCategory(account.category) ? 1 : -1;

      Object.entries(channelTotalsByCode).forEach(([code, chans]) => {
        if (code === account.code || code.startsWith(account.code + ".")) {
          (Object.keys(chans) as ImportChannel[]).forEach((ch) => {
            Object.entries(chans[ch]).forEach(([monthId, val]) => {
              if (!monthsAdd[monthId]) monthsAdd[monthId] = { tiendas: 0, produto: 0, franquias: 0 };
              monthsAdd[monthId][ch] += sign * val;
              grandMatchedTotal += val;
              if (sign === 1) {
                revenueTaggedTotal += val;
                revenueTaggedCount++;
                revenueTaggedAccounts.add(`${account.code} - ${account.name}`);
              }
            });
          });
        }
      });

      if (Object.keys(monthsAdd).length === 0) return account;

      const currentTiendas = account.values?.tiendas || { planned: 0, realized: 0 };
      const currentProduto = account.values?.produto || { planned: 0, realized: 0 };
      const currentFranquias = account.values?.franquias || { planned: 0, realized: 0 };
      const currentConsolidado = account.values?.consolidado || { planned: 0, realized: 0 };

      // Parte de meses já existentes (não tocados por este arquivo) + sobrescreve só os meses novos.
      const rbmTiendas = { ...(currentTiendas.realizedByMonth || {}) };
      const rbmProduto = { ...(currentProduto.realizedByMonth || {}) };
      const rbmFranquias = { ...(currentFranquias.realizedByMonth || {}) };

      Object.entries(monthsAdd).forEach(([monthId, vals]) => {
        rbmTiendas[monthId] = vals.tiendas;
        rbmProduto[monthId] = vals.produto;
        rbmFranquias[monthId] = vals.franquias;
      });

      const newTiendas = { planned: currentTiendas.planned, realized: sumByMonth(rbmTiendas), realizedByMonth: rbmTiendas };
      const newProduto = { planned: currentProduto.planned, realized: sumByMonth(rbmProduto), realizedByMonth: rbmProduto };
      const newFranquias = { planned: currentFranquias.planned, realized: sumByMonth(rbmFranquias), realizedByMonth: rbmFranquias };
      const newConsolidado = {
        planned: currentConsolidado.planned,
        realized: newTiendas.realized + newProduto.realized + newFranquias.realized,
      };

      return {
        ...account,
        values: { tiendas: newTiendas, produto: newProduto, franquias: newFranquias, consolidado: newConsolidado },
      };
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

    // Diagnóstico: quanto do arquivo tem código de conta que não existe no plano de contas
    // (isso é o mais provável de explicar o total do import não bater com o total da DRE —
    // esse valor entra no "Valor Total" da tela de revisão, mas nunca cai em nenhuma linha aqui).
    let unmatchedTotal = 0;
    let unmatchedCount = 0;
    const unmatchedCodesSample = new Set<string>();
    Object.entries(channelTotalsByCode).forEach(([code, chans]) => {
      const hasAccount = dreAccounts.some((a) => a.code && (code === a.code || code.startsWith(a.code + ".")));
      if (!hasAccount) {
        (Object.keys(chans) as ImportChannel[]).forEach((ch) => {
          Object.values(chans[ch]).forEach((v) => {
            unmatchedTotal += v;
            unmatchedCount++;
          });
        });
        unmatchedCodesSample.add(code);
      }
    });

    const monthsLabel = Array.from(monthsInFile).sort().map(monthLabel).join(", ");
    localStorage.setItem("toda_moda_dre_has_imported_v1", "true");
    saveDRE(
      updatedAccounts,
      `Arquivo "${fileName}" importado em ${monthsLabel}: ${updatedCount} lançamentos (Tiendas ${formatCurrency(totals.tiendas)}, Produto ${formatCurrency(totals.produto)}, Franquias ${formatCurrency(totals.franquias)}).`
    );
    setPendingImport(null);

    console.log("[DRE import] resumo:", {
      valorTotalArquivo: formatCurrency(grandMatchedTotal + unmatchedTotal + noCodeTotal),
      caiuEmAlgumaConta: formatCurrency(grandMatchedTotal),
      semContaCorrespondente: formatCurrency(unmatchedTotal),
      semCodigoReconhecivel: formatCurrency(noCodeTotal),
      caiuEmContaDeReceita: formatCurrency(revenueTaggedTotal),
      contasDeReceitaAtingidas: Array.from(revenueTaggedAccounts),
    });

    if (unmatchedTotal > 0 || noCodeTotal > 0) {
      const sample = Array.from(unmatchedCodesSample).slice(0, 8).join(", ");
      const parts: string[] = [];
      if (unmatchedTotal > 0) {
        parts.push(
          `${formatCurrency(unmatchedTotal)} (${unmatchedCount} lançamento(s)) com código de conta que não existe no plano de contas. Códigos: ${sample}${unmatchedCodesSample.size > 8 ? "..." : ""}`
        );
      }
      if (noCodeTotal > 0) {
        parts.push(`${formatCurrency(noCodeTotal)} (${noCodeCount} lançamento(s)) sem nenhum código reconhecível na coluna de conta`);
      }
      alert(
        `Aviso: parte do arquivo não entrou na DRE, mesmo contando no Valor Total da revisão — ${parts.join("; ")}.`
      );
    }

    if (missingDateCount > 0) {
      alert(
        `Aviso: ${missingDateCount} lançamento(s) não tinham uma data reconhecível e foram colocados em ${monthLabel(currentMonthFallback)} (mês atual). Confira a coluna de data do arquivo se isso não for esperado.`
      );
    }

    // Diagnóstico de sinal: mostra sempre que houver algo em conta de Receita, pra você conferir
    // se bate com o Valor Total da tela de revisão. grandMatchedTotal = tudo que caiu em alguma
    // conta, em valor absoluto (deveria bater com o Valor Total, já que unmatched/noCode deram 0).
    if (revenueTaggedTotal > 0) {
      const accSample = Array.from(revenueTaggedAccounts).slice(0, 6).join(", ");
      alert(
        `Diagnóstico de sinal: ${formatCurrency(grandMatchedTotal)} do arquivo caiu em alguma conta da DRE (bate com o Valor Total da revisão). Desses, ${formatCurrency(revenueTaggedTotal)} (${revenueTaggedCount} lançamento(s)) caíram em conta de RECEITA — ficam positivos, então "cancelam" parte do total negativo. Contas de receita atingidas: ${accSample}. Se isso não fizer sentido para um arquivo de Contas a Pagar, provavelmente é lançamento com código de conta errado no Omie.`
      );
    } else {
      console.log(`[DRE import] Total casado: ${formatCurrency(grandMatchedTotal)}. Nenhum lançamento caiu em conta de Receita.`);
    }
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
      const c = a.values?.consolidado || { planned: 0, realized: 0 };
      const t = a.values?.tiendas || { planned: 0, realized: 0 };
      const p = a.values?.produto || { planned: 0, realized: 0 };
      const f = a.values?.franquias || { planned: 0, realized: 0 };

      csv += `${a.level},"${a.code}","${a.name}","${a.category}"`;
      activeMonthsList.forEach((m) => {
        const tr = t.realizedByMonth?.[m.id] || 0;
        const pr = p.realizedByMonth?.[m.id] || 0;
        const fr = f.realizedByMonth?.[m.id] || 0;
        csv += `,${tr.toFixed(2)},${pr.toFixed(2)},${fr.toFixed(2)},${(tr + pr + fr).toFixed(2)}`;
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

                    const t = item.values?.tiendas || { planned: 0, realized: 0 };
                    const p = item.values?.produto || { planned: 0, realized: 0 };
                    const f = item.values?.franquias || { planned: 0, realized: 0 };
                    const c = item.values?.consolidado || { planned: 0, realized: 0 };

                    // Orçado ainda não é quebrado por mês (Budget é um módulo à parte), então
                    // continua distribuído proporcionalmente. Realizado usa o valor de fato daquele
                    // mês, vindo da importação — não é mais uma divisão do total anual.
                    const t_m_plan = t.planned / 12;
                    const p_m_plan = p.planned / 12;
                    const f_m_plan = f.planned / 12;

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
                        {activeMonthsList.map((m) => {
                          const t_m_real = t.realizedByMonth?.[m.id] || 0;
                          const p_m_real = p.realizedByMonth?.[m.id] || 0;
                          const f_m_real = f.realizedByMonth?.[m.id] || 0;
                          return (
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
                          );
                        })}

                        {/* Total Anual Cells */}
                        {visibleMonths.total && (
                          <React.Fragment key="total-row-cells">
                            {visibleChannels.tiendas && (
                              <>
                                {showPlanned && <td className="min-w-[80px] py-2 px-1 text-right font-mono text-[10px] bg-zinc-200/30 dark:bg-zinc-800/30 whitespace-nowrap">{t.planned !== 0 ? formatCurrency(t.planned) : "-"}</td>}
                                {showRealized && <td className="min-w-[80px] py-2 px-1 text-right font-mono font-bold text-[10px] bg-zinc-200/30 dark:bg-zinc-800/30 border-r border-zinc-200 dark:border-zinc-800 whitespace-nowrap">{t.realized !== 0 ? formatCurrency(t.realized) : "-"}</td>}
                              </>
                            )}

                            {visibleChannels.produto && (
                              <>
                                {showPlanned && <td className="min-w-[80px] py-2 px-1 text-right font-mono text-[10px] bg-zinc-200/30 dark:bg-zinc-800/30 whitespace-nowrap">{p.planned !== 0 ? formatCurrency(p.planned) : "-"}</td>}
                                {showRealized && <td className="min-w-[80px] py-2 px-1 text-right font-mono font-bold text-[10px] bg-zinc-200/30 dark:bg-zinc-800/30 border-r border-zinc-200 dark:border-zinc-800 whitespace-nowrap">{p.realized !== 0 ? formatCurrency(p.realized) : "-"}</td>}
                              </>
                            )}

                            {visibleChannels.franquias && (
                              <>
                                {showPlanned && <td className="min-w-[80px] py-2 px-1 text-right font-mono text-[10px] bg-zinc-200/30 dark:bg-zinc-800/30 whitespace-nowrap">{f.planned !== 0 ? formatCurrency(f.planned) : "-"}</td>}
                                {showRealized && <td className="min-w-[80px] py-2 px-1 text-right font-mono font-bold text-[10px] bg-zinc-200/30 dark:bg-zinc-800/30 border-r border-zinc-200 dark:border-zinc-800 whitespace-nowrap">{f.realized !== 0 ? formatCurrency(f.realized) : "-"}</td>}
                              </>
                            )}

                            {visibleChannels.consolidado && (
                              <>
                                {showPlanned && <td className="min-w-[86px] py-2 px-1 text-right font-mono text-[11px] bg-zinc-300/40 dark:bg-zinc-700/40 font-bold whitespace-nowrap">{c.planned !== 0 ? formatCurrency(c.planned) : "-"}</td>}
                                {showRealized && <td className="min-w-[86px] py-2 px-1 text-right font-mono text-[11px] bg-zinc-300/40 dark:bg-zinc-700/40 font-black text-foreground whitespace-nowrap">{c.realized !== 0 ? formatCurrency(c.realized) : "-"}</td>}
                                {showVariance && (
                                  <td className="min-w-[80px] py-2 px-1 text-right font-mono text-[11px] bg-zinc-300/40 dark:bg-zinc-700/40 font-bold whitespace-nowrap">
                                    {c.planned === 0 ? (
                                      // Sem orçado ainda, o desvio seria sempre igual ao realizado —
                                      // mostrar isso só duplicava o número ao lado, sem informar nada novo.
                                      <span className="text-zinc-400" title="Sem orçado cadastrado ainda">
                                        s/ orçado
                                      </span>
                                    ) : c_total_diff !== 0 ? (
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
