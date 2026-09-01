"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody } from "@/components/ui/sidebar";
import { 
  ArrowLeftRight, 
  PieChart, 
  Building2, 
  Settings,
  FolderTree,
  FileSpreadsheet,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  Layers,
  Sun,
  Moon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AppSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDark?: boolean;
  toggleTheme?: () => void;
}

export function AppSidebar({ activeTab, setActiveTab, isDark = false, toggleTheme }: AppSidebarProps) {
  const [open, setOpen] = useState(false);
  const [contabilSubOpen, setContabilSubOpen] = useState(false);

  const isContabilActive = activeTab.startsWith("contabil");

  const contabilSubItems = [
    {
      id: "contabil_dre",
      label: "DRE Gerencial",
      icon: FileSpreadsheet,
    },
    {
      id: "contabil_budget",
      label: "Budget / Orçamento",
      icon: TrendingUp,
    },
    {
      id: "contabil_plano",
      label: "Plano de Contas",
      icon: FolderTree,
    }
  ];

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-4 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50/90 dark:bg-zinc-950/90 backdrop-blur-md">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {open ? <FullLogo /> : <IconLogo />}

          <div className="mt-6 flex flex-col gap-1">
            <div className={`text-[9px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 ${open ? "px-2 py-1" : "text-center py-1"}`}>
              {open ? "Módulos Financeiros" : "···"}
            </div>

            {/* Menu Item: Contábil */}
            <div className="flex flex-col">
              <button
                onClick={() => {
                  setContabilSubOpen(!contabilSubOpen);
                  if (!isContabilActive) {
                    setActiveTab("contabil_dre");
                  }
                }}
                className={`flex items-center w-full text-xs transition-all duration-150 ${
                  open ? "justify-between px-2.5 py-2" : "justify-center p-2.5"
                } ${
                  isContabilActive
                    ? "bg-zinc-700 text-white dark:bg-zinc-700 dark:text-white font-bold shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/70 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white"
                }`}
                title="Módulo Contábil & DRE"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center justify-center">
                    <Layers className="h-4 w-4 shrink-0" />
                  </div>
                  <motion.span
                    animate={{
                      display: open ? "inline-block" : "none",
                      opacity: open ? 1 : 0,
                    }}
                    className="whitespace-pre text-xs font-semibold"
                  >
                    Contábil
                  </motion.span>
                </div>

                <motion.div
                  animate={{
                    display: open ? "block" : "none",
                    opacity: open ? 1 : 0,
                  }}
                >
                  {contabilSubOpen ? (
                    <ChevronDown className="h-3.5 w-3.5" />
                  ) : (
                    <ChevronRight className="h-3.5 w-3.5" />
                  )}
                </motion.div>
              </button>

              {/* Sub-items under Contábil */}
              <AnimatePresence>
                {open && contabilSubOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-3 pl-2.5 border-l-2 border-zinc-400 dark:border-zinc-600 flex flex-col gap-0.5 mt-0.5 my-1"
                  >
                    {contabilSubItems.map((sub) => {
                      const isSubActive = activeTab === sub.id;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => setActiveTab(sub.id)}
                          className={`flex items-center gap-2 px-2 py-1.5 text-[11px] transition-all duration-150 text-left ${
                            isSubActive
                              ? "bg-zinc-600 text-white dark:bg-zinc-600 font-semibold shadow-xs"
                              : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/70 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white"
                          }`}
                        >
                          <sub.icon className="h-3.5 w-3.5 shrink-0" />
                          <span className="flex-1 truncate">{sub.label}</span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other Sidebar Items */}
            <button
              onClick={() => setActiveTab("fluxo_caixa")}
              className={`flex items-center w-full text-xs transition-all duration-150 ${
                open ? "justify-start gap-2.5 px-2.5 py-2" : "justify-center p-2.5"
              } ${
                activeTab === "fluxo_caixa"
                  ? "bg-zinc-700 text-white dark:bg-zinc-700 font-semibold"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/70 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white"
              }`}
              title="Fluxo de Caixa"
            >
              <div className="flex items-center justify-center">
                <ArrowLeftRight className="h-4 w-4 shrink-0" />
              </div>
              <motion.span
                animate={{
                  display: open ? "block" : "none",
                  opacity: open ? 1 : 0,
                }}
                className="whitespace-pre text-xs"
              >
                Fluxo de Caixa
              </motion.span>
            </button>

            <button
              onClick={() => setActiveTab("config")}
              className={`flex items-center w-full text-xs transition-all duration-150 ${
                open ? "justify-start gap-2.5 px-2.5 py-2" : "justify-center p-2.5"
              } ${
                activeTab === "config"
                  ? "bg-zinc-700 text-white dark:bg-zinc-700 font-semibold"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/70 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white"
              }`}
              title="Configurações"
            >
              <div className="flex items-center justify-center">
                <Settings className="h-4 w-4 shrink-0" />
              </div>
              <motion.span
                animate={{
                  display: open ? "block" : "none",
                  opacity: open ? 1 : 0,
                }}
                className="whitespace-pre text-xs"
              >
                Configurações
              </motion.span>
            </button>
          </div>
        </div>

        {/* Bottom Section: Theme Toggle + User Profile */}
        <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-1.5 items-center w-full">
          {toggleTheme && (
            <button
              onClick={toggleTheme}
              className={`w-full flex items-center text-xs transition-all duration-150 border border-zinc-200 dark:border-zinc-800 bg-card hover:bg-zinc-200/70 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-foreground ${
                open ? "gap-2 px-2.5 py-1.5 justify-start" : "justify-center p-2"
              }`}
              title={isDark ? "Mudar para Tema Claro" : "Mudar para Tema Escuro"}
            >
              {isDark ? (
                <Sun className="h-4 w-4 shrink-0 text-amber-500" />
              ) : (
                <Moon className="h-4 w-4 shrink-0 text-zinc-600 dark:text-zinc-300" />
              )}
              <motion.span
                animate={{
                  display: open ? "block" : "none",
                  opacity: open ? 1 : 0,
                }}
                className="whitespace-pre text-[11px] font-medium"
              >
                {isDark ? "Tema Claro" : "Tema Escuro"}
              </motion.span>
            </button>
          )}

          {/* TM Profile Badge */}
          <div className={`w-full flex items-center bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 ${
            open ? "gap-2.5 px-2 py-1.5" : "justify-center p-1.5"
          }`}>
            <div className="h-7 w-7 bg-zinc-700 text-white flex items-center justify-center font-extrabold text-[10px] shrink-0">
              TM
            </div>
            <motion.div
              animate={{
                display: open ? "block" : "none",
                opacity: open ? 1 : 0,
              }}
              className="overflow-hidden whitespace-nowrap"
            >
              <div className="text-[11px] font-bold text-zinc-900 dark:text-zinc-100 truncate">Toda Moda</div>
              <div className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">Financeiro</div>
            </motion.div>
          </div>
        </div>
      </SidebarBody>
    </Sidebar>
  );
}

function FullLogo() {
  return (
    <div className="flex items-center gap-2 px-1 py-1">
      <div className="h-7 w-7 bg-zinc-700 flex items-center justify-center text-white shrink-0">
        <TrendingUp className="h-4 w-4" />
      </div>
      <div className="flex flex-col">
        <span className="font-extrabold text-sm tracking-tight text-zinc-800 dark:text-zinc-200">
          TODA MODA
        </span>
        <span className="text-[9px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-semibold">
          Financial Hub
        </span>
      </div>
    </div>
  );
}

function IconLogo() {
  return (
    <div className="flex items-center justify-center w-full py-1">
      <div className="h-7 w-7 bg-zinc-700 flex items-center justify-center text-white shrink-0">
        <TrendingUp className="h-4 w-4" />
      </div>
    </div>
  );
}
