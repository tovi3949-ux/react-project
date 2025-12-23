import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';

function Unauthorized() {
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm" sx={{ mt: 10, textAlign: 'center' }}>
            <Box sx={{ mb: 3 }}>
                <LockIcon sx={{ fontSize: 60, color: 'error.main' }} />
            </Box>
            <Typography variant="h4" component="h1" gutterBottom color="error">
                אין גישה (403)
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
                אופס! נראה שאין לך הרשאה לצפות בדף זה.
                אם את/ה חושב/ת שזו טעות, אנא פנה/י למנהל המערכת.
            </Typography>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={() => navigate('/dashboard')}
                sx={{ mt: 2 }}
            >
                חזרה לדף הבית
            </Button>
        </Container>
    );
}

export default Unauthorized;