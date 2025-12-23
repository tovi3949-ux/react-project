import { Box, Card, CardActionArea, CardContent, Container, Grid, Typography } from "@mui/material"
import {  useNavigate } from "react-router-dom";
import { useAuth } from "../context/authStore";
import { ROLES } from "../utils/roles";
interface CardInfo {
    title: string;
    description: string;
    link: string;
}

function Dashboard() {
    const cards: CardInfo[] = [];
    const user= useAuth.getState().user;
    const navigate = useNavigate();
    if (user?.role === ROLES.ADMIN) {
        cards.push({ title: "ניהול משתמשים", description: "כאן תוכלו לנהל את המשתמשים במערכת, להוסיף משתמשים חדשים, לערוך או למחוק משתמשים קיימים.", link: "/users" });
        cards.push({ title: "ניהול פניות", description: "כאן תוכלו לנהל את כל הפניות במערכת, להקצות פניות לסוכנים, לשנות סטטוס או עדיפות.", link: "/tickets" });
        cards.push({ title: "ניהול סטטוסים ועדיפויות", description: "כאן תוכלו להגדיר סטטוסים ודרגות עדיפות מותאמים אישית עבור הפניות שלכם.", link: "/settings" });
    }
    else if (user?.role === ROLES.AGENT) {
        cards.push({ title: "ניהול פניות", description: "כאן תוכלו לנהל את כל הפניות שהוקצו לכם, לעדכן סטטוס או עדיפות, ולהוסיף הערות.", link: "/tickets" });
    }
    else {
        cards.push({ title: "הגשת פנייה חדשה", description: "כאן תוכלו להגיש פנייה חדשה לצוות התמיכה שלנו ולקבל עזרה במהירות.", link: "/tickets/new" });
        cards.push({ title: "הצגת הפניות שלי", description: "כאן תוכלו לצפות ולעקוב אחר כל הפניות שהגשתם למערכת.", link: "/tickets" });
    }
   return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Typography variant="h3" component="h1" gutterBottom color="primary">
                    שלום, {user?.name || 'אורח'}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    ברוכים הבאים למערכת פניות הציבור
                </Typography>
            </Box>

            <Grid container spacing={4}>
                {cards.map((card, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardActionArea 
                                onClick={() => navigate(card.link)} 
                                sx={{ height: '100%', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" color="primary">
                                        {card.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {card.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}
export default Dashboard