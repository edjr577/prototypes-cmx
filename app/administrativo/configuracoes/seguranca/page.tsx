'use client';

import React, { useState } from 'react';
import { Switch } from "@/components/ui/switch";

export default function SegurancaPage() {
  const [require2FA, setRequire2FA] = useState(false);

  return (
    <div className="flex flex-col space-y-10 animate-in fade-in duration-300">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-semibold text-foreground">Segurança e Auditoria</h1>
        <p className="text-sm text-muted-foreground">
          Controle as políticas de acesso e acompanhe os logs de atividades do sistema.
        </p>
      </div>

      <div className="flex flex-col space-y-4">
        <h2 className="text-sm font-semibold text-foreground">Políticas de Acesso</h2>
        
        <div className="flex flex-col rounded-xl border border-border bg-card/50 shadow-sm overflow-hidden">
          
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <div className="flex flex-col gap-1 pr-4">
              <span className="text-sm font-medium text-foreground">Autenticação em Duas Etapas (2FA) Obrigatória</span>
              <span className="text-xs text-muted-foreground">Exigir que todos os usuários do escritório configurem o 2FA para logar</span>
            </div>
            <div>
              <Switch checked={require2FA} onCheckedChange={setRequire2FA} />
            </div>
          </div>

          <div className="flex items-center justify-between p-4">
            <div className="flex flex-col gap-1 pr-4">
              <span className="text-sm font-medium text-foreground">Duração da Sessão</span>
              <span className="text-xs text-muted-foreground">Tempo máximo de inatividade antes de desconectar o usuário automaticamente</span>
            </div>
            <div className="w-48 relative">
              <select className="flex h-9 w-full appearance-none rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <option value="1">1 hora</option>
                <option value="4">4 horas</option>
                <option value="8">8 horas (Expediente)</option>
                <option value="24">24 horas</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <h2 className="text-sm font-semibold text-foreground">Logs Recentes</h2>
        
        <div className="flex flex-col rounded-xl border border-border bg-card/50 shadow-sm overflow-hidden p-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs py-2 border-b border-border/30">
              <span className="font-mono text-muted-foreground">Hoje, 14:32</span>
              <span className="text-foreground">Login bem-sucedido</span>
              <span className="text-muted-foreground">edmilson@silva.adv.br</span>
              <span className="font-mono text-muted-foreground">192.168.1.100</span>
            </div>
            <div className="flex items-center justify-between text-xs py-2 border-b border-border/30">
              <span className="font-mono text-muted-foreground">Hoje, 10:15</span>
              <span className="text-amber-500">Tentativa de login falha</span>
              <span className="text-muted-foreground">desconhecido</span>
              <span className="font-mono text-muted-foreground">45.22.10.1</span>
            </div>
            <div className="flex items-center justify-between text-xs py-2">
              <span className="font-mono text-muted-foreground">Ontem, 18:45</span>
              <span className="text-foreground">Senha alterada</span>
              <span className="text-muted-foreground">carla@silva.adv.br</span>
              <span className="font-mono text-muted-foreground">177.30.22.15</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
