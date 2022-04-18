import { ThemeProvider } from "@emotion/react"
import { Box, Button, Container, createTheme, Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";
import React, { useState } from "react";
import { WelcomeSteps } from "./WelcomeSteps";

const mdTheme = createTheme();

const steps = [
    {
        title: 'Hoşgeldiniz',
        component: <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
            }}
        >
        </Paper>
    },
    {
        title: 'Create an ad group',
        component: <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
            }}
        >
        </Paper>
        
    },
    {
        title: 'Create an ad',
        component: <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
            }}
        >
        </Paper>
    }
];

export default function Welcome() {

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
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <WelcomeSteps steps={steps} />
                </Container>
            </Box>
        </ThemeProvider>
    )
}
