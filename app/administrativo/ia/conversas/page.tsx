"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User, MessageSquare, Plus, Mic, Search, Trash2, Edit2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { PermissionGate } from "@/components/permission-gate";
import { UpsellBanner } from "@/components/upsell-banner";

// Tipos para simular as conversas
type Message = { id: number; role: "user" | "assistant"; content: string };
type ChatHistory = { id: string; title: string; date: string; messages: Message[] };

// Mock de histórico
const MOCK_HISTORY: ChatHistory[] = [
  {
    id: "chat-1",
    title: "Resumo Executivo - Maio",
    date: "Ontem",
    messages: [
      { id: 1, role: "user", content: "Gostaria do resumo executivo de maio" },
      { id: 2, role: "assistant", content: "Claro! Aqui está o resumo: O faturamento subiu 15% em relação a abril. O número de novos contratos fechados foi de 12." }
    ]
  },
  {
    id: "chat-2",
    title: "Análise de Contratos de TI",
    date: "Semana Passada",
    messages: [
      { id: 1, role: "user", content: "Quais são os principais riscos nos contratos de TI atuais?" },
      { id: 2, role: "assistant", content: "Existem 3 contratos com multas rescisórias muito altas e 2 próximos ao vencimento sem renovação automática prevista." }
    ]
  },
  {
    id: "chat-3",
    title: "Projeção Financeira Q3",
    date: "Mês Passado",
    messages: [
      { id: 1, role: "user", content: "Me dê a projeção para o terceiro trimestre" },
      { id: 2, role: "assistant", content: "A projeção aponta para uma receita recorrente de R$ 450k, com despesas estimadas em R$ 120k. O saldo projetado é de R$ 330k." }
    ]
  }
];

function IAConversasContent() {
  const { activeTenant } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [history, setHistory] = useState<ChatHistory[]>(MOCK_HISTORY);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [input, setInput] = useState("");

  // Processa a query `q` vinda da "Nova Conversa"
  useEffect(() => {
    const initialQuery = searchParams.get("q");
    if (initialQuery) {
      // Cria uma nova conversa mockada baseada nessa query
      const newChat: ChatHistory = {
        id: `chat-new-${Date.now()}`,
        title: initialQuery.length > 20 ? initialQuery.substring(0, 20) + "..." : initialQuery,
        date: "Hoje",
        messages: [
          { id: 1, role: "user", content: initialQuery },
        ]
      };
      
      setHistory((prev) => [newChat, ...prev]);
      setActiveChatId(newChat.id);
      
      // Simula a IA respondendo
      setTimeout(() => {
        setHistory((prev) => 
          prev.map(c => 
            c.id === newChat.id 
              ? {
                  ...c, 
                  messages: [
                    ...c.messages, 
                    { id: 2, role: "assistant", content: "Entendido. Estou processando sua solicitação nos nossos bancos de dados para trazer os insights mais precisos. Um momento..." }
                  ]
                } 
              : c
          )
        );
      }, 1000);
      
      // Limpa a query string para não recriar caso a página recarregue
      router.replace("/administrativo/ia/conversas");
    }
  }, [searchParams, router]);

  const activeChat = history.find(c => c.id === activeChatId);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || !activeChatId) return;
    
    // Adiciona mensagem ao chat ativo
    const userMsg: Message = { id: Date.now(), role: "user", content: input };
    
    setHistory((prev) => 
      prev.map(c => c.id === activeChatId ? { ...c, messages: [...c.messages, userMsg] } : c)
    );
    
    setInput("");

    // Simula resposta
    setTimeout(() => {
      setHistory((prev) => 
        prev.map(c => 
          c.id === activeChatId 
            ? {
                ...c, 
                messages: [
                  ...c.messages, 
                  { id: Date.now() + 1, role: "assistant", content: "Esta é uma resposta simulada para continuar a conversa." }
                ]
              } 
            : c
        )
      );
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full max-h-[calc(100vh-6rem)] p-6">
      
      {/* ========================================== */}
      {/* LEFT SIDEBAR: Histórico de Conversas        */}
      {/* ========================================== */}
      <div className="w-full lg:w-72 flex flex-col gap-4 shrink-0 h-full">
        <div className="flex items-center justify-between pb-2 border-b border-border/40">
          <h2 className="text-sm font-bold text-foreground">Suas Conversas</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            className="size-7" 
            onClick={() => router.push("/administrativo/ia")}
            title="Nova conversa"
          >
            <Plus className="size-4" />
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Buscar nas conversas..." 
            className="w-full bg-muted/30 border border-border/50 rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-primary/50"
          />
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-1 mt-2">
          {history.map((chat) => (
            <div key={chat.id} className="flex flex-col gap-1">
              {/* Group headers could go here if we dynamically group by date */}
              <button
                onClick={() => setActiveChatId(chat.id)}
                className={cn(
                  "flex flex-col items-start p-3 rounded-lg text-left transition-all border group relative",
                  activeChatId === chat.id 
                    ? "bg-muted border-border" 
                    : "bg-transparent border-transparent hover:bg-muted/50"
                )}
              >
                <div className="flex items-center gap-2 w-full">
                  <MessageSquare className={cn("size-3.5 shrink-0", activeChatId === chat.id ? "text-primary" : "text-muted-foreground")} />
                  <span className={cn(
                    "text-sm font-medium truncate flex-1",
                    activeChatId === chat.id ? "text-foreground" : "text-foreground/80"
                  )}>
                    {chat.title}
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground mt-1 ml-5.5">
                  {chat.date}
                </span>

                {/* Hover actions */}
                <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
                  <div className="size-6 flex items-center justify-center rounded-md hover:bg-background text-muted-foreground hover:text-foreground">
                    <Edit2 className="size-3" />
                  </div>
                  <div className="size-6 flex items-center justify-center rounded-md hover:bg-background text-muted-foreground hover:text-rose-500">
                    <Trash2 className="size-3" />
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================== */}
      {/* MAIN CONTENT: Chat Area ou Empty State      */}
      {/* ========================================== */}
      <Card className="flex flex-col flex-1 shadow-sm border-border/40 min-h-0 bg-background/50 h-full overflow-hidden">
        
        {!activeChat ? (
          // Empty State (Nenhuma conversa selecionada)
          <div className="flex flex-col items-center justify-center flex-1 p-8 text-center bg-muted/10">
            <div className="size-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
              <MessageSquare className="size-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Selecione uma conversa</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Escolha uma conversa no menu ao lado para continuar, ou inicie uma nova consulta com a inteligência artificial.
            </p>
            <Button className="mt-6" onClick={() => router.push("/administrativo/ia")}>
              <Plus className="size-4 mr-2" /> Nova Conversa
            </Button>
          </div>
        ) : (
          // Chat View
          <>
            {/* Cabecalho do Chat */}
            <div className="p-4 border-b border-border/40 flex items-center justify-between shrink-0 bg-background/80 backdrop-blur-sm z-10">
              <h3 className="font-semibold text-sm truncate">{activeChat.title}</h3>
              <Badge variant="outline" className="text-[10px] uppercase font-bold text-muted-foreground border-border/60">
                {activeTenant.name}
              </Badge>
            </div>

            {/* Area de Mensagens */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
              {activeChat.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex gap-4 max-w-[85%]",
                    msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  <Avatar className="size-8 shrink-0 border border-border/50 shadow-sm mt-1">
                    {msg.role === "assistant" ? (
                      <AvatarFallback className="bg-primary/10 text-primary"><Bot className="size-4" /></AvatarFallback>
                    ) : (
                      <AvatarFallback className="bg-muted text-muted-foreground"><User className="size-4" /></AvatarFallback>
                    )}
                  </Avatar>
                  <div
                    className={cn(
                      "flex flex-col gap-2 rounded-2xl px-4 py-3 text-sm shadow-sm",
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : "bg-muted/50 border border-border/40 rounded-tl-sm text-foreground leading-relaxed"
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Input Area (Bottom) - Estilo Gemini */}
            <div className="p-4 bg-background/80 backdrop-blur-sm border-t border-border/40 shrink-0 flex flex-col items-center">
              <div className="w-full max-w-3xl">
                <form onSubmit={handleSend} className="relative flex items-center bg-muted/40 rounded-full border border-border/40 focus-within:bg-background focus-within:shadow-md focus-within:border-border/80 transition-all">
                  <button 
                    type="button"
                    className="absolute left-3 size-9 rounded-full hover:bg-muted/60 flex items-center justify-center text-muted-foreground transition-colors cursor-pointer"
                    title="Anexar arquivos"
                  >
                    <Plus className="size-5" />
                  </button>
                  
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Responda ou faça uma nova pergunta..."
                    className="w-full bg-transparent border-none focus:outline-none focus:ring-0 pl-14 pr-14 py-3.5 text-sm shadow-none"
                  />
                  
                  <button 
                    type="button"
                    className="absolute right-3 size-9 rounded-full hover:bg-muted/60 flex items-center justify-center text-muted-foreground transition-colors cursor-pointer"
                    title="Entrada por voz"
                  >
                    <Mic className="size-5" />
                  </button>
                </form>
                <div className="text-center mt-2.5">
                  <span className="text-[10px] text-muted-foreground font-medium tracking-wide">
                    A inteligência artificial pode cometer erros. Verifique informações importantes.
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </Card>

      {/* Estilos */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.3);
          border-radius: 20px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5);
        }
      `}} />
    </div>
  );
}

export default function IAConversasPage() {
  return (
    <PermissionGate require="admin:full_access" fallback={<UpsellBanner />} blockMode="overlay">
      <Suspense fallback={<div className="flex h-full items-center justify-center text-muted-foreground text-sm animate-pulse">Carregando histórico...</div>}>
        <IAConversasContent />
      </Suspense>
    </PermissionGate>
  );
}
