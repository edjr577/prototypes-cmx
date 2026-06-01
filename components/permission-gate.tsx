'use client';

import React from 'react';
import { useUser } from '@/app/context/UserContext';
import { Permission } from '@/lib/permissions';

interface PermissionGateProps {
  children: React.ReactNode;
  require: Permission | Permission[];
  fallback?: React.ReactNode;
  blockMode?: 'replace' | 'overlay';
}

export function PermissionGate({ children, require, fallback = null, blockMode = 'replace' }: PermissionGateProps) {
  const { hasPermission, isInitialized } = useUser();

  // Se o contexto ainda não carregou o localStorage, renderiza nada ou fallback (evita hydration error na UI)
  if (!isInitialized) return null;

  const requirements = Array.isArray(require) ? require : [require];
  
  // Verifica se tem ao menos uma das permissões requisitadas (OR logic) 
  // Pode ser ajustado para AND dependendo da regra de negócios
  const hasAccess = requirements.some(req => hasPermission(req));

  if (!hasAccess) {
    if (blockMode === 'overlay') {
      return (
        <div className="relative w-full h-full overflow-hidden">
          <div className="pointer-events-none select-none blur-[6px] opacity-60 transition-all duration-300 h-full">
            {children}
          </div>
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-background/5">
            {fallback}
          </div>
        </div>
      );
    }
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
