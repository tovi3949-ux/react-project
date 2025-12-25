export interface Ticket {
    id: number,
    subject: string,
    description: string,
    status_id: number,
    priority_id: number,
    created_at: string,
    updated_at: string,
    created_by: number,
    assigned_to: number,
    status_name: string,
    priority_name:string,
    created_by_name: string,
    created_by_email: string,
    assigned_to_name: string,
    assigned_to_email: string
}