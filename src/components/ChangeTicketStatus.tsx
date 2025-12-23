import { useEffect, useState } from "react";
import { getStatuses } from "../services/statuses";
import type { Status } from "../types/status";
import { updateTicket } from "../services/tickets";
import { Button, Menu, MenuItem, Box } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { enqueueSnackbar } from "notistack";

function ChangeTicketStatus({ ticketId, onAdd }: { ticketId?: string, onAdd: () => void }) {
    const [statuses, setStatuses] = useState<Status[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        const fetchStatuses = async () => {
            setStatuses(await getStatuses());
        }
        fetchStatuses();
    }, []);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleStatusChange = async (statusId: number) => {
        handleClose();
        if (ticketId) {
            try{
            await updateTicket(ticketId, { status_id: statusId });
            enqueueSnackbar('סטטוס הכרטיס שונה בהצלחה!', { variant: 'success' });
            onAdd();
        }
        catch(error){
            enqueueSnackbar('שגיאה בשינוי סטטוס הכרטיס', { variant: 'error' });
        }}
    };

    return (
        <Box>
            <Button
                id="status-button"
                aria-controls={open ? 'status-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="outlined"
                color="secondary" // צבע חרדל
                size="small"
                onClick={handleClick}
                endIcon={<ExpandMoreIcon />}
                startIcon={<EditIcon />}
            >
                שנה סטטוס
            </Button>
            <Menu
                id="status-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'status-button',
                }}
            >
                {statuses.map((status) => (
                    <MenuItem key={status.id} onClick={() => handleStatusChange(status.id)}>
                        {status.name}
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
}
export default ChangeTicketStatus;