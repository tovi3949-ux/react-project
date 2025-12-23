import { Box, Button, Container, Typography, useTheme, alpha } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

function NotFound() {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: '80vh', // תופס את רוב הגובה אבל משאיר מקום ל-Header/Footer
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                // רקע עדין עם נקודה זוהרת במרכז
                background: `radial-gradient(circle at center, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 70%)`
            }}
        >
            <Container maxWidth="sm">
                {/* אייקון גדול וחצי-שקוף */}
                <SentimentVeryDissatisfiedIcon 
                    sx={{ 
                        fontSize: { xs: 80, md: 120 }, 
                        color: 'secondary.main', 
                        opacity: 0.2,
                        mb: -2 // קצת חפיפה עם הטקסט למראה מעוצב
                    }} 
                />

                {/* המספר 404 ענק וצבעוני */}
                <Typography
                    variant="h1"
                    fontWeight="900"
                    sx={{
                        fontSize: { xs: '6rem', md: '10rem' }, // רספונסיבי
                        lineHeight: 0.8,
                        // גרדיינט טקסט מהירוק לחרדל
                        background: `-webkit-linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 2,
                        textShadow: '0px 10px 20px rgba(0,0,0,0.05)'
                    }}
                >
                    404
                </Typography>

                <Typography variant="h4" fontWeight="bold" gutterBottom color="text.primary">
                    אופס... הלכנו לאיבוד.
                </Typography>

                <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4, fontSize: '1.1rem' }}>
                    נראה שהעמוד שחיפשת לא קיים, הוסר, או שהקישור שבור.
                    אל דאגה, אפשר לחזור הביתה ולהתחיל מחדש.
                </Typography>

                <Button
                    variant="contained"
                    size="large"
                    startIcon={<HomeIcon />}
                    onClick={() => navigate('/landing')}
                    sx={{ 
                        borderRadius: 50, 
                        px: 4, 
                        py: 1.5,
                        fontSize: '1rem',
                        boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.24)}`
                    }}
                >
                    חזרה לדף הבית
                </Button>
            </Container>
        </Box>
    );
}

export default NotFound;