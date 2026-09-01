"use client";

import React, { useState, useMemo } from "react";
import { DRETransaction, DRELineItem, DRE_TRANSACTIONS_DATA } from "@/data/mock-dre-data";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  X, 
  Search, 
  ReceiptText, 
  Download, 
  Calendar, 
  Building2, 
  FileText,
  Filter
} from "lucide-react";

interface DREEntriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAccount?: DRELineItem | null;
}

export function DREEntriesModal({
  isOpen,
  onClose,
  selectedAccount,
}: DREEntriesModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  // Pre-fill filter if account selected
  const accountFilter = selectedAccount?.code || "";

  const filteredTransactions = useMemo(() => {
    return DRE_TRANSACTIONS_DATA.filter((tx) => {
      // If modal was opened from a specific account row
      if (accountFilter) {
        const matchesAccount = tx.code === accountFilter || tx.code.startsWith(accountFilter) || (selectedAccount && tx.categoryName.toLowerCase().includes(selectedAccount.name.toLowerCase()));
        if (!matchesAccount) return false;
      }

      // Filter by type
      if (filterType !== "all" && tx.type.toLowerCase() !== filterType.toLowerCase()) {
        return false;
      }

      // Search term filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        return (
          tx.supplier.toLowerCase().includes(term) ||
          tx.categoryName.toLowerCase().includes(term) ||
          tx.code.toLowerCase().includes(term) ||
          tx.doc.toLowerCase().includes(term) ||
          tx.entity.toLowerCase().includes(term)
        );
      }

      return true;
    });
  }, [accountFilter, filterType, searchTerm, selectedAccount]);

  const totalAmount = useMemo(() => {
    return filteredTransactions.reduce((acc, tx) => acc + tx.amount, 0);
  }, [filteredTransactions]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card w-full max-w-5xl max-h-[85vh] rounded-2xl border border-border shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-border flex items-center justify-between bg-neutral-50/80 dark:bg-neutral-900/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400">
              <ReceiptText className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">
                Lançamentos Contábeis / Razão Analítico
              </h2>
              <p className="text-xs text-muted-foreground">
                {selectedAccount
                  ? `Filtrado por: Conta ${selectedAccount.code} - ${selectedAccount.name}`
                  : "Todos os lançamentos do período (Base Contábil Real)"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Toolbar & Filters */}
        <div className="p-4 border-b border-border bg-card flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por fornecedor, documento ou conta..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 text-xs h-9"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg text-xs">
              <button
                onClick={() => setFilterType("all")}
                className={`px-2.5 py-1 rounded font-medium ${filterType === "all" ? "bg-white dark:bg-neutral-700 shadow-xs text-foreground font-semibold" : "text-muted-foreground"}`}
              >
                Todos ({DRE_TRANSACTIONS_DATA.length})
              </button>
              <button
                onClick={() => setFilterType("Débito")}
                className={`px-2.5 py-1 rounded font-medium ${filterType === "Débito" ? "bg-white dark:bg-neutral-700 shadow-xs text-foreground font-semibold" : "text-muted-foreground"}`}
              >
                Débitos
              </button>
              <button
                onClick={() => setFilterType("Crédito")}
                className={`px-2.5 py-1 rounded font-medium ${filterType === "Crédito" ? "bg-white dark:bg-neutral-700 shadow-xs text-foreground font-semibold" : "text-muted-foreground"}`}
              >
                Créditos
              </button>
            </div>

            <div className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-pink-500/10 text-pink-600 dark:text-pink-400 font-mono">
              Total: {formatCurrency(totalAmount)}
            </div>
          </div>
        </div>

        {/* Table content */}
        <div className="flex-1 overflow-y-auto overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="sticky top-0 bg-neutral-100/90 dark:bg-neutral-900/90 backdrop-blur-xs text-muted-foreground font-semibold uppercase tracking-wider border-b border-border">
              <tr>
                <th className="py-2.5 px-4">Data</th>
                <th className="py-2.5 px-4">Entidade</th>
                <th className="py-2.5 px-4">Fornecedor / Favorecido</th>
                <th className="py-2.5 px-4">Conta DRE</th>
                <th className="py-2.5 px-4">Documento</th>
                <th className="py-2.5 px-4 text-center">Tipo</th>
                <th className="py-2.5 px-4 text-right">Valor (R$)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-muted-foreground">
                    Nenhum lançamento encontrado para os filtros selecionados.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40">
                    <td className="py-2.5 px-4 font-mono text-muted-foreground whitespace-nowrap">
                      {tx.date}
                    </td>
                    <td className="py-2.5 px-4 text-foreground/80 font-medium whitespace-nowrap">
                      {tx.entity}
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-foreground">
                      {tx.supplier}
                    </td>
                    <td className="py-2.5 px-4">
                      <span className="font-mono font-semibold text-pink-600 dark:text-pink-400 mr-1.5">
                        {tx.code}
                      </span>
                      <span className="text-muted-foreground">{tx.categoryName}</span>
                    </td>
                    <td className="py-2.5 px-4 font-mono text-muted-foreground whitespace-nowrap">
                      {tx.doc}
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <Badge
                        variant={tx.type === "Crédito" ? "success" : "secondary"}
                        className="text-[10px] px-1.5 py-0 font-medium"
                      >
                        {tx.type}
                      </Badge>
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono font-bold whitespace-nowrap">
                      <span className={tx.amount < 0 ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"}>
                        {formatCurrency(tx.amount)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-neutral-50/80 dark:bg-neutral-900/80 flex items-center justify-between text-xs text-muted-foreground">
          <span>Exibindo {filteredTransactions.length} lançamentos</span>
          <Button size="sm" variant="default" onClick={onClose} className="text-xs">
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
}
