import { Link, Outlet, useLocation } from "react-router-dom";
import { Container, Paper, Tabs, Tab, Box, Typography } from "@mui/material";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import LowPriorityIcon from '@mui/icons-material/LowPriority';

function Settings() {
    const location = useLocation();
    
    const currentTab = location.pathname.includes("priorities") ? 1 : 0;

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
                הגדרות מערכת
            </Typography>
            
            <Paper elevation={2} sx={{ mb: 3 }}>
                <Tabs 
                    value={currentTab} 
                    indicatorColor="secondary" 
                    textColor="primary"
                    variant="fullWidth"
                >
                    <Tab 
                        label="ניהול סטטוסים" 
                        component={Link} 
                        to="statuses" 
                        icon={<LowPriorityIcon />} 
                        iconPosition="start"
                    />
                    <Tab 
                        label="ניהול עדיפויות" 
                        component={Link} 
                        to="priorities" 
                        icon={<PriorityHighIcon />} 
                        iconPosition="start"
                    />
                </Tabs>
            </Paper>

            <Box sx={{ minHeight: '400px' }}>
                <Outlet />
            </Box>
        </Container>
    );
}   
export default Settings;