import React, { useState } from "react";
import { X, Search, Plus, Scale, FileText, Briefcase, Calculator, Heart, Stethoscope, Dumbbell, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModelosProntosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = ["Todos", "Jurídico", "Financeiro", "RH", "Operacional", "Marketing", "Bem-Estar"];

const MOCK_MODELS = [
  {
    id: "m1",
    title: "Análise de Risco Trabalhista",
    description: "Avaliar probabilidade de perda nas ações trabalhistas do último trimestre.",
    category: "Jurídico",
    icon: Scale,
    prompt: "Atue como um analista jurídico sênior. Avalie os dados do último trimestre focando em ações trabalhistas. Identifique o risco de perda (Alto, Médio, Baixo) para cada caso e sugira ações de mitigação."
  },
  {
    id: "m2",
    title: "Projeção de Faturamento",
    description: "Estimar a receita recorrente baseada nos contratos ativos.",
    category: "Financeiro",
    icon: Calculator,
    prompt: "Atue como um analista financeiro. Com base na lista de contratos ativos e seus valores mensais, crie uma projeção de faturamento para os próximos 6 meses considerando uma taxa de churn de 2%."
  },
  {
    id: "m3",
    title: "Resumo Executivo Semanal",
    description: "Gerar um relatório consolidado com o desempenho financeiro e novas contratações.",
    category: "Operacional",
    icon: FileText,
    prompt: "Compile os indicadores operacionais da última semana. Inclua faturamento, despesas, número de novos contratos e chamados de suporte abertos. Formate o resultado como um relatório executivo para a diretoria."
  },
  {
    id: "m4",
    title: "Otimização de Custos",
    description: "Identificar gargalos de custos operacionais do escritório matriz.",
    category: "Financeiro",
    icon: Briefcase,
    prompt: "Analise a planilha de despesas operacionais do escritório matriz. Destaque as categorias onde os custos excederam o orçamento em mais de 10% e proponha estratégias de redução viáveis."
  },
  {
    id: "m5",
    title: "Onboarding de Novo Sócio",
    description: "Criar o plano de 30 dias de onboarding para novos sócios.",
    category: "RH",
    icon: Briefcase,
    prompt: "Gere um cronograma detalhado de 30 dias para o onboarding de um novo sócio na firma. O plano deve cobrir treinamentos do sistema, reuniões com equipes chave e metas iniciais de ambientação."
  },
  {
    id: "m6",
    title: "Análise de Jurisprudência",
    description: "Buscar padrões de decisão em tribunais superiores sobre o tema X.",
    category: "Jurídico",
    icon: Scale,
    prompt: "Aja como um pesquisador jurídico. Levante as principais decisões recentes do STJ e STF relacionadas à tributação de softwares e extraia a tendência de julgamento predominante."
  },
  {
    id: "m7",
    title: "Programa de Bem-Estar",
    description: "Sugestões de atividades mensais para saúde mental do time.",
    category: "Bem-Estar",
    icon: Heart,
    prompt: "Desenvolva um plano anual de atividades de bem-estar para os funcionários do escritório. As ações devem ser de baixo custo e fáceis de implementar, focadas em saúde mental e ergonomia."
  },
  {
    id: "m8",
    title: "Ergonomia no Trabalho",
    description: "Dicas de ergonomia para quem trabalha muito tempo sentado.",
    category: "Bem-Estar",
    icon: Dumbbell,
    prompt: "Crie uma cartilha de dicas simples de ergonomia para profissionais do direito que passam longas horas sentados analisando documentos. Inclua exercícios de alongamento e ajustes na postura."
  }
];

export function ModelosProntosModal({ isOpen, onClose }: ModelosProntosModalProps) {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredModel, setHoveredModel] = useState<typeof MOCK_MODELS[0] | null>(null);

  if (!isOpen) return null;

  const filteredModels = MOCK_MODELS.filter(m => {
    const matchesCat = activeCategory === "Todos" || m.category === activeCategory;
    const matchesQuery = m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         m.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Clique fora para fechar */}
      <div className="absolute inset-0" onClick={onClose} />
      
      {/* Conteúdo do Modal */}
      <div className="relative flex flex-col bg-card border border-border/50 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex-1 z-10 text-card-foreground">
        
        {/* HEADER */}
        <div className="flex items-center justify-between p-5 border-b border-border/30">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight">Modelos Prontos</h2>
            <span className="text-muted-foreground/60 font-semibold">({filteredModels.length})</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/50 bg-background/50 hover:bg-muted transition-colors text-sm font-medium">
              <Plus className="size-4" /> Criar
            </button>
            <button 
              onClick={onClose}
              className="size-8 flex items-center justify-center rounded-full hover:bg-muted/80 transition-colors text-muted-foreground hover:text-foreground"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* SEARCH & FILTER AREA */}
        <div className="p-5 pb-0 flex flex-col gap-4 border-b border-border/30">
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 size-4.5 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Buscar modelos..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-muted/20 border border-border/50 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-4 no-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all border border-transparent",
                  activeCategory === cat 
                    ? "bg-foreground text-background shadow-sm" 
                    : "bg-transparent text-muted-foreground hover:bg-muted hover:border-border/50"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN AREA */}
        <div className="flex flex-1 min-h-0">
          {/* GRID OF MODELS */}
          <div className="flex-1 p-5 overflow-y-auto custom-scrollbar">
            {filteredModels.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <Search className="size-12 mb-4 opacity-20" />
                <p>Nenhum modelo encontrado.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredModels.map(model => {
                  const Icon = model.icon;
                  return (
                    <button
                      key={model.id}
                      onMouseEnter={() => setHoveredModel(model)}
                      onMouseLeave={() => setHoveredModel(null)}
                      className="flex flex-col items-start text-left p-5 rounded-2xl border border-border/40 bg-muted/10 hover:bg-muted/40 hover:border-border transition-all group"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <Icon className="size-4" />
                        </div>
                        <h3 className="font-bold text-foreground/90 group-hover:text-foreground">{model.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground/80 leading-snug mb-4 line-clamp-2">
                        {model.description}
                      </p>
                      <span className="mt-auto px-2.5 py-1 rounded-md bg-muted text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        {model.category}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* PREVIEW PANE */}
          <div className="w-80 lg:w-[380px] border-l border-border/30 bg-muted/5 flex flex-col p-6 shrink-0 hidden md:flex">
            {hoveredModel ? (
              <div className="flex flex-col h-full animate-in fade-in duration-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                    <hoveredModel.icon className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg leading-tight">{hoveredModel.title}</h4>
                    <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mt-1 block">
                      {hoveredModel.category}
                    </span>
                  </div>
                </div>
                <div className="flex-1 bg-background rounded-xl border border-border/40 p-5 shadow-sm relative group overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/50" />
                  <p className="text-sm leading-relaxed text-foreground/90 mt-2">
                    {hoveredModel.prompt}
                  </p>
                  
                  {/* Fake "Usar modelo" button appearing on hover of the preview or always visible */}
                  <div className="absolute bottom-5 left-5 right-5">
                     <button className="w-full py-2.5 bg-foreground text-background rounded-lg font-medium text-sm hover:opacity-90 transition-opacity">
                       Usar este modelo
                     </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <div className="size-16 rounded-full bg-muted/30 flex items-center justify-center mb-4">
                  <Search className="size-6 text-muted-foreground/50" />
                </div>
                <p className="text-sm max-w-[200px] leading-relaxed">
                  Passe o mouse sobre um modelo para ver a prévia do prompt
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
