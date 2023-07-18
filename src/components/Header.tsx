import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Button, Drawer, List, ListItem, ListItemIcon, ListItemText, Hidden } from '@mui/material';
import { Menu as MenuIcon, Home as HomeIcon, List as ListIcon, Logout as LogoutIcon } from '@mui/icons-material';
import containerStyle from '../components/container.module.scss'
import { AppContext } from '../context/AppContext';
import { PATHS } from '../navigation/Paths';

const Header: React.FC = () => {
    const {logout, cleanActivities } = useContext(AppContext);
    const navigate = useNavigate();
    const [isMenuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout()
        cleanActivities()
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
            <AppBar position='sticky'>
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
                        <Button color="inherit" onClick={() => handleMenuOptionClick(PATHS.HOME)}>
                            Home
                        </Button>
                        <Button color="inherit" onClick={() => handleMenuOptionClick(PATHS.ACTIVITIES_TO_DO)}>
                            To do
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
                        <ListItem onClick={() => handleMenuOptionClick(PATHS.HOME)}>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem onClick={() => handleMenuOptionClick(PATHS.ACTIVITIES_TO_DO)}>
                            <ListItemIcon>
                                <ListIcon />
                            </ListItemIcon>
                            <ListItemText primary="To do" />
                        </ListItem>
                        <ListItem onClick={handleLogout}>
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
