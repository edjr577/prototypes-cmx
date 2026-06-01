export type Plan = 'Starter' | 'Growth' | 'Growth+' | 'Advanced';
export type Role = 'Sócio' | 'Líder CRM' | 'Advogado' | 'Controller' | 'Estagiário' | 'Cliente';
export type AppKey = 'administrativo' | 'crm' | 'erp' | 'controladoria';

export type Permission = 
  | 'crm:view' | 'crm:edit' | 'crm:admin'
  | 'erp:view' | 'erp:edit' | 'erp:admin'
  | 'controladoria:view' | 'controladoria:edit' | 'controladoria:admin'
  | 'admin:view' | 'admin:office_edit' | 'admin:full_access';

export const PlanModules: Record<Plan, AppKey[]> = {
  'Starter': ['administrativo', 'crm'],
  'Growth': ['administrativo', 'crm', 'controladoria'],
  'Growth+': ['administrativo', 'crm', 'controladoria', 'erp'],
  'Advanced': ['administrativo', 'crm', 'controladoria', 'erp'],
};

export const RolePermissions: Record<Role, Permission[]> = {
  'Sócio': [
    'crm:view', 'crm:edit', 'crm:admin',
    'erp:view', 'erp:edit', 'erp:admin',
    'controladoria:view', 'controladoria:edit', 'controladoria:admin',
    'admin:view', 'admin:office_edit'
  ],
  'Líder CRM': [
    'crm:view', 'crm:edit', 'crm:admin',
    'admin:view', 'admin:office_edit'
  ],
  'Advogado': [
    'crm:view',
    'erp:view', 'erp:edit',
    'admin:office_edit'
  ],
  'Controller': [
    'controladoria:view', 'controladoria:edit', 'controladoria:admin',
    'admin:office_edit'
  ],
  'Estagiário': [
    'crm:view', 'erp:view'
  ],
  'Cliente': [
    'erp:view'
  ]
};

export function resolvePermissions(role: Role, plan: Plan): Permission[] {
  const basePermissions = RolePermissions[role] || [];
  
  // Create a mutable copy to append conditional permissions
  const resolved = [...basePermissions];

  // Sócio has full admin access if on Advanced Plan
  if (role === 'Sócio' && plan === 'Advanced') {
    resolved.push('admin:full_access');
  }

  return resolved;
}
