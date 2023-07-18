import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppBar, Toolbar, Typography, IconButton, Button, Drawer, List, ListItem, ListItemIcon, ListItemText, Hidden } from '@mui/material'
import { Menu as MenuIcon, Home as HomeIcon, List as ListIcon, Logout as LogoutIcon } from '@mui/icons-material'
import containerStyles from '../../common/components/container.module.scss'
import { AppContext } from '../../context/AppContext'
import { PATHS } from '../../navigation/Paths'

const Header: React.FC = () => {
    const { logout, loggedUser } = useContext(AppContext)
    const navigate = useNavigate()
    const [isMenuOpen, setMenuOpen] = useState(false)

    const handleLogout = () => {
        logout()
    }

    const handleDrawerToggle = () => {
        setMenuOpen(!isMenuOpen)
    }

    const handleMenuOptionClick = (path: string) => {
        navigate(path)
        setMenuOpen(false)
    }

    return (
        <div className={containerStyles.grow}>
            <AppBar position='sticky'>
                <Toolbar>
                    {loggedUser &&
                        <Hidden smUp>
                            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
                                <MenuIcon />
                            </IconButton>
                        </Hidden>
                    }
                    <Hidden smDown>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Do Something!
                        </Typography>
                    </Hidden>
                    <Hidden smUp>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            DS!
                        </Typography>
                    </Hidden>
                    {loggedUser &&
                        <Hidden smDown>
                            <Button color="inherit" onClick={() => handleMenuOptionClick(PATHS.HOME)}>
                                Home
                            </Button>
                            <Button color="inherit" onClick={() => handleMenuOptionClick(PATHS.ACTIVITIES_TO_DO)}>
                                Activities to do
                            </Button>
                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button>
                        </Hidden>
                    }
                </Toolbar>
            </AppBar>
            {loggedUser &&
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
                                <ListItemText primary="Activities to do" />
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
            }
        </div>
    )
}

export default Header
