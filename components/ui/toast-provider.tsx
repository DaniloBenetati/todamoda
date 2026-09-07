"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import { AlertTriangle, CheckCircle2, Info, X } from "lucide-react";

export type ToastLevel = "success" | "warning" | "info";

interface ToastItem {
  id: string;
  level: ToastLevel;
  title: string;
  message?: string;
}

interface ToastContextValue {
  success: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
  dismiss: (id: string) => void;
  clear: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const CORNER_STYLES: Record<"success" | "info", string> = {
  success: "bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200",
  info: "bg-sky-50 dark:bg-sky-950/30 border-sky-200 dark:border-sky-900/50 text-sky-800 dark:text-sky-300",
};

const CORNER_ICON: Record<"success" | "info", React.ElementType> = {
  success: CheckCircle2,
  info: Info,
};

// Padrão único de aviso pro sistema inteiro (substitui alert() nativo):
// - success/info: cartão leve no canto, some sozinho — não exige ação.
// - warning: modal centralizado, um de cada vez, com botão "Entendi" — usado pros diagnósticos
//   de importação (código sem conta, sinal de receita etc.), que precisam de ciência explícita
//   antes de continuar, em vez de passar despercebido num canto da tela.
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [cornerToasts, setCornerToasts] = useState<ToastItem[]>([]);
  const [warningQueue, setWarningQueue] = useState<ToastItem[]>([]);

  const push = useCallback((level: ToastLevel, title: string, message?: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    if (level === "warning") {
      setWarningQueue((prev) => [...prev, { id, level, title, message }]);
      return;
    }
    setCornerToasts((prev) => [...prev, { id, level, title, message }]);
    if (level === "success") {
      setTimeout(() => setCornerToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
    }
  }, []);

  const dismiss = useCallback((id: string) => {
    setCornerToasts((prev) => prev.filter((t) => t.id !== id));
    setWarningQueue((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clear = useCallback(() => {
    setCornerToasts([]);
    setWarningQueue([]);
  }, []);

  const value: ToastContextValue = {
    success: (title, message) => push("success", title, message),
    warning: (title, message) => push("warning", title, message),
    info: (title, message) => push("info", title, message),
    dismiss,
    clear,
  };

  const currentWarning = warningQueue[0];

  return (
    <ToastContext.Provider value={value}>
      {children}

      {/* Corner toasts: sucesso/informação, não exigem ação */}
      <div className="fixed top-4 right-4 z-[100] w-full max-w-sm space-y-2 pointer-events-none">
        {cornerToasts.map((t) => {
          const level = t.level as "success" | "info";
          const Icon = CORNER_ICON[level];
          return (
            <div
              key={t.id}
              className={`pointer-events-auto flex items-start gap-2.5 p-3 border text-xs shadow-lg animate-in fade-in slide-in-from-top-2 ${CORNER_STYLES[level]}`}
            >
              <Icon className={`h-4 w-4 shrink-0 mt-0.5 ${level === "success" ? "text-emerald-600 dark:text-emerald-400" : ""}`} />
              <div className="flex-1 min-w-0">
                <div className="font-bold">{t.title}</div>
                {t.message && <div className="mt-0.5 leading-relaxed opacity-90">{t.message}</div>}
              </div>
              <button onClick={() => dismiss(t.id)} className="shrink-0 p-0.5 hover:opacity-60 transition-opacity" title="Dispensar">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Warnings: modal centralizado, um de cada vez, exige clicar "Entendi" — mesmo cartão
          neutro do ConfirmProvider, só o ícone carrega a cor de atenção. */}
      {currentWarning && (
        <div className="fixed inset-0 z-[105] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-md border border-zinc-200 dark:border-zinc-800 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 flex items-start gap-3">
              <div className="shrink-0 h-8 w-8 flex items-center justify-center bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm font-bold text-foreground">{currentWarning.title}</div>
                  {warningQueue.length > 1 && (
                    <span className="shrink-0 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                      1 de {warningQueue.length}
                    </span>
                  )}
                </div>
                {currentWarning.message && (
                  <div className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{currentWarning.message}</div>
                )}
              </div>
            </div>
            <div className="p-4 pt-0 flex items-center justify-end">
              <button
                onClick={() => dismiss(currentWarning.id)}
                className="px-5 py-2 bg-zinc-700 hover:bg-zinc-800 text-white text-xs font-bold shadow-xs transition-colors"
              >
                Entendi{warningQueue.length > 1 ? ` (ver próximo)` : ""}
              </button>
            </div>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast precisa estar dentro de um <ToastProvider>");
  }
  return ctx;
}
