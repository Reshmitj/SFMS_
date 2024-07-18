import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon, Box, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ReceiptIcon from '@mui/icons-material/Receipt';
import InfoIcon from '@mui/icons-material/Info';
import StarIcon from '@mui/icons-material/Star';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { AuthProvider, AuthContext } from './AuthContext';
import Home from './components/Home';
import Login from './components/Login';
import Budgets from './components/Budgets';
import Expenses from './components/Expenses';
import AboutUs from './components/AboutUs';
import Features from './components/Features';
import Pricing from './components/Pricing';
import ContactUs from './components/ContactUs';
import Dashboard from './components/Dashboard';
import './App.css';

function ProtectedRoute({ element: Component, ...rest }) {
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <Component {...rest} />;
}

const AuthenticatedLinks = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);

    if (isAuthenticated) {
        return (
            <>
                <ListItem button component={Link} to="/dashboard">
                    <ListItemIcon><DashboardIcon /></ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button component={Link} to="/budgets">
                    <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
                    <ListItemText primary="Budgets" />
                </ListItem>
                <ListItem button component={Link} to="/expenses">
                    <ListItemIcon><ReceiptIcon /></ListItemIcon>
                    <ListItemText primary="Expenses" />
                </ListItem>
                <ListItem button onClick={logout}>
                    <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </>
        );
    } else {
        return (
            <ListItem button component={Link} to="/login">
                <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                <ListItemText primary="Login" />
            </ListItem>
        );
    }
};

const App = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <AuthProvider>
            <Router>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" className="app-bar">
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={toggleDrawer(true)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                                    Smart Financial Management System
                                </Link>
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                        <Box
                            sx={{ width: 250 }}
                            role="presentation"
                            onClick={toggleDrawer(false)}
                            onKeyDown={toggleDrawer(false)}
                            className="drawer-list"
                        >
                            <List>
                                <ListItem button component={Link} to="/">
                                    <ListItemIcon><HomeIcon /></ListItemIcon>
                                    <ListItemText primary="Home" />
                                </ListItem>
                                <AuthenticatedLinks />
                                <ListItem button component={Link} to="/about">
                                    <ListItemIcon><InfoIcon /></ListItemIcon>
                                    <ListItemText primary="About Us" />
                                </ListItem>
                                <ListItem button component={Link} to="/features">
                                    <ListItemIcon><StarIcon /></ListItemIcon>
                                    <ListItemText primary="Features" />
                                </ListItem>
                                <ListItem button component={Link} to="/pricing">
                                    <ListItemIcon><MonetizationOnIcon /></ListItemIcon>
                                    <ListItemText primary="Pricing" />
                                </ListItem>
                                <ListItem button component={Link} to="/contact">
                                    <ListItemIcon><ContactMailIcon /></ListItemIcon>
                                    <ListItemText primary="Contact Us" />
                                </ListItem>
                            </List>
                        </Box>
                    </Drawer>
                    <Container>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/about" element={<AboutUs />} />
                            <Route path="/features" element={<Features />} />
                            <Route path="/pricing" element={<Pricing />} />
                            <Route path="/contact" element={<ContactUs />} />
                            <Route path="/budgets" element={<ProtectedRoute element={Budgets} />} />
                            <Route path="/expenses" element={<ProtectedRoute element={Expenses} />} />
                            <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
                        </Routes>
                    </Container>
                </Box>
            </Router>
        </AuthProvider>
    );
};

export default App;
