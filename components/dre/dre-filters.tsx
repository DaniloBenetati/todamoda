"use client";

import React from "react";
import { CHANNELS, MONTHS, ChannelKey } from "@/data/dre-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Globe, 
  Store, 
  Package, 
  Building2, 
  Search, 
  ChevronsUpDown, 
  Download, 
  ReceiptText, 
  Calendar,
  Filter
} from "lucide-react";
import { useToast } from "@/components/ui/toast-provider";

interface DREFiltersProps {
  selectedChannel: ChannelKey;
  setSelectedChannel: (channel: ChannelKey) => void;
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isAllExpanded: boolean;
  toggleExpandAll: () => void;
  onOpenTransactions: () => void;
}

export function DREFilters({
  selectedChannel,
  setSelectedChannel,
  selectedMonth,
  setSelectedMonth,
  searchTerm,
  setSearchTerm,
  isAllExpanded,
  toggleExpandAll,
  onOpenTransactions,
}: DREFiltersProps) {
  const toast = useToast();
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Store":
        return <Store className="h-4 w-4" />;
      case "Package":
        return <Package className="h-4 w-4" />;
      case "Building2":
        return <Building2 className="h-4 w-4" />;
      case "Globe":
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-card p-4 rounded-xl border border-border shadow-sm">
      {/* Top row: Channel selector tabs */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 flex-wrap w-full md:w-auto">
          {CHANNELS.map((ch) => {
            const isActive = selectedChannel === ch.key;
            return (
              <button
                key={ch.key}
                onClick={() => setSelectedChannel(ch.key)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? "bg-pink-600 text-white shadow-sm shadow-pink-500/25 scale-[1.02]"
                    : "bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
                }`}
                title={ch.description}
              >
                {getIcon(ch.icon)}
                <span>{ch.label}</span>
              </button>
            );
          })}
        </div>

        {/* Month selector and Lançamentos CTA */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg border border-border text-xs">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground ml-1.5" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-transparent border-0 text-xs font-semibold focus:ring-0 text-foreground cursor-pointer pr-2"
            >
              {MONTHS.map((m) => (
                <option key={m.key} value={m.key} className="dark:bg-neutral-900">
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onOpenTransactions}
            className="flex items-center gap-1.5 text-xs font-semibold text-pink-600 dark:text-pink-400 border-pink-500/30 hover:bg-pink-50 dark:hover:bg-pink-950/30"
          >
            <ReceiptText className="h-3.5 w-3.5" />
            <span>Extrato / Lançamentos</span>
          </Button>
        </div>
      </div>

      {/* Bottom row: Search & Action toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-border/60">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Filtrar contas, grupos ou códigos (ex: 1.1, CMV, Sueldos)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 text-xs h-9 bg-neutral-50/50 dark:bg-neutral-900/50"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-2.5 top-2.5 text-xs text-muted-foreground hover:text-foreground"
            >
              Limpar
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto w-full sm:w-auto justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleExpandAll}
            className="text-xs h-9 gap-1.5"
          >
            <ChevronsUpDown className="h-3.5 w-3.5" />
            <span>{isAllExpanded ? "Recolher Todos" : "Expandir Todos"}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              toast.info("Exportando DRE", "Gerando Excel (.xlsx) / CSV com todos os canais e lançamentos...");
            }}
            className="text-xs h-9 gap-1.5"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Exportar</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
