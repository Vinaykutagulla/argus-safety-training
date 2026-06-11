/**
 * Role-Based Access Control (RBAC) for Argus Safety Database
 * Defines permissions for each role
 */

export type UserRole = 'admin' | 'supervisor' | 'safety_officer' | 'analyst';

export interface RolePermissions {
  canCreateCase: boolean;
  canEditCase: boolean;
  canDeleteCase: boolean;
  canLockCase: boolean;
  canUnlockCase: boolean;
  canSubmitReport: boolean;
  canReviewCases: boolean;
  canManageUsers: boolean;
  canViewAllCases: boolean;
  canExportData: boolean;
}

export const rolePermissions: Record<UserRole, RolePermissions> = {
  admin: {
    canCreateCase: true,
    canEditCase: true,
    canDeleteCase: true,
    canLockCase: true,
    canUnlockCase: true,
    canSubmitReport: true,
    canReviewCases: true,
    canManageUsers: true,
    canViewAllCases: true,
    canExportData: true,
  },
  supervisor: {
    canCreateCase: true,
    canEditCase: true,
    canDeleteCase: false,
    canLockCase: true,
    canUnlockCase: true,
    canSubmitReport: true,
    canReviewCases: true,
    canManageUsers: false,
    canViewAllCases: true,
    canExportData: true,
  },
  safety_officer: {
    canCreateCase: true,
    canEditCase: true,
    canDeleteCase: false,
    canLockCase: true,
    canUnlockCase: false,
    canSubmitReport: true,
    canReviewCases: true,
    canManageUsers: false,
    canViewAllCases: true,
    canExportData: true,
  },
  analyst: {
    canCreateCase: true,
    canEditCase: true,
    canDeleteCase: false,
    canLockCase: false,
    canUnlockCase: false,
    canSubmitReport: false,
    canReviewCases: false,
    canManageUsers: false,
    canViewAllCases: false,
    canExportData: false,
  },
};

export function hasPermission(role: UserRole, permission: keyof RolePermissions): boolean {
  return rolePermissions[role]?.[permission] ?? false;
}

export function requireRole(role: UserRole, requiredRoles: UserRole[]): boolean {
  return requiredRoles.includes(role);
}

export function requirePermission(role: UserRole, permission: keyof RolePermissions): boolean {
  return hasPermission(role, permission);
}
