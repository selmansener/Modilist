import { AppBar, Box, Container, Grid, Paper, Toolbar, Typography } from "@mui/material";
import { WelcomeSteps } from "../../pages/welcome/WelcomeSteps";
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export interface WelcomeLayoutProps { }

export default function WelcomeLayout(props: React.PropsWithChildren<WelcomeLayoutProps>) {
    const { t } = useTranslation();

    useEffect(() => {
        document.title = "Hoşgeldiniz | Modilist";
    }, []);

    return (
        <Box component="main">
            <AppBar position="static">
                <Toolbar>
                    <Typography sx={{ flexGrow: 1 }}>
                        Modilist
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="xl" sx={{
                mt: 2,
                mb: 2
            }}>
                <Grid container>
                    {props.children}
                </Grid>
            </Container>
        </Box>
    )
}
