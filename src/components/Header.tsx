import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Button, Drawer, List, ListItem, ListItemIcon, ListItemText, Hidden } from '@mui/material';
import { Menu as MenuIcon, Home as HomeIcon, List as ListIcon } from '@mui/icons-material';

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    const navigate = useNavigate();
    const [isMenuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/login');
    };

    const handleDrawerToggle = () => {
        setMenuOpen(!isMenuOpen);
    };

    const handleMenuOptionClick = (path: string) => {
        navigate(path);
        setMenuOpen(false);
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                <Hidden mdUp>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
                        <MenuIcon />
                    </IconButton>
                    </Hidden>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <Hidden smDown>
                        <Button color="inherit" onClick={() => handleMenuOptionClick('/home')}>
                            Home
                        </Button>
                        <Button color="inherit" onClick={() => handleMenuOptionClick('/listado')}>
                            List
                        </Button>
                    </Hidden>
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            <Hidden mdUp>
                <Drawer anchor="left" open={isMenuOpen} onClose={handleDrawerToggle}>
                    <List>
                        <ListItem onClick={() => handleMenuOptionClick('/home')}>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem onClick={() => handleMenuOptionClick('/listado')}>
                            <ListItemIcon>
                                <ListIcon />
                            </ListItemIcon>
                            <ListItemText primary="Listado" />
                        </ListItem>
                    </List>
                </Drawer>
            </Hidden>
        </div>
    );
};

export default Header;
