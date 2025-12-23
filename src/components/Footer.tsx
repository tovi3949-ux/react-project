import { Box, Typography, Link as MuiLink } from '@mui/material';

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) => theme.palette.grey[900],
                color: 'white',
                textAlign: 'center',
                borderTop: '4px solid',
                borderColor: 'secondary.main' 
            }}
        >
            <Typography variant="body2">
                © {new Date().getFullYear()} מערכת ניהול פניות. כל הזכויות שמורות.
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: 'grey.500' }}>
                <MuiLink color="inherit" href="/terms-of-use">תנאי שימוש</MuiLink> | <MuiLink color="inherit" href="/privacy-policy">מדיניות פרטיות</MuiLink>
            </Typography>
        </Box>
    );
}

export default Footer;