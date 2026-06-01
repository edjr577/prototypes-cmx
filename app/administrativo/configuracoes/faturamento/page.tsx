'use client';

import React from 'react';
import { CreditCard, ExternalLink, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function FaturamentoPage() {
  return (
    <div className="flex flex-col space-y-10 animate-in fade-in duration-300">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-semibold text-foreground">Faturamento e Assinatura</h1>
        <p className="text-sm text-muted-foreground">
          Gerencie o seu plano atual e métodos de pagamento.
        </p>
      </div>

      <div className="flex flex-col space-y-4">
        <h2 className="text-sm font-semibold text-foreground">Plano Atual</h2>
        
        <div className="flex flex-col rounded-xl border border-border bg-card/50 shadow-sm p-6 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 opacity-5">
            <Package className="size-48" />
          </div>
          
          <div className="flex flex-col gap-1 mb-6 relative z-10">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-amber-500">Plano Advanced</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-500 uppercase tracking-wider">Ativo</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Você tem acesso total à suíte: CRM, ERP e Controladoria, com até 10 licenças inclusas.
            </p>
          </div>

          <div className="flex items-center gap-4 relative z-10">
            <Link href="/administrativo/plano">
              <Button variant="outline" className="h-9 text-sm font-medium border-border">
                Gerenciar Plano e Limites
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <h2 className="text-sm font-semibold text-foreground">Pagamento e Faturas</h2>
        
        <div className="flex flex-col rounded-xl border border-border bg-card/50 shadow-sm overflow-hidden">
          
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <div className="flex flex-col gap-1 pr-4">
              <span className="text-sm font-medium text-foreground">Cartão de Crédito</span>
              <span className="text-xs text-muted-foreground">Método principal de cobrança</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 border border-border/60 bg-muted/20 rounded-md">
                <CreditCard className="size-4 text-muted-foreground" />
                <span className="text-xs font-mono text-muted-foreground">•••• 4321</span>
              </div>
              <Button variant="ghost" size="sm" className="h-8 text-xs">Atualizar</Button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4">
            <div className="flex flex-col gap-1 pr-4">
              <span className="text-sm font-medium text-foreground">Portal Financeiro (Stripe)</span>
              <span className="text-xs text-muted-foreground">Baixar notas fiscais e ver histórico completo de cobranças</span>
            </div>
            <div>
              <Button variant="secondary" size="sm" className="h-8 gap-2 text-xs">
                Acessar Portal
                <ExternalLink className="size-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
