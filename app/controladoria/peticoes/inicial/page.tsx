"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ArrowRight,
  ArrowUp,
  Check,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  FileText,
  Folder,
  Feather,
  Wand2,
  Sparkles,
  Loader2,
  Database,
  Target,
  ShieldCheck,
  UploadCloud,
  ClipboardCheck,
  Package,
  History,
  Copy,
  Download,
  FileSearch,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";

type Stage = "caso" | "relatorio" | "analise" | "peca" | "refino";
type StepStatus = "idle" | "generating" | "done";

const STAGES: { key: Stage; label: string; sub: string; icon: React.ComponentType<any> }[] = [
  { key: "caso", label: "Caso", sub: "dados + docs", icon: Folder },
  { key: "relatorio", label: "Relatório", sub: "base fática", icon: FileText },
  { key: "analise", label: "Análise", sub: "teses + provas", icon: FileSearch },
  { key: "peca", label: "Peça", sub: "redação", icon: Feather },
  { key: "refino", label: "Refino", sub: "+ protocolo", icon: Wand2 },
];

const CLIENTES: Record<string, { nome: string; qualificacao: string; parteContraria: string; processos: { value: string; label: string }[] }> = {
  maria: {
    nome: "Maria Silva",
    qualificacao: "brasileira, casada, comerciária, CPF 123.456.789-00, residente em Angra dos Reis/RJ",
    parteContraria: "Banco X S.A.",
    processos: [
      { value: "p1", label: "0801234-56.2026.8.19.0003 · TJ-RJ" },
      { value: "p2", label: "0809988-77.2026.8.19.0003 · TJ-RJ" },
    ],
  },
  joao: {
    nome: "João da Silva",
    qualificacao: "brasileiro, solteiro, autônomo, CPF 987.654.321-00, residente em Angra dos Reis/RJ",
    parteContraria: "Companhia Aérea Y",
    processos: [{ value: "p1", label: "0805678-90.2026.8.19.0003 · TJ-RJ" }],
  },
};

const RELATORIO_TEXTO = `1. Em 12/03/2026, a parte autora celebrou contrato de empréstimo consignado com a ré.
2. Foram descontados valores não autorizados nas competências 04/2026 e 05/2026.
3. A autora buscou solução administrativa (protocolo 2026-44821), sem êxito.
4. Os documentos confirmam a contratação, os descontos e a reclamação prévia.`;

const ANALISE_TEXTO = `Teses aplicáveis:
• Responsabilidade objetiva do fornecedor (art. 14, CDC).
• Repetição de indébito em dobro (art. 42, parágrafo único, CDC).
• Dano moral in re ipsa pelos descontos indevidos.

Leitura das provas:
• Contrato — comprova a relação de consumo.
• Extratos — comprovam os descontos indevidos (R$ 1.240,00).
• Protocolo administrativo — comprova a tentativa prévia de solução.

Lacuna: não há prova da renda mensal (recomendável para dimensionar o dano).`;

const PECA_HTML = `
<p>EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DE DIREITO DA ___ VARA CÍVEL DA COMARCA DE ANGRA DOS REIS/RJ</p>
<p></p>
<p><strong>MARIA SILVA</strong>, brasileira, casada, comerciária, inscrita no CPF sob o nº 123.456.789-00, residente e domiciliada em Angra dos Reis/RJ, vem, respeitosamente, por sua advogada, propor a presente</p>
<p></p>
<h1>AÇÃO DECLARATÓRIA C/C REPETIÇÃO DE INDÉBITO E INDENIZAÇÃO POR DANOS MORAIS</h1>
<p></p>
<p>em face de <strong>BANCO X S.A.</strong>, pessoa jurídica de direito privado, pelos fatos e fundamentos a seguir.</p>
<p></p>
<h2>I — DOS FATOS</h2>
<p>Em 12/03/2026, a Autora celebrou contrato de empréstimo consignado com a Ré. Nas competências 04/2026 e 05/2026 foram descontados valores não autorizados, totalizando R$ 1.240,00.</p>
<blockquote>A Autora buscou a solução administrativa (protocolo 2026-44821), restando, todavia, infrutíferas as tentativas de composição.</blockquote>
<h2>II — DO DIREITO</h2>
<p>Aplica-se a responsabilidade objetiva do fornecedor (art. 14 do CDC), impondo-se a repetição em dobro do indébito (art. 42, parágrafo único, do CDC) e a reparação do dano moral configurado.</p>
<h2>III — DOS PEDIDOS</h2>
<p>a) a declaração de inexigibilidade dos descontos;</p>
<p>b) a condenação da Ré à repetição em dobro do indébito;</p>
<p>c) a condenação ao pagamento de danos morais;</p>
<p>d) a inversão do ônus da prova.</p>
`;

function RailNode({
  stage,
  current,
  index,
  currentIndex,
  onJump,
}: {
  stage: (typeof STAGES)[number];
  current: boolean;
  index: number;
  currentIndex: number;
  onJump: (s: Stage) => void;
}) {
  const Icon = stage.icon;
  const done = index < currentIndex;
  const clickable = done;
  return (
    <button
      type="button"
      disabled={!clickable}
      onClick={() => clickable && onJump(stage.key)}
      className={`flex flex-1 items-center justify-center gap-2.5 ${clickable ? "cursor-pointer" : "cursor-default"}`}
    >
      <span
        className={`flex size-8 shrink-0 items-center justify-center rounded-full transition-colors ${
          done
            ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-500"
            : current
              ? "bg-primary/15 text-primary ring-3 ring-primary/10"
              : "bg-muted text-muted-foreground/60 border border-border"
        }`}
      >
        {done ? <Check className="size-4" /> : <Icon className="size-4" />}
      </span>
      <span className="flex min-w-0 flex-col text-left leading-tight">
        <span className={`text-xs font-medium ${current ? "text-primary" : done ? "text-foreground" : "text-muted-foreground"}`}>
          {stage.label}
        </span>
        <span className="hidden truncate text-[11px] text-muted-foreground sm:block">{stage.sub}</span>
      </span>
    </button>
  );
}

function GroundingChip({ label, ok, icon: Icon }: { label: string; ok?: boolean; icon: React.ComponentType<any> }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs ${
        ok
          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
          : "bg-muted text-muted-foreground"
      }`}
    >
      {ok ? <Check className="size-3.5" /> : <Icon className="size-3.5" />}
      {label}
    </span>
  );
}

export default function PeticaoInicialGuiadaPage() {
  const [stage, setStage] = useState<Stage>("caso");
  const currentIndex = STAGES.findIndex((s) => s.key === stage);

  // Caso
  const [clienteKey, setClienteKey] = useState<string | null>(null);
  const cliente = clienteKey ? CLIENTES[clienteKey] : null;
  const [docs, setDocs] = useState<{ nome: string; status: "ok" | "scan" }[]>([]);
  const [processoSel, setProcessoSel] = useState<string | null>(null);

  // AI steps
  const [stepStatus, setStepStatus] = useState<Record<string, StepStatus>>({ relatorio: "idle", analise: "idle", peca: "idle" });
  const [relatorioMode, setRelatorioMode] = useState<"ia" | "manual">("ia");
  const [analiseMode, setAnaliseMode] = useState<"ia" | "manual">("ia");
  const [relatorioText, setRelatorioText] = useState("");
  const [analiseText, setAnaliseText] = useState("");
  const [estrategia, setEstrategia] = useState("");

  // Refino
  const [ajuste, setAjuste] = useState("");
  const [ajustesAplicados, setAjustesAplicados] = useState(0);
  const [refinando, setRefinando] = useState(false);
  const [procuracaoOk, setProcuracaoOk] = useState(false);

  // toast
  const [toast, setToast] = useState<string | null>(null);
  const fireToast = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(null), 2600);
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const editor = useEditor({
    extensions: [StarterKit, Underline, TextAlign.configure({ types: ["heading", "paragraph"] })],
    content: "",
    editorProps: {
      attributes: {
        class:
          "outline-none text-sm leading-relaxed text-zinc-800 dark:text-zinc-200 w-full [&_p]:mb-3 [&_h1]:text-xl [&_h1]:font-bold [&_h1]:my-3 [&_h2]:text-base [&_h2]:font-bold [&_h2]:mt-4 [&_h2]:mb-2 [&_blockquote]:border-l-4 [&_blockquote]:border-zinc-300 [&_blockquote]:dark:border-zinc-700 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-3 [&_blockquote]:text-muted-foreground",
      },
    },
  });

  const simulate = (key: string, ms: number, after: () => void) => {
    setStepStatus((p) => ({ ...p, [key]: "generating" }));
    setTimeout(() => {
      setStepStatus((p) => ({ ...p, [key]: "done" }));
      after();
    }, ms);
  };

  const addDoc = () => {
    const pool = [
      { nome: "contrato_assinado.pdf", status: "ok" as const },
      { nome: "extratos_descontos.pdf", status: "ok" as const },
      { nome: "comprovantes_scaneados.pdf", status: "scan" as const },
    ];
    setDocs((d) => (d.length < pool.length ? [...d, pool[d.length]] : d));
  };

  const gerarPeca = () => {
    setStage("peca");
    simulate("peca", 1800, () => {
      if (editor) editor.commands.setContent(PECA_HTML);
      fireToast("Peça gerada — revise antes de protocolar.");
      setStage("refino");
    });
  };

  const aplicarAjuste = (texto: string) => {
    if (!texto.trim()) return;
    setRefinando(true);
    setTimeout(() => {
      setRefinando(false);
      setAjustesAplicados((n) => n + 1);
      setAjuste("");
      fireToast("Ajuste aplicado pela IA.");
    }, 1300);
  };

  const protocoloItems = [
    { label: "Peça revisada", ok: true },
    { label: "Provas anexadas (3)", ok: docs.length >= 1 || true },
    { label: "Valor da causa preenchido", ok: true },
    { label: "Procuração / documentos de representação", ok: procuracaoOk },
  ];
  const prontoProtocolo = protocoloItems.every((i) => i.ok);

  const StageShell = ({
    title,
    desc,
    headerRight,
    footer,
    overlay,
    children,
  }: {
    title: string;
    desc?: string;
    headerRight?: React.ReactNode;
    footer?: React.ReactNode;
    overlay?: React.ReactNode;
    children: React.ReactNode;
  }) => (
    <div className="relative flex min-h-0 flex-1 flex-col rounded-xl border border-border bg-card shadow-sm">
      {overlay}
      <div className="flex shrink-0 items-start justify-between gap-4 px-5 pb-3 pt-5">
        <div>
          <p className="text-base font-semibold text-foreground">{title}</p>
          {desc && <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>}
        </div>
        {headerRight}
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5 pt-1 no-scrollbar">{children}</div>
      {footer && (
        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-border/60 px-5 py-4">{footer}</div>
      )}
    </div>
  );

  const AiStepPanel = ({
    nome,
    descricao,
    chips,
    mode,
    setMode,
    status,
    text,
    setText,
    placeholder,
    onGerar,
    onContinuar,
    continuarLabel,
  }: {
    nome: string;
    descricao: string;
    chips: React.ReactNode;
    mode: "ia" | "manual";
    setMode: (m: "ia" | "manual") => void;
    status: StepStatus;
    text: string;
    setText: (v: string) => void;
    placeholder: string;
    onGerar: () => void;
    onContinuar: () => void;
    continuarLabel: string;
  }) => (
    <StageShell
      title={nome}
      desc={descricao}
      headerRight={
        <div className="flex shrink-0 overflow-hidden rounded-lg border border-border text-xs">
          <button
            type="button"
            onClick={() => setMode("ia")}
            className={`px-3 py-1.5 font-medium transition-colors ${mode === "ia" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/50"}`}
          >
            Deixar a IA gerar
          </button>
          <button
            type="button"
            onClick={() => setMode("manual")}
            className={`border-l border-border px-3 py-1.5 transition-colors ${mode === "manual" ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/50"}`}
          >
            Já tenho
          </button>
        </div>
      }
      footer={
        <>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5" /> Não inventa fatos nem jurisprudência · claude-sonnet-4-6
          </span>
          <Button
            onClick={onContinuar}
            disabled={mode === "ia" ? status !== "done" : !text.trim()}
            variant={mode === "ia" && status !== "done" ? "outline" : "default"}
            className="gap-2"
          >
            {continuarLabel}
            <ArrowRight className="size-4" />
          </Button>
        </>
      }
    >
      <p className="mb-1.5 text-xs text-muted-foreground">Construído a partir de:</p>
      <div className="flex flex-wrap gap-1.5">{chips}</div>

      {mode === "ia" ? (
        <div className="mt-4">
          {status === "done" ? (
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
              <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-foreground/90">{text}</pre>
            </div>
          ) : (
            <Button onClick={onGerar} disabled={status === "generating"} className="gap-2">
              {status === "generating" ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
              {status === "generating" ? "Gerando…" : `Gerar ${nome.toLowerCase()} com a IA`}
            </Button>
          )}
        </div>
      ) : (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          className="mt-4 min-h-[120px] w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      )}
    </StageShell>
  );

  return (
    <div className="flex h-full flex-col gap-4 animate-in fade-in duration-300">
      {/* Header (compacto) */}
      <div className="flex shrink-0 flex-col gap-1">
        <Link href="/controladoria/peticoes" className="inline-flex w-fit items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
          <ChevronLeft className="size-3.5" /> Petições
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold tracking-tight">Petição inicial</h1>
            <Badge variant="outline" className="rounded-sm border-primary/20 bg-primary/10 text-xs font-semibold text-primary">
              Guiado por IA
            </Badge>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <Check className="size-3.5 text-emerald-500" /> Rascunho salvo automaticamente
          </span>
        </div>
        <p className="text-sm text-muted-foreground">Dos documentos do cliente à peça pronta — em 5 etapas. Você decide a estratégia; a IA redige.</p>
      </div>

      {/* Pipeline rail (plano) */}
      <div className="flex w-full shrink-0 items-center gap-2 overflow-x-auto no-scrollbar">
        {STAGES.map((s, i) => (
          <React.Fragment key={s.key}>
            <RailNode stage={s} current={s.key === stage} index={i} currentIndex={currentIndex} onJump={setStage} />
            {i < STAGES.length - 1 && (
              <span className={`h-px flex-1 ${i < currentIndex ? "bg-emerald-500/60" : "bg-border"}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Stage content */}
      {stage === "caso" && (
        <StageShell
          title="Caso — de onde a IA parte"
          desc="Escolha o cliente e o processo. Puxamos o que já existe no seu acervo."
          footer={
            <>
              <span className="text-xs text-muted-foreground">{docs.length} documento(s) anexado(s)</span>
              <Button onClick={() => setStage("relatorio")} disabled={!cliente} className="gap-2">
                Continuar para Relatório <ArrowRight className="size-4" />
              </Button>
            </>
          }
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Cliente</label>
              <Select value={clienteKey ?? undefined} onValueChange={(v) => { setClienteKey(v); setProcessoSel(null); }}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um cliente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maria">Maria Silva</SelectItem>
                  <SelectItem value="joao">João da Silva</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Processo</label>
              <Select value={processoSel ?? undefined} onValueChange={(v) => setProcessoSel(v)} disabled={!cliente}>
                <SelectTrigger>
                  <SelectValue placeholder={cliente ? "Selecione o processo" : "Escolha um cliente primeiro"} />
                </SelectTrigger>
                <SelectContent>
                  {cliente?.processos.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {cliente && (
            <div className="mt-4 flex items-start gap-3 rounded-lg border border-primary/15 bg-primary/5 p-3 animate-in fade-in duration-200">
              <Database className="mt-0.5 size-4 shrink-0 text-primary" />
              <p className="text-xs leading-relaxed text-foreground/80">
                <span className="font-medium text-foreground">Preenchido do seu acervo:</span> qualificação de {cliente.nome}, parte
                contrária ({cliente.parteContraria}) e dados do processo.{" "}
                <button className="text-primary underline">Revisar 6 campos</button>
              </p>
            </div>
          )}

          <div className="mt-5">
            <label className="text-sm font-medium text-foreground">Documentos do cliente</label>
            <button
              onClick={addDoc}
              className="mt-2 flex w-full flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/20 p-5 text-center transition-colors hover:border-primary/40 hover:bg-muted/40"
            >
              <UploadCloud className="mb-1.5 size-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Clique para anexar PDF, DOCX ou TXT — extraímos o texto</span>
            </button>
            <div className="mt-2 flex flex-col gap-1.5">
              {docs.map((d) => (
                <div key={d.nome} className="flex items-center gap-2.5 rounded-md border border-border px-3 py-2 text-xs animate-in fade-in duration-200">
                  <FileText className="size-4 text-muted-foreground" />
                  {d.nome}
                  {d.status === "ok" ? (
                    <span className="ml-auto inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-500">
                      <Check className="size-3.5" /> texto extraído
                    </span>
                  ) : (
                    <span className="ml-auto inline-flex items-center gap-1 text-amber-600 dark:text-amber-500">
                      <AlertTriangle className="size-3.5" /> escaneado — cole o texto
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

        </StageShell>
      )}

      {stage === "relatorio" && (
        <AiStepPanel
          nome="Relatório"
          descricao="A IA estrutura a base fática a partir dos documentos."
          chips={<GroundingChip label={`Documentos (${docs.length || 3})`} icon={FileText} />}
          mode={relatorioMode}
          setMode={setRelatorioMode}
          status={stepStatus.relatorio}
          text={relatorioMode === "ia" ? RELATORIO_TEXTO : relatorioText}
          setText={setRelatorioText}
          placeholder="Cole aqui a base fática que você já tem pronta…"
          onGerar={() => simulate("relatorio", 1500, () => fireToast("Relatório gerado."))}
          onContinuar={() => setStage("analise")}
          continuarLabel="Continuar para Análise"
        />
      )}

      {stage === "analise" && (
        <AiStepPanel
          nome="Análise"
          descricao="A IA sugere teses aplicáveis e lê as provas. Você valida."
          chips={
            <>
              <GroundingChip label="Relatório" ok icon={FileText} />
              <GroundingChip label={`Provas (${docs.length || 3})`} icon={FileText} />
            </>
          }
          mode={analiseMode}
          setMode={setAnaliseMode}
          status={stepStatus.analise}
          text={analiseMode === "ia" ? ANALISE_TEXTO : analiseText}
          setText={setAnaliseText}
          placeholder="Cole aqui a análise que você já tem pronta…"
          onGerar={() => simulate("analise", 1500, () => fireToast("Análise gerada."))}
          onContinuar={() => setStage("peca")}
          continuarLabel="Continuar para Peça"
        />
      )}

      {stage === "peca" && (
        <StageShell
          title="Peça — a IA redige a petição"
          desc="Usa tudo o que você preparou. Você revisa antes de protocolar."
          overlay={
            stepStatus.peca === "generating" ? (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl bg-card/70 backdrop-blur-xs">
                <Loader2 className="mb-2 size-6 animate-spin text-primary" />
                <p className="text-xs font-medium">Redigindo a peça…</p>
              </div>
            ) : null
          }
          footer={
            <>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="size-3.5" /> Trabalha só com o que você forneceu · claude-sonnet-4-6
              </span>
              <Button onClick={gerarPeca} disabled={stepStatus.peca === "generating" || !estrategia.trim()} className="gap-2">
                {stepStatus.peca === "generating" ? <Loader2 className="size-4 animate-spin" /> : <Feather className="size-4" />}
                {stepStatus.peca === "generating" ? "Redigindo…" : "Gerar peça com a IA"}
              </Button>
            </>
          }
        >
          <p className="mb-1.5 text-xs text-muted-foreground">A peça é construída a partir de:</p>
          <div className="flex flex-wrap gap-1.5">
            <GroundingChip label="Relatório" ok icon={FileText} />
            <GroundingChip label="Análise" ok icon={FileSearch} />
            <GroundingChip label={`Provas (${docs.length || 3})`} icon={FileText} />
            <GroundingChip label="Estratégia" icon={Target} />
          </div>

          <label className="mt-5 block text-sm font-medium text-foreground">
            Estratégia jurídica <span className="font-normal text-muted-foreground">— você define as teses e pedidos</span>
          </label>
          <textarea
            value={estrategia}
            onChange={(e) => setEstrategia(e.target.value)}
            placeholder="Ex.: responsabilidade objetiva (art. 14 CDC); repetição em dobro; dano moral in re ipsa…"
            className="mt-2 min-h-[80px] w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />

        </StageShell>
      )}

      {stage === "refino" && (
        <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
          {/* Editor */}
          <div className="flex min-h-0 flex-col rounded-xl border border-border bg-card shadow-sm">
            <div className="flex shrink-0 items-center justify-between border-b border-border/60 px-4 py-2.5">
              <Badge className="gap-1.5 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
                <Sparkles className="size-3.5" /> Refinada · claude-sonnet-4-6
              </Badge>
              <div className="flex gap-1.5">
                <Button variant="ghost" size="sm" className="gap-1.5" onClick={() => fireToast("Copiado.")}>
                  <Copy className="size-3.5" /> Copiar
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5" onClick={() => fireToast("Download .docx iniciado.")}>
                  <Download className="size-3.5" /> .docx
                </Button>
              </div>
            </div>
            <div className="relative min-h-0 flex-1 overflow-y-auto p-6 no-scrollbar">
              {refinando && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-card/60 backdrop-blur-xs">
                  <Loader2 className="mb-2 size-6 animate-spin text-primary" />
                  <p className="text-xs font-medium">Aplicando ajuste…</p>
                </div>
              )}
              {mounted && editor ? (
                <EditorContent editor={editor} />
              ) : (
                <div className="h-64 animate-pulse rounded-md bg-muted" />
              )}
            </div>
          </div>

          {/* Side: refino iterativo + protocolo */}
          <div className="flex min-h-0 flex-col gap-4 overflow-y-auto no-scrollbar">
            <div className="shrink-0 rounded-xl border border-border bg-card p-5 shadow-sm">
              <p className="inline-flex items-center gap-2 text-sm font-semibold">
                <Wand2 className="size-4 text-primary" /> Ajustes pontuais
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">Peça à IA sem refazer a peça inteira.</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["+ reforçar dano moral", "corrigir valor da causa", "tom mais enfático"].map((s) => (
                  <button
                    key={s}
                    onClick={() => aplicarAjuste(s)}
                    className="rounded-md border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <input
                  value={ajuste}
                  onChange={(e) => setAjuste(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && aplicarAjuste(ajuste)}
                  placeholder='Ex.: "ajuste o endereçamento para a vara cível…"'
                  className="h-8 flex-1 rounded-md border border-input bg-transparent px-3 text-xs shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
                <Button size="sm" className="gap-1.5" disabled={!ajuste.trim() || refinando} onClick={() => aplicarAjuste(ajuste)}>
                  <ArrowUp className="size-3.5" /> Aplicar
                </Button>
              </div>
              {ajustesAplicados > 0 && (
                <p className="mt-2.5 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <History className="size-3.5" /> {ajustesAplicados} ajuste(s) aplicado(s) nesta sessão
                </p>
              )}
            </div>

            <div className="shrink-0 rounded-xl border border-border bg-card p-5 shadow-sm">
              <p className="inline-flex items-center gap-2 text-sm font-semibold">
                <ClipboardCheck className="size-4 text-emerald-600 dark:text-emerald-500" /> Pronta para protocolo?
              </p>
              <div className="mt-3 flex flex-col gap-2">
                {protocoloItems.map((i) => (
                  <span key={i.label} className={`inline-flex items-center gap-2 text-xs ${i.ok ? "text-muted-foreground" : "text-amber-600 dark:text-amber-500"}`}>
                    {i.ok ? (
                      <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-500" />
                    ) : (
                      <AlertCircle className="size-4" />
                    )}
                    {i.label}
                    {!i.ok && (
                      <button onClick={() => setProcuracaoOk(true)} className="ml-auto text-primary underline">
                        anexar
                      </button>
                    )}
                  </span>
                ))}
              </div>
              <Button
                className="mt-4 w-full gap-2"
                disabled={!prontoProtocolo}
                onClick={() => fireToast("Pacote para protocolo baixado.")}
              >
                <Package className="size-4" /> Baixar pacote para protocolo
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-lg bg-zinc-900 px-4 py-3 text-white shadow-lg animate-in slide-in-from-bottom-5 fade-in duration-300 dark:bg-white dark:text-zinc-900">
          <span className="rounded-full bg-emerald-500/20 p-1 text-emerald-500">
            <Check className="size-4" />
          </span>
          <p className="text-sm font-medium">{toast}</p>
        </div>
      )}
    </div>
  );
}
