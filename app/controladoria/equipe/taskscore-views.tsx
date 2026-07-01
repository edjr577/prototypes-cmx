"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  Trophy,
  Target,
  CheckCheck,
  ListChecks,
  AlertTriangle,
  Clock,
  Zap,
  Activity,
  Plug,
  Settings,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Cell,
} from "recharts";

/* =========================================================================
   DADOS REAIS — Produtividade Associados · Maio/2026 (fonte: ADVBOX Taskscore)
   Extraídos de Produtividade_Associados_Maio2026.xlsx
   ========================================================================= */

const META_DIARIA = 350;
const DIAS_UTEIS = 20;

type AssocKey = "Isabelly" | "Rebecca" | "Erica";

const ASSOC: {
  key: AssocKey;
  nome: string;
  iniciais: string;
  cor: string;
  linha: string;
  pontos: number;
  tarefas: number;
  media: number;
  diasMeta: number;
  noPrazo: number;
  vencidas: number;
  penalidade: number;
}[] = [
  { key: "Isabelly", nome: "Isabelly Sarmento", iniciais: "IS", cor: "bg-sky-500/15 text-sky-600 dark:text-sky-400", linha: "oklch(0.7 0.13 240)", pontos: 11497, tarefas: 496, media: 574.85, diasMeta: 19, noPrazo: 439, vencidas: 57, penalidade: 285 },
  { key: "Rebecca", nome: "Rebecca Brandão", iniciais: "RB", cor: "bg-violet-500/15 text-violet-600 dark:text-violet-400", linha: "oklch(0.66 0.16 300)", pontos: 10059, tarefas: 466, media: 479, diasMeta: 16, noPrazo: 418, vencidas: 48, penalidade: 240 },
  { key: "Erica", nome: "Érica Nunes", iniciais: "EN", cor: "bg-amber-500/15 text-amber-600 dark:text-amber-400", linha: "oklch(0.78 0.13 70)", pontos: 4977, tarefas: 232, media: 331.8, diasMeta: 5, noPrazo: 160, vencidas: 72, penalidade: 360 },
];

const DIAS: { dia: string; Isabelly: number; Rebecca: number; Erica: number }[] = [
  { dia: "04/05", Isabelly: 788, Rebecca: 600, Erica: 0 },
  { dia: "05/05", Isabelly: 626, Rebecca: 555, Erica: 0 },
  { dia: "06/05", Isabelly: 573, Rebecca: 441, Erica: 0 },
  { dia: "07/05", Isabelly: 637, Rebecca: 322, Erica: 0 },
  { dia: "08/05", Isabelly: 463, Rebecca: 589, Erica: 0 },
  { dia: "11/05", Isabelly: 573, Rebecca: 607, Erica: 443 },
  { dia: "12/05", Isabelly: 381, Rebecca: 818, Erica: 634 },
  { dia: "13/05", Isabelly: 513, Rebecca: 818, Erica: 219 },
  { dia: "14/05", Isabelly: 497, Rebecca: 485, Erica: 232 },
  { dia: "15/05", Isabelly: 349, Rebecca: 298, Erica: 160 },
  { dia: "16/05", Isabelly: 0, Rebecca: 298, Erica: 0 },
  { dia: "18/05", Isabelly: 502, Rebecca: 373, Erica: 12 },
  { dia: "19/05", Isabelly: 491, Rebecca: 682, Erica: 8 },
  { dia: "20/05", Isabelly: 733, Rebecca: 370, Erica: 591 },
  { dia: "21/05", Isabelly: 535, Rebecca: 493, Erica: 318 },
  { dia: "22/05", Isabelly: 835, Rebecca: 493, Erica: 1328 },
  { dia: "25/05", Isabelly: 819, Rebecca: 469, Erica: 126 },
  { dia: "26/05", Isabelly: 629, Rebecca: 495, Erica: 14 },
  { dia: "27/05", Isabelly: 408, Rebecca: 455, Erica: 164 },
  { dia: "28/05", Isabelly: 656, Rebecca: 305, Erica: 153 },
  { dia: "29/05", Isabelly: 434, Rebecca: 272, Erica: 575 },
];

const CAT_PONTOS = [
  { cat: "Complexa", Isabelly: 1780, Rebecca: 1685, Erica: 1045 },
  { cat: "Intermediária", Isabelly: 4300, Rebecca: 2210, Erica: 654 },
  { cat: "Simples", Isabelly: 5417, Rebecca: 6164, Erica: 3278 },
];

const TIPO: Record<AssocKey, { peticoes: number; outras: number; pctPet: number }> = {
  Isabelly: { peticoes: 115, outras: 381, pctPet: 23.2 },
  Rebecca: { peticoes: 39, outras: 427, pctPet: 8.4 },
  Erica: { peticoes: 38, outras: 194, pctPet: 16.4 },
};

type PrazoStatus = "vencido" | "risco" | "no_prazo";
const MONITOR: {
  responsavel: string;
  tarefa: string;
  processo: string;
  partes: string;
  prazo: string;
  dias: number;
  status: PrazoStatus;
}[] = [
  { responsavel: "Érica Nunes", tarefa: "ELABORAR CONTESTAÇÃO", processo: "0801422-13.2026.8.05.0001", partes: "M. Andrade × INSS", prazo: "22/06", dias: -2, status: "vencido" },
  { responsavel: "Érica Nunes", tarefa: "RECURSO INOMINADO", processo: "0712880-44.2026.8.05.0039", partes: "J. Pereira × Banco BV", prazo: "23/06", dias: -1, status: "vencido" },
  { responsavel: "Rebecca Brandão", tarefa: "ALEGAÇÕES FINAIS SIMPLES", processo: "1004567-90.2026.5.05.0012", partes: "L. Sousa × Transp. Bahia", prazo: "24/06", dias: 0, status: "risco" },
  { responsavel: "Isabelly Sarmento", tarefa: "CUMPRIR DESPACHO", processo: "0803311-25.2026.8.05.0004", partes: "R. Lima × Município", prazo: "25/06", dias: 1, status: "risco" },
  { responsavel: "Rebecca Brandão", tarefa: "CONTRARRAZÕES DE APELAÇÃO", processo: "0009912-71.2026.8.05.0080", partes: "C. Dias × Seguradora X", prazo: "26/06", dias: 2, status: "risco" },
  { responsavel: "Érica Nunes", tarefa: "PETIÇÃO INTERCORRENTE", processo: "0717655-02.2026.8.05.0150", partes: "A. Gomes × INSS", prazo: "30/06", dias: 6, status: "no_prazo" },
  { responsavel: "Isabelly Sarmento", tarefa: "EMBARGOS DE DECLARAÇÃO", processo: "0801009-88.2026.8.05.0001", partes: "P. Rocha × Estado BA", prazo: "01/07", dias: 7, status: "no_prazo" },
];

const tooltipStyle = {
  backgroundColor: "var(--card)",
  borderColor: "var(--border)",
  borderRadius: "8px",
  fontSize: "12px",
} as const;

const TOTAL_PONTOS = ASSOC.reduce((s, a) => s + a.pontos, 0);
const TOTAL_TAREFAS = ASSOC.reduce((s, a) => s + a.tarefas, 0);
const TOTAL_VENCIDAS = ASSOC.reduce((s, a) => s + a.vencidas, 0);
const TOTAL_NOPRAZO = ASSOC.reduce((s, a) => s + a.noPrazo, 0);
const TOTAL_PENALIDADE = ASSOC.reduce((s, a) => s + a.penalidade, 0);
const PCT_NOPRAZO = Math.round((TOTAL_NOPRAZO / TOTAL_TAREFAS) * 1000) / 10;

const prazoPill: Record<PrazoStatus, string> = {
  vencido: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  risco: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  no_prazo: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
};
const prazoLabel: Record<PrazoStatus, string> = {
  vencido: "🔴 Vencido",
  risco: "🟡 D-2",
  no_prazo: "🟢 No prazo",
};

const sevDot: Record<"ok" | "atencao" | "critico", string> = {
  ok: "bg-emerald-500",
  atencao: "bg-amber-500",
  critico: "bg-rose-500",
};

function Kpi({
  label,
  value,
  sub,
  icon: Icon,
  color,
  status = "ok",
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  status?: "ok" | "atencao" | "critico";
}) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="px-4 py-0 flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <span className={`size-2 rounded-full shrink-0 ${sevDot[status]}`} />
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground truncate">{label}</span>
          </div>
          <div className={`rounded-lg p-1.5 bg-muted ${color}`}>
            <Icon className="size-4" />
          </div>
        </div>
        <div className="text-2xl font-bold tracking-tight text-foreground">{value}</div>
        <div className="text-xs text-muted-foreground/80">{sub}</div>
      </CardContent>
    </Card>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border/50 bg-muted/20 px-3 py-2">
      <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-lg font-bold tracking-tight text-foreground tabular-nums">{value}</div>
    </div>
  );
}

/* ============================== ABA PRODUTIVIDADE ============================== */

export function ProdutividadeTab() {
  const [drill, setDrill] = React.useState<AssocKey>("Isabelly");
  const assocSel = ASSOC.find((a) => a.key === drill)!;
  const serieSel = DIAS.map((d, i) => {
    const pts = d[drill];
    const prev = i > 0 ? DIAS[i - 1][drill] : null;
    return { dia: d.dia, pts, variacao: prev === null ? 0 : pts - prev, atingida: pts >= META_DIARIA };
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Pontuação por tarefa (Taskscore) — maio/2026 · meta {META_DIARIA} pts/dia · {DIAS_UTEIS} dias úteis
        </p>
        <span className="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
          <Plug className="size-3.5" /> Fonte: ADVBOX
        </span>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Pontos no mês" value={TOTAL_PONTOS.toLocaleString("pt-BR")} sub="Equipe · 3 associados" icon={Trophy} color="text-amber-500" />
        <Kpi label="Tarefas concluídas" value={TOTAL_TAREFAS.toLocaleString("pt-BR")} sub="Pontuadas no Taskscore" icon={ListChecks} color="text-sky-500" />
        <Kpi label="Meta diária" value={`${META_DIARIA} pts`} sub="Regra D-2 ativa" icon={Target} color="text-violet-500" />
        <Kpi label="Aderência à meta" value={`${Math.round((ASSOC.reduce((s, a) => s + a.diasMeta, 0) / (DIAS_UTEIS * 3)) * 100)}%`} sub="Dias com meta batida (time)" icon={CheckCheck} color="text-emerald-500" />
      </div>

      {/* Ranking comparativo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Ranking comparativo</CardTitle>
          <CardDescription>Pontos, tarefas, média diária e dias com meta atingida</CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60 text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="text-left font-semibold px-4 py-2">#</th>
                  <th className="text-left font-semibold px-4 py-2">Associado</th>
                  <th className="text-right font-semibold px-4 py-2">Pontos</th>
                  <th className="text-right font-semibold px-4 py-2">Tarefas</th>
                  <th className="text-right font-semibold px-4 py-2">Média/dia</th>
                  <th className="text-right font-semibold px-4 py-2">Dias c/ meta</th>
                  <th className="text-left font-semibold px-4 py-2 w-[28%]">Proporção de pontos</th>
                </tr>
              </thead>
              <tbody>
                {[...ASSOC]
                  .sort((a, b) => b.pontos - a.pontos)
                  .map((a, i) => (
                    <tr key={a.key} className="border-b border-border/40 last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 text-muted-foreground tabular-nums">{i + 1}º</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <span className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${a.cor}`}>{a.iniciais}</span>
                          <span className="font-medium text-foreground">{a.nome}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-foreground tabular-nums">{a.pontos.toLocaleString("pt-BR")}</td>
                      <td className="px-4 py-3 text-right text-foreground tabular-nums">{a.tarefas}</td>
                      <td className="px-4 py-3 text-right text-foreground tabular-nums">{a.media.toLocaleString("pt-BR")}</td>
                      <td className="px-4 py-3 text-right text-foreground tabular-nums">{a.diasMeta}/{DIAS_UTEIS}</td>
                      <td className="px-4 py-3">
                        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${(a.pontos / ASSOC[0].pontos) * 100}%`, background: a.linha }} />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Evolução diária */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Evolução da produtividade diária</CardTitle>
          <CardDescription>Pontos por dia × meta de {META_DIARIA} pts</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={DIAS} margin={{ top: 8, right: 16, left: -12, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.12} />
              <XAxis dataKey="dia" axisLine={false} tickLine={false} style={{ fontSize: "10px", fill: "var(--muted-foreground)" }} interval={1} />
              <YAxis axisLine={false} tickLine={false} style={{ fontSize: "11px", fill: "var(--muted-foreground)" }} />
              <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: "var(--foreground)" }} />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
              <ReferenceLine y={META_DIARIA} stroke="var(--muted-foreground)" strokeDasharray="4 4" label={{ value: "Meta 350", fontSize: 10, fill: "var(--muted-foreground)", position: "insideTopRight" }} />
              {ASSOC.map((a) => (
                <Line key={a.key} type="monotone" dataKey={a.key} name={a.nome.split(" ")[0]} stroke={a.linha} strokeWidth={2} dot={false} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Categoria + Tipo */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Pontos por categoria</CardTitle>
            <CardDescription>Complexidade da tarefa (de-para ADVBOX)</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CAT_PONTOS} margin={{ top: 8, right: 16, left: -12, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.12} />
                <XAxis dataKey="cat" axisLine={false} tickLine={false} style={{ fontSize: "11px", fill: "var(--muted-foreground)" }} />
                <YAxis axisLine={false} tickLine={false} style={{ fontSize: "11px", fill: "var(--muted-foreground)" }} />
                <Tooltip cursor={{ fill: "var(--muted)" }} contentStyle={tooltipStyle} itemStyle={{ color: "var(--foreground)" }} />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                {ASSOC.map((a) => (
                  <Bar key={a.key} dataKey={a.key} name={a.nome.split(" ")[0]} fill={a.linha} radius={[3, 3, 0, 0]} barSize={18} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Petições × outras tarefas</CardTitle>
            <CardDescription>Composição do volume por associado</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col justify-center gap-5 h-72 px-6">
            {ASSOC.map((a) => {
              const t = TIPO[a.key];
              return (
                <div key={a.key} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground">{a.nome.split(" ")[0]}</span>
                    <span className="text-muted-foreground tabular-nums">{t.peticoes} petições · {t.pctPet}%</span>
                  </div>
                  <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-primary" style={{ width: `${t.pctPet}%` }} title={`Petições: ${t.peticoes}`} />
                    <div className="h-full bg-primary/25" style={{ width: `${100 - t.pctPet}%` }} title={`Outras: ${t.outras}`} />
                  </div>
                </div>
              );
            })}
            <div className="flex items-center gap-4 pt-1 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-primary" /> Petições</span>
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-primary/25" /> Outras tarefas</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Drill-down individual */}
      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <CardTitle className="text-base font-semibold">Detalhe diário por associado</CardTitle>
            <CardDescription>Pontuação dia a dia, status da meta e variação</CardDescription>
          </div>
          <div className="flex gap-1 rounded-lg bg-muted p-1">
            {ASSOC.map((a) => (
              <button
                key={a.key}
                onClick={() => setDrill(a.key)}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${drill === a.key ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                {a.nome.split(" ")[0]}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <MiniStat label="Acumulado" value={assocSel.pontos.toLocaleString("pt-BR")} />
            <MiniStat label="Média/dia" value={assocSel.media.toLocaleString("pt-BR")} />
            <MiniStat label="Dias c/ meta" value={`${assocSel.diasMeta}/${DIAS_UTEIS}`} />
            <MiniStat label="Maior dia" value={Math.max(...DIAS.map((d) => d[drill])).toLocaleString("pt-BR")} />
          </div>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={serieSel} margin={{ top: 8, right: 8, left: -16, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.12} />
                <XAxis dataKey="dia" axisLine={false} tickLine={false} style={{ fontSize: "10px", fill: "var(--muted-foreground)" }} interval={1} />
                <YAxis axisLine={false} tickLine={false} style={{ fontSize: "11px", fill: "var(--muted-foreground)" }} />
                <Tooltip cursor={{ fill: "var(--muted)" }} contentStyle={tooltipStyle} itemStyle={{ color: "var(--foreground)" }} />
                <ReferenceLine y={META_DIARIA} stroke="var(--muted-foreground)" strokeDasharray="4 4" />
                <Bar dataKey="pts" name="Pontos" radius={[3, 3, 0, 0]} barSize={16}>
                  {serieSel.map((d, i) => (
                    <Cell key={i} fill={d.atingida ? "oklch(0.72 0.14 155)" : "oklch(0.7 0.16 25)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60 text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="text-left font-semibold px-4 py-2">Dia</th>
                  <th className="text-right font-semibold px-4 py-2">Pontuação</th>
                  <th className="text-right font-semibold px-4 py-2">Meta</th>
                  <th className="text-left font-semibold px-4 py-2">Status</th>
                  <th className="text-right font-semibold px-4 py-2">Variação</th>
                </tr>
              </thead>
              <tbody>
                {serieSel.map((d, i) => (
                  <tr key={d.dia} className="border-b border-border/40 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-2 text-foreground">{d.dia}</td>
                    <td className="px-4 py-2 text-right font-medium text-foreground tabular-nums">{d.pts.toLocaleString("pt-BR")}</td>
                    <td className="px-4 py-2 text-right text-muted-foreground tabular-nums">{META_DIARIA}</td>
                    <td className="px-4 py-2">
                      <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${d.atingida ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-rose-500/10 text-rose-600 dark:text-rose-400"}`}>
                        {d.atingida ? "✔ Atingida" : "✘ Abaixo"}
                      </span>
                    </td>
                    <td className={`px-4 py-2 text-right tabular-nums ${i === 0 ? "text-muted-foreground/50" : d.variacao > 0 ? "text-emerald-600 dark:text-emerald-400" : d.variacao < 0 ? "text-rose-600 dark:text-rose-400" : "text-muted-foreground"}`}>
                      {i === 0 ? "—" : `${d.variacao > 0 ? "+" : ""}${d.variacao}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ============================== ABA PONTUALIDADE ============================== */

export function PontualidadeTab() {
  return (
    <div className="flex flex-col gap-6">
      {/* KPIs de prazo */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Tarefas no prazo" value={`${PCT_NOPRAZO}%`} sub={`${TOTAL_NOPRAZO} de ${TOTAL_TAREFAS} tarefas`} icon={CheckCheck} color="text-emerald-500" status="ok" />
        <Kpi label="Vencidas no mês" value={String(TOTAL_VENCIDAS)} sub="Concluídas fora do prazo" icon={AlertTriangle} color="text-rose-500" status="critico" />
        <Kpi label="Em risco (D-2)" value={String(MONITOR.filter((m) => m.status === "risco").length)} sub="Prazo fatal em ≤ 2 dias" icon={Clock} color="text-amber-500" status="atencao" />
        <Kpi label="Pontos perdidos" value={`-${TOTAL_PENALIDADE}`} sub="Penalidade por atraso" icon={Zap} color="text-rose-500" status="critico" />
      </div>

      {/* Pontualidade por associado */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Pontualidade por associado</CardTitle>
          <CardDescription>Proporção de tarefas concluídas no prazo × vencidas</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {ASSOC.map((a) => {
            const pct = Math.round((a.noPrazo / a.tarefas) * 1000) / 10;
            return (
              <div key={a.key} className="flex items-center gap-3">
                <span className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${a.cor}`}>{a.iniciais}</span>
                <div className="flex-1">
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground">{a.nome}</span>
                    <span className="text-muted-foreground tabular-nums">
                      {pct}% no prazo · <span className="text-rose-600 dark:text-rose-400">{a.vencidas} vencidas</span>
                    </span>
                  </div>
                  <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-emerald-500" style={{ width: `${pct}%` }} />
                    <div className="h-full bg-rose-500" style={{ width: `${100 - pct}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Monitor de prazos ao vivo */}
      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Activity className="size-4 text-primary" /> Monitor de prazos (regra D-2)
            </CardTitle>
            <CardDescription>Tarefas abertas com prazo fatal — semáforo 🟢 no prazo · 🟡 D-2 · 🔴 vencido</CardDescription>
          </div>
          <Link href="/controladoria/configuracoes/notificacoes" className="shrink-0 inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors">
            <Settings className="size-3.5" /> Configurar alertas
          </Link>
        </CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60 text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="text-left font-semibold px-4 py-2">Status</th>
                  <th className="text-left font-semibold px-4 py-2">Tarefa</th>
                  <th className="text-left font-semibold px-4 py-2">Processo / partes</th>
                  <th className="text-left font-semibold px-4 py-2">Responsável</th>
                  <th className="text-right font-semibold px-4 py-2">Prazo fatal</th>
                </tr>
              </thead>
              <tbody>
                {MONITOR.map((m, i) => (
                  <tr key={i} className="border-b border-border/40 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${prazoPill[m.status]}`}>{prazoLabel[m.status]}</span>
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground">{m.tarefa}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-foreground/90 tabular-nums text-xs">{m.processo}</span>
                        <span className="text-[11px] text-muted-foreground">{m.partes}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{m.responsavel}</td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-foreground tabular-nums">{m.prazo}</span>
                      <span className={`ml-2 text-[11px] tabular-nums ${m.dias < 0 ? "text-rose-600 dark:text-rose-400" : m.dias <= 2 ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground"}`}>
                        {m.dias < 0 ? `${Math.abs(m.dias)}d atraso` : m.dias === 0 ? "hoje" : `faltam ${m.dias}d`}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
