import { useForm, type SubmitHandler } from "react-hook-form"
import { Box, Button, Container, Paper, TextField, Typography ,Link as MuiLink} from '@mui/material';
import { Login as loginService } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authStore";
import { useSnackbar } from "notistack";
type Inputs = {
    email: string,
    password: string,
};
function Login() {
    const navigate = useNavigate();
    const {enqueueSnackbar}=useSnackbar()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            let res = await loginService(data);
            useAuth.getState().login(res.user, res.token);
            enqueueSnackbar('התחברת בהצלחה!',{ variant: 'success' });
            navigate("/dashboard", { replace: true });
        } catch (error: any) {
            enqueueSnackbar('אימייל או סיסמה שגויים. אנא נסה שוב.',{ variant: 'error' });
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
                }}
            >
                <Typography component="h1" variant="h5" sx={{ mb: 3, color: 'primary.main', fontWeight: 'bold' }}>
                    כניסה למערכת
                </Typography>

                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1, width: '100%' }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="אימייל"
                        autoComplete="email"
                        autoFocus
                        {...register("email", { required: "שדה חובה" , pattern: { value: /^\S+@\S+$/i, message: "פורמט אימייל לא תקין" } })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="סיסמה"
                        type="password"
                        {...register("password", { required: "שדה חובה", minLength: { value: 6, message: "הסיסמה חייבת להכיל לפחות 6 תווים" } })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                     />


                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        התחברות
                    </Button>

                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Typography variant="body2">
                            אין לך חשבון?{' '}
                            <MuiLink component={Link} to="/register" color="secondary" fontWeight="bold">
                                הרשם כאן
                            </MuiLink>
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Container>
        </>
    )
}
export default Login