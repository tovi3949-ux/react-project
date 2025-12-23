import { apiwithToken } from "./http";
import { BASE_URL } from "./URL";
import type { Comment } from "../types/comment";
const URL = BASE_URL+'/tickets';

const getCommentForTicket = async (ticketId: number) : Promise<Comment[]> => {
    const response = await apiwithToken.get(`${URL}/${ticketId}/comments`);
    return response.data;
}

const addCommentToTicket = async (ticketId: number, data: { content: string }) : Promise<Comment> => {
    const response = await apiwithToken.post(`${URL}/${ticketId}/comments`, data);
    return response.data;
}   

export { getCommentForTicket, addCommentToTicket };