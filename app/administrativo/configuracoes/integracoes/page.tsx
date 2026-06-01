'use client';

import React, { useState } from 'react';
import { Mail, Calendar, Bot, Cloud, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function IntegracoesPage() {
  const [googleConnected, setGoogleConnected] = useState(true);
  const [outlookConnected, setOutlookConnected] = useState(false);
  const [openaiConnected, setOpenaiConnected] = useState(false);

  return (
    <div className="flex flex-col space-y-10 animate-in fade-in duration-300">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-semibold text-foreground">Integrações</h1>
        <p className="text-sm text-muted-foreground">
          Conecte ferramentas externas para sincronizar e-mails, arquivos e usar Inteligência Artificial.
        </p>
      </div>

      <div className="flex flex-col space-y-4">
        <h2 className="text-sm font-semibold text-foreground">E-mail e Calendário</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Google Workspace */}
          <div className="flex flex-col rounded-xl border border-border bg-card/50 shadow-sm p-5 relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div className="size-10 bg-white rounded-lg flex items-center justify-center border shadow-sm">
                <svg className="size-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </div>
              {googleConnected ? (
                <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <Check className="size-3" /> Conectado
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded border border-border">
                  Desconectado
                </span>
              )}
            </div>
            <h3 className="font-semibold text-foreground mb-1">Google Workspace</h3>
            <p className="text-xs text-muted-foreground mb-4 flex-1">
              Sincronize eventos da agenda, salve minutas no Google Drive e acompanhe e-mails de clientes no CRM.
            </p>
            <Button 
              variant={googleConnected ? "outline" : "default"} 
              size="sm" 
              className="w-full text-xs font-medium"
              onClick={() => setGoogleConnected(!googleConnected)}
            >
              {googleConnected ? "Desconectar conta" : "Conectar Google"}
            </Button>
          </div>

          {/* Microsoft 365 */}
          <div className="flex flex-col rounded-xl border border-border bg-card/50 shadow-sm p-5 relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div className="size-10 bg-[#0078D4]/10 rounded-lg flex items-center justify-center border border-[#0078D4]/20 shadow-sm">
                <Mail className="size-5 text-[#0078D4]" />
              </div>
              {outlookConnected ? (
                <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <Check className="size-3" /> Conectado
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded border border-border">
                  Desconectado
                </span>
              )}
            </div>
            <h3 className="font-semibold text-foreground mb-1">Microsoft 365</h3>
            <p className="text-xs text-muted-foreground mb-4 flex-1">
              Conecte sua conta corporativa do Outlook e SharePoint para centralizar arquivos e agenda.
            </p>
            <Button 
              variant={outlookConnected ? "outline" : "default"} 
              size="sm" 
              className="w-full text-xs font-medium"
              onClick={() => setOutlookConnected(!outlookConnected)}
            >
              {outlookConnected ? "Desconectar conta" : "Conectar Microsoft"}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <h2 className="text-sm font-semibold text-foreground">Inteligência Artificial (LLMs)</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* OpenAI */}
          <div className="flex flex-col rounded-xl border border-border bg-card/50 shadow-sm p-5 relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20 shadow-sm">
                <Bot className="size-5 text-primary" />
              </div>
              {openaiConnected ? (
                <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <Check className="size-3" /> Chave Ativa
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded border border-border">
                  Sem chave
                </span>
              )}
            </div>
            <h3 className="font-semibold text-foreground mb-1">OpenAI API (ChatGPT)</h3>
            <p className="text-xs text-muted-foreground mb-4 flex-1">
              Permite resumir processos, gerar petições e usar o assistente virtual no módulo de controladoria.
            </p>
            {openaiConnected ? (
              <Button 
                variant="outline"
                size="sm" 
                className="w-full text-xs font-medium"
                onClick={() => setOpenaiConnected(false)}
              >
                Remover API Key
              </Button>
            ) : (
              <div className="flex gap-2">
                <input 
                  type="password" 
                  placeholder="sk-..." 
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
                <Button 
                  size="sm" 
                  className="h-9 text-xs font-medium shrink-0"
                  onClick={() => setOpenaiConnected(true)}
                >
                  Salvar
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
