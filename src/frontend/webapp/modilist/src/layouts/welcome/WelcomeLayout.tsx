import { ThemeProvider } from "@emotion/react"
import { AppBar, Box, Button, Container, createTheme, Grid, IconButton, Menu, MenuItem, Paper, Step, StepLabel, Stepper, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { WelcomeSteps } from "./WelcomeSteps";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Personal from "../../pages/welcome/Personal";
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import BodySize from "../../pages/welcome/BodySize";
import StylePreferences from "../../pages/welcome/StylePreferences";
import Subscription from "../../pages/welcome/Subscription";
import PaymentMethod from "../../pages/welcome/PaymentMethod";
import ContactInfo from "../../pages/welcome/ContactInfo";

const mdTheme = createTheme({
    palette: {
        primary: {
            main: '#06273a'
        },
        secondary: {
            main: '#294260'
        },
        background: {
            default: '#ffeddf'
        }
    }
});

const steps = [
    {
        title: 'Kişisel',
        component: <Personal />
    },
    {
        title: 'Beden Ölçüleri',
        component: <BodySize />
    },
    {
        title: 'Stil Tercihleri',
        component: <StylePreferences />
    },
    {
        title: 'İletişim Bilgileri',
        component: <ContactInfo />
    },
    {
        title: 'Abonelik',
        component: <Subscription />
    },
    {
        title: 'Ödeme Yöntemi',
        component: <PaymentMethod />
    }
];

export default function Welcome() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <ThemeProvider theme={mdTheme}>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Modilist
                        </Typography>
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing="2">
                        <Grid item xs={12}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 240,
                                }}
                            >
                                <Typography variant="h4" component="div" sx={{mt:2}}>
                                    Modilist'e hoşgeldin!
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Sana özel kombinlerini hazırlamaya başlamadan önce bazı bilgilere ihtiyacımız var.
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Lütfen aşağıdaki birkaç aşamadan oluşan formu dikkatlice doldur.
                                </Typography>
                                <Typography component="div">
                                    <ExpandCircleDownIcon sx={{ fontSize: 72, mt: 5 }} color="primary" />
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 5 }}>
                            <WelcomeSteps steps={steps} />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    )
}
