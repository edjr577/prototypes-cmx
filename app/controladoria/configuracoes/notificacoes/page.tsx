"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useDemoFeedback } from "@/components/ui/demo-feedback";
import {
  Bell,
  Mail,
  Smartphone,
  SlidersHorizontal,
  FileCode,
  History,
  Clock,
  Plug,
  CheckCheck,
  Check,
  Send,
  Pencil,
  Plus,
  Server,
  Zap,
} from "lucide-react";

/* ============================ tipos & dados mock ============================ */

type Canal = "sistema" | "email" | "whatsapp";

const canalMeta: Record<Canal, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
  sistema: { label: "Sistema", icon: Bell },
  email: { label: "E-mail", icon: Mail },
  whatsapp: { label: "WhatsApp", icon: Smartphone },
};

type Regra = {
  id: string;
  nome: string;
  dominio: string;
  gatilho: string;
  canais: Canal[];
  ativo: boolean;
};

const REGRAS_INICIAIS: Regra[] = [
  { id: "d2", nome: "Prazo fatal em D-2", dominio: "Prazos", gatilho: "Prazo fatal em ≤ 2 dias", canais: ["sistema", "email"], ativo: true },
  { id: "venc", nome: "Prazo vencido", dominio: "Prazos", gatilho: "Tarefa não concluída após o prazo", canais: ["sistema", "email", "whatsapp"], ativo: true },
  { id: "meta", nome: "Meta diária não batida", dominio: "Produtividade", gatilho: "Pontuação do dia < 350", canais: ["sistema"], ativo: true },
  { id: "pgto", nome: "Pagamento em atraso", dominio: "Financeiro", gatilho: "Parcela vencida há mais de 5 dias", canais: ["email"], ativo: false },
  { id: "benef", nome: "Benefício parado", dominio: "Saída", gatilho: "Sem movimentação há mais de 30 dias", canais: ["sistema"], ativo: false },
];

type Template = {
  id: string;
  nome: string;
  canal: Canal;
  assunto: string;
  corpo: string;
};

const TEMPLATES: Template[] = [
  { id: "t1", nome: "Prazo D-2", canal: "email", assunto: "⚠️ Prazo em 2 dias — proc. {{processo}}", corpo: "Olá {{responsavel}}, a tarefa \"{{tarefa}}\" do processo {{processo}} ({{partes}}) tem prazo fatal em {{prazo}}. Faltam 2 dias." },
  { id: "t2", nome: "Prazo vencido", canal: "whatsapp", assunto: "—", corpo: "🔴 {{responsavel}}, o prazo de \"{{tarefa}}\" ({{processo}}) venceu em {{prazo}}. Regularize com urgência." },
  { id: "t3", nome: "Meta diária", canal: "sistema", assunto: "Meta não atingida", corpo: "Você somou {{pontos}} pts hoje (meta 350). Confira as tarefas pendentes." },
  { id: "t4", nome: "Pagamento atrasado", canal: "email", assunto: "Parcela em atraso — {{partes}}", corpo: "A parcela do contrato de {{partes}} está vencida desde {{prazo}}." },
];

const VARIAVEIS = ["{{responsavel}}", "{{tarefa}}", "{{processo}}", "{{partes}}", "{{prazo}}", "{{pontos}}"];

type EnvioStatus = "entregue" | "falha" | "pendente";
const HISTORICO: { quando: string; tipo: string; destinatario: string; canal: Canal; status: EnvioStatus }[] = [
  { quando: "24/06 08:01", tipo: "Prazo D-2", destinatario: "Érica Nunes", canal: "email", status: "entregue" },
  { quando: "24/06 08:01", tipo: "Prazo vencido", destinatario: "Érica Nunes", canal: "whatsapp", status: "entregue" },
  { quando: "24/06 08:01", tipo: "Prazo D-2", destinatario: "Isabelly Sarmento", canal: "sistema", status: "entregue" },
  { quando: "24/06 08:00", tipo: "Meta diária", destinatario: "Rebecca Brandão", canal: "sistema", status: "entregue" },
  { quando: "23/06 08:02", tipo: "Prazo vencido", destinatario: "Érica Nunes", canal: "email", status: "falha" },
  { quando: "23/06 08:01", tipo: "Prazo D-2", destinatario: "Rebecca Brandão", canal: "email", status: "entregue" },
  { quando: "23/06 08:01", tipo: "Prazo D-2", destinatario: "Rebecca Brandão", canal: "whatsapp", status: "pendente" },
  { quando: "22/06 08:00", tipo: "Pagamento atrasado", destinatario: "financeiro@escritorio.com.br", canal: "email", status: "entregue" },
  { quando: "22/06 08:00", tipo: "Prazo D-2", destinatario: "Isabelly Sarmento", canal: "sistema", status: "entregue" },
];

const dominioPill: Record<string, string> = {
  Prazos: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  Produtividade: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Financeiro: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Saída: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
};

const envioPill: Record<EnvioStatus, string> = {
  entregue: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  falha: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  pendente: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};
const envioLabel: Record<EnvioStatus, string> = { entregue: "✓ Entregue", falha: "✕ Falha", pendente: "• Pendente" };

function CanalChip({ canal }: { canal: Canal }) {
  const { label, icon: Icon } = canalMeta[canal];
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/40 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
      <Icon className="size-3" /> {label}
    </span>
  );
}

/* ================================== página ================================== */

export default function NotificacoesPage() {
  const { notify, Toast } = useDemoFeedback();
  const [regras, setRegras] = React.useState(REGRAS_INICIAIS);
  const [waAlertas, setWaAlertas] = React.useState(true);
  const [tplSel, setTplSel] = React.useState(TEMPLATES[0]);

  const toggleRegra = (id: string) =>
    setRegras((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        notify(`Regra "${r.nome}": ${!r.ativo ? "ativada" : "desativada"}`);
        return { ...r, ativo: !r.ativo };
      })
    );

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary/70">Configurações</p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Notificações & Alertas</h1>
          <p className="text-muted-foreground">
            Central única de regras, canais e mensagens — reutilizada por todas as lentes da Controladoria
          </p>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
          <Plug className="size-3.5" /> Varredura diária 08h · CRON ADVBOX
        </span>
      </div>

      <Tabs defaultValue="regras" className="gap-6">
        <TabsList variant="line" className="overflow-x-auto">
          <TabsTrigger value="regras" className="gap-1.5"><SlidersHorizontal className="size-4" /> Regras & Alertas</TabsTrigger>
          <TabsTrigger value="email" className="gap-1.5"><Mail className="size-4" /> E-mail (SMTP)</TabsTrigger>
          <TabsTrigger value="whatsapp" className="gap-1.5"><Smartphone className="size-4" /> WhatsApp</TabsTrigger>
          <TabsTrigger value="templates" className="gap-1.5"><FileCode className="size-4" /> Templates</TabsTrigger>
          <TabsTrigger value="historico" className="gap-1.5"><History className="size-4" /> Histórico</TabsTrigger>
        </TabsList>

        {/* ===================== REGRAS & ALERTAS ===================== */}
        <TabsContent value="regras" className="flex flex-col gap-6">
          <div className="grid gap-3 sm:grid-cols-3">
            <InfoCard icon={Clock} label="Frequência" value="Varredura diária · 08h" sub="+ alerta imediato ao vencer" />
            <InfoCard icon={Zap} label="Gatilho de prazo" value="Regra D-2" sub="Prazo fatal em ≤ 2 dias" />
            <InfoCard icon={Bell} label="Destinatário padrão" value="Responsável + Controladoria" sub="Cópia ao gestor se vencido" />
          </div>

          <Card>
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div>
                <CardTitle className="text-base font-semibold">Regras ativas</CardTitle>
                <CardDescription>Gatilhos por domínio e canais de disparo</CardDescription>
              </div>
              <Button size="sm" variant="outline" className="gap-1.5 text-xs shrink-0" onClick={() => notify("Nova regra (protótipo)")}>
                <Plus className="size-3.5" /> Nova regra
              </Button>
            </CardHeader>
            <CardContent className="px-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/60 text-[11px] uppercase tracking-wider text-muted-foreground">
                      <th className="text-left font-semibold px-4 py-2">Regra</th>
                      <th className="text-left font-semibold px-4 py-2">Domínio</th>
                      <th className="text-left font-semibold px-4 py-2">Gatilho</th>
                      <th className="text-left font-semibold px-4 py-2">Canais</th>
                      <th className="text-right font-semibold px-4 py-2">Ativa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {regras.map((r) => (
                      <tr key={r.id} className="border-b border-border/40 last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 font-medium text-foreground">{r.nome}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${dominioPill[r.dominio] ?? "bg-muted text-muted-foreground"}`}>{r.dominio}</span>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{r.gatilho}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {r.canais.map((c) => (
                              <CanalChip key={c} canal={c} />
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end">
                            <Switch checked={r.ativo} onCheckedChange={() => toggleRegra(r.id)} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===================== E-MAIL (SMTP) ===================== */}
        <TabsContent value="email" className="flex flex-col gap-6">
          <Card>
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div>
                <CardTitle className="text-base font-semibold flex items-center gap-2"><Server className="size-4 text-primary" /> Servidor de envio (SMTP)</CardTitle>
                <CardDescription>Conta usada para disparar os alertas por e-mail</CardDescription>
              </div>
              <span className="shrink-0 inline-flex items-center gap-1 rounded border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400">
                <Check className="size-3" /> Conectado
              </span>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Servidor SMTP" placeholder="smtp.escritorio.com.br" defaultValue="smtp.escritorio.com.br" />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Porta" placeholder="587" defaultValue="587" />
                  <SelectField label="Segurança" options={["TLS", "SSL", "Nenhuma"]} />
                </div>
                <Field label="Usuário" placeholder="no-reply@escritorio.com.br" defaultValue="no-reply@escritorio.com.br" />
                <Field label="Senha" type="password" placeholder="••••••••••" />
                <Field label="Nome do remetente" placeholder="Controladoria — Escritório" defaultValue="Controladoria — Escritório" />
                <Field label="E-mail do remetente" placeholder="alertas@escritorio.com.br" defaultValue="alertas@escritorio.com.br" />
              </div>
              <div className="flex items-center justify-between gap-3 pt-2 border-t border-border/40">
                <p className="text-xs text-muted-foreground">Dica: use uma conta dedicada para evitar bloqueios de SPAM.</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="gap-1.5 text-xs" onClick={() => notify("Enviando e-mail de teste…")}>
                    <Send className="size-3.5" /> Testar conexão
                  </Button>
                  <Button size="sm" className="gap-1.5 text-xs" onClick={() => notify("Configuração SMTP salva (protótipo)")}>
                    <CheckCheck className="size-3.5" /> Salvar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===================== WHATSAPP ===================== */}
        <TabsContent value="whatsapp" className="flex flex-col gap-6">
          <Card>
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div>
                <CardTitle className="text-base font-semibold flex items-center gap-2"><Smartphone className="size-4 text-primary" /> Canal WhatsApp (WABA)</CardTitle>
                <CardDescription>Reaproveita a conexão oficial do CRM CMX — sem novo número</CardDescription>
              </div>
              <span className="shrink-0 inline-flex items-center gap-1 rounded border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400">
                <Check className="size-3" /> Conectado via CRM
              </span>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <InfoCard icon={Smartphone} label="Número" value="+55 71 9•••• ••12" sub="Conta WABA verificada" />
                <InfoCard icon={Plug} label="Provedor" value="CRM CMX · Meta Cloud API" sub="Janela de 24h + templates" />
                <InfoCard icon={CheckCheck} label="Qualidade" value="Alta" sub="Tier de envio: 10k/dia" />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border/50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className={`rounded-lg p-2 ${waAlertas ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                    <Smartphone className="size-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Usar WhatsApp para alertas</div>
                    <div className="text-xs text-muted-foreground">Apenas regras com o canal WhatsApp habilitado</div>
                  </div>
                </div>
                <Switch checked={waAlertas} onCheckedChange={(v: boolean) => { setWaAlertas(v); notify(`WhatsApp para alertas: ${v ? "ativado" : "desativado"}`); }} />
              </div>

              <div className="rounded-lg bg-amber-500/5 border border-amber-500/20 px-4 py-3 text-xs text-muted-foreground">
                Mensagens fora da janela de 24h exigem <span className="font-medium text-foreground">templates aprovados pela Meta</span>. Os templates de alerta ficam na aba <span className="font-medium text-foreground">Templates</span> e são sincronizados com o CRM.
              </div>

              <div className="flex justify-end">
                <Button size="sm" variant="outline" className="gap-1.5 text-xs" onClick={() => notify("Abrindo gestão de canais no CRM…")}>
                  <Plug className="size-3.5" /> Gerenciar no CRM
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===================== TEMPLATES ===================== */}
        <TabsContent value="templates" className="flex flex-col gap-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-base font-semibold">Modelos de mensagem</CardTitle>
                  <CardDescription>Um template por evento e canal</CardDescription>
                </div>
                <Button size="sm" variant="outline" className="gap-1.5 text-xs shrink-0" onClick={() => notify("Novo template (protótipo)")}>
                  <Plus className="size-3.5" /> Novo
                </Button>
              </CardHeader>
              <CardContent className="px-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/60 text-[11px] uppercase tracking-wider text-muted-foreground">
                        <th className="text-left font-semibold px-4 py-2">Template</th>
                        <th className="text-left font-semibold px-4 py-2">Canal</th>
                        <th className="text-left font-semibold px-4 py-2">Assunto / gatilho</th>
                        <th className="text-right font-semibold px-4 py-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {TEMPLATES.map((t) => (
                        <tr
                          key={t.id}
                          onClick={() => setTplSel(t)}
                          className={`border-b border-border/40 last:border-0 cursor-pointer transition-colors ${tplSel.id === t.id ? "bg-muted/40" : "hover:bg-muted/20"}`}
                        >
                          <td className="px-4 py-3 font-medium text-foreground">{t.nome}</td>
                          <td className="px-4 py-3"><CanalChip canal={t.canal} /></td>
                          <td className="px-4 py-3 text-muted-foreground truncate max-w-[220px]">{t.assunto}</td>
                          <td className="px-4 py-3 text-right">
                            <button className="text-muted-foreground hover:text-foreground" onClick={(e) => { e.stopPropagation(); notify(`Editar "${t.nome}" (protótipo)`); }}>
                              <Pencil className="size-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold">Pré-visualização</CardTitle>
                <CardDescription>{tplSel.nome} · {canalMeta[tplSel.canal].label}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {tplSel.canal === "email" && (
                  <div className="text-xs"><span className="text-muted-foreground">Assunto: </span><span className="font-medium text-foreground">{tplSel.assunto}</span></div>
                )}
                <div className="rounded-lg border border-border/50 bg-muted/20 p-3 text-sm text-foreground/90 leading-relaxed">
                  {tplSel.corpo}
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Variáveis disponíveis</div>
                  <div className="flex flex-wrap gap-1.5">
                    {VARIAVEIS.map((v) => (
                      <span key={v} className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[11px] font-mono text-primary">{v}</span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ===================== HISTÓRICO ===================== */}
        <TabsContent value="historico" className="flex flex-col gap-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <InfoCard icon={Send} label="Enviados (7 dias)" value={String(HISTORICO.length)} sub="Todos os canais" />
            <InfoCard icon={CheckCheck} label="Taxa de entrega" value={`${Math.round((HISTORICO.filter((h) => h.status === "entregue").length / HISTORICO.length) * 100)}%`} sub="Entregues / total" />
            <InfoCard icon={Zap} label="Falhas" value={String(HISTORICO.filter((h) => h.status === "falha").length)} sub="Requer reenvio" />
          </div>

          <Card>
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div>
                <CardTitle className="text-base font-semibold">Histórico de envios</CardTitle>
                <CardDescription>Trilha de todas as notificações disparadas</CardDescription>
              </div>
              <Button size="sm" variant="outline" className="gap-1.5 text-xs shrink-0" onClick={() => notify("Exportando histórico (.csv)…")}>
                <History className="size-3.5" /> Exportar
              </Button>
            </CardHeader>
            <CardContent className="px-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/60 text-[11px] uppercase tracking-wider text-muted-foreground">
                      <th className="text-left font-semibold px-4 py-2">Quando</th>
                      <th className="text-left font-semibold px-4 py-2">Tipo</th>
                      <th className="text-left font-semibold px-4 py-2">Destinatário</th>
                      <th className="text-left font-semibold px-4 py-2">Canal</th>
                      <th className="text-right font-semibold px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {HISTORICO.map((h, i) => (
                      <tr key={i} className="border-b border-border/40 last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 text-muted-foreground tabular-nums">{h.quando}</td>
                        <td className="px-4 py-3 font-medium text-foreground">{h.tipo}</td>
                        <td className="px-4 py-3 text-muted-foreground">{h.destinatario}</td>
                        <td className="px-4 py-3"><CanalChip canal={h.canal} /></td>
                        <td className="px-4 py-3 text-right">
                          <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${envioPill[h.status]}`}>{envioLabel[h.status]}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {Toast}
    </div>
  );
}

/* ============================== subcomponentes ============================== */

function InfoCard({ icon: Icon, label, value, sub }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; sub: string }) {
  return (
    <div className="rounded-lg border border-border/50 bg-muted/20 p-3">
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        <Icon className="size-3.5" /> {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-foreground">{value}</div>
      <div className="text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}

function Field({ label, placeholder, defaultValue, type = "text" }: { label: string; placeholder?: string; defaultValue?: string; type?: string }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-foreground">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      />
    </label>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-foreground">{label}</span>
      <select className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm text-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}
