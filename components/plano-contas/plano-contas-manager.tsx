"use client";

import React, { useState, useEffect, useMemo } from "react";
import { AccountPlanItem, INITIAL_ACCOUNT_PLAN } from "@/data/mock-dre-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  ArrowRight, 
  ArrowLeft, 
  ArrowUp, 
  ArrowDown, 
  RotateCcw, 
  Download, 
  CheckCircle2, 
  X, 
  SlidersHorizontal,
  ChevronDown,
  ChevronRight,
  ChevronsDown,
  ChevronsUp
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/toast-provider";
import { useConfirm } from "@/components/ui/confirm-provider";

const STORAGE_KEY = "toda_moda_plano_contas_v8";

export function PlanoContasManager() {
  const [accounts, setAccounts] = useState<AccountPlanItem[]>(INITIAL_ACCOUNT_PLAN);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedEntity, setSelectedEntity] = useState<string>("all");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const toast = useToast();
  const confirmAction = useConfirm();
  const [collapsedIds, setCollapsedIds] = useState<Set<string>>(new Set());

  // Modal State for New/Edit Account
  const [modalMode, setModalMode] = useState<"create" | "edit" | null>(null);
  const [editingItem, setEditingItem] = useState<Partial<AccountPlanItem>>({
    code: "",
    name: "",
    level: 2,
    category: "1.0 Pessoal & Encargos (Sueldos)",
    channels: ["tiendas", "produto", "franquias", "consolidado"],
    active: true,
  });

  // Load from localStorage on client mount if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAccounts(parsed);
        }
      }
    } catch (e) {
      console.warn("Usando plano inicial de contas.");
    }
  }, []);

  // Save to state and storage
  const saveToStorage = (newAccounts: AccountPlanItem[]) => {
    setAccounts(newAccounts);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newAccounts));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      console.error("Erro ao salvar plano:", e);
    }
  };

  // Reset to original spreadsheet plan
  const handleReset = async () => {
    const ok = await confirmAction("Todas as alterações manuais no Plano de Contas serão redefinidas. Não pode ser desfeito.", {
      title: "Restaurar o Plano de Contas padrão?",
      confirmLabel: "Restaurar",
      tone: "danger",
    });
    if (ok) {
      saveToStorage(INITIAL_ACCOUNT_PLAN);
      setCollapsedIds(new Set());
    }
  };

  // Clear active filters
  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedLevel("all");
    setSelectedEntity("all");
  };

  const hasActiveFilters =
    searchTerm !== "" || selectedCategory !== "all" || selectedLevel !== "all" || selectedEntity !== "all";

  // Toggle Collapse on specific item
  const toggleCollapse = (id: string) => {
    setCollapsedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Expand All
  const handleExpandAll = () => {
    setCollapsedIds(new Set());
  };

  // Collapse All (collapse all parent accounts with level 1 & 2)
  const handleCollapseAll = () => {
    const parentIds = new Set<string>();
    accounts.forEach((item) => {
      if (item.level === 1 || item.level === 2) {
        parentIds.add(item.id);
      }
    });
    setCollapsedIds(parentIds);
  };

  // Unique categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    accounts.forEach((a) => {
      if (a.category) set.add(a.category);
    });
    return Array.from(set).sort();
  }, [accounts]);

  // Check if item should be visible based on collapsed parents
  const isItemVisible = (item: AccountPlanItem, allAccounts: AccountPlanItem[]): boolean => {
    if (searchTerm || selectedCategory !== "all" || selectedLevel !== "all" || selectedEntity !== "all") {
      return true; // When filtering, show matches directly
    }

    if (item.level <= 1) return true;

    // Check if any ancestor is collapsed
    for (const parent of allAccounts) {
      if (parent.id !== item.id && parent.level < item.level && item.code.startsWith(parent.code + ".")) {
        if (collapsedIds.has(parent.id)) {
          return false;
        }
      }
    }
    return true;
  };

  // Filtered and hierarchy-collapsed accounts
  const filteredAccounts = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    return accounts.filter((item) => {
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      if (selectedLevel !== "all" && String(item.level) !== selectedLevel) {
        return false;
      }
      if (selectedEntity !== "all") {
        // Contas sem entidade definida pertencem ao plano compartilhado/NewCo por padrão.
        const itemEntity = item.entity || "newco";
        if (itemEntity !== selectedEntity) {
          return false;
        }
      }
      if (term) {
        return (
          item.name.toLowerCase().includes(term) ||
          item.code.toLowerCase().includes(term) ||
          (item.category && item.category.toLowerCase().includes(term))
        );
      }
      return isItemVisible(item, accounts);
    });
  }, [accounts, searchTerm, selectedCategory, selectedLevel, selectedEntity, collapsedIds]);

  // Check if account has child subaccounts
  const hasSubaccounts = (account: AccountPlanItem) => {
    return accounts.some(a => a.level > account.level && a.code.startsWith(account.code + "."));
  };

  // Open modal to add a brand new root account or subaccount
  const handleOpenCreate = (parentAccount?: AccountPlanItem) => {
    if (parentAccount) {
      const nextLevel = Math.min(parentAccount.level + 1, 4);
      let suggestedCode = `${parentAccount.code}.1`;
      
      const siblings = accounts.filter(a => a.code.startsWith(parentAccount.code + "."));
      if (siblings.length > 0) {
        suggestedCode = `${parentAccount.code}.${siblings.length + 1}`;
      }

      setEditingItem({
        id: `acc-custom-${Date.now()}`,
        code: suggestedCode,
        name: "",
        level: nextLevel,
        category: parentAccount.category,
        channels: ["tiendas", "produto", "franquias", "consolidado"],
        active: true,
        parentId: parentAccount.id,
      });
    } else {
      setEditingItem({
        id: `acc-custom-${Date.now()}`,
        code: "",
        name: "",
        level: 1,
        category: "1.0 Pessoal & Encargos (Sueldos)",
        channels: ["tiendas", "produto", "franquias", "consolidado"],
        active: true,
      });
    }
    setModalMode("create");
  };

  // Open modal to edit existing account
  const handleOpenEdit = (account: AccountPlanItem) => {
    setEditingItem({ ...account });
    setModalMode("edit");
  };

  // Delete account
  const handleDelete = async (id: string, name: string) => {
    const ok = await confirmAction(`A conta "${name}" será removida do Plano de Contas. Não pode ser desfeito.`, {
      title: "Excluir conta?",
      confirmLabel: "Excluir",
      tone: "danger",
    });
    if (ok) {
      const updated = accounts.filter((a) => a.id !== id);
      saveToStorage(updated);
    }
  };

  // Level shift
  const handleLevelShift = (id: string, delta: number) => {
    const updated = accounts.map((a) => {
      if (a.id === id) {
        const newLevel = Math.max(1, Math.min(4, a.level + delta));
        return { ...a, level: newLevel, isGroupHeader: newLevel === 1 };
      }
      return a;
    });
    saveToStorage(updated);
  };

  // Move up / down in sequence
  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= accounts.length) return;

    const copy = [...accounts];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;
    saveToStorage(copy);
  };

  // Save Modal
  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem.code || !editingItem.name) {
      toast.warning("Campos obrigatórios", "Preencha o código e o nome da conta antes de salvar.");
      return;
    }

    if (modalMode === "create") {
      const newItem: AccountPlanItem = {
        id: editingItem.id || `acc-custom-${Date.now()}`,
        code: editingItem.code.trim(),
        name: editingItem.name.trim(),
        level: Number(editingItem.level) || 2,
        category: editingItem.category || "Geral",
        isGroupHeader: Number(editingItem.level) === 1,
        isMainResult: false,
        active: editingItem.active ?? true,
        channels: editingItem.channels || ["tiendas", "produto", "franquias", "consolidado"],
        values: {
          tiendas: { planned: 0, realized: 0 },
          produto: { planned: 0, realized: 0 },
          franquias: { planned: 0, realized: 0 },
          consolidado: { planned: 0, realized: 0 },
        },
      };

      let insertIndex = accounts.length;
      if (editingItem.parentId) {
        const pIndex = accounts.findIndex((a) => a.id === editingItem.parentId);
        if (pIndex !== -1) {
          insertIndex = pIndex + 1;
        }
      }

      const updated = [...accounts];
      updated.splice(insertIndex, 0, newItem);
      saveToStorage(updated);
    } else if (modalMode === "edit") {
      const updated = accounts.map((a) => {
        if (a.id === editingItem.id) {
          return {
            ...a,
            code: editingItem.code!.trim(),
            name: editingItem.name!.trim(),
            level: Number(editingItem.level) || a.level,
            category: editingItem.category || a.category,
            isGroupHeader: Number(editingItem.level) === 1,
            active: editingItem.active ?? true,
            channels: editingItem.channels || a.channels,
          };
        }
        return a;
      });
      saveToStorage(updated);
    }

    setModalMode(null);
  };

  // Export CSV
  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Nivel,Codigo,Descricao,Categoria,Status\n" +
      accounts.map(a => `${a.level},"${a.code}","${a.name}","${a.category}",${a.active !== false ? "Ativo" : "Inativo"}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "plano_de_contas_toda_moda.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex gap-4 items-start w-full relative">
      {/* Main Content Area */}
      <div className="flex-1 min-w-0 space-y-4">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between gap-4 bg-card px-4 py-3 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-foreground tracking-tight">
              Plano de Contas Financeiro
            </h1>
            <Badge variant="secondary" className="font-mono text-[10px]">
              {filteredAccounts.length} contas
            </Badge>
          </div>

          {/* Filtrar Button */}
          {!isFilterPanelOpen && (
            <button
              onClick={() => setIsFilterPanelOpen(true)}
              className="flex items-center gap-2 px-3.5 py-1.5 border border-zinc-300 dark:border-zinc-700 bg-card hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 shadow-xs transition-all"
              title="Abrir painel lateral de filtros e ações"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-zinc-700 dark:text-zinc-300" />
              <span>Filtrar</span>
              {hasActiveFilters && (
                <span className="h-1.5 w-1.5 bg-zinc-700 dark:bg-zinc-300" />
              )}
            </button>
          )}
        </div>

        {/* Save Toast Alert */}
        {savedSuccess && (
          <div className="flex items-center gap-2 p-3 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>Plano de Contas atualizado e salvo com sucesso!</span>
          </div>
        )}

        {/* Hierarchy Table */}
        <div className="border border-zinc-200 dark:border-zinc-800 bg-card overflow-hidden">
          {/* Table Header Bar */}
          <div className="px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/90 dark:bg-zinc-900/90 flex items-center justify-between gap-2">
            <div className="text-xs font-bold text-foreground">
              Estrutura de Contas
            </div>
            <div className="text-[11px] text-muted-foreground">
              Setas <strong className="text-foreground">← →</strong> ajustam nível • <strong className="text-foreground">+</strong> adiciona subconta
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-900/70 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="py-2.5 px-4 w-36">Nível</th>
                  <th className="py-2.5 px-4 w-32">Código</th>
                  <th className="py-2.5 px-4 min-w-[340px]">Conta Contábil / Descrição</th>
                  <th className="py-2.5 px-4 w-52">Grupo / Macro Categoria</th>
                  <th className="py-2.5 px-4 w-24 text-center">Status</th>
                  <th className="py-2.5 px-4 w-64 text-right">Ações Rápidas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/70 dark:divide-zinc-800/70">
                {filteredAccounts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-muted-foreground">
                      Nenhuma conta encontrada para os filtros selecionados.
                    </td>
                  </tr>
                ) : (
                  filteredAccounts.map((item, index) => {
                    const isLevel1 = item.level === 1;
                    const isLevel2 = item.level === 2;
                    const isLevel3 = item.level === 3;
                    const isResult = item.level === 0 || item.isMainResult;
                    const hasSubs = hasSubaccounts(item);
                    const isCollapsed = collapsedIds.has(item.id);

                    const indentPx = isResult ? 0 : Math.max(0, (item.level - 1) * 20);

                    let rowBg = "hover:bg-zinc-50/80 dark:hover:bg-zinc-900/60 transition-colors";
                    if (isResult) {
                      rowBg = "bg-zinc-100/80 dark:bg-zinc-900/80 font-bold border-y border-zinc-300 dark:border-zinc-700";
                    } else if (isLevel1) {
                      rowBg = "bg-zinc-100/70 dark:bg-zinc-900/70 font-extrabold text-foreground";
                    } else if (isLevel2) {
                      rowBg = "bg-zinc-50/40 dark:bg-zinc-950/40 font-semibold";
                    }

                    return (
                      <tr key={item.id} className={rowBg}>
                        {/* Level Badge */}
                        <td className="py-2 px-4 font-mono whitespace-nowrap">
                          {isResult ? (
                            <span className="inline-block text-[10px] px-2 py-0.5 border border-zinc-400 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 font-bold whitespace-nowrap">
                              Total / KPI
                            </span>
                          ) : isLevel1 ? (
                            <span className="inline-block text-[10px] px-2 py-0.5 bg-zinc-700 text-white font-bold tracking-wide whitespace-nowrap shadow-2xs">
                              Grupo Nível 1
                            </span>
                          ) : isLevel2 ? (
                            <span className="inline-block text-[10px] px-2 py-0.5 bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 font-semibold whitespace-nowrap border border-zinc-300 dark:border-zinc-700">
                              Sub Nível 2
                            </span>
                          ) : isLevel3 ? (
                            <span className="inline-block text-[10px] px-2 py-0.5 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-medium whitespace-nowrap border border-zinc-200 dark:border-zinc-800">
                              Analítica Nível 3
                            </span>
                          ) : (
                            <span className="inline-block text-[10px] px-2 py-0.5 bg-transparent text-zinc-500 dark:text-zinc-400 font-normal whitespace-nowrap border border-zinc-200 dark:border-zinc-800">
                              Detalhe Nível 4
                            </span>
                          )}
                        </td>

                        {/* Code */}
                        <td className="py-2 px-4 font-mono font-bold text-xs text-foreground">
                          {item.code || <span className="text-muted-foreground font-normal italic">-</span>}
                        </td>

                        {/* Name with Expand/Collapse indicator and Hierarchy Branch */}
                        <td className="py-2 px-4">
                          <div
                            className="flex items-center gap-1.5"
                            style={{ paddingLeft: `${indentPx}px` }}
                          >
                            {hasSubs ? (
                              <button
                                onClick={() => toggleCollapse(item.id)}
                                className="p-0.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors shrink-0"
                                title={isCollapsed ? "Expandir subcontas" : "Recolher subcontas"}
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
                              className={`${isLevel1 ? "text-sm text-foreground font-extrabold" : isLevel2 ? "text-xs font-semibold text-foreground/95" : "text-xs text-foreground/85 font-normal"} ${hasSubs ? "cursor-pointer" : ""}`}
                              onClick={() => hasSubs && toggleCollapse(item.id)}
                            >
                              {item.name}
                            </span>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-2 px-4 text-xs text-muted-foreground truncate max-w-[220px]">
                          <span className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-[11px] border border-zinc-200 dark:border-zinc-700/60">
                            {item.category}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-2 px-4 text-center">
                          <Badge
                            variant={item.active !== false ? "success" : "destructive"}
                            className="text-[10px] px-1.5 py-0 font-medium"
                          >
                            {item.active !== false ? "Ativo" : "Inativo"}
                          </Badge>
                        </td>

                        {/* Actions */}
                        <td className="py-2 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleOpenCreate(item)}
                              className="p-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 transition-colors"
                              title="Adicionar Subconta abaixo desta linha"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>

                            <button
                              disabled={item.level <= 1}
                              onClick={() => handleLevelShift(item.id, -1)}
                              className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 disabled:opacity-20 transition-colors border border-transparent hover:border-zinc-300 dark:hover:border-zinc-600"
                              title="Recuar nível (Promover)"
                            >
                              <ArrowLeft className="h-3.5 w-3.5" />
                            </button>

                            <button
                              disabled={item.level >= 4}
                              onClick={() => handleLevelShift(item.id, 1)}
                              className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 disabled:opacity-20 transition-colors border border-transparent hover:border-zinc-300 dark:hover:border-zinc-600"
                              title="Avançar nível (Rebaixar)"
                            >
                              <ArrowRight className="h-3.5 w-3.5" />
                            </button>

                            <button
                              disabled={index === 0}
                              onClick={() => handleMove(index, "up")}
                              className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 disabled:opacity-20 transition-colors border border-transparent hover:border-zinc-300 dark:hover:border-zinc-600"
                              title="Mover para cima"
                            >
                              <ArrowUp className="h-3.5 w-3.5" />
                            </button>

                            <button
                              disabled={index === accounts.length - 1}
                              onClick={() => handleMove(index, "down")}
                              className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 disabled:opacity-20 transition-colors border border-transparent hover:border-zinc-300 dark:hover:border-zinc-600"
                              title="Mover para baixo"
                            >
                              <ArrowDown className="h-3.5 w-3.5" />
                            </button>

                            <button
                              onClick={() => handleOpenEdit(item)}
                              className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors border border-transparent hover:border-zinc-300 dark:hover:border-zinc-600"
                              title="Editar conta"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </button>

                            <button
                              onClick={() => handleDelete(item.id, item.name)}
                              className="p-1 hover:bg-red-100 dark:hover:bg-red-950/40 text-rose-600 transition-colors border border-transparent hover:border-red-300 dark:hover:border-red-800"
                              title="Excluir linha"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right-Side Filter & Action Panel (Drawer) */}
      <AnimatePresence>
        {isFilterPanelOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, width: 0 }}
            animate={{ opacity: 1, x: 0, width: 300 }}
            exit={{ opacity: 0, x: 20, width: 0 }}
            transition={{ duration: 0.2 }}
            className="w-[300px] shrink-0 border border-zinc-200 dark:border-zinc-800 bg-card p-4 space-y-4 sticky top-0 self-start shadow-sm"
          >
            {/* Panel Top Header */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-foreground tracking-tight">
                  Filtrar
                </h3>
                <span className="text-xs text-muted-foreground font-mono">
                  {filteredAccounts.length} linhas
                </span>
              </div>
              <button
                onClick={() => setIsFilterPanelOpen(false)}
                className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 hover:text-foreground transition-colors"
                title="Fechar painel de filtros"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Action Buttons Section */}
            <div className="space-y-2">
              <button
                onClick={() => handleOpenCreate()}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-zinc-700 hover:bg-zinc-800 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>+ NOVA LINHA</span>
              </button>

              {/* Expand All / Collapse All Buttons */}
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={handleExpandAll}
                  className="flex items-center justify-center gap-1.5 py-2 px-2 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-[11px] font-semibold text-zinc-800 dark:text-zinc-200 transition-colors"
                  title="Expandir todas as contas e subcontas"
                >
                  <ChevronsDown className="h-3.5 w-3.5" />
                  <span>EXPANDIR</span>
                </button>

                <button
                  onClick={handleCollapseAll}
                  className="flex items-center justify-center gap-1.5 py-2 px-2 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-[11px] font-semibold text-zinc-800 dark:text-zinc-200 transition-colors"
                  title="Recolher e fechar subcontas"
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
                onClick={handleExport}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                <span>EXPORTAR CSV</span>
              </button>
            </div>

            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3 space-y-3">
              {/* Search Filter */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Buscar Conta
                </label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Código ou nome..."
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

              {/* Level Filter */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Nível da Conta
                </label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full h-8 border border-zinc-300 dark:border-zinc-700 bg-card px-2 text-xs focus:ring-1 focus:ring-ring text-foreground"
                >
                  <option value="all">Todos os Níveis (N1 a N4)</option>
                  <option value="1">Grupo Nível 1 (Principal)</option>
                  <option value="2">Sub Nível 2 (Subcontas)</option>
                  <option value="3">Analítica Nível 3 (Analíticas)</option>
                  <option value="0">Total Nível 0 (Indicadores)</option>
                </select>
              </div>

              {/* Entity Filter */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Entidade Legal
                </label>
                <select
                  value={selectedEntity}
                  onChange={(e) => setSelectedEntity(e.target.value)}
                  className="w-full h-8 border border-zinc-300 dark:border-zinc-700 bg-card px-2 text-xs focus:ring-1 focus:ring-ring text-foreground"
                >
                  <option value="all">Todas as Entidades</option>
                  <option value="newco">NewCo</option>
                  <option value="bsg">BSG</option>
                </select>
              </div>

              {/* Clear Filters Button */}
              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="w-full py-1.5 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-semibold transition-colors text-center"
                >
                  Limpar Todos os Filtros
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal: Create or Edit Line */}
      {modalMode && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-lg border border-zinc-300 dark:border-zinc-700 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900">
              <div>
                <h3 className="text-sm font-bold text-foreground">
                  {modalMode === "create" ? "Criar Nova Linha" : "Editar Linha"}
                </h3>
              </div>
              <button
                onClick={() => setModalMode(null)}
                className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Código Contábil *
                  </label>
                  <Input
                    placeholder="Ex: 1.1.20 ou 3.1.14"
                    value={editingItem.code || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, code: e.target.value })}
                    required
                    className="font-mono text-xs border-zinc-300 dark:border-zinc-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Nível da Conta *
                  </label>
                  <select
                    value={editingItem.level || 2}
                    onChange={(e) => setEditingItem({ ...editingItem, level: Number(e.target.value) })}
                    className="w-full h-9 border border-zinc-300 dark:border-zinc-700 bg-card px-3 text-xs text-foreground focus:ring-1 focus:ring-ring"
                  >
                    <option value={1} className="dark:bg-zinc-900">Grupo Nível 1 (Sintética / Principal)</option>
                    <option value={2} className="dark:bg-zinc-900">Sub Nível 2 (Subconta)</option>
                    <option value={3} className="dark:bg-zinc-900">Analítica Nível 3 (Conta Analítica)</option>
                    <option value={4} className="dark:bg-zinc-900">Detalhe Nível 4 (Detalhamento Específico)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Nome / Descrição da Conta *
                </label>
                <Input
                  placeholder="Ex: Seguro de Cargas e Mercadorias"
                  value={editingItem.name || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  required
                  className="text-xs border-zinc-300 dark:border-zinc-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Categoria / Macro Grupo
                </label>
                <select
                  value={editingItem.category || "1.0 Pessoal & Encargos (Sueldos)"}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="w-full h-9 border border-zinc-300 dark:border-zinc-700 bg-card px-3 text-xs text-foreground focus:ring-1 focus:ring-ring"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="dark:bg-zinc-900">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <span className="text-xs font-semibold text-foreground">Status da Conta</span>
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={editingItem.active !== false}
                    onChange={(e) => setEditingItem({ ...editingItem, active: e.target.checked })}
                    className="border-zinc-400 text-zinc-700 focus:ring-zinc-700"
                  />
                  <span>Ativo</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setModalMode(null)}
                  className="border-zinc-300 dark:border-zinc-700 text-zinc-700"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="bg-zinc-700 hover:bg-zinc-800 text-white font-semibold shadow-xs"
                >
                  {modalMode === "create" ? "Criar Linha" : "Salvar Alterações"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
