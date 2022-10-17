import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import logo from '../assets/images/logo.png';
import { getUser } from '../utils/helpers';

const StyledAppBar = styled(AppBar)`
    && {
        background-color: #fff;
        color: #000;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: blue;
    border-bottom: 2px solid transparent;
    &:hover {
        color: orange;
    }
`;

const ActiveLink = styled(Link)`
    text-decoration: none;
    color: orange;
    border-bottom: 2px solid orange;
    &:hover {
        color: blue;
    }
`;

const drawerWidth = 240;
const navmenu = [
    { page: 'Rezervuoti', url: '/rezervacijos' },
    { page: 'Mano Rezervacijos', url: '/mano-rezervacijos' },
    { page: 'Taisyklės', url: '/taisykles' },
];

const Navbar = (props) => {
    const { window } = props;
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [picture, setPicture] = useState('');

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const currentPath = useLocation().pathname;

    useEffect(() => {
        const user = getUser();
        if (user.accessToken) {
            setPicture(user.picture.data.url);
        }
    }, []);

    const drawer = (
        <Box sx={{ textAlign: 'center' }}>
            <List>
                {navmenu.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton
                            sx={{ textAlign: 'center', color: 'primary.main' }}
                            onClick={handleDrawerToggle}
                        >
                            {currentPath !== item.url && (
                                <StyledLink to={item.url}>
                                    <ListItemText primary={item.page} />
                                </StyledLink>
                            )}
                            {currentPath === item.url && (
                                <ActiveLink to={item.url}>
                                    <ListItemText primary={item.page} />
                                </ActiveLink>
                            )}
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <StyledAppBar component="nav">
                <Toolbar sx={{ width: { xs: '100%', md: '90%' }, margin: '0 auto' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{
                            mr: 2,
                            display: { sm: 'none', xs: 'flex' },
                            color: 'primary.main',
                            width: '80%',
                            justifyContent: 'space-between',
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <IconButton onClick={() => navigate('/')} sx={{ display: { xs: 'block', sm: 'none' } }}>
                        <img src={logo} alt="logo" width={60} height={40} />
                    </IconButton>
                    <Box component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                        <StyledLink to="/">
                            <img src={logo} alt="logo" width={60} height={40} />
                        </StyledLink>
                    </Box>
                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, color: 'primary.main' }}>
                        {navmenu.map((item, index) => (
                            <Button key={index} sx={{ color: 'primary.main', marginLeft: '5px' }}>
                                {currentPath !== item.url && (
                                    <StyledLink to={item.url}>
                                        <ListItemText primary={item.page} />
                                    </StyledLink>
                                )}
                                {currentPath === item.url && (
                                    <ActiveLink to={item.url}>
                                        <ListItemText primary={item.page} />
                                    </ActiveLink>
                                )}
                            </Button>
                        ))}
                        {picture && (
                            <Box
                                component="img"
                                sx={{
                                    height: 50,
                                    width: 50,
                                    borderRadius: '50%',
                                    marginLeft: '5px',
                                }}
                                alt="The house from the offer."
                                src={picture}
                            />
                        )}
                    </Box>
                </Toolbar>
            </StyledAppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            backgroundColor: '#fff',
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
};

export default Navbar;
