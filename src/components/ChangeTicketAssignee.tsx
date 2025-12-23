import { useEffect, useState } from "react";
import { updateTicket } from "../services/tickets";
import type { User } from "../types/user";
import { getAllUsers } from "../services/users";
import { Button, Menu, MenuItem, Box, Avatar, Typography } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ROLES } from "../utils/roles";
import { useSnackbar } from "notistack";

function ChangeTicketAssignee({ ticketId,onAdd }: { ticketId?: string, onAdd: () => void }) {
    const [agents, setAgents] = useState<User[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const {enqueueSnackbar}=useSnackbar();
    useEffect(() => {
        const fetchAgents = async () => {
            const allUsers = await getAllUsers();
            setAgents(allUsers.filter((user) => user.role === ROLES.AGENT));
        }
        fetchAgents();
    }, []);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAssigneeChange = async (agentId: number) => {
        handleClose();
        if (ticketId) {
            try{
            await updateTicket(ticketId, { assigned_to: agentId });
            enqueueSnackbar('הממונה על הכרטיס שונה בהצלחה!', { variant: 'success' });
            onAdd();
            }
            catch(error){
                enqueueSnackbar('שגיאה בשינוי הממונה על הכרטיס', { variant: 'error' });
            }
        }
    };

    return (
        <Box>
            <Button
                variant="text"
                color="primary"
                size="small"
                onClick={handleClick}
                endIcon={<ExpandMoreIcon />}
                startIcon={<PersonAddIcon />}
            >
                שנה ממונה
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: 48 * 4.5, 
                        width: '20ch',
                    },
                }}
            >
                {agents.length === 0 ? (
                    <MenuItem disabled>אין סוכנים זמינים</MenuItem>
                ) : (
                    agents.map((agent) => (
                        <MenuItem key={agent.id} onClick={() => handleAssigneeChange(agent.id)}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Avatar sx={{ width: 24, height: 24, fontSize: '0.8rem' }}>
                                    {agent.name.charAt(0)}
                                </Avatar>
                                <Typography variant="body2">{agent.name}</Typography>
                            </Box>
                        </MenuItem>
                    ))
                )}
            </Menu>
        </Box>
    );
}
export default ChangeTicketAssignee;