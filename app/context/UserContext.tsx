'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { Plan, Role, AppKey, Permission, PlanModules, resolvePermissions } from '@/lib/permissions';

export interface Tenant {
  id: string;
  name: string;
  description: string;
  color: string;
}

interface UserContextProps {
  role: Role;
  setRole: (role: Role) => void;
  plan: Plan;
  setPlan: (plan: Plan) => void;
  enabledApps: AppKey[];
  hasPermission: (permission: Permission) => boolean;
  
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
  const [plan, setPlanState] = useState<Plan>('Advanced');
  const [hasChosenProfile, setHasChosenProfileState] = useState<boolean>(false);
  const [activeTenant, setActiveTenantState] = useState<Tenant>(defaultTenants[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingModuleName, setLoadingModuleName] = useState<string>("");
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    try {
      const storedRole = localStorage.getItem('legaltech_role') as Role;
      const storedPlan = localStorage.getItem('legaltech_plan') as Plan;
      const storedHasChosen = localStorage.getItem('legaltech_has_chosen');
      const storedTenantId = localStorage.getItem('legaltech_active_tenant_id');

      if (storedRole) setRoleState(storedRole);
      if (storedPlan) setPlanState(storedPlan);
      
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

  const setRole = useCallback((newRole: Role) => {
    setRoleState(newRole);
    if (typeof window !== 'undefined') {
      localStorage.setItem('legaltech_role', newRole);
    }
  }, []);

  const setPlan = useCallback((newPlan: Plan) => {
    setPlanState(newPlan);
    if (typeof window !== 'undefined') {
      localStorage.setItem('legaltech_plan', newPlan);
    }
  }, []);

  const setHasChosenProfile = useCallback((val: boolean) => {
    setHasChosenProfileState(val);
    if (typeof window !== 'undefined') {
      localStorage.setItem('legaltech_has_chosen', val ? 'true' : 'false');
    }
  }, []);

  const setActiveTenantById = useCallback((id: string) => {
    const found = defaultTenants.find(t => t.id === id);
    if (found) {
      setActiveTenantState(found);
      if (typeof window !== 'undefined') {
        localStorage.setItem('legaltech_active_tenant_id', id);
      }
    }
  }, []);

  const reset = useCallback(() => {
    setRole('Sócio');
    setPlan('Advanced');
    setHasChosenProfile(false);
    setActiveTenantState(defaultTenants[0]);
    setIsLoading(false);
    setLoadingModuleName("");
    if (typeof window !== 'undefined') {
      localStorage.removeItem('legaltech_active_tenant_id');
      localStorage.removeItem('legaltech_role');
      localStorage.removeItem('legaltech_plan');
      localStorage.removeItem('legaltech_has_chosen');
    }
  }, [setRole, setPlan, setHasChosenProfile]);

  const enabledApps = useMemo(() => PlanModules[plan], [plan]);
  
  const permissions = useMemo(() => resolvePermissions(role, plan), [role, plan]);

  const hasPermission = useCallback((permission: Permission) => {
    return permissions.includes(permission);
  }, [permissions]);

  return (
    <UserContext.Provider
      value={{
        role,
        setRole,
        plan,
        setPlan,
        enabledApps,
        hasPermission,
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
