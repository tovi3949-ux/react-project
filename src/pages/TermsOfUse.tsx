import { Container, Paper, Typography, Box, Divider, List, ListItem, ListItemText } from "@mui/material";

function TermsOfUse() {
    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom color="primary" fontWeight="bold">
                    תנאי שימוש
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" paragraph>
                    עודכן לאחרונה: {new Date().toLocaleDateString('he-IL')}
                </Typography>

                <Divider sx={{ mb: 3 }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <section>
                        <Typography variant="h6" gutterBottom color="secondary" fontWeight="bold">
                            1. הסכמה לתנאים
                        </Typography>
                        <Typography variant="body1" paragraph>
                            השימוש במערכת זו מעיד על הסכמתך לתנאים המפורטים להלן. אם אינך מסכים לתנאים אלו, אנא הימנע משימוש במערכת.
                        </Typography>
                    </section>

                    <section>
                        <Typography variant="h6" gutterBottom color="secondary" fontWeight="bold">
                            2. שימוש במערכת
                        </Typography>
                        <Typography variant="body1" paragraph>
                            המערכת נועדה לניהול פניות וקבלת שירות בלבד. חל איסור לעשות במערכת כל שימוש בלתי חוקי, פוגעני או שמפר זכויות של צד שלישי.
                        </Typography>
                    </section>

                    <section>
                        <Typography variant="h6" gutterBottom color="secondary" fontWeight="bold">
                            3. אחריות המשתמש
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText primary="• המשתמש אחראי לשמור על סודיות פרטי ההתחברות שלו (שם משתמש וסיסמה)." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="• המשתמש מתחייב למסור פרטים נכונים ומדויקים בעת ההרשמה ופתיחת הפניות." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="• חל איסור להעלות תוכן מזיק, וירוסים או קוד זדוני למערכת." />
                            </ListItem>
                        </List>
                    </section>

                    <section>
                        <Typography variant="h6" gutterBottom color="secondary" fontWeight="bold">
                            4. הגבלת אחריות
                        </Typography>
                        <Typography variant="body1" paragraph>
                            השירות ניתן כמות שהוא ("As Is"). החברה לא תשא באחריות לכל נזק, ישיר או עקיף, שייגרם כתוצאה משימוש במערכת או חוסר יכולת להשתמש בה, לרבות אובדן נתונים או שיבושים בפעילות.
                        </Typography>
                    </section>

                    <section>
                        <Typography variant="h6" gutterBottom color="secondary" fontWeight="bold">
                            5. שינויים בתנאים
                        </Typography>
                        <Typography variant="body1">
                            אנו שומרים לעצמנו את הזכות לעדכן את תנאי השימוש מעת לעת. המשך השימוש במערכת לאחר ביצוע השינויים מהווה הסכמה לתנאים המעודכנים.
                        </Typography>
                    </section>
                </Box>
            </Paper>
        </Container>
    );
}

export default TermsOfUse;