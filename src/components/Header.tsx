import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ROLES } from '../utils/roles';
import { useAuth } from '../context/authStore';

function Header() {
    const user = useAuth((state) => state.user);
    const logout = useAuth((state) => state.logout);
    const navigate = useNavigate();
    const links: { name: string, path: string }[] = [];
    if (user) {
        if (user.role === ROLES.ADMIN) {
            links.push({ name: 'בית', path: '/dashboard' });
            links.push({ name: 'משתמשים', path: '/users' });
            links.push({ name: 'פניות', path: '/tickets' });
            links.push({ name: 'הגדרות', path: '/settings' });
        } else {
            if (user.role === ROLES.AGENT) {
                links.push({ name: 'בית', path: '/dashboard' });
                links.push({ name: 'פניות', path: '/tickets' });
            }
            else {
                links.push({ name: 'בית', path: '/dashboard' });
                links.push({ name: 'פניות', path: '/tickets' });
                links.push({ name: 'פנייה חדשה', path: '/tickets/new' });
            }
        }
    }
    const handleLogout = () => {
        navigate('/landing');
        setTimeout(() => {
            logout();
        }, 0);
    };

    return (
        <AppBar position="static" color="primary" elevation={2}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        מערכת פניות
                    </Typography>

                    {links.map((link) => (
                        <Button
                            key={link.name}
                            color="inherit"
                            component={Link}
                            to={link.path}
                        >
                            {link.name}
                        </Button>
                    ))}
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {!user ? (
                            <>
                                <Button color="inherit" component={Link} to="/login">התחברות</Button>
                                <Button variant="contained" color="secondary" component={Link} to="/register">הרשמה</Button>
                            </>
                        ) : (
                            <>
                                <Typography sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                                    שלום, {user.name}
                                </Typography>
                                <Button variant="contained" color="secondary" onClick={handleLogout}>
                                    יציאה
                                </Button>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;