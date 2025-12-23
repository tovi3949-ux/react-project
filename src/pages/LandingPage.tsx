import { Box, Button, Container, Grid, Typography, Paper, Stack, useTheme, alpha } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import SupportIllustration from '../assets/landing-illustration.png';
function LandingPage() {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Box sx={{ overflowX: 'hidden' }}>
            <Box
                sx={{
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${theme.palette.background.paper} 100%)`,
                    minHeight: '85vh',
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: -100,
                        right: -100,
                        width: 400,
                        height: 400,
                        borderRadius: '50%',
                        background: alpha(theme.palette.secondary.main, 0.1),
                        zIndex: 0
                    }
                }}
            >
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Grid container spacing={4} alignItems="center">
                        <Grid  size={{xs:12,md:7}}>
                            <Typography
                                variant="h2"
                                component="h1"
                                sx={{
                                    fontWeight: 900,
                                    mb: 2,
                                    background: `-webkit-linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    lineHeight: 1.2
                                }}
                            >
                                ניהול פניות חכם,<br />
                                מהיר ויעיל יותר.
                            </Typography>
                            <Typography variant="h5" color="text.secondary" sx={{ mb: 4, maxWidth: '600px', lineHeight: 1.6 }}>
                                המערכת המתקדמת לניהול קריאות שירות, מעקב אחר משימות ותקשורת רציפה בין לקוחות לנציגים.
                                הכל במקום אחד, פשוט ונוח.
                            </Typography>

                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    startIcon={<LoginIcon />}
                                    onClick={() => navigate('/login')}
                                    sx={{
                                        px: 4,
                                        py: 1.5,
                                        fontSize: '1.1rem',
                                        borderRadius: '50px',
                                        boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.24)}`
                                    }}
                                >
                                    כניסה למערכת
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    size="large"
                                    startIcon={<AppRegistrationIcon />}
                                    onClick={() => navigate('/register')}
                                    sx={{
                                        px: 4,
                                        py: 1.5,
                                        fontSize: '1.1rem',
                                        borderRadius: '50px',
                                        borderWidth: 2,
                                        '&:hover': { borderWidth: 2 }
                                    }}
                                >
                                    הרשמה חינם
                                </Button>
                            </Stack>
                        </Grid>

                        <Grid size={{xs:12,md:5}}  sx={{ display: { xs: 'none', md: 'block' } }}>
                            <Box
                                component="img"
                                src={SupportIllustration}
                                alt="Support Illustration"
                                sx={{
                                    width: '100%',
                                    maxWidth: '500px',
                                    objectFit: 'contain',
                                    filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.1))'
                                }} />
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Typography variant="h4" align="center" fontWeight="bold" color="primary" gutterBottom>
                    למה לבחור במערכת שלנו?
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 6 }}>
                    כל הכלים שצריך כדי לתת שירות מצוין
                </Typography>

                <Stack
                    direction="row"
                    gap={5}
                    sx={{
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}
                >                    {[
                    { icon: <SpeedIcon fontSize="large" />, title: 'מהירות ויעילות', desc: 'ממשק מהיר ונוח המאפשר פתיחת פניות וטיפול בהן תוך שניות.' },
                    { icon: <SecurityIcon fontSize="large" />, title: 'אבטחה מתקדמת', desc: 'המידע שלכם מוגן בפרוטוקולי האבטחה המחמירים ביותר.' },
                    { icon: <SupportAgentIcon fontSize="large" />, title: 'תקשורת שקופה', desc: 'צ\'אט ישיר בין הלקוח לנציג ועדכוני סטטוס בזמן אמת.' },
                ].map((item, index) => (
                    <Grid size={{xs:12,md:4}} key={index}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                height: '100%',
                                textAlign: 'center',
                                borderRadius: 4,
                                bgcolor: alpha(theme.palette.primary.main, 0.04),
                                transition: '0.3s',
                                '&:hover': {
                                    transform: 'translateY(-10px)',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                                    bgcolor: 'background.paper'
                                }
                            }}
                        >
                            <Box sx={{
                                color: 'secondary.main',
                                mb: 2,
                                bgcolor: 'background.paper',
                                display: 'inline-flex',
                                p: 2,
                                borderRadius: '50%',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                            }}>
                                {item.icon}
                            </Box>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                {item.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item.desc}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
                </Stack>
            </Container>
        </Box>
    );
}

export default LandingPage;