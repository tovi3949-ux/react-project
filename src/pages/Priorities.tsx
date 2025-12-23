import { useEffect, useState } from "react";
import type { Priority } from "../types/priority"; 
import { TextField, Button, List, ListItem, ListItemText, Paper, Typography, Box, Divider, ListItemAvatar, Avatar, Collapse, Alert } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import Loader from "../components/Loader";
import { addPriority, getPriorities } from "../services/priorities";
import AddIcon from '@mui/icons-material/Add';
import FlagIcon from '@mui/icons-material/Flag';

type Inputs = {
    name: string;
};

function Priorities() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        await addPriority({ name: data.name });
        reset();
        window.location.reload();
    }

    const [loading, setLoading] = useState(true);
    const [priorities, setPriorities] = useState<Priority[]>([]);
    const [showAddPriority, setShowAddPriority] = useState(false);

    useEffect(() => {
        const fetchPriorities = async () => {
            setLoading(true);
            setPriorities(await getPriorities());
            setLoading(false);
        }
        fetchPriorities();
    }, []);

    if (loading) return <Loader />;

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" color="primary" fontWeight="bold">
                    רשימת עדיפויות
                </Typography>
                <Button 
                    variant={showAddPriority ? "outlined" : "contained"} 
                    color="secondary" 
                    startIcon={<AddIcon />}
                    onClick={() => setShowAddPriority(!showAddPriority)}
                >
                    {showAddPriority ? "ביטול" : "הוסף עדיפות"}
                </Button>
            </Box>

            <Collapse in={showAddPriority}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mb: 4, p: 2, bgcolor: 'grey.50', borderRadius: 2, border: '1px solid #eee' }}>
                    <Typography variant="subtitle2" gutterBottom>הוספת דרגת עדיפות חדשה:</Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            label="שם העדיפות"
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

            {priorities.length === 0 ? (
                <Alert severity="info" sx={{ mt: 2 }}>לא הוגדרו עדיפויות במערכת.</Alert>
            ) : (
                <List>
                    {priorities.map((priority) => (
                        <ListItem key={priority.id} divider>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: 'secondary.main', color: 'white' }}>
                                    <FlagIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText 
                                primary={priority.name} 
                                primaryTypographyProps={{ fontWeight: 500 }}
                            />
                        </ListItem>
                    ))}
                </List>
            )}
        </Paper>
    );
}
export default Priorities;