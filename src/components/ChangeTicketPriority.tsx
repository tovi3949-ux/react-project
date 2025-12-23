import { useEffect, useState } from "react";
import type { Priority } from "../types/priority";
import { updateTicket } from "../services/tickets";
import { getPriorities } from "../services/priorities";
import { Button, Menu, MenuItem, Box } from "@mui/material";
import FlagIcon from '@mui/icons-material/Flag';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSnackbar } from "notistack";

function ChangeTicketPriority({ ticketId, onAdd }: { ticketId?: string, onAdd: () => void }) {
    const [priorities, setPriorities] = useState<Priority[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const {enqueueSnackbar}=useSnackbar();
    useEffect(() => {
        const fetchPriorities = async () => {
            setPriorities(await getPriorities());
        }
        fetchPriorities();
    }, []);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handlePriorityChange = async (priorityId: number) => {
        handleClose();
        if (ticketId) {
            try{
            await updateTicket(ticketId, { priority_id: priorityId });
            enqueueSnackbar('עדיפות הכרטיס שונתה בהצלחה!', { variant: 'success' });
            onAdd();
        }
        catch(error){
            enqueueSnackbar('שגיאה בשינוי עדיפות הכרטיס', { variant: 'error' });
        }
    }};

    return (
        <Box>
            <Button
                variant="outlined"
                color="primary" 
                size="small"
                onClick={handleClick}
                endIcon={<ExpandMoreIcon />}
                startIcon={<FlagIcon />}
            >
                שנה עדיפות
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {priorities.map((priority) => (
                    <MenuItem key={priority.id} onClick={() => handlePriorityChange(priority.id)}>
                        {priority.name}
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
}
export default ChangeTicketPriority;