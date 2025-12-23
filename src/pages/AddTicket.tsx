import { Button, TextField, Paper, Container, Typography, Box, MenuItem } from "@mui/material";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { addTicket } from "../services/tickets";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import type { Priority } from "../types/priority";
import { getPriorities } from "../services/priorities";

type Inputs = {
    subject: string
    description: string
    priority_id: number
}

function AddTicket() {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Inputs>()
    const [loading, setLoading] = useState(false);
    const [priorities, setPriorities] = useState<Priority[]>([]);
    useEffect(() => {
        const fetchPriorities = async () => {
            setLoading(true);
            setPriorities(await getPriorities());
            setLoading(false);
        }
        fetchPriorities();
    }, []);
const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    try {
        await addTicket({ ...data }); 
        enqueueSnackbar('הפנייה נפתחה בהצלחה!', { variant: 'success' });
        navigate("/dashboard", { replace: true });
    } catch (e) {
        enqueueSnackbar('שגיאה בשליחת הטופס', { variant: 'error' });
    } finally {
        setLoading(false);
    }
}

    if (loading) return <Loader />;

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Paper elevation={3} sx={{ p: 4, borderTop: '5px solid', borderColor: 'primary.main' }}>
                <Typography variant="h5" component="h1" gutterBottom align="center" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                    פתיחת פנייה חדשה
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4 }}>
                    מלא את הפרטים למטה ונציג יחזור אליך בהקדם
                </Typography>

                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <TextField
                        label="נושא הפנייה"
                        fullWidth
                        margin="normal"
                        {...register("subject", {
                            required: "שדה חובה",
                            minLength: { value: 5, message: "הנושא חייב להכיל לפחות 5 תווים" }
                        })}
                        error={!!errors.subject}
                        helperText={errors.subject?.message}
                    />
                    <TextField
                        label="תיאור הפנייה"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={6}
                        {...register("description", {
                            required: "שדה חובה",
                            minLength: { value: 10, message: "התיאור חייב להכיל לפחות 10 תווים" }
                        })}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                    />
                    <Controller
                        name="priority_id"
                        control={control}
                        defaultValue={priorities[0]?.id}
                        rules={{ required: "נא לבחור עדיפות" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                select
                                label="עדיפות"
                                fullWidth
                                margin="normal"
                                error={!!errors.priority_id}
                                helperText={errors.priority_id?.message}
                            >
                                {priorities.map((priority) => (
                                    <MenuItem key={priority.id} value={priority.id}>
                                        {priority.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{ mt: 3 }}
                    >
                        שלח פנייה
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}
export default AddTicket;