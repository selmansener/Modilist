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
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Modilist
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing="2">
                    {
                        <>
                            <Grid item xs={12}>

                                <Typography variant="h4" component="div" sx={{ mt: 2 }}>
                                    {t('Layouts.Welcome.WelcomeLayout.Welcome')}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    {t('Layouts.Welcome.WelcomeLayout.Description1')}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ mt: 5 }}>
                                {props.children}
                            </Grid>
                        </>
                    }
                </Grid>
            </Container>
        </Box>
    )
}
