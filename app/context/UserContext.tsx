'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types for roles and apps
export type Role = 'Sócio' | 'Advogado' | 'Controller' | 'Estagiário' | 'Cliente';
export type AppKey = 'crm' | 'erp' | 'controladoria';

export interface Tenant {
  id: string;
  name: string;
  description: string;
  color: string;
}

interface UserContextProps {
  role: Role;
  setRole: (role: Role) => void;
  enabledApps: AppKey[];
  toggleApp: (app: AppKey) => void;
  setEnabledApps: (apps: AppKey[]) => void;
  reset: () => void;
  isInitialized: boolean;
  hasChosenProfile: boolean;
  setHasChosenProfile: (val: boolean) => void;
  tenants: Tenant[];
  activeTenant: Tenant;
  setActiveTenantById: (id: string) => void;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
  loadingModuleName: string;
  setLoadingModuleName: (val: string) => void;
}

const defaultTenants: Tenant[] = [
  { id: '1', name: 'Silva & Advogados Associados', description: 'Matriz - São Paulo', color: 'bg-indigo-500' },
  { id: '2', name: 'CMX Consultoria Jurídica', description: 'Filial - Rio de Janeiro', color: 'bg-amber-500' },
  { id: '3', name: 'Oliveira & Partners IP', description: 'Internacional - NY', color: 'bg-emerald-500' },
];

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRoleState] = useState<Role>('Sócio');
  const [enabledApps, setEnabledAppsState] = useState<AppKey[]>(['crm', 'erp', 'controladoria']);
  const [hasChosenProfile, setHasChosenProfileState] = useState<boolean>(false);
  const [activeTenant, setActiveTenantState] = useState<Tenant>(defaultTenants[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingModuleName, setLoadingModuleName] = useState<string>("");
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    // Load from localStorage on mount
    try {
      const storedRole = localStorage.getItem('legaltech_role') as Role;
      const storedAppsStr = localStorage.getItem('legaltech_enabled_apps');
      const storedHasChosen = localStorage.getItem('legaltech_has_chosen');
      const storedTenantId = localStorage.getItem('legaltech_active_tenant_id');

      if (storedRole) {
        setRoleState(storedRole);
      }
      if (storedAppsStr) {
        setEnabledAppsState(JSON.parse(storedAppsStr));
      }
      if (storedHasChosen) {
        setHasChosenProfileState(storedHasChosen === 'true');
      }
      if (storedTenantId) {
        const found = defaultTenants.find(t => t.id === storedTenantId);
        if (found) {
          setActiveTenantState(found);
        }
      }
    } catch (e) {
      console.error('Failed to load user preferences', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    if (typeof window !== 'undefined') {
      localStorage.setItem('legaltech_role', newRole);
    }
  };

  const setEnabledApps = (apps: AppKey[]) => {
    setEnabledAppsState(apps);
    if (typeof window !== 'undefined') {
      localStorage.setItem('legaltech_enabled_apps', JSON.stringify(apps));
    }
  };

  const toggleApp = (app: AppKey) => {
    const nextApps = enabledApps.includes(app)
      ? enabledApps.filter(a => a !== app)
      : [...enabledApps, app];
    setEnabledApps(nextApps);
  };

  const setHasChosenProfile = (val: boolean) => {
    setHasChosenProfileState(val);
    if (typeof window !== 'undefined') {
      localStorage.setItem('legaltech_has_chosen', val ? 'true' : 'false');
    }
  };

  const setActiveTenantById = (id: string) => {
    const found = defaultTenants.find(t => t.id === id);
    if (found) {
      setActiveTenantState(found);
      if (typeof window !== 'undefined') {
        localStorage.setItem('legaltech_active_tenant_id', id);
      }
    }
  };

  const reset = () => {
    setRole('Sócio');
    setEnabledApps(['crm', 'erp', 'controladoria']);
    setHasChosenProfile(false);
    setActiveTenantState(defaultTenants[0]);
    setIsLoading(false);
    setLoadingModuleName("");
    if (typeof window !== 'undefined') {
      localStorage.removeItem('legaltech_active_tenant_id');
    }
  };

  return (
    <UserContext.Provider
      value={{
        role,
        setRole,
        enabledApps,
        toggleApp,
        setEnabledApps,
        reset,
        isInitialized,
        hasChosenProfile,
        setHasChosenProfile,
        tenants: defaultTenants,
        activeTenant,
        setActiveTenantById,
        isLoading,
        setIsLoading,
        loadingModuleName,
        setLoadingModuleName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return ctx;
};
