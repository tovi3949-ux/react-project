import type { ROLES } from "../utils/roles";

export interface User {
    id: number;
    email: string;
    name: string;
    role: ROLES;
    created_at: string;
    is_active:boolean
}