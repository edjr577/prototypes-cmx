'use client';

import React from 'react';
import { Lock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function UpsellBanner() {
  return (
    <div className="p-12 rounded-2xl border border-border/80 bg-zinc-950 flex flex-col items-center justify-center text-center shadow-xl max-w-lg mx-auto">
      <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mb-4">
        <Lock className="w-8 h-8 text-amber-500" />
      </div>
      <h2 className="text-2xl font-extrabold tracking-tight mb-2">Módulo Administrativo Bloqueado</h2>
      <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
        O seu plano atual não inclui a visão executiva completa. Faça o upgrade para o <strong className="text-amber-500">Plano Advanced</strong> para desbloquear relatórios financeiros, indicadores de operação, gestão de pessoas e inteligência artificial.
      </p>
      <Button className="bg-amber-500 hover:bg-amber-600 text-white font-bold gap-2">
        <Sparkles className="w-4 h-4" />
        Fazer Upgrade para Advanced
      </Button>
      <p className="mt-4 text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
        Dica: Use o simulador no canto inferior direito para mudar o plano!
      </p>
    </div>
  );
}
