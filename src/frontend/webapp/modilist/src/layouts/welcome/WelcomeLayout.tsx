import { AppBar, Box, Container, Grid, Paper, Toolbar, Typography } from "@mui/material";
import { WelcomeSteps } from "./WelcomeSteps";
import Personal from "../../pages/welcome/Personal";
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import BodySize from "../../pages/welcome/BodySize";
import StylePreferences from "../../pages/welcome/StylePreferences";
import Subscription from "../../pages/welcome/Subscription";
import PaymentMethod from "../../pages/welcome/PaymentMethod";
import ContactInfo from "../../pages/welcome/ContactInfo";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const steps = [
    {
        title: 'Layouts.Welcome.WelcomeLayout.Steps.TitlePersonal',
        component: <Personal />
    },
    {
        title: 'Layouts.Welcome.WelcomeLayout.Steps.TitleBodySize',
        component: <BodySize />
    },
    {
        title: 'Layouts.Welcome.WelcomeLayout.Steps.TitleStylePreferences',
        component: <StylePreferences />
    },
    {
        title: 'Layouts.Welcome.WelcomeLayout.Steps.TitleContactInfo',
        component: <ContactInfo />
    },
    {
        title: 'Layouts.Welcome.WelcomeLayout.Steps.TitleSubscription',
        component: <Subscription />
    },
    {
        title: 'Layouts.Welcome.WelcomeLayout.Steps.TitlePaymentMethod',
        component: <PaymentMethod />
    }
];

export default function Welcome() {
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
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 240,
                                    }}
                                >
                                    <Typography variant="h4" component="div" sx={{ mt: 2 }}>
                                        {t('Layouts.Welcome.WelcomeLayout.Welcome')}
                                    </Typography>
                                    <Typography variant="h6" component="div">
                                        {t('Layouts.Welcome.WelcomeLayout.Description1')}
                                    </Typography>
                                    <Typography variant="h6" component="div">
                                        {t('Layouts.Welcome.WelcomeLayout.Description2')}
                                    </Typography>
                                    <Typography component="div">
                                        <ExpandCircleDownIcon sx={{ fontSize: 72, mt: 5 }} color="primary" />
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sx={{ mt: 5 }}>
                                <WelcomeSteps steps={steps} />
                            </Grid>
                        </>
                    }
                </Grid>
            </Container>
        </Box>
    )
}
