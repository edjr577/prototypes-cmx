"use client";

import * as React from "react";
import { Info } from "lucide-react";

// Feedback mínimo para ações mockadas do protótipo (filtros, exportar, atualizar).
// Mostra um toast efêmero centralizado na base por ~2,2s.
export function useDemoFeedback() {
  const [msg, setMsg] = React.useState<string | null>(null);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const notify = React.useCallback((m: string) => {
    setMsg(m);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMsg(null), 2200);
  }, []);

  React.useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const Toast = (
    <div
      className={`fixed top-20 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 rounded-lg border border-border bg-popover px-3.5 py-2 text-sm text-popover-foreground shadow-lg transition-all duration-200 ${
        msg
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-2 pointer-events-none"
      }`}
      role="status"
      aria-live="polite"
    >
      <Info className="size-4 text-primary" />
      <span>{msg}</span>
      <span className="ml-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
        demo
      </span>
    </div>
  );

  return { notify, Toast };
}
