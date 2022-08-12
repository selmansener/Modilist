import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate } from "react-router-dom";
import { ImageComponent } from "../../components/image/ImageComponent";
import { config } from "../../config";
import { DashboardFooter } from "../dashboard/DashboardFooter";

export default function NotFound() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { imgBaseHost } = config;

    return (
        <Box display="flex" flexDirection="column">
            <Box component="main" minHeight={760}>
                <Helmet>
                    {t("Pages.Titles.NotFound")}
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
                    <Grid container spacing={2} textAlign="center" mt={4}>
                        <Grid item xs={12}>
                            <Typography variant="h5">
                                {t("Pages.NotFound.Message")}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <ImageComponent src={`${imgBaseHost}/checkout/checkout-failed.svg`} />
                        </Grid>
                        <Grid item xs={12} sx={{
                            display: "flex",
                            justifyContent: "center"
                        }}>
                            <Button sx={{
                                mr: 2
                            }}
                                size="large"
                                onClick={() => {
                                    navigate(-1);
                                }}>
                                <Typography variant="h5">
                                    {t("Pages.NotFound.ReturnToPreviousPage")}
                                </Typography>
                            </Button>
                            <Button size="large"
                                onClick={() => {
                                    navigate("/", {
                                        replace: true
                                    });
                                }}>
                                <Typography variant="h5">
                                    {t("Pages.NotFound.ReturnToHome")}
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <DashboardFooter />
        </Box>
    )
}