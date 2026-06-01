'use client';

import React, { useState } from 'react';
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";

export default function ConfiguracoesGeraisPage() {
  const [receiveEmails, setReceiveEmails] = useState(true);

  return (
    <div className="flex flex-col space-y-10 animate-in fade-in duration-300">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-semibold text-foreground">Perfil do Escritório</h1>
        <p className="text-sm text-muted-foreground">
          Gerencie as informações principais do seu workspace no LegalTech.
        </p>
      </div>

      <div className="flex flex-col space-y-4">
        <h2 className="text-sm font-semibold text-foreground">Geral</h2>
        
        <div className="flex flex-col rounded-xl border border-border bg-card/50 shadow-sm overflow-hidden">
          
          {/* Row 1 */}
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <div className="flex flex-col gap-1 pr-4">
              <span className="text-sm font-medium text-foreground">Nome do Escritório</span>
              <span className="text-xs text-muted-foreground">Exibido na interface principal e nos cabeçalhos de relatórios</span>
            </div>
            <div className="w-64">
              <input 
                type="text" 
                defaultValue="Silva & Advogados Associados" 
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <div className="flex flex-col gap-1 pr-4">
              <span className="text-sm font-medium text-foreground">CNPJ / Documento Base</span>
              <span className="text-xs text-muted-foreground">Usado para faturamento e preenchimento automático em minutas</span>
            </div>
            <div className="w-64">
              <input 
                type="text" 
                defaultValue="00.000.000/0001-00" 
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex items-center justify-between p-4">
            <div className="flex flex-col gap-1 pr-4">
              <span className="text-sm font-medium text-foreground">Fuso Horário Padrão</span>
              <span className="text-xs text-muted-foreground">Usado nos seletores de data e contadores de prazos no ERP</span>
            </div>
            <div className="w-64 relative">
              <select className="flex h-9 w-full appearance-none rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <option value="brt">Brasília (BRT) UTC -03:00</option>
                <option value="amt">Amazonas (AMT) UTC -04:00</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <h2 className="text-sm font-semibold text-foreground">Preferências Regionais e Alertas</h2>
        
        <div className="flex flex-col rounded-xl border border-border bg-card/50 shadow-sm overflow-hidden">
          
          {/* Row 1 */}
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <div className="flex flex-col gap-1 pr-4">
              <span className="text-sm font-medium text-foreground">Dias de Expediente (Forense)</span>
              <span className="text-xs text-muted-foreground">Usado para cálculo de prazos processuais</span>
            </div>
            <div className="w-64 relative">
              <select className="flex h-9 w-full appearance-none rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <option value="seg_sex">Segunda a Sexta (Padrão CNJ)</option>
                <option value="all">Todos os dias</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <div className="flex flex-col gap-1 pr-4">
              <span className="text-sm font-medium text-foreground">Moeda Padrão</span>
              <span className="text-xs text-muted-foreground">Moeda utilizada em todos os painéis e faturamento do CRM</span>
            </div>
            <div className="w-64 relative">
              <select className="flex h-9 w-full appearance-none rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <option value="brl">Real Brasileiro (BRL)</option>
                <option value="usd">Dólar Americano (USD)</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
          
          {/* Row 3 - Toggle Simulation */}
          <div className="flex items-center justify-between p-4">
            <div className="flex flex-col gap-1 pr-4">
              <span className="text-sm font-medium text-foreground">Resumo Semanal por E-mail</span>
              <span className="text-xs text-muted-foreground">Receber relatório semanal de produtividade e prazos críticos</span>
            </div>
            <div>
              <Switch checked={receiveEmails} onCheckedChange={setReceiveEmails} />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
