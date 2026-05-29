"use client";

import React, { useState } from "react";
import { useUser } from "@/app/context/UserContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sparkles, Send, Bot, User, ArrowRight, Lightbulb, FileText, TrendingUp, ShieldAlert, Plus, Mic } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// Mock das ações sugeridas
const suggestedActions = [
  {
    title: "Resumo Executivo Semanal",
    description: "Gerar um relatório consolidado com o desempenho financeiro e novas contratações.",
    icon: FileText,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Análise de Risco",
    description: "Avaliar probabilidade de perda nas ações trabalhistas do último trimestre.",
    icon: ShieldAlert,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
  {
    title: "Projeção de Faturamento",
    description: "Estimar a receita recorrente baseada nos contratos ativos.",
    icon: TrendingUp,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Otimização de Custos",
    description: "Identificar gargalos de custos operacionais do escritório matriz.",
    icon: Lightbulb,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  }
];

export default function IANewChatPage() {
  const { activeTenant } = useUser();
  const [input, setInput] = useState("");
  const router = useRouter();

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    
    // Navega para a tela de conversas passando a primeira mensagem via query param ou localStorage (vamos simular redirecionamento simples)
    router.push(`/administrativo/ia/conversas?q=${encodeURIComponent(input)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend(e as unknown as React.FormEvent);
    }
  };

  const handleSuggestionClick = (title: string) => {
    setInput(`Gostaria de solicitar: ${title}`);
    setTimeout(() => {
      router.push(`/administrativo/ia/conversas?q=${encodeURIComponent(`Gostaria de solicitar: ${title}`)}`);
    }, 50);
  };

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-8rem)]">
      {/* INITIAL STATE: Centered Input & Badges (Gemini Style) */}
      <div className="flex flex-col items-center justify-center flex-1 min-h-0 px-4 pb-20 mt-[-5rem]">
        <h2 className="text-[2.2rem] font-normal mb-8 text-center text-foreground tracking-tight">
          Como posso ajudar hoje?
        </h2>

        <div className="w-full max-w-3xl">
          <form onSubmit={handleSend} className="relative flex items-center bg-muted/40 rounded-full border border-border/40 focus-within:bg-background focus-within:shadow-md focus-within:border-border/80 transition-all mb-8">
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
              placeholder="Pergunte sobre contratos, financeiro ou peça um resumo..."
              className="w-full bg-transparent border-none focus:outline-none focus:ring-0 pl-14 pr-14 py-4 text-[15px] shadow-none"
            />
            
            <button 
              type="button"
              className="absolute right-3 size-9 rounded-full hover:bg-muted/60 flex items-center justify-center text-muted-foreground transition-colors cursor-pointer"
              title="Entrada por voz"
            >
              <Mic className="size-5" />
            </button>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {suggestedActions.map((action, i) => (
              <button
                key={i}
                onClick={() => handleSuggestionClick(action.title)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-border/40 bg-background/50 hover:bg-muted/60 hover:border-border/60 transition-all text-sm text-muted-foreground hover:text-foreground cursor-pointer shadow-sm"
              >
                <action.icon className={cn("size-3.5", action.color)} />
                {action.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
