import { useLocation, useNavigate, useParams } from "react-router-dom";
import { deleteTicket, getTicketById } from "../services/tickets";
import { useEffect, useState, useRef } from "react";
import Loader from "../components/Loader";
import type { FullTicket } from "../types/fullTicket";
import ChangeTicketStatus from "../components/ChangeTicketStatus";
import ChangeTicketAssignee from "../components/ChangeTicketAssignee";
import AddComment from "../components/AddComment";
import { useAuth } from "../context/authStore";
import {
    Container, Paper, Typography, Box, IconButton, Divider,
    Chip, Avatar, Grid, Tooltip, Dialog, DialogTitle,
    DialogContent, DialogContentText, DialogActions, Button
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ChangeTicketPriority from "../components/ChangeTicketPriority";
import { ROLES } from "../utils/roles";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/he';
import { useSnackbar } from "notistack";
import { getUserById } from "../services/users";

function Ticket() {
    dayjs.extend(relativeTime);
    dayjs.extend(utc);
    dayjs.locale('he');
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [ticket, setTicket] = useState<FullTicket | null>(null);
    const [loading, setLoading] = useState(true);
    const [refreshFlag, setRefreshFlag] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [commentAuthorsRoles, setCommentAuthorsRoles] = useState<{ [key: number]: string }>({});
    const user = useAuth.getState().user;
    const bottomRef = useRef<HTMLDivElement>(null);

    const showAddComment = user && (user.role === ROLES.CUSTOMER || (user.role === ROLES.AGENT && ticket?.assigned_to === user.id));
    const showDelete = user && user.role === ROLES.ADMIN;
    const ableToChangePriorityAndAssignee = user && user.role === ROLES.ADMIN;
    const ableToChangeStatus = user && (user.role === ROLES.ADMIN || (user.role === ROLES.AGENT && ticket?.assigned_to === user.id));
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        const fetchTicket = async () => {
            setLoading(true);
            if (!params.id) throw new Error("Ticket ID is required");
            try {
                const ticketData = await getTicketById(params.id);
                setTicket(ticketData);

                if (user?.role === ROLES.ADMIN) {
                    const authorsRolesMap: { [key: number]: string } = {};
                    for (const comment of ticketData.comments) {
                        try {
                            const author = await getUserById(comment.author_id.toString());
                            authorsRolesMap[comment.author_id] = author.role;
                        } catch (error) {
                            authorsRolesMap[comment.author_id] = ROLES.CUSTOMER;
                        }
                    }
                    setCommentAuthorsRoles(authorsRolesMap);
                }
            } catch (error) {
                enqueueSnackbar("שגיאה בטעינת הפנייה", { variant: "error" });
                navigate("/tickets");
            }
            setLoading(false);
        };
        fetchTicket();
    }, [params.id, location.pathname, refreshFlag]);


    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [ticket?.comments]);

    const handleRefresh = () => setRefreshFlag(!refreshFlag);

    const handleOpenDeleteDialog = () => {
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteTicket(ticket?.id.toString() || "");
            enqueueSnackbar("הפנייה נמחקה בהצלחה", { variant: "success" });
            navigate("/tickets");
        } catch (error) {
            enqueueSnackbar("שגיאה במחיקת הפנייה", { variant: "error" });
        }
        finally {
            setOpenDeleteDialog(false);
        }

    };

    if (loading) return <Loader />;
    if (!ticket) return <Container><Typography>הפנייה לא נמצאה</Typography></Container>;

    return (
        <Container maxWidth="md" sx={{ mt: 2, mb: 2, height: '85vh', display: 'flex', flexDirection: 'column' }}>

            <Paper elevation={1} sx={{ p: 2, mb: 2, bgcolor: 'white', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton onClick={() => navigate('/tickets')} size="small">
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="h5" fontWeight="bold" color="primary">
                            {ticket.subject}
                        </Typography>
                    </Box>
                    {showDelete && (
                        <Tooltip title="מחק פנייה">
                            <IconButton color="error" onClick={handleOpenDeleteDialog}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>

                <Divider sx={{ my: 1.5 }} />

                <Grid container spacing={2} alignItems="center">
                    <Grid >
                        <Chip label={ticket.status_name} color={ticket.status_name === 'סגור' ? 'default' : 'secondary'} size="small" />
                    </Grid>
                    <Grid >
                        <Chip label={`עדיפות: ${ticket.priority_name}`} variant="outlined" size="small" />
                    </Grid>
                    <Grid></Grid>

                    <Grid sx={{ display: 'flex', gap: 1 }}>
                        {ableToChangeStatus && <ChangeTicketStatus ticketId={ticket.id.toString()} onAdd={handleRefresh} />}
                        {ableToChangePriorityAndAssignee && <ChangeTicketPriority ticketId={ticket.id.toString()} onAdd={handleRefresh} />}
                        {ableToChangePriorityAndAssignee && <ChangeTicketAssignee ticketId={ticket.id.toString()} onAdd={handleRefresh} />}
                    </Grid>
                </Grid>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    נוצר ב: {dayjs(ticket.created_at).format('DD/MM/YYYY HH:mm')}
                </Typography>
                <Paper variant="outlined" sx={{ mt: 2, p: 2, bgcolor: '#f0f4c3' }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        תיאור המקרה:
                    </Typography>
                    <Typography variant="body1">
                        {ticket.description}
                    </Typography>
                </Paper>
            </Paper>

            <Box sx={{
                flexGrow: 1,
                overflowY: 'auto',
                p: 2,
                bgcolor: '#e5ddd5',
                borderRadius: 2,
                backgroundImage: 'linear-gradient(#e5ddd5 2px, transparent 2px), linear-gradient(90deg, #e5ddd5 2px, transparent 2px)',
                backgroundSize: '20px 20px',
                mb: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}>
                {ticket.comments.length === 0 && (
                    <Typography align="center" color="text.secondary" sx={{ mt: 4 }}>
                        אין הודעות עדיין. התחילו את השיחה!
                    </Typography>
                )}

                {ticket.comments.map((comment) => {
                    if (user?.role !== ROLES.ADMIN) {
                        const isMe = user && comment.author_name === user.name;
                        return (
                            <Box
                                key={comment.id}
                                sx={{
                                    display: 'flex',
                                    justifyContent: isMe ? 'flex-start' : 'flex-end',
                                    alignItems: 'flex-end',
                                    gap: 1
                                }}
                            >
                                {isMe && (
                                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                                        <PersonIcon fontSize="small" />
                                    </Avatar>
                                )}

                                <Paper sx={{
                                    p: 1.5,
                                    maxWidth: '70%',
                                    bgcolor: isMe ? '#dcf8c6' : 'white',
                                    borderRadius: 2,
                                    position: 'relative',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: 0,
                                        [isMe ? 'right' : 'left']: -8,
                                        width: 0,
                                        height: 0,
                                        borderStyle: 'solid',
                                        borderWidth: isMe ? '0 0 10px 10px' : '0 10px 10px 0',
                                        borderColor: isMe ? `transparent transparent #dcf8c6 transparent` : `transparent transparent white transparent`,
                                    }
                                }}>
                                    {!isMe && (
                                        <Typography variant="caption" color="secondary" fontWeight="bold">
                                            {comment.author_name}
                                        </Typography>
                                    )}
                                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                                        {comment.content}
                                    </Typography>
                                    <Typography variant="caption">{dayjs.utc(comment.created_at).local().fromNow()}</Typography>
                                </Paper>

                                {!isMe && (
                                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                                        <SupportAgentIcon fontSize="small" />
                                    </Avatar>
                                )}
                            </Box>
                        );
                    }
                    else {
                        const isCustomerAuthor = commentAuthorsRoles[comment.author_id] === ROLES.CUSTOMER;
                        return (
                            <Box
                                key={comment.id}
                                sx={{
                                    display: 'flex',
                                    justifyContent: isCustomerAuthor ? 'flex-start' : 'flex-end',
                                    alignItems: 'flex-end',
                                    gap: 1
                                }}
                            >
                                {isCustomerAuthor && (
                                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                                        <PersonIcon fontSize="small" />
                                    </Avatar>
                                )}

                                <Paper sx={{
                                    p: 1.5,
                                    maxWidth: '70%',
                                    bgcolor: isCustomerAuthor ? '#dcf8c6' : 'white',
                                    borderRadius: 2,
                                    position: 'relative',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: 0,
                                        [isCustomerAuthor ? 'right' : 'left']: -8,
                                        width: 0,
                                        height: 0,
                                        borderStyle: 'solid',
                                        borderWidth: isCustomerAuthor ? '0 0 10px 10px' : '0 10px 10px 0',
                                        borderColor: isCustomerAuthor ? `transparent transparent #dcf8c6 transparent` : `transparent transparent white transparent`,
                                    }
                                }}>

                                    <Typography variant="caption" color="secondary" fontWeight="bold">
                                        {comment.author_name}
                                    </Typography>
                                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                                        {comment.content}
                                    </Typography>
                                    <Typography variant="caption">{dayjs.utc(comment.created_at).local().fromNow()}</Typography>
                                </Paper>

                                {!isCustomerAuthor && (
                                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                                        <SupportAgentIcon fontSize="small" />
                                    </Avatar>
                                )}
                            </Box>
                        );
                    }

                })}
                <div ref={bottomRef} />
            </Box>

            {showAddComment && (
                <Paper elevation={3} sx={{ p: 1, borderRadius: 2 }}>
                    <AddComment id={ticket.id.toString()} onAdd={handleRefresh} />
                </Paper>
            )}

            <Dialog
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"מחיקת פנייה"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        האם אתה בטוח שברצונך למחוק את הפנייה הזו? פעולה זו אינה הפיכה והמידע יאבד לצמיתות.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        ביטול
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error" variant="contained" autoFocus>
                        מחק
                    </Button>
                </DialogActions>
            </Dialog>

        </Container>
    );
}
export default Ticket;