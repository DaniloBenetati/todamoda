"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import { AlertTriangle } from "lucide-react";

interface ConfirmOptions {
  title?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** "danger" deixa o botão de confirmar em vermelho — para ações destrutivas (excluir, zerar). */
  tone?: "default" | "danger";
}

interface PendingConfirm extends ConfirmOptions {
  message: string;
  resolve: (value: boolean) => void;
}

type ConfirmFn = (message: string, options?: ConfirmOptions) => Promise<boolean>;

const ConfirmContext = createContext<ConfirmFn | null>(null);

// Padrão único de confirmação pro sistema inteiro: substitui confirm() nativo do navegador por um
// modal no mesmo estilo do resto da tela. Uso: `const ok = await confirmAction("mensagem")`.
export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [pending, setPending] = useState<PendingConfirm | null>(null);

  const confirmAction = useCallback<ConfirmFn>((message, options) => {
    return new Promise<boolean>((resolve) => {
      setPending({ message, resolve, ...options });
    });
  }, []);

  const handle = (result: boolean) => {
    pending?.resolve(result);
    setPending(null);
  };

  return (
    <ConfirmContext.Provider value={confirmAction}>
      {children}
      {pending && (
        <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-sm border border-zinc-200 dark:border-zinc-800 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 flex items-start gap-3">
              <div
                className={`shrink-0 h-8 w-8 flex items-center justify-center ${
                  pending.tone === "danger"
                    ? "bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400"
                    : "bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400"
                }`}
              >
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                {pending.title && <div className="text-sm font-bold text-foreground mb-1">{pending.title}</div>}
                <div className="text-xs text-muted-foreground leading-relaxed">{pending.message}</div>
              </div>
            </div>
            <div className="p-4 pt-0 flex items-center justify-end gap-2">
              <button
                onClick={() => handle(false)}
                className="px-4 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                {pending.cancelLabel || "Cancelar"}
              </button>
              <button
                onClick={() => handle(true)}
                className={`px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors ${
                  pending.tone === "danger" ? "bg-rose-600 hover:bg-rose-700" : "bg-zinc-700 hover:bg-zinc-800"
                }`}
              >
                {pending.confirmLabel || "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}

export function useConfirm(): ConfirmFn {
  const ctx = useContext(ConfirmContext);
  if (!ctx) {
    throw new Error("useConfirm precisa estar dentro de um <ConfirmProvider>");
  }
  return ctx;
}
