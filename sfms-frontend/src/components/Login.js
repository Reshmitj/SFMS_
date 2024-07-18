import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Paper, Box } from '@mui/material';
import { AuthContext } from '../AuthContext';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (login(username, password)) {
            navigate('/dashboard');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <Box className="login-container">
            <Paper elevation={10} className="login-paper">
                <Typography variant="h4" className="login-header">Login</Typography>
                <form onSubmit={handleLogin} className="login-form">
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className="login-button"
                    >
                        Login
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default Login;
