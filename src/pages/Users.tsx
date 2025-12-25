import { useEffect, useState } from "react";
import { getAllUsers } from "../services/users";
import type { User } from "../types/user";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { 
    Container, Typography, Paper, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, Button, Alert, Box, Chip
} from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { ROLES } from "../utils/roles";

function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError(null);
            try {
                setUsers(await getAllUsers());
            } catch (error) {
                setError("שגיאה בטעינת המשתמשים.");
            }
            setLoading(false);
        }
        fetchUsers();
    }, []);

    if (loading) return <Loader />;

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" color="primary" fontWeight="bold">
                    ניהול משתמשים
                </Typography>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    component={Link} 
                    to="/add-user"
                    startIcon={<PersonAddIcon />} 
                >
                    הוספת משתמש
                </Button>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {users.length === 0 && !loading ? (
                <Alert severity="info">לא נמצאו משתמשים.</Alert>
            ) : (
                <TableContainer component={Paper} elevation={2}>
                    <Table>
                        <TableHead sx={{ bgcolor: 'grey.100' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>שם</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>אימייל</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>תפקיד</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id} hover>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={user.role} 
                                            color={user.role === ROLES.ADMIN ? 'secondary' : user.role === ROLES.AGENT ? 'primary' : 'default'} 
                                            size="small" 
                                            variant="outlined"
                                            style={{ opacity: user.is_active ? 1 : 0.5 }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
}
export default Users;