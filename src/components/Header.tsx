import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Button, Drawer, List, ListItem, ListItemIcon, ListItemText, Hidden } from '@mui/material';
import { Menu as MenuIcon, Home as HomeIcon, List as ListIcon, Logout as LogoutIcon } from '@mui/icons-material';
import containerStyle from '../components/container.module.scss'
import { ActivityContext } from '../context/ActivityContext';

const Header: React.FC = () => {
    const { cleanActivities } = useContext(ActivityContext);
    const navigate = useNavigate();
    const [isMenuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('loggedUser')
        cleanActivities()
        navigate('/login')
    };

    const handleDrawerToggle = () => {
        setMenuOpen(!isMenuOpen)
    };

    const handleMenuOptionClick = (path: string) => {
        navigate(path)
        setMenuOpen(false)
    };

    return (
        <div className={containerStyle.growContainer}>
            <AppBar position="sticky">
                <Toolbar>
                    <Hidden smUp>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        DS!
                    </Typography>
                    <Hidden smDown>
                        <Button color="inherit" onClick={() => handleMenuOptionClick('/home')}>
                            Home
                        </Button>
                        <Button color="inherit" onClick={() => handleMenuOptionClick('/activities')}>
                            List
                        </Button>
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Hidden>
                </Toolbar>
            </AppBar>

            <Hidden smUp>
                <Drawer anchor="left" open={isMenuOpen} onClose={handleDrawerToggle}>
                    <List>
                        <ListItem onClick={() => handleMenuOptionClick('/home')}>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem onClick={() => handleMenuOptionClick('/activities')}>
                            <ListItemIcon>
                                <ListIcon />
                            </ListItemIcon>
                            <ListItemText primary="List" />
                        </ListItem>
                        <ListItem onClick={() => handleLogout}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                </Drawer>
            </Hidden>
        </div>
    );
};

export default Header;
