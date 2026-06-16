"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useMetas,
  statusOf,
  formatMetaValue,
  lensInfo,
  type Periodo,
  type Lens,
  type Sev,
  type Meta,
} from "../metas-context";
import { Target } from "lucide-react";

const sevDot: Record<Sev, string> = {
  ok: "bg-emerald-500",
  atencao: "bg-amber-500",
  critico: "bg-rose-500",
};

const sevPill: Record<Sev, string> = {
  ok: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  atencao: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  critico: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

const sevLabel: Record<Sev, string> = {
  ok: "No alvo",
  atencao: "Atenção",
  critico: "Fora da meta",
};

const ordemLentes: Lens[] = ["comercial", "saida", "financeiro", "equipe"];

export default function MetasPage() {
  const { metas, setMetaValor } = useMetas();
  const [periodo, setPeriodo] = React.useState<Periodo>("mes");

  const periodos: { id: Periodo; label: string }[] = [
    { id: "mes", label: "Mês" },
    { id: "trimestre", label: "Trimestre" },
    { id: "ano", label: "Ano" },
  ];

  const noAlvo = metas.filter((m) => statusOf(m, periodo) === "ok").length;

  const unidadeAfixo = (m: Meta) => {
    if (m.unidade === "BRL") return { prefixo: "R$", sufixo: "" };
    if (m.unidade === "pct") return { prefixo: "", sufixo: "%" };
    if (m.unidade === "dias") return { prefixo: "", sufixo: "dias" };
    return { prefixo: "", sufixo: "" };
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* --- HEADER --- */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary/70">
            Planejamento
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Metas do escritório
          </h1>
          <p className="text-muted-foreground">
            Defina as metas que calibram os semáforos de cada lente —{" "}
            <span className="font-medium text-foreground/80">
              {noAlvo} de {metas.length} no alvo
            </span>{" "}
            neste período
          </p>
        </div>

        <div className="inline-flex rounded-lg border border-border bg-background p-0.5">
          {periodos.map((p) => (
            <button
              key={p.id}
              onClick={() => setPeriodo(p.id)}
              className={`px-3 h-8 text-xs font-medium rounded-md transition-all cursor-pointer ${
                periodo === p.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* --- METAS POR LENTE --- */}
      <div className="grid gap-6 lg:grid-cols-2">
        {ordemLentes.map((lens) => {
          const doLens = metas.filter((m) => m.lens === lens);
          return (
            <Card key={lens}>
              <CardHeader>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Target className="size-4 text-primary" />
                  {lensInfo[lens].titulo}
                </CardTitle>
                <CardDescription>{lensInfo[lens].pergunta}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-1 pt-1">
                {/* cabeçalho da mini-tabela */}
                <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3 px-1 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                  <span>Indicador</span>
                  <span className="text-right w-24">Realizado</span>
                  <span className="text-right w-32">Meta</span>
                </div>

                {doLens.map((m) => {
                  const status = statusOf(m, periodo);
                  const { prefixo, sufixo } = unidadeAfixo(m);
                  return (
                    <div
                      key={m.id}
                      className="grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-lg px-1 py-2 hover:bg-muted/30 transition-colors"
                    >
                      {/* indicador + status */}
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className={`size-2 rounded-full shrink-0 ${sevDot[status]}`}
                          title={sevLabel[status]}
                        />
                        <span className="text-sm font-medium text-foreground truncate">
                          {m.label}
                        </span>
                        <span
                          className={`hidden sm:inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-medium ${sevPill[status]}`}
                        >
                          {sevLabel[status]}
                        </span>
                      </div>

                      {/* realizado */}
                      <span className="text-right w-24 text-sm text-muted-foreground tabular-nums">
                        {formatMetaValue(m.realizado[periodo], m.unidade)}
                      </span>

                      {/* meta editável */}
                      <div className="relative w-32">
                        {prefixo && (
                          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                            {prefixo}
                          </span>
                        )}
                        <input
                          type="number"
                          value={m.meta[periodo]}
                          onChange={(e) =>
                            setMetaValor(m.id, periodo, Number(e.target.value))
                          }
                          className={`h-8 w-full rounded-md border border-border bg-background dark:border-input dark:bg-input/30 text-right text-sm text-foreground tabular-nums transition-all focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 ${
                            prefixo ? "pl-8" : "pl-2.5"
                          } ${sufixo ? "pr-9" : "pr-2.5"}`}
                        />
                        {sufixo && (
                          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                            {sufixo}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground/70">
        As metas definidas aqui alimentam os semáforos do cockpit e de cada lente.
        Indicadores com direção “menor é melhor” (inadimplência, prazos, retrabalho,
        DSO) acendem verde quando o realizado fica abaixo da meta.
      </p>
    </div>
  );
}
