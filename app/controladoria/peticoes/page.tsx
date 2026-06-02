"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { 
  Download, 
  Bold, 
  Italic, 
  Quote, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify,
  Scale, 
  Scissors, 
  Sparkles,
  CheckCircle2,
  FileText,
  Loader2,
  Check,
  ChevronLeft,
  Edit2,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Undo,
  Redo,
  Minus,
  MessageSquare,
  Smartphone,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Copy,
  Trash,
  Filter,
  FileDown,
  UploadCloud
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useEditor, EditorContent, Mark, mergeAttributes } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";

const PlaceholderBadge = Mark.create({
  name: "placeholderBadge",

  parseHTML() {
    return [
      {
        tag: "span[data-placeholder]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(HTMLAttributes, {
        class: "bg-zinc-150 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:text-zinc-200 inline-block mx-0.5 select-all",
        "data-placeholder": "true",
      }),
      0,
    ];
  },
});

const TEMPLATE_EXTRAVIO = `
<p>EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DE DIREITO DA ___ VARA CÍVEL DA COMARCA DE SÃO PAULO/SP</p>
<p></p>
<p><span data-placeholder="true">[Nome do Cliente]</span>, brasileiro(a), estado civil, profissão, portador(a) do CPF nº <span data-placeholder="true">[CPF]</span>, residente e domiciliado(a) na <span data-placeholder="true">[Endereço]</span>, vem, respeitosamente, à presença de Vossa Excelência, por meio de seu advogado infra-assinado, propor a presente</p>
<p></p>
<h1>AÇÃO DE INDENIZAÇÃO POR DANOS MATERIAIS E MORAIS</h1>
<p></p>
<p>em face de <span data-placeholder="true">[COMPANHIA AÉREA]</span>, pessoa jurídica de direito privado, inscrita no CNPJ sob o nº <span data-placeholder="true">[CNPJ da Ré]</span>, com sede em <span data-placeholder="true">[Endereço da Ré]</span>, pelos fatos e fundamentos jurídicos a seguir aduzidos.</p>
<p></p>
<h2>I - DOS FATOS</h2>
<p>No dia <span data-placeholder="true">[Data do Voo]</span>, o(a) Autor(a) embarcou no voo <span data-placeholder="true">[Número do Voo]</span>, operado pela empresa Ré, com destino a <span data-placeholder="true">[Destino]</span>. Ao desembarcar, constatou que sua bagagem havia sido extraviada.</p>
<p></p>
<blockquote>O(a) Autor(a) buscou a resolução administrativa, gerando o protocolo <span data-placeholder="true">[Número do Protocolo]</span>, porém sem sucesso, suportando danos materiais estimados em <span data-placeholder="true">[Valor do Dano]</span>, além dos evidentes danos morais decorrentes do transtorno.</blockquote>
<p></p>
<h2>II - DO DIREITO</h2>
<p>(Texto padrão sobre responsabilidade civil objetiva e código de defesa do consumidor...)</p>
<p></p>
<h2>III - DOS PEDIDOS</h2>
<p>Diante do exposto, requer:</p>
<p>a) A citação da Ré;</p>
<p>b) A condenação da Ré ao pagamento de <span data-placeholder="true">[Valor do Dano]</span> a título de danos materiais;</p>
<p>c) A condenação em danos morais;</p>
<p>d) A inversão do ônus da prova.</p>
`;

const TEMPLATE_NEGATIVACAO = `
<p>EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DE DIREITO DO JUIZADO ESPECIAL CÍVEL DA COMARCA DE SÃO PAULO/SP</p>
<p></p>
<p><span data-placeholder="true">[Nome do Cliente]</span>, brasileiro(a), portador(a) do CPF nº <span data-placeholder="true">[CPF]</span>, residente e domiciliado(a) na <span data-placeholder="true">[Endereço]</span>, vem à presença de Vossa Excelência propor a presente</p>
<p></p>
<h1>AÇÃO DECLARATÓRIA DE INEXIGIBILIDADE DE DÉBITO C/C INDENIZAÇÃO POR DANOS MORAIS E PEDIDO LIMINAR</h1>
<p></p>
<p>em face de <span data-placeholder="true">[NOME DA EMPRESA RÉ]</span>, CNPJ nº <span data-placeholder="true">[CNPJ da Ré]</span>, pelas razões a seguir.</p>
<p></p>
<h2>I - DOS FATOS</h2>
<p>O(a) Autor(a) foi surpreendido(a) no dia <span data-placeholder="true">[Data da Descoberta]</span> com a inscrição de seu nome nos cadastros de proteção ao crédito (SPC/Serasa), referente a um suposto débito no valor de <span data-placeholder="true">[Valor Negativado]</span>.</p>
<p></p>
<blockquote>Cumpre destacar que o(a) Autor(a) JAMAIS contratou os serviços da Ré ou contraiu a referida dívida, tratando-se de negativação manifestamente indevida.</blockquote>
<p></p>
<h2>II - DOS PEDIDOS</h2>
<p>Ante o exposto, requer:</p>
<p>a) A concessão de tutela de urgência para a imediata exclusão do nome do(a) Autor(a) do Serasa/SPC;</p>
<p>b) A declaração de inexigibilidade do débito no valor de <span data-placeholder="true">[Valor Negativado]</span>;</p>
<p>c) A condenação da Ré ao pagamento de indenização por danos morais no importe de <span data-placeholder="true">[Valor da Indenização]</span>.</p>
`;

const TEMPLATE_ALUGUEL = `
<p>EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DE DIREITO DA ___ VARA CÍVEL DA COMARCA DE SÃO PAULO/SP</p>
<p></p>
<p><span data-placeholder="true">[Nome do Locador]</span>, brasileiro(a), portador(a) do CPF nº <span data-placeholder="true">[CPF do Locador]</span>, residente e domiciliado(a) na <span data-placeholder="true">[Endereço do Locador]</span>, vem propor a presente</p>
<p></p>
<h1>AÇÃO DE DESPEJO POR FALTA DE PAGAMENTO C/C COBRANÇA DE ALUGUÉIS</h1>
<p></p>
<p>em face de <span data-placeholder="true">[Nome do Locatário]</span>, brasileiro(a), portador(a) do CPF nº <span data-placeholder="true">[CPF do Locatário]</span>, residente no imóvel locado, situado na <span data-placeholder="true">[Endereço do Imóvel]</span>.</p>
<p></p>
<h2>I - DOS FATOS</h2>
<p>As partes firmaram contrato de locação do imóvel acima descrito, pelo prazo de <span data-placeholder="true">[Prazo do Contrato]</span>, com aluguel mensal ajustado em <span data-placeholder="true">[Valor do Aluguel Mensal]</span>.</p>
<p></p>
<p>Ocorre que o(a) Locatário(a) encontra-se inadimplente com os aluguéis referentes aos meses de <span data-placeholder="true">[Meses em Atraso]</span>, totalizando uma dívida atualizada de <span data-placeholder="true">[Valor Total da Dívida]</span>.</p>
<p></p>
<h2>II - DOS PEDIDOS</h2>
<p>Diante do inadimplemento, requer:</p>
<p>a) A rescisão do contrato de locação e a decretação do despejo;</p>
<p>b) A condenação do Réu ao pagamento dos aluguéis atrasados, no total de <span data-placeholder="true">[Valor Total da Dívida]</span>, acrescidos de juros e correção monetária.</p>
`;

const TEMPLATE_BLANK = `<p></p>`;

const TEMPLATES: Record<string, string> = {
  extravio: TEMPLATE_EXTRAVIO,
  negativacao: TEMPLATE_NEGATIVACAO,
  aluguel: TEMPLATE_ALUGUEL,
  blank: TEMPLATE_BLANK
};

// Helper regex to scan variables inside brackets [like this] from the template html
const scanPlaceholders = (html: string) => {
  const regex = /\[([^\]<>]+?)\]/g;
  const found: string[] = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    const varName = match[1].trim();
    if (varName && !found.includes(varName)) {
      found.push(varName);
    }
  }
  return found;
};

const getRenderedHtml = (html: string, vars: Record<string, string>) => {
  let rendered = html;
  Object.entries(vars).forEach(([key, val]) => {
    if (val) {
      // Replace spans styling placeholders
      const spanRegex = new RegExp(`<span[^>]*data-placeholder[^>]*>\\[${key}\\]<\\/span>`, "g");
      const rawRegex = new RegExp(`\\[${key}\\]`, "g");
      rendered = rendered.replace(spanRegex, `<strong>${val}</strong>`);
      rendered = rendered.replace(rawRegex, `<strong>${val}</strong>`);
    }
  });
  return rendered;
};

const formatLabel = (name: string) => {
  return name
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const INITIAL_MOCK_DATA = [
  {
    id: "1",
    titulo: "Ação de Indenização - Extravio de Bagagem",
    cliente: "João da Silva",
    status: "Rascunho",
    dataAtualizacao: "Hoje, 14:30",
    modelo: "Extravio de Bagagem"
  },
  {
    id: "2",
    titulo: "Defesa - Cobrança Indevida",
    cliente: "Maria Oliveira",
    status: "Pronto",
    dataAtualizacao: "Ontem, 09:15",
    modelo: "Negativação Indevida Serasa"
  },
  {
    id: "3",
    titulo: "Ação de Cobrança de Aluguéis",
    cliente: "Carlos Andrade",
    status: "Pronto",
    dataAtualizacao: "28/05/2026",
    modelo: "Cobrança de Aluguel"
  },
  {
    id: "4",
    titulo: "Recurso Inominado - Danos Morais",
    cliente: "Ana Beatriz",
    status: "Rascunho",
    dataAtualizacao: "25/05/2026",
    modelo: "Personalizado"
  }
];

export default function PeticoesUnifiedPage() {
  const [activeView, setActiveView] = useState<'list' | 'editor'>('list');
  const [selectedPeticaoId, setSelectedPeticaoId] = useState<string | null>(null);
  
  // List State
  const [search, setSearch] = useState("");
  const [peticoes, setPeticoes] = useState(INITIAL_MOCK_DATA);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [openImportModal, setOpenImportModal] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  
  // Editor States
  const [docTitle, setDocTitle] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [status, setStatus] = useState<"Rascunho" | "Pronto">("Rascunho");
  const [customPrompt, setCustomPrompt] = useState("");
  const [openWhatsApp, setOpenWhatsApp] = useState(false);
  
  // Dynamic Variables State
  const [variables, setVariables] = useState<Record<string, string>>({});
  
  // AI state
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiAction, setAiAction] = useState("");
  
  // TipTap states
  const [mounted, setMounted] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("extravio");
  const [editorHtml, setEditorHtml] = useState(TEMPLATES["extravio"]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      PlaceholderBadge,
    ],
    content: getRenderedHtml(TEMPLATES["extravio"], variables),
    editorProps: {
      attributes: {
        class: "outline-none min-h-[297mm] text-zinc-800 dark:text-zinc-200 focus:outline-none w-full [&_p]:mb-4 [&_p]:text-sm [&_p]:leading-relaxed [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-6 [&_h1]:text-foreground [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-3 [&_h2]:mt-5 [&_h2]:text-foreground [&_blockquote]:border-l-4 [&_blockquote]:border-zinc-300 [&_blockquote]:dark:border-zinc-700 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4 [&_blockquote]:text-muted-foreground [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_li]:text-sm [&_li]:leading-relaxed [&_li]:mb-1 [&_hr]:border-t [&_hr]:border-zinc-300 [&_hr]:dark:border-zinc-700 [&_hr]:my-6",
      },
    },
    onUpdate: ({ editor }) => {
      // If typing directly in the editor, update the editorHtml template state
      if (editor.isFocused) {
        setEditorHtml(editor.getHTML());
      }
    }
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update variables mapped list from base template dynamically
  const detectedVars = useMemo(() => {
    return scanPlaceholders(editorHtml);
  }, [editorHtml]);

  // Update editor content when variables or base template changes
  useEffect(() => {
    if (editor && !editor.isFocused) {
      const rendered = getRenderedHtml(editorHtml, variables);
      if (editor.getHTML() !== rendered) {
        editor.commands.setContent(rendered);
      }
    }
  }, [variables, editorHtml, editor]);

  // Trigger Toast helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Dynamic Variable Change
  const handleVariableChange = (name: string, value: string) => {
    setVariables(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTemplateChange = (value: string) => {
    setSelectedTemplate(value);
    setVariables({}); // Limpar variáveis mapeadas do documento antigo
    const newHtml = TEMPLATES[value] || TEMPLATES["blank"];
    setEditorHtml(newHtml);
    if (editor) {
      editor.commands.setContent(newHtml);
    }
  };

  // WhatsApp Message Summary
  const getWhatsAppMessage = () => {
    const clienteName = variables["Nome do Cliente"] || "Prezado(a) cliente";
    const valorReclamado = variables["Valor do Dano"] || "um valor de ressarcimento";
    const cpfNum = variables["CPF"] || "[CPF não informado]";
    const vooNum = variables["Número do Voo"] || "[Voo não informado]";
    const vooDest = variables["Destino"] || "[Destino não informado]";

    return `Olá, ${clienteName}! ⚖️ Aqui é do escritório de advocacia. Gostaria de informar que a minuta da sua Petição está concluída!

Abaixo, segue um resumo dos pontos mapeados no processo:
• Reclamante: ${clienteName}
• CPF correspondente: ${cpfNum}
• Voo impactado: ${vooNum} (Destino: ${vooDest})
• Valor indenizatório pleiteado: ${valorReclamado}

Estamos pleiteando judicialmente a condenação da Ré com base no Código de Defesa do Consumidor. Assim que a petição for distribuída na Vara Cível, enviaremos o número processual para acompanhamento.

Qualquer dúvida, estamos à inteira disposição no WhatsApp!`;
  };

  const handleCopyWhatsAppMessage = () => {
    navigator.clipboard.writeText(getWhatsAppMessage());
    triggerToast("Mensagem copiada para a área de transferência!");
    setOpenWhatsApp(false);
  };

  // AI Actions (presets)
  const handleAiAction = (actionName: string, simulatedChange: string) => {
    setAiAction(actionName);
    setIsAiLoading(true);
    
    setTimeout(() => {
      setIsAiLoading(false);
      setEditorHtml(simulatedChange);
      if (editor) {
        editor.commands.setContent(getRenderedHtml(simulatedChange, variables));
      }
      triggerToast("IA aplicou o ajuste com sucesso!");
    }, 1500);
  };

  const applyFormalTone = () => {
    const currentContent = editor ? editor.getHTML() : editorHtml;
    const formalText = currentContent.replace(
      "O(a) Autor(a) buscou a resolução administrativa, gerando o protocolo <span data-placeholder=\"true\">[Número do Protocolo]</span>, porém sem sucesso",
      "A parte Autora envidou todos os esforços cabíveis na esfera administrativa para a composição amigável do litígio, o que se consubstancia pelo protocolo <span data-placeholder=\"true\">[Número do Protocolo]</span>, restando, todavia, infrutíferas tais tentativas"
    ).replace(
      "O(a) Autor(a) buscou a resolução administrativa, gerando o protocolo [Número do Protocolo], porém sem sucesso",
      "A parte Autora envidou todos os esforços cabíveis na esfera administrativa para a composição amigável do litígio, o que se consubstancia pelo protocolo [Número do Protocolo], restando, todavia, infrutíferas tais tentativas"
    );
    handleAiAction("Tornar Linguagem Formal", formalText);
  };

  const applyConcise = () => {
    const currentContent = editor ? editor.getHTML() : editorHtml;
    const conciseText = currentContent.replace(
      "No dia <span data-placeholder=\"true\">[Data do Voo]</span>, o(a) Autor(a) embarcou no voo <span data-placeholder=\"true\">[Número do Voo]</span>, operado pela empresa Ré, com destino a <span data-placeholder=\"true\">[Destino]</span>. Ao desembarcar, constatou que sua bagagem havia sido extraviada.",
      "Em <span data-placeholder=\"true\">[Data do Voo]</span>, a bagagem do(a) Autor(a) foi extraviada no voo <span data-placeholder=\"true\">[Número do Voo]</span> (destino: <span data-placeholder=\"true\">[Destino]</span>)."
    ).replace(
      "No dia [Data do Voo], o(a) Autor(a) embarcou no voo [Número do Voo], operado pela empresa Ré, com destino a [Destino]. Ao desembarcar, constatou que sua bagagem havia sido extraviada.",
      "Em [Data do Voo], a bagagem do(a) Autor(a) foi extraviada no voo [Número do Voo] (destino: [Destino])."
    );
    handleAiAction("Enxugar Texto", conciseText);
  };

  const applyGrammar = () => {
    const currentContent = editor ? editor.getHTML() : editorHtml;
    const grammarText = currentContent.replace("estado civil", "estado civil <span data-placeholder=\"true\">[inserir]</span>");
    handleAiAction("Corrigir Gramática", grammarText);
  };

  const handleCustomAiPrompt = () => {
    if (!customPrompt.trim()) return;
    setAiAction("Gerar com IA");
    setIsAiLoading(true);
    
    setTimeout(() => {
      setIsAiLoading(false);
      const currentContent = editor ? editor.getHTML() : editorHtml;
      const paragraphToAdd = `<p><strong>[IA]:</strong> Adicionado em resposta ao prompt ("${customPrompt}"): Reitera-se que o descaso comercial de transporte e falha logística atenta contra a boa-fé objetiva, caracterizando inequívoco dever de indenizar pelos transtornos sofridos.</p>`;
      const newHtml = currentContent + paragraphToAdd;
      
      setEditorHtml(newHtml);
      if (editor) {
        editor.commands.setContent(getRenderedHtml(newHtml, variables));
      }
      setCustomPrompt("");
      triggerToast("Parágrafo gerado e inserido com sucesso!");
    }, 1500);
  };

  // Upload Word Mock
  const handleUploadDocx = () => {
    setAiAction("Processando documento Word (.docx)...");
    setIsAiLoading(true);

    setTimeout(() => {
      setEditorHtml(CONTRATO_HTML_TEMPLATE);
      setVariables({});
      if (editor) {
        editor.commands.setContent(getRenderedHtml(CONTRATO_HTML_TEMPLATE, {}));
      }
      setIsAiLoading(false);
      triggerToast("Modelo processado! Identificamos 4 variáveis automaticamente.");
    }, 2000);
  };

  // CRUD Actions
  const handleEdit = (id: string) => {
    const p = peticoes.find(item => item.id === id);
    if (p) {
      setSelectedPeticaoId(id);
      setDocTitle(p.titulo);
      setStatus(p.status as "Rascunho" | "Pronto");
      
      const loadedVars = {
        "Nome do Cliente": p.cliente
      };
      setVariables(loadedVars);
      
      let templateKey = "extravio";
      if (p.modelo === "Negativação Indevida Serasa") templateKey = "negativacao";
      else if (p.modelo === "Cobrança de Aluguel") templateKey = "aluguel";
      
      setSelectedTemplate(templateKey);
      setEditorHtml(TEMPLATES[templateKey] || TEMPLATES["extravio"]);
      if (editor) {
        editor.commands.setContent(getRenderedHtml(TEMPLATES[templateKey] || TEMPLATES["extravio"], loadedVars));
      }
      setActiveView('editor');
    }
  };

  const handleNew = () => {
    setSelectedPeticaoId("nova");
    setDocTitle("Nova Petição");
    setVariables({});
    setStatus("Rascunho");
    setSelectedTemplate("extravio");
    setEditorHtml(TEMPLATES["extravio"]);
    if (editor) {
      editor.commands.setContent(getRenderedHtml(TEMPLATES["extravio"], {}));
    }
    setActiveView('editor');
  };

  const handleSimulateUploadList = () => {
    setUploadedFileName("documento_cliente.docx");
  };

  const handleConfirmImportList = () => {
    setOpenImportModal(false);
    setUploadedFileName(null);
    handleNew();
  };

  const handleSave = () => {
    const clienteName = variables["Nome do Cliente"] || "Cliente Não Informado";
    if (selectedPeticaoId === "nova") {
      const nova = {
        id: Math.random().toString(36).substr(2, 9),
        titulo: docTitle || "Petição Sem Título",
        cliente: clienteName,
        status: status,
        dataAtualizacao: "Hoje mesmo",
        modelo: "Extravio de Bagagem"
      };
      setPeticoes([nova, ...peticoes]);
    } else {
      setPeticoes(peticoes.map(p => 
        p.id === selectedPeticaoId 
          ? { ...p, titulo: docTitle, cliente: clienteName, status: status, dataAtualizacao: "Hoje mesmo" }
          : p
      ));
    }
    triggerToast("Documento salvo com sucesso!");
    setActiveView('list');
  };

  const handleDelete = (id: string) => {
    setPeticoes(peticoes.filter(p => p.id !== id));
    triggerToast("Petição excluída com sucesso.");
  };

  const handleDuplicate = (peticao: any) => {
    const nova = {
      ...peticao,
      id: Math.random().toString(36).substr(2, 9),
      titulo: `Cópia de ${peticao.titulo}`,
      status: "Rascunho",
      dataAtualizacao: "Hoje mesmo"
    };
    setPeticoes([nova, ...peticoes]);
    triggerToast("Petição duplicada com sucesso.");
  };

  const filteredPeticoes = peticoes.filter(p => 
    p.titulo.toLowerCase().includes(search.toLowerCase()) || 
    p.cliente.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col space-y-6 animate-in fade-in duration-300 min-h-full">
      
      {activeView === 'list' ? (
        <>
          {/* LIST VIEW HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col space-y-1">
              <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Trabalho & Fluxos</p>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-extrabold tracking-tight">Petições Assistidas</h1>
                <Badge variant="outline" className="font-semibold text-xs rounded-sm bg-primary/10 text-primary border-primary/20">
                  IA
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Gerencie e crie petições utilizando inteligência artificial para mapeamento dinâmico.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2" onClick={() => setOpenImportModal(true)}>
                <UploadCloud className="size-4" />
                Importar
              </Button>
              <Button className="gap-2" onClick={handleNew}>
                <Plus className="size-4" />
                Nova Petição
              </Button>
            </div>
          </div>

          {/* LIST VIEW FILTER BAR */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Buscar por título ou cliente..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
            <Button variant="outline" size="sm" className="gap-2 shrink-0">
              <Filter className="size-4" />
              Filtros Avançados
            </Button>
          </div>

          {/* LIST VIEW DATA TABLE */}
          <Card>
            <CardHeader className="pb-3 border-b border-border/50">
              <CardTitle className="text-lg">Documentos Recentes</CardTitle>
              <CardDescription>
                {filteredPeticoes.length} petições encontradas
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead className="w-[40%]">Documento</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Modelo Base</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Última Edição</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPeticoes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                        Nenhuma petição encontrada.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPeticoes.map((peticao) => (
                      <TableRow key={peticao.id} className="hover:bg-muted/20">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-md">
                              <FileText className="size-4 text-primary" />
                            </div>
                            {peticao.titulo}
                          </div>
                        </TableCell>
                        <TableCell>{peticao.cliente}</TableCell>
                        <TableCell className="text-muted-foreground">{peticao.modelo}</TableCell>
                        <TableCell>
                          <Badge variant={peticao.status === "Rascunho" ? "secondary" : "default"}>
                            {peticao.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-xs">{peticao.dataAtualizacao}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            {peticao.status === "Pronto" ? (
                              <Button 
                                variant="ghost" 
                                className="h-8 w-8 p-0 text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-500/10"
                                onClick={() => triggerToast("Download do documento iniciado...")}
                              >
                                <FileDown className="h-4 w-4" />
                              </Button>
                            ) : (
                              <div className="h-8 w-8 flex items-center justify-center opacity-30 cursor-not-allowed">
                                <FileDown className="h-4 w-4 text-muted-foreground" />
                              </div>
                            )}
                            <DropdownMenu>
                              <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted focus:bg-muted focus:outline-none">
                                <MoreHorizontal className="h-4 w-4" />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuGroup>
                                  <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="cursor-pointer gap-2" onClick={() => handleEdit(peticao.id)}>
                                    <Edit className="size-4 text-muted-foreground" />
                                    Editar
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="cursor-pointer gap-2" onClick={() => handleDuplicate(peticao)}>
                                    <Copy className="size-4 text-muted-foreground" />
                                    Duplicar
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="cursor-pointer gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive" onClick={() => handleDelete(peticao.id)}>
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
            </CardContent>
          </Card>

          {/* IMPORT MODAL */}
          <Dialog open={openImportModal} onOpenChange={(open) => {
            setOpenImportModal(open);
            if (!open) setUploadedFileName(null);
          }}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Importar Documento</DialogTitle>
                <DialogDescription>
                  Faça o upload de um arquivo .docx ou .pdf para iniciar uma nova petição a partir de um modelo existente.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div 
                  onClick={handleSimulateUploadList}
                  className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 ${uploadedFileName ? 'border-primary bg-primary/5' : 'border-zinc-200 dark:border-zinc-800 hover:border-primary/50 bg-zinc-50 dark:bg-zinc-900/50'}`}
                >
                  {uploadedFileName ? (
                    <>
                      <FileText className="size-8 text-primary mb-3" />
                      <p className="text-sm font-medium text-foreground">{uploadedFileName}</p>
                      <p className="text-xs text-muted-foreground mt-1">Pronto para importar</p>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="size-8 text-zinc-400 mb-3" />
                      <p className="text-sm font-medium text-foreground">Clique para selecionar ou arraste o arquivo</p>
                      <p className="text-xs text-muted-foreground mt-1">Formatos suportados: .docx, .pdf</p>
                    </>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenImportModal(false)}>Cancelar</Button>
                <Button disabled={!uploadedFileName} onClick={handleConfirmImportList}>Continuar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        /* EDITOR VIEW (Unified auto-contained workspace) */
        <div className="flex flex-col h-[calc(100vh-8rem)] -m-6 w-[calc(100%+3rem)] bg-zinc-50/50 dark:bg-zinc-950 rounded-xl overflow-hidden shadow-inner">
          
          {/* Topbar */}
          <div className="h-14 border-b border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50/80 dark:bg-zinc-900/80 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 shrink-0 w-full z-10">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="size-8 rounded-full hover:bg-zinc-200/50 dark:hover:bg-zinc-800 transition-colors"
                onClick={() => setActiveView('list')}
              >
                <ChevronLeft className="size-4" />
              </Button>
              <div className="w-px h-5 bg-zinc-200 dark:bg-zinc-800 mx-1" />
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-muted-foreground bg-white/80 dark:bg-zinc-900/50 backdrop-blur-sm px-2.5 py-1.5 rounded-md border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm transition-all hover:bg-white dark:hover:bg-zinc-900">
                  <FileText className="size-4 shrink-0" />
                  
                  {isEditingTitle ? (
                    <input
                      type="text"
                      autoFocus
                      value={docTitle}
                      onChange={(e) => setDocTitle(e.target.value)}
                      onBlur={() => setIsEditingTitle(false)}
                      onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
                      className="text-sm font-semibold bg-transparent border-none focus:outline-none focus:ring-0 w-48 sm:w-64 text-foreground p-0 h-auto"
                    />
                  ) : (
                    <div 
                      className="flex items-center gap-2 cursor-text group"
                      onClick={() => setIsEditingTitle(true)}
                    >
                      <span className="text-sm font-semibold text-foreground truncate max-w-[200px] sm:max-w-[300px]">
                        {docTitle}
                      </span>
                      <Edit2 className="size-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  )}
                </div>

                <Badge variant={status === "Rascunho" ? "secondary" : "default"} className="pointer-events-none shadow-sm">
                  {status}
                </Badge>

                <span className="flex items-center gap-1 text-xs text-muted-foreground/80 select-none">
                  <Check className="size-3.5 text-emerald-500 shrink-0" />
                  <span>Salvo automaticamente</span>
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setStatus(status === "Rascunho" ? "Pronto" : "Rascunho")}>
                Marcar como {status === "Rascunho" ? "Pronto" : "Rascunho"}
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setOpenWhatsApp(true)}>
                <MessageSquare className="size-4 text-emerald-500" />
                Resumo p/ Cliente
              </Button>
              <Button size="sm" className="gap-2" onClick={handleSave}>
                Salvar e Sair
              </Button>
            </div>
          </div>

          {/* Main Layout Area */}
          <div className="flex flex-1 overflow-hidden">
            
            {/* LEFT COLUMN: EDITOR AREA (70%) */}
            <div className="w-[70%] h-full flex flex-col relative bg-zinc-100/80 dark:bg-zinc-950/80 border-r border-zinc-200/50 dark:border-zinc-800/50 overflow-hidden">
              
              {/* Toolbar flutuante integrada */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/50 shadow-md rounded-full px-3 py-1.5 flex items-center gap-1 z-10 opacity-70 hover:opacity-100 transition-all duration-300 max-w-[95%] overflow-x-auto no-scrollbar">
                {/* Group 1: Inline styles */}
                <Button 
                  type="button"
                  variant="ghost" 
                  size="icon" 
                  className={`size-8 rounded-full transition-colors ${editor?.isActive('bold') ? 'bg-zinc-200 dark:bg-zinc-800 text-foreground font-bold' : ''}`}
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                >
                  <Bold className="size-4" />
                </Button>
                <Button 
                  type="button"
                  variant="ghost" 
                  size="icon" 
                  className={`size-8 rounded-full transition-colors ${editor?.isActive('italic') ? 'bg-zinc-200 dark:bg-zinc-800 text-foreground' : ''}`}
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                >
                  <Italic className="size-4" />
                </Button>
                <Button 
                  type="button"
                  variant="ghost" 
                  size="icon" 
                  className={`size-8 rounded-full transition-colors ${editor?.isActive('underline') ? 'bg-zinc-200 dark:bg-zinc-800 text-foreground' : ''}`}
                  onClick={() => editor?.chain().focus().toggleUnderline().run()}
                >
                  <UnderlineIcon className="size-4" />
                </Button>
                <Button 
                  type="button"
                  variant="ghost" 
                  size="icon" 
                  className={`size-8 rounded-full transition-colors ${editor?.isActive('strike') ? 'bg-zinc-200 dark:bg-zinc-800 text-foreground' : ''}`}
                  onClick={() => editor?.chain().focus().toggleStrike().run()}
                >
                  <Strikethrough className="size-4" />
                </Button>

                <div className="w-px h-4 bg-border mx-1 shrink-0" />

                {/* Group 2: Headings */}
                <Button 
                  type="button"
                  variant="ghost" 
                  size="icon" 
                  className={`size-8 rounded-full transition-colors ${editor?.isActive('heading', { level: 1 }) ? 'bg-zinc-200 dark:bg-zinc-800 text-foreground' : ''}`}
                  onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                >
                  <Heading1 className="size-4" />
                </Button>
                <Button 
                  type="button"
                  variant="ghost" 
                  size="icon" 
                  className={`size-8 rounded-full transition-colors ${editor?.isActive('heading', { level: 2 }) ? 'bg-zinc-200 dark:bg-zinc-800 text-foreground' : ''}`}
                  onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                >
                  <Heading2 className="size-4" />
                </Button>

                <div className="w-px h-4 bg-border mx-1 shrink-0" />

                {/* Group 3: Lists & Blocks */}
                <Button 
                  type="button"
                  variant="ghost" 
                  size="icon" 
                  className={`size-8 rounded-full transition-colors ${editor?.isActive('bulletList') ? 'bg-zinc-200 dark:bg-zinc-800 text-foreground' : ''}`}
                  onClick={() => editor?.chain().focus().toggleBulletList().run()}
                >
                  <List className="size-4" />
                </Button>
                <Button 
                  type="button"
                  variant="ghost" 
                  size="icon" 
                  className={`size-8 rounded-full transition-colors ${editor?.isActive('orderedList') ? 'bg-zinc-200 dark:bg-zinc-800 text-foreground' : ''}`}
                  onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                >
                  <ListOrdered className="size-4" />
                </Button>
                <Button 
                  type="button"
                  variant="ghost" 
                  size="icon" 
                  className={`size-8 rounded-full transition-colors ${editor?.isActive('blockquote') ? 'bg-zinc-200 dark:bg-zinc-800 text-foreground' : ''}`}
                  onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                >
                  <Quote className="size-4" />
                </Button>
                <Button 
                  type="button"
                  variant="ghost" 
                  size="icon" 
                  className="size-8 rounded-full transition-colors"
                  onClick={() => editor?.chain().focus().setHorizontalRule().run()}
                >
                  <Minus className="size-4" />
                </Button>

                <div className="w-px h-4 bg-border mx-1 shrink-0" />

                {/* Group 4: Undo & Redo */}
                <Button 
                  type="button"
                  variant="ghost" 
                  size="icon" 
                  className="size-8 rounded-full transition-colors disabled:opacity-40 disabled:pointer-events-none"
                  disabled={!editor?.can().undo()}
                  onClick={() => editor?.chain().focus().undo().run()}
                >
                  <Undo className="size-4" />
                </Button>
                <Button 
                  type="button"
                  variant="ghost" 
                  size="icon" 
                  className="size-8 rounded-full transition-colors disabled:opacity-40 disabled:pointer-events-none"
                  disabled={!editor?.can().redo()}
                  onClick={() => editor?.chain().focus().redo().run()}
                >
                  <Redo className="size-4" />
                </Button>
              </div>

              {/* Editable Page Area */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-8 pt-24 pb-20 no-scrollbar">
                <div className="mx-auto w-full max-w-[210mm] min-h-[297mm] h-max bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm p-10 sm:p-16 mb-8 relative flex flex-col transition-colors">
                  {isAiLoading && (
                    <div className="absolute inset-0 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xs z-20 flex flex-col items-center justify-center">
                      <Loader2 className="size-8 text-primary animate-spin mb-4" />
                      <p className="text-sm font-medium text-foreground">Aplicando: {aiAction}...</p>
                    </div>
                  )}
                  {mounted && editor ? (
                    <EditorContent 
                      editor={editor} 
                      className="outline-none text-sm leading-relaxed text-zinc-800 dark:text-zinc-200 flex-1 w-full"
                    />
                  ) : (
                    <div className="flex-1 min-h-[297mm] animate-pulse bg-zinc-100 dark:bg-zinc-800/20 rounded-md" />
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: CONTROL PANEL TABS (30%) */}
            <div className="w-[30%] h-full bg-zinc-50/50 dark:bg-zinc-900/30 backdrop-blur-xl flex flex-col overflow-hidden">
              <Tabs defaultValue="dados" className="w-full h-full flex flex-col min-h-0">
                <div className="px-4 pt-4 shrink-0">
                  <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="dados">Modelos & Dados</TabsTrigger>
                    <TabsTrigger value="ia" className="gap-2">
                      <Sparkles className="size-3.5" />
                      Assistente de IA
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <div className="flex-1 flex flex-col min-h-0 p-4">
                  
                  {/* Tab 1: Modelos & Dados */}
                  <TabsContent value="dados" className="mt-0 flex-1 flex flex-col min-h-0 gap-5 animate-in fade-in-50">
                    <div className="flex flex-col gap-2 shrink-0">
                      <label className="text-sm font-medium leading-none text-foreground">
                        Modelo Base
                      </label>
                      <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione um modelo..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="extravio">Extravio de Bagagem</SelectItem>
                          <SelectItem value="negativacao">Negativação Indevida Serasa</SelectItem>
                          <SelectItem value="aluguel">Cobrança de Aluguel</SelectItem>
                          <SelectItem value="blank">Novo modelo em branco</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Word File Upload Mock Dropzone */}
                    <div 
                      onClick={handleUploadDocx}
                      className="border border-dashed border-zinc-200 dark:border-zinc-800 hover:border-primary/50 bg-zinc-100/30 dark:bg-zinc-900/20 hover:bg-zinc-150/50 dark:hover:bg-zinc-900/50 rounded-xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 shadow-sm shrink-0 group"
                    >
                      <UploadCloud className="size-6 text-zinc-400 dark:text-zinc-500 mb-2 group-hover:text-primary group-hover:scale-105 transition-all" />
                      <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">✨ Criar Modelo via Upload (.docx)</p>
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-1 max-w-[200px] leading-normal">
                        Arraste seu modelo jurídico para mapear as variáveis automaticamente
                      </span>
                    </div>

                    <div className="flex-1 flex flex-col min-h-0 gap-4">
                      <label className="text-sm font-medium leading-none text-foreground flex items-center justify-between shrink-0">
                        Variáveis Mapeadas
                        <Badge variant="outline" className="text-[10px] bg-primary/5 text-primary border-primary/20">
                          {detectedVars.length} detectadas
                        </Badge>
                      </label>
                      
                      <div className="flex-1 overflow-y-auto pr-1 space-y-5 no-scrollbar">
                        {detectedVars.length === 0 ? (
                          <p className="text-xs text-muted-foreground text-center py-4">Nenhuma variável detectada no documento.</p>
                        ) : (
                          detectedVars.map((varName) => (
                            <div key={varName} className="flex flex-col gap-2 animate-in fade-in duration-200">
                              <label className="text-sm font-medium leading-none text-foreground">
                                {formatLabel(varName)}
                              </label>
                              <input 
                                type="text" 
                                value={variables[varName] || ""}
                                onChange={(e) => handleVariableChange(varName, e.target.value)}
                                placeholder={`Preencher ${varName.toLowerCase()}...`}
                                className="flex h-9 w-full rounded-md border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/40 px-3 py-1 text-sm shadow-sm transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600 text-zinc-800 dark:text-zinc-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-700 focus-visible:border-zinc-600"
                              />
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    <div className="mt-auto pt-4 shrink-0">
                      <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-1.5 rounded text-primary mt-0.5">
                            <CheckCircle2 className="size-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-foreground">Preenchimento Dinâmico</h4>
                            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                              Todas as variáveis detectadas no editor geram inputs automaticamente. Digite para preenchê-las com destaque em negrito.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Tab 2: Assistente de IA */}
                  <TabsContent value="ia" className="mt-0 flex-1 flex flex-col min-h-0 gap-6 overflow-y-auto no-scrollbar animate-in fade-in-50">
                    <div className="flex flex-col gap-3">
                      <label className="text-sm font-medium leading-none text-foreground">
                        Ações Rápidas (Presets)
                      </label>
                      
                      <div className="grid gap-2">
                        <Button 
                          variant="outline" 
                          className="justify-start h-12 px-4 gap-3 font-normal hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all"
                          onClick={applyFormalTone}
                          disabled={isAiLoading}
                        >
                          <div className="bg-primary/10 p-1.5 rounded-md text-primary">
                            <Scale className="size-4" />
                          </div>
                          Tornar Linguagem Formal
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="justify-start h-12 px-4 gap-3 font-normal hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all"
                          onClick={applyConcise}
                          disabled={isAiLoading}
                        >
                          <div className="bg-primary/10 p-1.5 rounded-md text-primary">
                            <Scissors className="size-4" />
                          </div>
                          Enxugar Texto / Conciso
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="justify-start h-12 px-4 gap-3 font-normal hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all"
                          onClick={applyGrammar}
                          disabled={isAiLoading}
                        >
                          <div className="bg-primary/10 p-1.5 rounded-md text-primary">
                            <CheckCircle2 className="size-4" />
                          </div>
                          Corrigir Gramática e Digitação
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                      <label className="text-sm font-medium leading-none text-foreground">
                        Prompt Personalizado
                      </label>
                      <textarea 
                        placeholder="Ex: Adicione um parágrafo mencionando a jurisprudência recente do STJ sobre danos morais em atraso de voo..."
                        value={customPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                      ></textarea>
                      <Button 
                        className="w-full gap-2" 
                        disabled={isAiLoading || !customPrompt.trim()} 
                        onClick={handleCustomAiPrompt}
                      >
                        <Sparkles className="size-4" />
                        Gerar com IA
                      </Button>
                    </div>
                  </TabsContent>

                </div>
              </Tabs>
            </div>
          </div>

          {/* WHATSAPP DIALOG SUMMARY SIMULATOR */}
          <Dialog open={openWhatsApp} onOpenChange={setOpenWhatsApp}>
            <DialogContent className="max-w-[480px] p-6 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-zinc-100">
                  <MessageSquare className="size-5 text-zinc-400" />
                  Resumo de Envio (WhatsApp)
                </DialogTitle>
                <DialogDescription className="text-xs text-zinc-400">
                  Revise o resumo gerado antes de copiá-lo para enviar ao cliente.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4 flex-1">
                <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 max-h-[320px] overflow-y-auto">
                  <p className="whitespace-pre-wrap text-sm text-zinc-350 leading-relaxed font-sans select-all">
                    {getWhatsAppMessage()}
                  </p>
                </div>
              </div>

              <DialogFooter className="mt-6 flex items-center justify-end gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setOpenWhatsApp(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  onClick={handleCopyWhatsAppMessage}
                  className="bg-zinc-100 hover:bg-zinc-200 text-zinc-900 gap-1.5 font-medium"
                >
                  <Check className="size-3.5" />
                  Copiar Mensagem
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </div>
      )}

      {/* TOAST SYSTEM (High-Fidelity) */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300 z-50 select-none">
          <div className="bg-emerald-500/20 text-emerald-500 rounded-full p-1">
            <Check className="size-4" />
          </div>
          <p className="text-sm font-medium">{toastMessage}</p>
        </div>
      )}

    </div>
  );
}
