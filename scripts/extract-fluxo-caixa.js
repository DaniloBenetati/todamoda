// One-off utility: extracts the "Fluxo 2026" sheet from the source workbook into
// clean per-month {planned, realized} rows for NewCo and BSG. Run with:
//   node scripts/extract-fluxo-caixa.js
// Not part of the app bundle.
const XLSX = require("xlsx");
const path = require("path");

const SRC = "C:/Users/Aminna/Downloads/CashFlow - 2026.xlsx";
const wb = XLSX.readFile(SRC);
const ws = wb.Sheets["Fluxo 2026"];
const rows = XLSX.utils.sheet_to_json(ws, { header: 1, raw: true, defval: "" });

const MONTH_IDS = ["01","02","03","04","05","06","07","08","09","10","11","12"];

function num(v) {
  return typeof v === "number" ? v : 0;
}

function monthsFor(rowArr) {
  const months = {};
  MONTH_IDS.forEach((id, i) => {
    const base = 1 + 4 * i; // Ppto col index for month i
    months[id] = {
      planned: num(rowArr[base]),
      realized: num(rowArr[base + 1]),
    };
  });
  return months;
}

// rowIndex is 1-based, matching the printed dump earlier
const NEWCO_LEAVES = [
  { rowIndex: 6,  section: "Ingresos Operativos", name: "Ingresos Operativos - Tiendas", rowType: "income" },
  { rowIndex: 7,  section: "Ingresos Operativos", name: "Venta de Productos", rowType: "income" },
  { rowIndex: 8,  section: "Ingresos Operativos", name: "Royalties", rowType: "income" },
  { rowIndex: 9,  section: "Ingresos Operativos", name: "Taxa de Franquias", rowType: "income" },
  { rowIndex: 11, section: "Egresos", name: "Sueldos", rowType: "expense" },
  { rowIndex: 12, section: "Egresos", name: "Alquileres", rowType: "expense" },
  { rowIndex: 13, section: "Egresos", name: "Proveedores del Exterior", rowType: "expense" },
  { rowIndex: 14, section: "Egresos", name: "Nacionalización / Aduana", rowType: "expense" },
  { rowIndex: 15, section: "Egresos", name: "Logistica", rowType: "expense" },
  { rowIndex: 16, section: "Egresos", name: "Marketing", rowType: "expense" },
  { rowIndex: 17, section: "Egresos", name: "Servicios", rowType: "expense" },
  { rowIndex: 18, section: "Egresos", name: "Mantenimiento", rowType: "expense" },
  { rowIndex: 19, section: "Egresos", name: "Otros Variables s/ vendas", rowType: "expense" },
  { rowIndex: 20, section: "Egresos", name: "Otros", rowType: "expense" },
  { rowIndex: 21, section: "Egresos", name: "Viaticos", rowType: "expense" },
  { rowIndex: 22, section: "Egresos", name: "Honorarios", rowType: "expense" },
  { rowIndex: 23, section: "Egresos", name: "Impuestos", rowType: "expense" },
  { rowIndex: 24, section: "Egresos", name: "Otros Egresos", rowType: "expense" },
  { rowIndex: 27, section: "Investimentos", name: "Inaugurações de Lojas", rowType: "investment" },
  { rowIndex: 28, section: "Investimentos", name: "Outros Investimentos", rowType: "investment" },
];

const BSG_LEAVES = [
  { rowIndex: 43, section: "Ingresos", name: "Aporte - BSG", rowType: "income" },
  { rowIndex: 46, section: "Egresos", name: "Banco", rowType: "expense" },
  { rowIndex: 47, section: "Egresos", name: "Sueldos + cargos", rowType: "expense" },
  { rowIndex: 48, section: "Egresos", name: "Bônus equipo", rowType: "expense" },
  { rowIndex: 49, section: "Egresos", name: "Impuestos", rowType: "expense" },
  { rowIndex: 50, section: "Egresos", name: "Otros", rowType: "expense" },
  // Categorias adicionais (sem linha correspondente na planilha original — semente zerada) para dar ao BSG
  // a mesma granularidade do NewCo, já que as importações reais de Contas a Pagar/Pagas trazem lançamentos
  // de empresas do grupo BSG com o mesmo nível de detalhe do NewCo.
  { rowIndex: null, section: "Egresos", name: "Alquileres", rowType: "expense" },
  { rowIndex: null, section: "Egresos", name: "Proveedores del Exterior", rowType: "expense" },
  { rowIndex: null, section: "Egresos", name: "Logistica", rowType: "expense" },
  { rowIndex: null, section: "Egresos", name: "Marketing", rowType: "expense" },
  { rowIndex: null, section: "Egresos", name: "Servicios", rowType: "expense" },
  { rowIndex: null, section: "Egresos", name: "Mantenimiento", rowType: "expense" },
  { rowIndex: null, section: "Egresos", name: "Otros Variables s/ vendas", rowType: "expense" },
  { rowIndex: null, section: "Egresos", name: "Viaticos", rowType: "expense" },
  { rowIndex: null, section: "Egresos", name: "Honorarios", rowType: "expense" },
  { rowIndex: 58, section: "Aporte Líquido", name: "Aporte BSG", rowType: "memo" },
  { rowIndex: 59, section: "Aporte Líquido", name: "Aporte Morana", rowType: "memo" },
];

function build(entity, leaves, idPrefix) {
  return leaves.map((leaf, i) => ({
    id: `${idPrefix}-${i + 1}`,
    entity,
    section: leaf.section,
    name: leaf.name,
    rowType: leaf.rowType,
    months: leaf.rowIndex == null ? monthsFor([]) : monthsFor(rows[leaf.rowIndex - 1]),
  }));
}

const newco = build("newco", NEWCO_LEAVES, "cf-newco");
const bsg = build("bsg", BSG_LEAVES, "cf-bsg");

function round2(n) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

function monthsLiteral(months) {
  const parts = MONTH_IDS.map(
    (id) => `    "${id}": { planned: ${round2(months[id].planned)}, realized: ${round2(months[id].realized)} }`
  );
  return `{\n${parts.join(",\n")}\n  }`;
}

function itemsLiteral(items) {
  return items
    .map(
      (item) => `  {
    id: "${item.id}",
    entity: "${item.entity}",
    section: "${item.section}",
    name: "${item.name.replace(/"/g, '\\"')}",
    rowType: "${item.rowType}",
    months: ${monthsLiteral(item.months)},
  }`
    )
    .join(",\n");
}

const ts = `// Auto-generated from "CashFlow - 2026.xlsx" (aba "Fluxo 2026") via scripts/extract-fluxo-caixa.js
// Regenerate by re-running the script; do not hand-edit the seed arrays below.

export type CashFlowEntity = "newco" | "bsg";

export interface CashFlowMonthValue {
  planned: number;
  realized: number;
}

export type CashFlowMonthId = "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10" | "11" | "12";

export type CashFlowRowType =
  | "income"
  | "income-total"
  | "expense"
  | "expense-total"
  | "investment"
  | "investment-total"
  | "result"
  | "balance-final"
  | "memo";

export interface CashFlowLineItem {
  id: string;
  entity: CashFlowEntity;
  section: string;
  name: string;
  rowType: CashFlowRowType;
  months: Record<CashFlowMonthId, CashFlowMonthValue>;
}

export const CASH_FLOW_MONTHS: { id: CashFlowMonthId; label: string; short: string }[] = [
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

export const CASH_FLOW_NEWCO: CashFlowLineItem[] = [
${itemsLiteral(newco)}
];

export const CASH_FLOW_BSG: CashFlowLineItem[] = [
${itemsLiteral(bsg)}
];
`;

const outPath = path.join(__dirname, "..", "data", "fluxo-caixa-data.ts");
require("fs").writeFileSync(outPath, ts, "utf8");
console.log("Wrote", outPath);
