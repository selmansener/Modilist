import { AppBar, Box, Container, Grid, Toolbar } from "@mui/material";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { ImageComponent } from "../../components/image/ImageComponent";
import { DashboardFooter } from "../dashboard/DashboardFooter";

export function VerificationLayout() {
    const { t } = useTranslation();

    return (
        <Box display="flex" flexDirection="column">
            <Box component="main"  minHeight={760}>
                <Helmet>
                    {t("Pages.Titles.AccountVerification")}
                </Helmet>
                <AppBar position="static">
                    <Toolbar>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexGrow: 1
                        }}>
                            <ImageComponent width={200} src="/whitehorizontallogo.svg" />
                        </Box>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="xl" sx={{
                    mt: 2,
                    mb: 2
                }}>
                    <Grid container>
                        <Outlet />
                    </Grid>
                </Container>
            </Box>
            <DashboardFooter />
        </Box>
    )
}