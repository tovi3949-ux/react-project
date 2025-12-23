import type { Ticket } from "./ticket";
import type { Comment } from "./comment";
export interface FullTicket extends Ticket {
    comments: Comment[];
}