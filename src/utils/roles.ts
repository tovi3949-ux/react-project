export const ROLES = {
    ADMIN: 'admin',
    AGENT: 'agent',
    CUSTOMER: 'customer',
    UNLOGGED: 'unlogged'
} as const;

export type ROLES = typeof ROLES[keyof typeof ROLES];