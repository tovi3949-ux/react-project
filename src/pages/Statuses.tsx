import { useEffect, useState } from "react";
import type { Status } from "../types/status";
import { addStatus, getStatuses } from "../services/statuses";
import {
    TextField, Button, List, ListItem, ListItemText,
    Paper, Typography, Box, Divider, ListItemAvatar, Avatar,
    Collapse, Alert
} from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import Loader from "../components/Loader";
import AddIcon from '@mui/icons-material/Add';
import LabelIcon from '@mui/icons-material/Label';

type Inputs = {
    name: string;
};

function Statuses() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Inputs>()

    const [loading, setLoading] = useState(true);
    const [statuses, setStatuses] = useState<Status[]>([]);
    const [showAddStatus, setShowAddStatus] = useState(false);

    useEffect(() => {
        const fetchStatuses = async () => {
            setLoading(true);
            setStatuses(await getStatuses());
            setLoading(false);
        }
        fetchStatuses();
    }, []);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        await addStatus({ name: data.name });
        reset();
        window.location.reload();
    }

    if (loading) return <Loader />;

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" color="primary" fontWeight="bold">
                    רשימת סטטוסים
                </Typography>
                <Button
                    variant={showAddStatus ? "outlined" : "contained"}
                    color="secondary"
                    startIcon={<AddIcon />}
                    onClick={() => setShowAddStatus(!showAddStatus)}
                >
                    {showAddStatus ? "ביטול" : "הוסף סטטוס"}
                </Button>
            </Box>

            <Collapse in={showAddStatus}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mb: 4, p: 2, bgcolor: 'grey.50', borderRadius: 2, border: '1px solid #eee' }}>
                    <Typography variant="subtitle2" gutterBottom>הוספת סטטוס חדש:</Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            label="שם הסטטוס"
                            size="small"
                            fullWidth
                            {...register("name", { required: "שדה חובה" })}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                        <Button type="submit" variant="contained" color="primary">
                            שמור
                        </Button>
                    </Box>
                </Box>
            </Collapse>

            <Divider />

            {statuses.length === 0 ? (
                <Alert severity="info" sx={{ mt: 2 }}>לא הוגדרו סטטוסים במערכת.</Alert>
            ) : (
                <List>
                    {statuses.map((status) => (
                        <ListItem key={status.id} divider>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: 'primary.light' }}>
                                    <LabelIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={status.name}
                                primaryTypographyProps={{ fontWeight: 500 }}
                            />
                        </ListItem>
                    ))}
                </List>
            )}
        </Paper>
    );
}
export default Statuses;