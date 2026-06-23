"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Filter,
  FileText,
  Sparkles,
  MoreHorizontal,
  Copy,
  Trash,
  FileDown,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const GUIADO = "/controladoria/peticoes/inicial";

type Etapa = "Caso" | "Relatório" | "Análise" | "Peça" | "Refino" | "Pronta";

const MOCK: { id: string; titulo: string; cliente: string; etapa: Etapa; status: "Rascunho" | "Pronta"; atualizado: string }[] = [
  { id: "1", titulo: "Ação declaratória c/c repetição de indébito", cliente: "Maria Silva", etapa: "Refino", status: "Rascunho", atualizado: "Hoje, 14:30" },
  { id: "2", titulo: "Ação de indenização — extravio de bagagem", cliente: "João da Silva", etapa: "Peça", status: "Rascunho", atualizado: "Hoje, 11:05" },
  { id: "3", titulo: "Ação revisional de contrato bancário", cliente: "Carlos Andrade", etapa: "Análise", status: "Rascunho", atualizado: "Ontem, 16:40" },
  { id: "4", titulo: "Ação de cobrança de honorários", cliente: "Ana Beatriz", etapa: "Pronta", status: "Pronta", atualizado: "28/05/2026" },
];

const ETAPA_INDEX: Record<Etapa, number> = { Caso: 1, Relatório: 2, Análise: 3, Peça: 4, Refino: 5, Pronta: 5 };

export default function PeticoesListaPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState(MOCK);
  const [toast, setToast] = useState<string | null>(null);

  const fireToast = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(null), 2600);
  };

  const abrir = () => router.push(GUIADO);

  const filtered = rows.filter(
    (p) => p.titulo.toLowerCase().includes(search.toLowerCase()) || p.cliente.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex h-full flex-col gap-4 animate-in fade-in duration-300">
      {/* Header (compacto) */}
      <div className="flex shrink-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col space-y-1">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Trabalho &amp; Fluxos</p>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold tracking-tight">Petições</h1>
            <Badge variant="outline" className="rounded-sm border-primary/20 bg-primary/10 text-xs font-semibold text-primary">
              IA
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Crie a inicial guiada pela IA — dos documentos do cliente à peça pronta para protocolo.</p>
        </div>
        <Button className="gap-2" onClick={abrir}>
          <Plus className="size-4" />
          Nova petição
        </Button>
      </div>

      {/* Filter bar */}
      <div className="flex shrink-0 flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por título ou cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-background py-1 pl-9 pr-3 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
        <Button variant="outline" size="icon-sm" className="shrink-0" aria-label="Filtros avançados" title="Filtros avançados">
          <Filter className="size-4" />
        </Button>
      </div>

      {/* Tabela de dados (padrão shadcn: Table em container com borda, sem Card) */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-border">
        <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="w-[42%]">Documento</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Etapa</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Última edição</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    Nenhuma petição encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((p) => (
                  <TableRow key={p.id} className="cursor-pointer hover:bg-muted/20" onClick={abrir}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="rounded-md bg-primary/10 p-2">
                          <FileText className="size-4 text-primary" />
                        </div>
                        {p.titulo}
                      </div>
                    </TableCell>
                    <TableCell>{p.cliente}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span className="text-[10px] font-semibold text-primary">{ETAPA_INDEX[p.etapa]}/5</span>
                        {p.etapa}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={p.status === "Rascunho" ? "secondary" : "default"}>{p.status}</Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{p.atualizado}</TableCell>
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <Button variant="ghost" size="sm" className="gap-1.5 text-primary" onClick={abrir}>
                          Abrir <ArrowRight className="size-3.5" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger className="inline-flex size-8 items-center justify-center rounded-md hover:bg-muted focus:bg-muted focus:outline-none">
                            <MoreHorizontal className="size-4" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuGroup>
                              <DropdownMenuLabel>Ações</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              {p.status === "Pronta" && (
                                <DropdownMenuItem className="cursor-pointer gap-2" onClick={() => fireToast("Download do pacote iniciado.")}>
                                  <FileDown className="size-4 text-muted-foreground" />
                                  Baixar pacote
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="cursor-pointer gap-2" onClick={() => fireToast("Petição duplicada.")}>
                                <Copy className="size-4 text-muted-foreground" />
                                Duplicar
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="cursor-pointer gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive"
                                onClick={() => {
                                  setRows((r) => r.filter((x) => x.id !== p.id));
                                  fireToast("Petição excluída.");
                                }}
                              >
                                <Trash className="size-4" />
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-lg bg-zinc-900 px-4 py-3 text-white shadow-lg animate-in slide-in-from-bottom-5 fade-in duration-300 dark:bg-white dark:text-zinc-900">
          <span className="rounded-full bg-emerald-500/20 p-1 text-emerald-500">
            <Sparkles className="size-4" />
          </span>
          <p className="text-sm font-medium">{toast}</p>
        </div>
      )}
    </div>
  );
}
