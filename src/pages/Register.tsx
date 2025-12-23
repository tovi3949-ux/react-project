import { useForm, type SubmitHandler } from "react-hook-form"
import { Box, Button, Container, TextField, Paper, Typography, Link as MuiLink } from '@mui/material';
import { Register as registerService } from "../services/auth";
import { Login as loginService } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authStore";
import { useSnackbar } from "notistack";

type Inputs = {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
};

function Register() {
    const navigate = useNavigate();
    const {enqueueSnackbar}=useSnackbar()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            await registerService({ name: data.username, email: data.email, password: data.password });
            let res = await loginService({ email: data.email, password: data.password });
            useAuth.getState().login(res.user, res.token);
            navigate("/dashboard", { replace: true });
        }
         catch (error: any) {
            if(error.response?.status===409){
                enqueueSnackbar('שם המשתמש או האימייל כבר בשימוש. אנא נסה שוב.',{ variant: 'error' });
            }
        }
    }

    return (
        <>
            <Container maxWidth="xs">
                <Paper
                    elevation={3}
                    sx={{
                        marginTop: 8,
                        padding: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderTop: '6px solid',
                        borderColor: 'primary.main'
                    }}>
                    <Typography component="h1" variant="h5" sx={{ mb: 3, color: 'primary.main', fontWeight: 'bold' }}>
                        הרשמה למערכת
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1, width: '100%' }}>
                        <TextField
                            margin="normal" 
                            label="שם משתמש:"
                            {...register("username", {
                                required: "שדה חובה",
                                pattern: { value: /^[A-Za-z0-9_]{3,15}$/, message: "שם המשתמש חייב להכיל בין 3 ל-15 תווים ויכול לכלול אותיות, מספרים וקו תחתון" }
                            })}
                            error={!!errors.username}
                            helperText={errors.username?.message}
                            fullWidth
                        />
                        <TextField
                            margin="normal"
                            label="אימייל:"
                            {...register("email", {
                                required: "שדה חובה",
                                pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "כתובת אימייל לא תקינה" }
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            fullWidth
                        />
                        <TextField
                            margin="normal" 
                            label="סיסמה:"
                            {...register("password", {
                                required: "שדה חובה",
                                minLength: { value: 6, message: "הסיסמה חייבת להכיל לפחות 6 תווים" }
                            })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            type="password"
                            fullWidth
                        />
                        <TextField
                            margin="normal" 
                            label="אימות סיסמה:"
                            {...register("confirmPassword", {
                                required: "שדה חובה",
                                validate: (value) => value === watch('password') || "הסיסמאות אינן תואמות"
                            })}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword?.message}
                            type="password"
                            fullWidth
                        />
                        
                        <Typography variant="body2" sx={{ mt: 2, mb: 2, color: 'text.secondary', textAlign: 'center' }}>
                            בהרשמתך הינך מסכים ל{' '}
                            <MuiLink component={Link} to="/terms-of-use" color="primary">
                                תנאי שימוש
                            </MuiLink>
                            {' ו-'}
                            <MuiLink component={Link} to="/privacy-policy" color="primary">
                                מדיניות פרטיות
                            </MuiLink>
                        </Typography>

                        <Button
                            type="submit"
                            className="submit-btn"
                            variant="contained"
                            fullWidth
                            size="large" 
                            sx={{ mt: 1, mb: 2 }} 
                        >
                            הרשמה
                        </Button>
                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                            <Typography variant="body2">
                                כבר רשום?{' '}
                                <MuiLink component={Link} to="/login" color="secondary" fontWeight="bold">
                                    היכנס כאן
                                </MuiLink>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </>
    )
}
export default Register