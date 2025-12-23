import { 
    TextField, Button, Container, Paper, Typography, Box, 
    FormControl, InputLabel, Select, MenuItem, FormHelperText 
} from "@mui/material";
import { useForm, Controller } from "react-hook-form"; 
import { addUser } from "../services/users";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../utils/roles";

type Inputs = {
    username: string;
    email: string;
    password: string;
    role: ROLES;
};

function AddUser() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: { role: ROLES.CUSTOMER }
    });

    const onSubmit = async (data: Inputs) => {
        try {
            await addUser({ name: data.username, email: data.email, password: data.password, role: data.role });
            navigate('/users');
        } catch (err) {
            alert('שגיאה בהוספת המשתמש'); 
        }
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h5" color="primary" align="center" fontWeight="bold" gutterBottom>
                    הוספת משתמש חדש
                </Typography>
                
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                    <TextField
                        label="שם משתמש"
                        fullWidth
                        {...register("username", { required: "שדה חובה" })}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />
                    <TextField
                        label="אימייל"
                        fullWidth
                        {...register("email", {
                            required: "שדה חובה",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "כתובת אימייל לא חוקית",
                            },
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        label="סיסמה"
                        type="password"
                        fullWidth
                        {...register("password", {
                            required: "שדה חובה",
                            minLength: { value: 6, message: "לפחות 6 תווים" }
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    
                    <FormControl fullWidth error={!!errors.role}>
                        <InputLabel>תפקיד</InputLabel>
                        <Controller
                            name="role"
                            control={control}
                            rules={{ required: "שדה חובה" }}
                            render={({ field }) => (
                                <Select {...field} label="תפקיד">
                                    <MenuItem value={ROLES.CUSTOMER}>משתמש</MenuItem>
                                    <MenuItem value={ROLES.AGENT}>סוכן</MenuItem>
                                    <MenuItem value={ROLES.ADMIN}>מנהל</MenuItem>
                                </Select>
                            )}
                        />
                        <FormHelperText>{errors.role?.message}</FormHelperText>
                    </FormControl>

                    <Button type="submit" variant="contained" size="large" sx={{ mt: 2 }}>
                        הוסף משתמש
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}
export default AddUser;