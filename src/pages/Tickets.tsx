import { useNavigate } from "react-router-dom";
import type { Ticket } from "../types/ticket";
import { getTickets as getTicketService } from "../services/tickets";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import {
    Container, Grid, Card, CardContent, CardActionArea,
    Typography, Alert, Box, Chip,
    Tooltip
} from "@mui/material";
import { useAuth } from "../context/authStore";
import { getCommentForTicket } from "../services/comment";
import { ROLES } from "../utils/roles";
import type { Comment } from "../types/comment";
import dayjs from "dayjs";

function Tickets() {
    const [loading, setLoading] = useState(true);
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [waitingTickets, setWaitingTickets] = useState<Set<number>>(new Set());
    const navigate = useNavigate();
    const user = useAuth.getState().user;
    let title = '';
    if (user?.role === ROLES.AGENT) {
        title = 'ממתינה לתגובתך';
    } else {
        if (user?.role === ROLES.ADMIN) {
            title = 'ממתינות להקצאת נציגים';
        }
    }

    useEffect(() => {
        const fetchTickets = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getTicketService();
                if (user?.role === ROLES.AGENT) {
                    data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
                    const promises = data.map(async (ticket) => {
                        const comments: Comment[] = await getCommentForTicket(ticket.id);
                        const isWaiting = comments.length == 0 || comments[comments.length - 1].author_id !== user.id;
                        if (isWaiting) {
                            return ticket.id;
                        }
                        else { return null; }
                    });
                    const results = await Promise.all(promises);
                    const waiting = new Set(results.filter((id) => id !== null));
                    setWaitingTickets(waiting);
                }
                setTickets(data);
            } catch (error) {
                setError("שגיאה בטעינת הכרטיסים. אנא נסה שוב מאוחר יותר.");
            }
            setLoading(false);
        };
        fetchTickets();
    }, []);

    if (loading) return <Loader />;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
                ניהול פניות
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {tickets.length === 0 && !loading && !error ? (
                <Alert severity="info">לא נמצאו פניות במערכת.</Alert>
            ) : (
                <Grid container spacing={3}>
                    {tickets.map((ticket) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={ticket.id} style={{opacity: ticket.status_name === 'closed' ? 0.5 : 1}}>                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: '0.3s', '&:hover': { transform: 'translateY(-4px)' }, position: 'relative' }}>
                            {((user?.role == ROLES.ADMIN && ticket.assigned_to == undefined) || (user?.role == ROLES.AGENT && waitingTickets.has(ticket.id))) && <Tooltip title={title} placement="top">
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: 0,
                                        height: 0,
                                        borderTop: '30px solid',
                                        borderTopColor: 'secondary.main',
                                        borderRight: '30px solid transparent',
                                        cursor: 'help',
                                        zIndex: 10,
                                        transition: '0.2s',
                                        '&:hover': {
                                            borderTopColor: 'secondary.dark',
                                            transform: 'scale(1.1)',
                                            transformOrigin: 'top left'
                                        }
                                    }}
                                />
                            </Tooltip>}
                            <CardActionArea onClick={() => navigate(`${ticket.id}`)} sx={{ flexGrow: 1, p: 1 }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Chip label={`#${ticket.id}`} size="small" variant="outlined" />
                                    </Box>
                                    <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
                                        {ticket.subject}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical',
                                    }}>
                                        {ticket.description}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                                        נוצר ב: {dayjs(ticket.created_at).format('DD/MM/YYYY HH:mm')}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}
export default Tickets;