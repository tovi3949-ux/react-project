import type { FullTicket } from "../types/fullTicket";
import type { Ticket } from "../types/ticket";
import { apiwithToken } from "./http";
import { BASE_URL } from "./URL";

const URL = BASE_URL + '/tickets';

const getTickets = async (): Promise<Ticket[]> => {
    const response = await apiwithToken.get(URL);
    return response.data;
}

const addTicket = async (data: { subject: string; description: string; priority_id: number }): Promise<Ticket> => {
    const response = await apiwithToken.post(URL, data);
    return response.data;
}

const getTicketById = async (id: string): Promise<FullTicket> => {
    const response = await apiwithToken.get(`${URL}/${id}`);
    return response.data;
}

const updateTicket = async (id: string, data: { status_id?: number; priority_id?: number; assigned_to?: number }): Promise<void> => {
    await apiwithToken.patch(`${URL}/${id}`, data);
}
const deleteTicket = async (id: string): Promise<void> => {
    await apiwithToken.delete(`${URL}/${id}`);
}
export { getTickets, addTicket, getTicketById, updateTicket, deleteTicket };