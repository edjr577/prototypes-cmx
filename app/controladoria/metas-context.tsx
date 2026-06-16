"use client";

import * as React from "react";

export type Periodo = "mes" | "trimestre" | "ano";
export type Direcao = "maior" | "menor"; // maior é melhor / menor é melhor
export type Unidade = "BRL" | "pct" | "qtd" | "dias";
export type Lens = "comercial" | "saida" | "financeiro" | "equipe";
export type Sev = "ok" | "atencao" | "critico";

export interface Meta {
  id: string;
  lens: Lens;
  label: string;
  unidade: Unidade;
  direcao: Direcao;
  realizado: Record<Periodo, number>;
  meta: Record<Periodo, number>;
}

export const lensInfo: Record<Lens, { titulo: string; pergunta: string }> = {
  comercial: { titulo: "Comercial", pergunta: "Estou vendendo bem?" },
  saida: { titulo: "Saída", pergunta: "O que vai virar honorário?" },
  financeiro: {
    titulo: "Financeiro",
    pergunta: "Estou convertendo contratos em caixa?",
  },
  equipe: { titulo: "Equipe", pergunta: "Entrego com qualidade e prazo?" },
};

const metasIniciais: Meta[] = [
  // --- COMERCIAL ---
  {
    id: "receita_contratada",
    lens: "comercial",
    label: "Receita contratada",
    unidade: "BRL",
    direcao: "maior",
    realizado: { mes: 312000, trimestre: 865000, ano: 2480000 },
    meta: { mes: 350000, trimestre: 1000000, ano: 3500000 },
  },
  {
    id: "novos_contratos",
    lens: "comercial",
    label: "Novos contratos",
    unidade: "qtd",
    direcao: "maior",
    realizado: { mes: 28, trimestre: 79, ano: 312 },
    meta: { mes: 30, trimestre: 90, ano: 360 },
  },
  {
    id: "ticket_medio",
    lens: "comercial",
    label: "Ticket médio",
    unidade: "BRL",
    direcao: "maior",
    realizado: { mes: 11100, trimestre: 10900, ano: 10600 },
    meta: { mes: 10000, trimestre: 10000, ano: 10000 },
  },
  {
    id: "taxa_fechamento",
    lens: "comercial",
    label: "Taxa de fechamento",
    unidade: "pct",
    direcao: "maior",
    realizado: { mes: 37, trimestre: 35, ano: 34 },
    meta: { mes: 35, trimestre: 35, ano: 35 },
  },
  // --- SAÍDA ---
  {
    id: "honorario_realizado",
    lens: "saida",
    label: "Honorário realizado",
    unidade: "BRL",
    direcao: "maior",
    realizado: { mes: 540000, trimestre: 1480000, ano: 5200000 },
    meta: { mes: 600000, trimestre: 1800000, ano: 6500000 },
  },
  {
    id: "beneficios_concedidos",
    lens: "saida",
    label: "Benefícios concedidos",
    unidade: "qtd",
    direcao: "maior",
    realizado: { mes: 23, trimestre: 64, ano: 248 },
    meta: { mes: 25, trimestre: 75, ano: 300 },
  },
  // --- FINANCEIRO ---
  {
    id: "conversao_caixa",
    lens: "financeiro",
    label: "Conversão em caixa",
    unidade: "pct",
    direcao: "maior",
    realizado: { mes: 74, trimestre: 76, ano: 75 },
    meta: { mes: 80, trimestre: 80, ano: 80 },
  },
  {
    id: "inadimplencia",
    lens: "financeiro",
    label: "Inadimplência",
    unidade: "BRL",
    direcao: "menor",
    realizado: { mes: 96000, trimestre: 99000, ano: 104000 },
    meta: { mes: 70000, trimestre: 70000, ano: 70000 },
  },
  {
    id: "dso",
    lens: "financeiro",
    label: "Prazo médio de recebimento (DSO)",
    unidade: "dias",
    direcao: "menor",
    realizado: { mes: 38, trimestre: 40, ano: 41 },
    meta: { mes: 45, trimestre: 45, ano: 45 },
  },
  // --- EQUIPE ---
  {
    id: "taxa_exito",
    lens: "equipe",
    label: "Taxa de êxito",
    unidade: "pct",
    direcao: "maior",
    realizado: { mes: 88, trimestre: 88, ano: 87 },
    meta: { mes: 90, trimestre: 90, ano: 90 },
  },
  {
    id: "prazos_vencidos",
    lens: "equipe",
    label: "Prazos vencidos",
    unidade: "qtd",
    direcao: "menor",
    realizado: { mes: 12, trimestre: 18, ano: 42 },
    meta: { mes: 0, trimestre: 0, ano: 0 },
  },
  {
    id: "retrabalho",
    lens: "equipe",
    label: "Retrabalho",
    unidade: "pct",
    direcao: "menor",
    realizado: { mes: 4, trimestre: 4, ano: 5 },
    meta: { mes: 5, trimestre: 5, ano: 5 },
  },
];

// Status (semáforo) calculado a partir de realizado vs meta + direção
export function statusOf(m: Meta, p: Periodo): Sev {
  const real = m.realizado[p];
  const meta = m.meta[p];
  if (m.direcao === "maior") {
    if (meta <= 0) return real > 0 ? "ok" : "critico";
    const r = real / meta;
    return r >= 1 ? "ok" : r >= 0.85 ? "atencao" : "critico";
  }
  // menor é melhor
  if (meta <= 0) return real <= 0 ? "ok" : real <= 3 ? "atencao" : "critico";
  if (real <= meta) return "ok";
  return real <= meta * 1.2 ? "atencao" : "critico";
}

export function formatMetaValue(v: number, unidade: Unidade): string {
  switch (unidade) {
    case "BRL":
      return Math.abs(v) >= 1_000_000
        ? `R$ ${(v / 1_000_000).toLocaleString("pt-BR", { maximumFractionDigits: 2 })}M`
        : Math.abs(v) >= 1_000
        ? `R$ ${Math.round(v / 1000)}k`
        : `R$ ${v.toLocaleString("pt-BR")}`;
    case "pct":
      return `${v}%`;
    case "dias":
      return `${v} dias`;
    default:
      return v.toLocaleString("pt-BR");
  }
}

interface MetasContextValue {
  metas: Meta[];
  getMeta: (id: string) => Meta | undefined;
  setMetaValor: (id: string, periodo: Periodo, valor: number) => void;
}

const MetasContext = React.createContext<MetasContextValue | null>(null);

export function MetasProvider({ children }: { children: React.ReactNode }) {
  const [metas, setMetas] = React.useState<Meta[]>(metasIniciais);

  const getMeta = React.useCallback(
    (id: string) => metas.find((m) => m.id === id),
    [metas]
  );

  const setMetaValor = React.useCallback(
    (id: string, periodo: Periodo, valor: number) => {
      setMetas((prev) =>
        prev.map((m) =>
          m.id === id ? { ...m, meta: { ...m.meta, [periodo]: valor } } : m
        )
      );
    },
    []
  );

  return (
    <MetasContext.Provider value={{ metas, getMeta, setMetaValor }}>
      {children}
    </MetasContext.Provider>
  );
}

export function useMetas() {
  const ctx = React.useContext(MetasContext);
  if (!ctx) throw new Error("useMetas precisa estar dentro de <MetasProvider>");
  return ctx;
}
