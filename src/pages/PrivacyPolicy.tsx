import { Container, Paper, Typography, Box, Divider, List, ListItem, ListItemText } from "@mui/material";

function PrivacyPolicy() {
    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom color="primary" fontWeight="bold">
                    מדיניות פרטיות
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" paragraph>
                    עודכן לאחרונה: {new Date().toLocaleDateString('he-IL')}
                </Typography>

                <Divider sx={{ mb: 3 }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <section>
                        <Typography variant="h6" gutterBottom color="secondary" fontWeight="bold">
                            1. כללי
                        </Typography>
                        <Typography variant="body1" paragraph>
                            אנו מכבדים את פרטיותך ומחויבים להגן על המידע האישי שאתה משתף עמנו. מדיניות זו מתארת כיצד אנו אוספים, משתמשים ושומרים על המידע שלך בעת השימוש במערכת ניהול הפניות שלנו.
                        </Typography>
                    </section>

                    <section>
                        <Typography variant="h6" gutterBottom color="secondary" fontWeight="bold">
                            2. איסוף מידע
                        </Typography>
                        <Typography variant="body1" paragraph>
                            בעת השימוש במערכת, אנו עשויים לאסוף את סוגי המידע הבאים:
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText primary="• מידע אישי מזהה: שם, כתובת אימייל, מספר טלפון ופרטי התקשרות נוספים שנמסרו בעת ההרשמה." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="• תוכן הפניות: נושא הפנייה, תיאור, קבצים מצורפים והתכתבויות מול נציגי השירות." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="• מידע טכני: כתובת IP, סוג דפדפן, וזמני התחברות למערכת לצרכי אבטחה." />
                            </ListItem>
                        </List>
                    </section>

                    <section>
                        <Typography variant="h6" gutterBottom color="secondary" fontWeight="bold">
                            3. שימוש במידע
                        </Typography>
                        <Typography variant="body1" paragraph>
                            המידע שנאסף משמש אותנו למטרות הבאות:
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText primary="• מתן שירות ותמיכה טכנית." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="• ניהול חשבון המשתמש שלך ואימות זהותך." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="• שיפור איכות השירות והמערכת." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="• משלוח הודעות עדכון בנוגע לסטטוס הפניות שלך." />
                            </ListItem>
                        </List>
                    </section>

                    <section>
                        <Typography variant="h6" gutterBottom color="secondary" fontWeight="bold">
                            4. אבטחת מידע
                        </Typography>
                        <Typography variant="body1" paragraph>
                            אנו נוקטים באמצעי אבטחה טכנולוגיים וארגוניים מתקדמים כדי להגן על המידע שלך מפני גישה בלתי מורשית, שינוי או דליפה. עם זאת, אין מערכת חסינה לחלוטין, ולכן איננו יכולים להבטיח ביטחון מוחלט.
                        </Typography>
                    </section>

                    <section>
                        <Typography variant="h6" gutterBottom color="secondary" fontWeight="bold">
                            5. יצירת קשר
                        </Typography>
                        <Typography variant="body1">
                            בכל שאלה בנוגע למדיניות זו, ניתן לפנות אלינו בכתובת המייל: support@example.com
                        </Typography>
                    </section>
                </Box>
            </Paper>
        </Container>
    );
}

export default PrivacyPolicy;