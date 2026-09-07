"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  CASH_FLOW_NEWCO,
  CASH_FLOW_BSG,
  CASH_FLOW_MONTHS,
  CashFlowEntity,
  CashFlowLineItem,
  CashFlowMonthId,
  CashFlowMonthValue,
  CashFlowRowType,
  CashFlowChannel,
} from "@/data/fluxo-caixa-data";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { PeriodFilterDropdown } from "@/components/ui/period-filter";
import { Badge } from "@/components/ui/badge";
import {
  Save,
  RotateCcw,
  Download,
  X,
  SlidersHorizontal,
  ChevronDown,
  ChevronRight,
  UploadCloud,
  Search,
  Building2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/toast-provider";
import { useConfirm } from "@/components/ui/confirm-provider";
import { ImportReviewModal, ImportChannel, ImportProjSummaryEntry } from "@/components/dre-gerencial/import-review-modal";
import { loadProjChannelMap, saveProjChannelMap, suggestChannel } from "@/components/dre-gerencial/dre-gerencial-manager";
import * as XLSX from "xlsx";

const STORAGE_KEY_FLUXO = "toda_moda_fluxo_caixa_v1";

// NewCo/BSG não é escolhido por importação — é derivado direto do canal (mesma base da DRE):
// Franquicias vai para BSG, Tiendas Propias/Venta Producto vão para NewCo.
function channelToEntity(channel: ImportChannel): CashFlowEntity {
  return channel === "franquias" ? "bsg" : "newco";
}

const SEED_ITEMS: CashFlowLineItem[] = [...CASH_FLOW_NEWCO, ...CASH_FLOW_BSG];

type MonthMap = Record<CashFlowMonthId, CashFlowMonthValue>;

function emptyMonths(): MonthMap {
  const m = {} as MonthMap;
  CASH_FLOW_MONTHS.forEach((mo) => {
    m[mo.id] = { planned: 0, realized: 0 };
  });
  return m;
}

export const CHANNEL_LABELS: Record<CashFlowChannel, string> = {
  tiendas: "Tiendas Propias",
  produto: "Venta Producto",
  franquias: "Franquicias",
};

// Reduz um MonthMap ao recorte de um canal só (Tiendas/Produto/Franquicias), usando o
// detalhamento gravado na importação — "all" devolve o total normal, sem filtrar.
function monthsForChannel(months: MonthMap, channel: "all" | CashFlowChannel): MonthMap {
  if (channel === "all") return months;
  const out = {} as MonthMap;
  (Object.keys(months) as CashFlowMonthId[]).forEach((mid) => {
    const mv = months[mid];
    out[mid] = {
      planned: mv?.plannedByChannel?.[channel] || 0,
      realized: mv?.realizedByChannel?.[channel] || 0,
    };
  });
  return out;
}

function addMonths(a: MonthMap, b: MonthMap): MonthMap {
  const out = {} as MonthMap;
  CASH_FLOW_MONTHS.forEach((mo) => {
    out[mo.id] = {
      planned: (a[mo.id]?.planned || 0) + (b[mo.id]?.planned || 0),
      realized: (a[mo.id]?.realized || 0) + (b[mo.id]?.realized || 0),
    };
  });
  return out;
}

function sumItemsMonths(items: CashFlowLineItem[]): MonthMap {
  return items.reduce((acc, item) => addMonths(acc, item.months), emptyMonths());
}

function runningBalance(perMonth: MonthMap): MonthMap {
  const out = {} as MonthMap;
  let prevPlanned = 0;
  let prevRealized = 0;
  CASH_FLOW_MONTHS.forEach((mo) => {
    const planned = prevPlanned + (perMonth[mo.id]?.planned || 0);
    const realized = prevRealized + (perMonth[mo.id]?.realized || 0);
    out[mo.id] = { planned, realized };
    prevPlanned = planned;
    prevRealized = realized;
  });
  return out;
}

function annualTotal(perMonth: MonthMap): CashFlowMonthValue {
  return CASH_FLOW_MONTHS.reduce(
    (acc, mo) => ({
      planned: acc.planned + (perMonth[mo.id]?.planned || 0),
      realized: acc.realized + (perMonth[mo.id]?.realized || 0),
    }),
    { planned: 0, realized: 0 }
  );
}

// Linhas de saldo (kind "balance") já são cumulativas mês a mês — dezembro já inclui
// janeiro..novembro. Somar os 12 meses de novo (annualTotal) infla o total absurdamente; o
// "Total Anual" certo pra essas linhas é simplesmente o valor do último mês.
function totalForRow(months: MonthMap, kind: string): CashFlowMonthValue {
  if (kind === "balance") {
    const lastMonthId = CASH_FLOW_MONTHS[CASH_FLOW_MONTHS.length - 1].id;
    return months[lastMonthId] || { planned: 0, realized: 0 };
  }
  return annualTotal(months);
}

interface ComputedRow {
  key: string;
  label: string;
  section: string;
  kind: "total" | "result" | "balance";
  months: MonthMap;
}

function buildNewcoComputed(items: CashFlowLineItem[]) {
  const ingresos = items.filter((i) => i.rowType === "income");
  const egresos = items.filter((i) => i.rowType === "expense");
  const investimentos = items.filter((i) => i.rowType === "investment");

  const totalIngresos = sumItemsMonths(ingresos);
  const totalEgresos = sumItemsMonths(egresos);
  const totalInvestimentos = sumItemsMonths(investimentos);
  const totalGeralSaidas = addMonths(totalEgresos, totalInvestimentos);
  const superavit = addMonths(totalIngresos, totalGeralSaidas);
  const saldoFinal = runningBalance(superavit);

  const rows: ComputedRow[] = [
    { key: "total-ingresos", label: "Total Ingresos", section: "Ingresos Operativos", kind: "total", months: totalIngresos },
    { key: "total-egresos", label: "Total Egresos", section: "Egresos", kind: "total", months: totalEgresos },
    { key: "total-investimentos", label: "Total de Investimentos", section: "Investimentos", kind: "total", months: totalInvestimentos },
    { key: "total-geral-saidas", label: "Total Geral de Saídas", section: "Investimentos", kind: "result", months: totalGeralSaidas },
    { key: "superavit", label: "Superávit / Déficit Mês", section: "Investimentos", kind: "result", months: superavit },
    { key: "saldo-final", label: "Saldo Final (Acumulado)", section: "Investimentos", kind: "balance", months: saldoFinal },
  ];
  return rows;
}

function buildBsgComputed(items: CashFlowLineItem[]) {
  const ingresos = items.filter((i) => i.section === "Ingresos" && i.rowType === "income");
  const egresos = items.filter((i) => i.section === "Egresos" && i.rowType === "expense");
  const aporteLiquido = items.filter((i) => i.section === "Aporte Líquido" && i.rowType === "memo");

  const totalIngresos = sumItemsMonths(ingresos);
  const totalEgresos = sumItemsMonths(egresos);
  const saldoFinalContas = addMonths(totalIngresos, totalEgresos);
  const saldoAcumulado = runningBalance(saldoFinalContas);
  const totalAporteLiquido = sumItemsMonths(aporteLiquido);

  const rows: ComputedRow[] = [
    { key: "total-ingresos-bsg", label: "Ingresos - BSG", section: "Ingresos", kind: "total", months: totalIngresos },
    { key: "total-egresos-bsg", label: "Egresos - BSG", section: "Egresos", kind: "total", months: totalEgresos },
    { key: "saldo-final-contas", label: "Saldo final das contas", section: "Egresos", kind: "result", months: saldoFinalContas },
    { key: "saldo-acumulado", label: "Saldo acumulado", section: "Egresos", kind: "balance", months: saldoAcumulado },
    { key: "total-aporte-liquido", label: "Total Aporte Líquido", section: "Aporte Líquido", kind: "total", months: totalAporteLiquido },
  ];
  return rows;
}

// Linha final combinando NewCo + BSG — o "Saldo Final (Acumulado)" de cada entidade já é
// cumulativo, então soma-se o movimento líquido MENSAL de cada uma (antes de acumular) e só
// então aplica-se o acúmulo, pra não somar dois saldos já acumulados (o que dobraria o efeito).
function buildGrandTotal(newcoItems: CashFlowLineItem[], bsgItems: CashFlowLineItem[]): ComputedRow {
  const newcoIngresos = sumItemsMonths(newcoItems.filter((i) => i.rowType === "income"));
  const newcoSaidas = addMonths(
    sumItemsMonths(newcoItems.filter((i) => i.rowType === "expense")),
    sumItemsMonths(newcoItems.filter((i) => i.rowType === "investment"))
  );
  const newcoNetoMes = addMonths(newcoIngresos, newcoSaidas);

  const bsgIngresos = sumItemsMonths(bsgItems.filter((i) => i.section === "Ingresos" && i.rowType === "income"));
  const bsgEgresos = sumItemsMonths(bsgItems.filter((i) => i.section === "Egresos" && i.rowType === "expense"));
  const bsgNetoMes = addMonths(bsgIngresos, bsgEgresos);

  const netoMesGeral = addMonths(newcoNetoMes, bsgNetoMes);
  const saldoFinalGeral = runningBalance(netoMesGeral);

  return { key: "saldo-final-geral", label: "Saldo Final (Acumulado) — NewCo + BSG", section: "Geral", kind: "balance", months: saldoFinalGeral };
}

const ENTITY_SECTIONS: Record<CashFlowEntity, string[]> = {
  newco: ["Ingresos Operativos", "Egresos", "Investimentos"],
  bsg: ["Ingresos", "Egresos", "Aporte Líquido"],
};

const ENTITY_LABELS: Record<CashFlowEntity, string> = {
  newco: "NewCo",
  bsg: "BSG",
};

const ENTITY_BANNER_CLASS: Record<CashFlowEntity, string> = {
  newco: "bg-zinc-500 dark:bg-zinc-600 text-white",
  bsg: "bg-zinc-300 dark:bg-zinc-400 text-zinc-900",
};

const ENTITY_ORDER: CashFlowEntity[] = ["newco", "bsg"];

// Mapa de código do Plano de Contas (grupo N.1, canal ou AACC/+19 corporativo) -> linha do Fluxo de Caixa.
// Compartilhado entre NewCo e BSG (BSG ganhou as mesmas categorias detalhadas do NewCo para receber as
// importações reais de Contas a Pagar/Pagas); só o nome da linha de "Sueldos" difere entre as duas.
// Códigos não mapeados caem em "Otros" e são contabilizados no resumo da importação.
const BASE_CODE_TO_LEAF: Record<string, string> = {
  "2.1": "Alquileres", "21.1": "Alquileres",
  "3.1": "Logistica",
  "4.1": "Impuestos", "22.1": "Impuestos",
  "5.1": "Marketing", "23.1": "Marketing",
  "6.1": "Servicios", "25.1": "Servicios",
  "7.1": "Mantenimiento", "26.1": "Mantenimiento",
  "9.1": "Otros Variables s/ vendas",
  "11.1": "Viaticos", "28.1": "Viaticos",
  "13.1": "Honorarios", "24.1": "Honorarios",
  "10.1": "Otros", "27.1": "Otros",
  // Deduções sobre venda (IVA/ICMS/PIS/COFINS/IPI) e CMV: pagamentos ligados a mercadoria/fornecedores.
  "41.1": "Proveedores del Exterior", "43.1": "Proveedores del Exterior",
};

const NEWCO_CODE_TO_LEAF: Record<string, string> = {
  ...BASE_CODE_TO_LEAF,
  "1.1": "Sueldos", "20.1": "Sueldos",
};

const BSG_CODE_TO_LEAF: Record<string, string> = {
  ...BASE_CODE_TO_LEAF,
  "1.1": "Sueldos + cargos", "20.1": "Sueldos + cargos",
};
// Códigos analíticos específicos (mais granulares que o grupo N.1) que precisam de tratamento à parte.
const BSG_CODE_OVERRIDES: Record<string, string> = {
  "30.1.3": "Banco", // Intereses Bancarios
};


function excelSerialToYearMonth(serial: number): { year: number; month: number } | null {
  if (!serial || typeof serial !== "number" || isNaN(serial)) return null;
  const utcDays = Math.floor(serial - 25569);
  const date = new Date(utcDays * 86400 * 1000);
  return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1 };
}

// Remove as setas de incremento nativas do <input type="number"> (Chrome/Safari e Firefox), mantendo o campo editável.
const NUMBER_INPUT_CLASS =
  "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

function diffColor(diff: number) {
  if (diff === 0) return "text-zinc-400 dark:text-zinc-600";
  return diff > 0 ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-rose-600 dark:text-rose-400 font-bold";
}

function CellValue({ value }: { value: number }) {
  if (value === 0) return <span className="text-zinc-400 dark:text-zinc-600">-</span>;
  return <span>{formatCurrency(value)}</span>;
}

function DiffCell({ planned, realized }: { planned: number; realized: number }) {
  const diff = realized - planned;
  if (planned === 0 && realized === 0) return <span className="text-zinc-400 dark:text-zinc-600">-</span>;
  return <span className={diffColor(diff)}>{formatCurrency(diff)}</span>;
}

function DiffPctCell({ planned, realized }: { planned: number; realized: number }) {
  if (!planned) return <span className="text-zinc-400 dark:text-zinc-600">-</span>;
  const diff = realized - planned;
  const pct = diff / Math.abs(planned);
  return <span className={diffColor(diff)}>{formatPercent(pct)}</span>;
}

type EntityView = "both" | CashFlowEntity;

export function FluxoCaixaManager() {
  const toast = useToast();
  const confirmAction = useConfirm();
  const [items, setItems] = useState<CashFlowLineItem[]>([]);
  const [entityView, setEntityView] = useState<EntityView>("both");
  // Filtro de Projeto: "all" mostra o total normal; escolhendo um canal, todo o Fluxo de Caixa
  // (linhas e totais calculados) passa a refletir só o que caiu naquele Projeto na importação.
  const [channelView, setChannelView] = useState<"all" | CashFlowChannel>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());
  const [pendingImport, setPendingImport] = useState<{
    fileName: string;
    data: any[][];
    field: "planned" | "realized";
    fieldLabel: string;
    summary: ImportProjSummaryEntry[];
  } | null>(null);

  // Mostra os 12 meses por padrão (não só o trimestre atual) — igual à DRE, pra não esconder
  // dados de outros meses enquanto se está validando um import.
  const [visibleMonths, setVisibleMonths] = useState<Record<string, boolean>>(() => {
    const m: Record<string, boolean> = { total: true };
    CASH_FLOW_MONTHS.forEach((mo) => (m[mo.id] = true));
    return m;
  });

  const [showPlanned, setShowPlanned] = useState(true);
  const [showRealized, setShowRealized] = useState(true);
  const [showVariance, setShowVariance] = useState(true);
  const [showVariancePct, setShowVariancePct] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FLUXO);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
          return;
        }
      }
      setItems(SEED_ITEMS);
    } catch (e) {
      setItems(SEED_ITEMS);
    }
  }, []);

  // Visão usada para renderizar/calcular a tela: com um Projeto selecionado, cada linha mostra só
  // o recorte daquele canal (o restante do app — totais calculados, exportação — nem sabe que
  // está filtrado, só recebe itens já reduzidos ao canal escolhido).
  const displayItems = useMemo(() => {
    if (channelView === "all") return items;
    return items.map((it) => ({ ...it, months: monthsForChannel(it.months, channelView) }));
  }, [items, channelView]);

  const saveItems = (data: CashFlowLineItem[], msg = "Fluxo de Caixa salvo com sucesso!") => {
    setItems(data);
    try {
      localStorage.setItem(STORAGE_KEY_FLUXO, JSON.stringify(data));
      toast.success(msg);
    } catch (e) {
      console.error("Erro ao salvar fluxo de caixa:", e);
    }
  };

  const handleValueChange = (id: string, monthId: CashFlowMonthId, field: "planned" | "realized", raw: string) => {
    const numericVal = parseFloat(raw.replace(/[^0-9.-]/g, "")) || 0;
    const updated = items.map((item) => {
      if (item.id !== id) return item;
      return {
        ...item,
        months: {
          ...item.months,
          [monthId]: { ...item.months[monthId], [field]: numericVal },
        },
      };
    });
    setItems(updated);
  };

  const handleManualSave = () => saveItems(items);

  const handleReset = async () => {
    const ok = await confirmAction(
      "Isso zera Orçado e Realizado de todos os meses, para você importar do zero e conferir se os dados batem. Não pode ser desfeito.",
      { title: "Zerar o Fluxo de Caixa?", confirmLabel: "Zerar", tone: "danger" }
    );
    if (ok) {
      // O mapeamento Projeto -> Canal é compartilhado com a DRE (mesma base de dados), então
      // "Zerar Tudo" aqui não mexe nele — zerar isso afetaria a DRE também.
      const clean = SEED_ITEMS.map((item) => ({
        ...item,
        months: Object.fromEntries(
          Object.keys(item.months).map((monthId) => [monthId, { planned: 0, realized: 0 }])
        ) as CashFlowLineItem["months"],
      }));
      saveItems(clean, "Fluxo de Caixa zerado com sucesso!");
    }
  };

  const toggleSection = (sectionKey: string) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionKey)) next.delete(sectionKey);
      else next.add(sectionKey);
      return next;
    });
  };

  const activeMonthsList = useMemo(() => CASH_FLOW_MONTHS.filter((m) => visibleMonths[m.id]), [visibleMonths]);

  const visibleEntities: CashFlowEntity[] = entityView === "both" ? ENTITY_ORDER : [entityView];

  type RenderRow =
    | { type: "entity-banner"; entity: CashFlowEntity }
    | { type: "section"; entity: CashFlowEntity; section: string }
    | { type: "leaf"; item: CashFlowLineItem }
    | { type: "computed"; entity: CashFlowEntity; row: ComputedRow }
    | { type: "grand-total"; row: ComputedRow };

  const renderRows: RenderRow[] = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    const out: RenderRow[] = [];

    visibleEntities.forEach((entity) => {
      const entityAllItems = displayItems.filter((i) => i.entity === entity);
      const filtered = term
        ? entityAllItems.filter((i) => i.name.toLowerCase().includes(term) || i.section.toLowerCase().includes(term))
        : entityAllItems;

      // Ao buscar com várias entidades visíveis, oculta o bloco inteiro se nada bateu nele.
      if (term && filtered.length === 0 && visibleEntities.length > 1) return;

      out.push({ type: "entity-banner", entity });

      const computed = entity === "newco" ? buildNewcoComputed(entityAllItems) : buildBsgComputed(entityAllItems);

      ENTITY_SECTIONS[entity].forEach((section) => {
        const leaves = filtered.filter((i) => i.section === section);
        if (leaves.length === 0 && !term) return;
        const sectionKey = `${entity}::${section}`;
        out.push({ type: "section", entity, section });
        if (!term && collapsedSections.has(sectionKey)) {
          // collapsed: skip leaves
        } else {
          leaves.forEach((item) => out.push({ type: "leaf", item }));
        }
        computed.filter((r) => r.section === section).forEach((row) => out.push({ type: "computed", entity, row }));
      });
    });

    // Total combinando NewCo + BSG: só faz sentido com as duas entidades visíveis e sem busca
    // ativa (que já filtra pra um subconjunto de linhas).
    if (!term && visibleEntities.length === 2) {
      const newcoItems = displayItems.filter((i) => i.entity === "newco");
      const bsgItems = displayItems.filter((i) => i.entity === "bsg");
      out.push({ type: "grand-total", row: buildGrandTotal(newcoItems, bsgItems) });
    }

    return out;
  }, [displayItems, visibleEntities, collapsedSections, searchTerm]);

  const visibleLineCount = useMemo(
    () => renderRows.filter((r) => r.type === "leaf").length,
    [renderRows]
  );

  const handleExport = () => {
    let csv = "Entidade,Secao,Linha";
    activeMonthsList.forEach((m) => {
      csv += `,${m.short}_Ppto,${m.short}_Real,${m.short}_Dif`;
    });
    csv += ",Anual_Ppto,Anual_Real,Anual_Dif\n";

    renderRows.forEach((r) => {
      if (r.type === "section" || r.type === "entity-banner") return;
      const entityLabel = r.type === "leaf" ? ENTITY_LABELS[r.item.entity] : r.type === "grand-total" ? "NewCo + BSG" : ENTITY_LABELS[r.entity];
      const label = r.type === "leaf" ? r.item.name : r.row.label;
      const section = r.type === "leaf" ? r.item.section : r.row.section;
      const months = r.type === "leaf" ? r.item.months : r.row.months;
      const kind = r.type === "leaf" ? "leaf" : r.row.kind;
      csv += `"${entityLabel}","${section}","${label}"`;
      activeMonthsList.forEach((m) => {
        const p = months[m.id]?.planned || 0;
        const rl = months[m.id]?.realized || 0;
        csv += `,${p.toFixed(2)},${rl.toFixed(2)},${(rl - p).toFixed(2)}`;
      });
      const total = totalForRow(months, kind);
      csv += `,${total.planned.toFixed(2)},${total.realized.toFixed(2)},${(total.realized - total.planned).toFixed(2)}\n`;
    });

    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csv);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `fluxo_caixa_${entityView}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Aplica o mapeamento Projeto -> Entidade (NewCo/BSG) já confirmado sobre os dados lidos do
  // arquivo: acha o mês pela data, a entidade pelo Projeto, a linha do fluxo pelo código de conta,
  // e soma tudo por entidade/linha/mês.
  const finalizeFluxoImport = (
    data: any[][],
    field: "planned" | "realized",
    fieldLabel: string,
    mapping: Record<string, ImportChannel>,
    fileName: string,
    summary: ImportProjSummaryEntry[]
  ) => {
    type AggCell = { total: number; byChannel: Partial<Record<CashFlowChannel, number>> };
    const agg: Record<CashFlowEntity, Record<string, Partial<Record<CashFlowMonthId, AggCell>>>> = {
      newco: {},
      bsg: {},
    };
    let mapped = 0;
    let unmapped = 0;
    let outOfYear = 0;
    let outOfYearTotal = 0;
    let noProjTotal = 0;
    let grandTotal = 0;
    const unmappedCodes = new Set<string>();

    // O Valor do arquivo vem sempre positivo (mesma situação que corrigimos na DRE) — o sinal
    // certo é decidido pelo tipo da linha de destino (Ingreso soma, Egreso/Investimento reduz),
    // não pelo sinal bruto da planilha.
    const rowTypeByKey: Record<string, CashFlowRowType> = {};
    items.forEach((it) => {
      rowTypeByKey[`${it.entity}::${it.name}`] = it.rowType;
    });

    for (let i = 2; i < data.length; i++) {
      const row = data[i];
      const categoria = String(row?.[6] ?? "").trim();
      const amount = Number(row?.[4]);
      if (!categoria || !amount) continue; // pula linha de total/rodapé da planilha (sem Categoria)

      const dateInfo = excelSerialToYearMonth(Number(row?.[0]));
      if (!dateInfo || dateInfo.year !== 2026) {
        outOfYear++;
        outOfYearTotal += Math.abs(amount);
        continue;
      }
      const monthId = String(dateInfo.month).padStart(2, "0") as CashFlowMonthId;

      const rawProj = String(row?.[7] ?? row?.[8] ?? "").trim();
      const proj = rawProj.toUpperCase() || "(SEM PROJETO)";
      const channel = mapping[proj] || suggestChannel(proj);
      const entity = channelToEntity(channel);
      if (proj === "(SEM PROJETO)") noProjTotal += Math.abs(amount);

      const codeMatch = categoria.match(/^([0-9.]+)/);
      const fullCode = codeMatch ? codeMatch[1].replace(/\.$/, "") : "";
      const group = fullCode.split(".").slice(0, 2).join(".");

      let leaf: string | undefined =
        entity === "bsg" ? BSG_CODE_OVERRIDES[fullCode] || BSG_CODE_TO_LEAF[group] : NEWCO_CODE_TO_LEAF[group];

      if (!leaf) {
        leaf = "Otros";
        unmapped++;
        if (fullCode) unmappedCodes.add(fullCode);
      } else {
        mapped++;
      }

      // Só linha de Ingreso fica positiva; Egreso/Investimento (e qualquer linha que eu não
      // reconheça) entra negativo — Contas a Pagar/Pagas são sempre pagamentos (saída de caixa).
      const rowType = rowTypeByKey[`${entity}::${leaf}`];
      const magnitude = Math.abs(amount);
      const signedAmount = rowType === "income" ? magnitude : -magnitude;

      grandTotal += magnitude;
      agg[entity][leaf] = agg[entity][leaf] || {};
      if (!agg[entity][leaf][monthId]) agg[entity][leaf][monthId] = { total: 0, byChannel: {} };
      const cell = agg[entity][leaf][monthId]!;
      cell.total += signedAmount;
      cell.byChannel[channel] = (cell.byChannel[channel] || 0) + signedAmount;
    }

    const byChannelField = field === "planned" ? "plannedByChannel" : "realizedByChannel";
    const updated = items.map((item) => {
      const leafAgg = agg[item.entity]?.[item.name];
      if (!leafAgg) return item;
      const months = { ...item.months };
      Object.entries(leafAgg).forEach(([monthId, cell]) => {
        if (!cell) return;
        months[monthId as CashFlowMonthId] = {
          ...months[monthId as CashFlowMonthId],
          [field]: cell.total,
          [byChannelField]: cell.byChannel,
        };
      });
      return { ...item, months };
    });

    // Salva no MESMO mapeamento que a DRE usa — confirmar aqui já vale lá, e vice-versa.
    saveProjChannelMap({ ...loadProjChannelMap(), ...mapping });

    const totals = summary.reduce(
      (acc, s) => {
        acc[channelToEntity(mapping[s.proj] || s.channel)] += s.amount;
        return acc;
      },
      { newco: 0, bsg: 0 } as Record<CashFlowEntity, number>
    );

    saveItems(
      updated,
      `Importação (${fieldLabel}) concluída: ${mapped} lançamentos mapeados, ${unmapped} sem categoria reconhecida (agrupados em "Otros"), ${outOfYear} fora de 2026.`
    );
    setPendingImport(null);

    // Fica na tela até você dispensar (não some sozinho como o toast de sucesso). O "Valor Total
    // do Arquivo" aqui é a soma de TUDO (mesmo cálculo da tela de revisão) — pra bater exatamente
    // com o número que você viu lá. O que ficou de fora do Fluxo de Caixa (ex.: fora de 2026)
    // aparece à parte, subtraído desse total.
    const fileTotalLikeReview = grandTotal + outOfYearTotal;
    toast.warning(
      `Valor Total do Arquivo: ${formatCurrency(fileTotalLikeReview)}`,
      `"${fileName}" — ${fieldLabel}. Entrou no Fluxo de Caixa: ${formatCurrency(grandTotal)} (NewCo ${formatCurrency(totals.newco)}, BSG ${formatCurrency(totals.bsg)}).${
        outOfYearTotal > 0 ? ` Ficou de fora (fora de 2026): ${formatCurrency(outOfYearTotal)}.` : ""
      }`
    );

    console.log("[Fluxo de Caixa import] resumo:", {
      valorTotalArquivo: formatCurrency(fileTotalLikeReview),
      entrouNoFluxoDeCaixa: formatCurrency(grandTotal),
      porEntidade: { newco: formatCurrency(totals.newco), bsg: formatCurrency(totals.bsg) },
      semCategoriaReconhecida: unmapped,
      codigosNaoMapeados: Array.from(unmappedCodes),
      forDoAno2026: { count: outOfYear, total: formatCurrency(outOfYearTotal) },
      semProjeto: formatCurrency(noProjTotal),
    });

    if (noProjTotal > 0) {
      toast.warning(
        "Lançamento sem Projeto",
        `${formatCurrency(noProjTotal)} do arquivo não tinha Projeto preenchido — foi para "${ENTITY_LABELS[channelToEntity(suggestChannel("(SEM PROJETO)"))]}" por padrão. Confira se isso é esperado.`
      );
    }
    if (outOfYear > 0) {
      toast.warning("Lançamentos fora de 2026", `${outOfYear} lançamento(s) do arquivo têm data fora de 2026 e não entraram no Fluxo de Caixa.`);
    }
    if (unmapped > 0) {
      const sample = Array.from(unmappedCodes).slice(0, 8).join(", ");
      toast.warning(
        "Código sem categoria no Fluxo de Caixa",
        `${unmapped} lançamento(s) com código de conta sem linha correspondente aqui — foram agrupados em "Otros". Códigos: ${sample}${unmappedCodes.size > 8 ? "..." : ""}.`
      );
    }
  };

  // Importa lançamentos de "Contas a Pagar" (-> Ppto) ou "Contas Pagas" (-> Real): planilhas
  // exportadas do sistema de contas a pagar/pagas, com uma linha por lançamento, identificadas
  // pelo Projeto (mesma coluna usada na DRE) e pelo código do Plano de Contas (coluna "Categoria",
  // ex.: "13.1.1 - Honorarios Contabilidad - (C)"). Também aceita reimportar a própria planilha
  // "CashFlow - 2026.xlsx" original (layout de 4 colunas por mês, casado por nome de linha).
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const data: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });
        if (!data || data.length < 3) {
          toast.warning("Arquivo sem registros suficientes", "Esse arquivo Excel não tem linhas de dados para importar.");
          return;
        }

        const headerRow = (data[1] || []).map((h: any) => String(h ?? "").trim());
        const hasAPagar = headerRow.includes("A Pagar ou Receber");
        const hasPago = headerRow.includes("Pago ou Recebido");
        const isLedgerFormat = headerRow.includes("Categoria") && (hasAPagar || hasPago);

        if (isLedgerFormat) {
          const field: "planned" | "realized" = hasAPagar ? "planned" : "realized";
          const fieldLabel = field === "planned" ? "Orçado (Ppto)" : "Realizado";

          // 1ª passada: só agrupa por Projeto (mesma coluna e mesma lógica da DRE) pra montar a
          // tela de revisão — o rollup por código de conta acontece depois, já com a entidade
          // (NewCo/BSG) confirmada.
          const projGroups: Record<string, { rawLabel: string; count: number; amount: number }> = {};
          for (let i = 2; i < data.length; i++) {
            const row = data[i];
            const categoria = String(row?.[6] ?? "").trim();
            const amount = Number(row?.[4]);
            if (!categoria || !amount) continue; // pula linha de total/rodapé da planilha (sem Categoria)
            const rawProj = String(row?.[7] ?? row?.[8] ?? "").trim();
            const proj = rawProj.toUpperCase() || "(SEM PROJETO)";
            if (!projGroups[proj]) {
              projGroups[proj] = { rawLabel: rawProj || "(sem projeto)", count: 0, amount: 0 };
            }
            projGroups[proj].count += 1;
            projGroups[proj].amount += Math.abs(amount);
          }

          // Mesmo mapeamento Projeto -> Canal da DRE (mesma base de dados) — se já foi confirmado
          // lá, não pergunta de novo aqui.
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
            const mapping = Object.fromEntries(summary.map((s) => [s.proj, s.channel])) as Record<string, ImportChannel>;
            finalizeFluxoImport(data, field, fieldLabel, mapping, file.name, summary);
          } else {
            setPendingImport({ fileName: file.name, data, field, fieldLabel, summary });
          }
          return;
        }

        // Layout original da planilha CashFlow - 2026.xlsx (4 colunas por mês, casado por nome de linha).
        // Como NewCo e BSG têm linhas com o mesmo nome (ex.: "Impuestos", "Otros"), essa reimportação
        // exige uma entidade específica selecionada, para não aplicar a mesma linha às duas.
        if (entityView === "both") {
          toast.warning(
            "Selecione uma entidade antes de importar",
            'Para reimportar a planilha "CashFlow - 2026.xlsx" original, selecione NewCo ou BSG (não "Ambos").'
          );
          return;
        }
        const targetEntity = entityView;
        let matched = 0;
        const updated = items.map((item) => {
          if (item.entity !== targetEntity) return item;
          const rowArr = data.find(
            (r) => String(r?.[0] ?? "").trim().toLowerCase() === item.name.trim().toLowerCase()
          );
          if (!rowArr) return item;
          matched++;
          const months = { ...item.months };
          CASH_FLOW_MONTHS.forEach((m, i) => {
            const base = 1 + 4 * i;
            const p = Number(rowArr[base]);
            const r = Number(rowArr[base + 1]);
            months[m.id] = {
              planned: isNaN(p) ? months[m.id].planned : p,
              realized: isNaN(r) ? months[m.id].realized : r,
            };
          });
          return { ...item, months };
        });
        saveItems(updated, `Importação concluída: ${matched} linhas atualizadas em ${ENTITY_LABELS[targetEntity]}.`);
      } catch (err) {
        console.error(err);
        toast.warning("Erro ao processar o arquivo", "Não consegui importar esse arquivo. Confira se o formato está certo e tente de novo.");
      } finally {
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    };
    reader.readAsBinaryString(file);
  };

  const metricsPerMonth = [showPlanned, showRealized, showVariance, showVariancePct].filter(Boolean).length;
  const totalColSpan = 1 + activeMonthsList.length * metricsPerMonth + (visibleMonths.total ? 3 : 0);

  return (
    <div className="flex gap-4 items-start w-full relative">
      <div className="flex-1 min-w-0 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 bg-card px-4 py-3 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-foreground tracking-tight">Fluxo de Caixa 2026</h1>
            <Badge variant="secondary" className="font-mono text-[10px]">
              {visibleLineCount} linhas
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            {/* Entity view selector */}
            <div className="flex items-center border border-zinc-300 dark:border-zinc-700 bg-card p-0.5">
              <button
                onClick={() => setEntityView("both")}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold transition-colors ${
                  entityView === "both" ? "bg-zinc-700 text-white" : "text-zinc-600 dark:text-zinc-400 hover:text-foreground"
                }`}
              >
                Ambos
              </button>
              {(Object.keys(ENTITY_LABELS) as CashFlowEntity[]).map((ent) => (
                <button
                  key={ent}
                  onClick={() => setEntityView(ent)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold transition-colors ${
                    entityView === ent ? "bg-zinc-700 text-white" : "text-zinc-600 dark:text-zinc-400 hover:text-foreground"
                  }`}
                >
                  <Building2 className="h-3 w-3" />
                  {ENTITY_LABELS[ent]}
                </button>
              ))}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              className="hidden"
              onChange={handleFileUpload}
            />

            {!isFilterPanelOpen && (
              <button
                onClick={() => setIsFilterPanelOpen(true)}
                className="flex items-center gap-2 px-3.5 py-1.5 border border-zinc-300 dark:border-zinc-700 bg-card hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 shadow-xs transition-all"
              >
                <SlidersHorizontal className="h-3.5 w-3.5 text-zinc-700 dark:text-zinc-300" />
                <span>Filtrar</span>
              </button>
            )}
          </div>
        </div>


        {/* Table */}
        <div className="border border-zinc-200 dark:border-zinc-800 bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11px] border-collapse whitespace-nowrap">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-200/90 dark:bg-zinc-800/90 text-[10px] font-extrabold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                  <th className="w-[260px] min-w-[260px] max-w-[260px] py-2.5 px-3 border-r-2 border-zinc-400 dark:border-zinc-600 sticky left-0 z-30 bg-zinc-200 dark:bg-zinc-800 shadow-[2px_0_4px_-1px_rgba(0,0,0,0.1)]">
                    Cash Flow BRASIL en R$ M
                  </th>
                  {activeMonthsList.map((m) => (
                    <th
                      key={m.id}
                      colSpan={metricsPerMonth}
                      className="py-2 px-2 text-center border-r border-zinc-300 dark:border-zinc-700 font-bold"
                    >
                      {m.short}/26
                    </th>
                  ))}
                  {visibleMonths.total && (
                    <th colSpan={3} className="py-2 px-2 text-center bg-zinc-300 dark:bg-zinc-700 font-black text-zinc-950 dark:text-white">
                      2026 CONSOLIDADO
                    </th>
                  )}
                </tr>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/90 dark:bg-zinc-900/90 text-[9px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                  <th className="sticky left-0 z-30 bg-zinc-100 dark:bg-zinc-900 border-r-2 border-zinc-400 dark:border-zinc-600" />
                  {activeMonthsList.map((m) => (
                    <React.Fragment key={m.id}>
                      {showPlanned && <th className="py-1.5 px-1.5 text-right border-r border-zinc-200 dark:border-zinc-800 min-w-[95px]">Ppto</th>}
                      {showRealized && <th className="py-1.5 px-1.5 text-right border-r border-zinc-200 dark:border-zinc-800 min-w-[95px]">Real</th>}
                      {showVariance && <th className="py-1.5 px-1.5 text-right border-r border-zinc-200 dark:border-zinc-800 min-w-[95px]">Dif.</th>}
                      {showVariancePct && <th className="py-1.5 px-1.5 text-right border-r border-zinc-300 dark:border-zinc-700 min-w-[70px]">Dif. %</th>}
                    </React.Fragment>
                  ))}
                  {visibleMonths.total && (
                    <>
                      <th className="py-1.5 px-1.5 text-right border-r border-zinc-200 dark:border-zinc-800 min-w-[105px]">Ppto</th>
                      <th className="py-1.5 px-1.5 text-right border-r border-zinc-200 dark:border-zinc-800 min-w-[105px]">Real</th>
                      <th className="py-1.5 px-1.5 text-right min-w-[105px]">Dif.</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/70 dark:divide-zinc-800/70">
                {renderRows.length === 0 ? (
                  <tr>
                    <td colSpan={totalColSpan} className="py-12 text-center text-muted-foreground">
                      Nenhuma linha encontrada.
                    </td>
                  </tr>
                ) : (
                  renderRows.map((r, idx) => {
                    if (r.type === "entity-banner") {
                      return (
                        <tr key={`banner-${r.entity}`} className={ENTITY_BANNER_CLASS[r.entity]}>
                          <td
                            colSpan={totalColSpan}
                            className={`sticky left-0 z-10 py-2 px-3 font-black text-sm tracking-wide ${ENTITY_BANNER_CLASS[r.entity]}`}
                          >
                            {ENTITY_LABELS[r.entity]}
                          </td>
                        </tr>
                      );
                    }

                    if (r.type === "section") {
                      const sectionKey = `${r.entity}::${r.section}`;
                      const isCollapsed = collapsedSections.has(sectionKey);
                      return (
                        <tr key={`sec-${sectionKey}`} className="bg-zinc-100/80 dark:bg-zinc-900/80">
                          <td
                            className="sticky left-0 z-10 bg-zinc-100 dark:bg-zinc-900 border-r-2 border-zinc-400 dark:border-zinc-600 py-1.5 px-3 font-extrabold text-[11px] text-foreground cursor-pointer select-none"
                            onClick={() => toggleSection(sectionKey)}
                          >
                            <div className="flex items-center gap-1.5">
                              {isCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                              {r.section}
                            </div>
                          </td>
                          <td colSpan={totalColSpan - 1} className="bg-zinc-100/80 dark:bg-zinc-900/80" />
                        </tr>
                      );
                    }

                    const row = r.type === "computed" || r.type === "grand-total" ? r.row : null;
                    const isComputed = row !== null;
                    const leafItem = r.type === "leaf" ? r.item : null;
                    const label = row ? row.label : (leafItem as CashFlowLineItem).name;
                    const months = row ? row.months : (leafItem as CashFlowLineItem).months;
                    const kind = row ? row.kind : "leaf";

                    let rowBg = "hover:bg-zinc-50/80 dark:hover:bg-zinc-900/60 transition-colors";
                    let stickyBg = "bg-card";
                    if (r.type === "grand-total") {
                      rowBg = "bg-zinc-200 dark:bg-zinc-800 font-black border-y-2 border-zinc-400 dark:border-zinc-600";
                      stickyBg = "bg-zinc-200 dark:bg-zinc-800 font-black";
                    } else if (kind === "result" || kind === "balance") {
                      rowBg = "bg-zinc-100/95 dark:bg-zinc-900/95 font-bold border-y border-zinc-300 dark:border-zinc-700";
                      stickyBg = "bg-zinc-100/95 dark:bg-zinc-900/95 font-bold";
                    } else if (kind === "total") {
                      rowBg = "bg-zinc-50/60 dark:bg-zinc-950/40 font-semibold";
                      stickyBg = "bg-zinc-50 dark:bg-zinc-950 font-semibold";
                    }

                    return (
                      <tr key={row ? row.key : (r as { item: CashFlowLineItem }).item.id} className={rowBg}>
                        <td className={`sticky left-0 z-10 border-r-2 border-zinc-400 dark:border-zinc-600 py-1.5 px-3 ${stickyBg} shadow-[2px_0_4px_-1px_rgba(0,0,0,0.1)]`}>
                          <div className="flex items-center gap-1.5 pl-4">
                            {kind === "leaf" && <span className="font-mono text-[10px] font-bold text-zinc-400 dark:text-zinc-500">└</span>}
                            <span className={kind === "leaf" ? "text-foreground/90" : "text-foreground"}>{label}</span>
                          </div>
                        </td>

                        {activeMonthsList.map((m) => {
                          const planned = months[m.id]?.planned || 0;
                          const realized = months[m.id]?.realized || 0;
                          return (
                            <React.Fragment key={m.id}>
                              {showPlanned && (
                                <td className="py-1 px-1.5 text-right border-r border-zinc-200 dark:border-zinc-800 font-mono">
                                  {kind === "leaf" && channelView === "all" ? (
                                    <input
                                      type="number"
                                      step="any"
                                      value={planned !== 0 ? planned : ""}
                                      placeholder="0,00"
                                      onChange={(e) => handleValueChange((leafItem as CashFlowLineItem).id, m.id, "planned", e.target.value)}
                                      className={`w-full text-right font-mono text-[11px] px-1 py-0.5 bg-transparent border border-transparent rounded-none hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 focus:bg-zinc-50 dark:focus:bg-zinc-900 focus:border-zinc-400 dark:focus:border-zinc-600 focus:outline-hidden focus:ring-1 focus:ring-zinc-600 transition-colors ${NUMBER_INPUT_CLASS}`}
                                    />
                                  ) : (
                                    <CellValue value={planned} />
                                  )}
                                </td>
                              )}
                              {showRealized && (
                                <td className="py-1 px-1.5 text-right border-r border-zinc-200 dark:border-zinc-800 font-mono">
                                  {kind === "leaf" && channelView === "all" ? (
                                    <input
                                      type="number"
                                      step="any"
                                      value={realized !== 0 ? realized : ""}
                                      placeholder="0,00"
                                      onChange={(e) => handleValueChange((leafItem as CashFlowLineItem).id, m.id, "realized", e.target.value)}
                                      className={`w-full text-right font-mono text-[11px] px-1 py-0.5 bg-transparent border border-transparent rounded-none hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 focus:bg-zinc-50 dark:focus:bg-zinc-900 focus:border-zinc-400 dark:focus:border-zinc-600 focus:outline-hidden focus:ring-1 focus:ring-zinc-600 transition-colors ${NUMBER_INPUT_CLASS}`}
                                    />
                                  ) : (
                                    <CellValue value={realized} />
                                  )}
                                </td>
                              )}
                              {showVariance && (
                                <td className="py-1 px-1.5 text-right border-r border-zinc-200 dark:border-zinc-800 font-mono">
                                  <DiffCell planned={planned} realized={realized} />
                                </td>
                              )}
                              {showVariancePct && (
                                <td className="py-1 px-1.5 text-right border-r border-zinc-300 dark:border-zinc-700 font-mono">
                                  <DiffPctCell planned={planned} realized={realized} />
                                </td>
                              )}
                            </React.Fragment>
                          );
                        })}

                        {visibleMonths.total && (
                          <>
                            {(() => {
                              const total = totalForRow(months, kind);
                              return (
                                <>
                                  <td className="py-1 px-1.5 text-right border-r border-zinc-200 dark:border-zinc-800 font-mono bg-zinc-100/50 dark:bg-zinc-900/50 font-bold">
                                    <CellValue value={total.planned} />
                                  </td>
                                  <td className="py-1 px-1.5 text-right border-r border-zinc-200 dark:border-zinc-800 font-mono bg-zinc-100/50 dark:bg-zinc-900/50 font-bold">
                                    <CellValue value={total.realized} />
                                  </td>
                                  <td className="py-1 px-1.5 text-right font-mono bg-zinc-100/50 dark:bg-zinc-900/50 font-bold">
                                    <DiffCell planned={total.planned} realized={total.realized} />
                                  </td>
                                </>
                              );
                            })()}
                          </>
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

      {/* Filter drawer */}
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
              <h3 className="text-base font-extrabold text-foreground tracking-tight">Filtrar Fluxo de Caixa</h3>
              <button
                onClick={() => setIsFilterPanelOpen(false)}
                className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 hover:text-foreground transition-colors"
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
                <span>SALVAR FLUXO DE CAIXA</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-colors"
              >
                <UploadCloud className="h-3.5 w-3.5" />
                <span>IMPORTAR (CONTAS A PAGAR/PAGAS)</span>
              </button>

              <button
                onClick={handleReset}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>ZERAR TUDO</span>
              </button>

              <button
                onClick={handleExport}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                <span>EXPORTAR (CSV)</span>
              </button>
            </div>

            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Projeto</label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => setChannelView("all")}
                    className={`py-1.5 text-[11px] font-bold border transition-colors ${
                      channelView === "all"
                        ? "bg-zinc-700 text-white border-zinc-700 shadow-2xs"
                        : "border-zinc-300 dark:border-zinc-700 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                  >
                    Todos
                  </button>
                  {(Object.keys(CHANNEL_LABELS) as CashFlowChannel[]).map((ch) => (
                    <button
                      key={ch}
                      onClick={() => setChannelView(ch)}
                      className={`py-1.5 text-[11px] font-bold border transition-colors ${
                        channelView === ch
                          ? "bg-zinc-700 text-white border-zinc-700 shadow-2xs"
                          : "border-zinc-300 dark:border-zinc-700 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      }`}
                    >
                      {CHANNEL_LABELS[ch]}
                    </button>
                  ))}
                </div>
                {channelView !== "all" && (
                  <p className="text-[10px] text-muted-foreground mt-1.5 leading-relaxed">
                    Mostrando só {CHANNEL_LABELS[channelView]}. Edição manual desativada nesse filtro — volte para "Todos" pra editar.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Período</label>
                <PeriodFilterDropdown year="2026" months={CASH_FLOW_MONTHS} value={visibleMonths} onChange={setVisibleMonths} />
              </div>

              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <label className="block text-xs font-semibold text-foreground mb-1.5">Colunas Visíveis</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { label: "Ppto", val: showPlanned, set: setShowPlanned },
                    { label: "Real", val: showRealized, set: setShowRealized },
                    { label: "Dif.", val: showVariance, set: setShowVariance },
                    { label: "Dif. %", val: showVariancePct, set: setShowVariancePct },
                  ].map((c) => (
                    <button
                      key={c.label}
                      onClick={() => c.set(!c.val)}
                      className={`py-1.5 text-[11px] font-bold border transition-colors ${
                        c.val
                          ? "bg-zinc-700 text-white border-zinc-700 shadow-2xs"
                          : "border-zinc-300 dark:border-zinc-700 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <label className="block text-xs font-semibold text-foreground mb-1.5">Buscar Linha</label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Nome da linha ou seção..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 text-xs h-8 bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-300 dark:border-zinc-700"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {pendingImport && (
        <ImportReviewModal
          fileName={`${pendingImport.fileName} — ${pendingImport.fieldLabel}`}
          summary={pendingImport.summary}
          onCancel={() => setPendingImport(null)}
          onConfirm={(mapping) =>
            finalizeFluxoImport(pendingImport.data, pendingImport.field, pendingImport.fieldLabel, mapping, pendingImport.fileName, pendingImport.summary)
          }
        />
      )}
    </div>
  );
}
