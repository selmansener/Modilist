import { Box, Grid, Paper, Typography, useTheme } from "@mui/material";
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { ImageComponent } from "../../../components/image/ImageComponent";
import { config } from "../../../config";
import FavoriteIcon from '@mui/icons-material/Favorite';

export function SubscriptionInformation() {
    const { t } = useTranslation();
    const { cdnImg: imgBaseHost } = config;
    const theme = useTheme();

    return (
        <Grid item container spacing={4} textAlign="center">
            <Grid item xs={12}>
                <Box sx={{
                    p: 4,
                    bgcolor: theme.palette.secondary.transparent,
                    borderRadius: 4,
                }}>
                    <Grid item xs={12} my={4}>
                        <Box>
                            <Typography variant="h3" display="inline">
                                {t("Pages.Welcome.Subscription.SubscriptionInformation.Title1")}
                            </Typography>
                            <Typography variant="h3" color="secondary" display="inline">
                                {t("Pages.Welcome.Subscription.SubscriptionInformation.Title2")}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item container spacing={4} xs={12}>
                        <Grid item container spacing={4} xs={12} md={4}>
                            <Grid item container spacing={4} xs={12}>
                                <Grid item xs={7} display="flex" alignItems="stretch">
                                    <Paper sx={{
                                        bgcolor: theme.palette.primary.main,
                                        p: 2,
                                        borderRadius: 6,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Typography variant="h4" color="white" mb={2}>{t("Pages.Welcome.Subscription.SubscriptionInformation.LastStep.Title")}</Typography>
                                        <Typography variant="subtitle2" color="white">{t("Pages.Welcome.Subscription.SubscriptionInformation.LastStep.Description")}</Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={5} display="flex" alignItems="stretch">
                                    <Paper sx={{
                                        bgcolor: 'white',
                                        border: 4,
                                        borderRadius: 6,
                                        borderStyle: 'solid',
                                        borderColor: theme.palette.primary.main,
                                        flexGrow: 1,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <ImageComponent src={`${imgBaseHost}/common/drawing-subscription-step-2.svg`}></ImageComponent>
                                    </Paper>
                                </Grid>
                            </Grid>
                            <Grid item md={12} display={{
                                xs: 'none',
                                md: 'flex'
                            }}>
                                <Paper sx={{
                                    bgcolor: 'white',
                                    p: 2,
                                    border: 4,
                                    borderRadius: 6,
                                    borderStyle: 'solid',
                                    borderColor: theme.palette.primary.main,
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <Box mr={2}>
                                        <ImageComponent src={`${imgBaseHost}/common/drawing-subscription-step-1.svg`}></ImageComponent>
                                    </Box>
                                    <Box ml={2}>
                                        <Typography variant="h5" color="primary" mb={1}>{t("Pages.Welcome.Subscription.SubscriptionInformation.GotQuestions.Title")}</Typography>
                                        <Typography variant="subtitle2" color="primary">{t("Pages.Welcome.Subscription.SubscriptionInformation.GotQuestions.Description")}</Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={4} display="flex" alignItems="stretch">
                            <Paper sx={{
                                bgcolor: 'white',
                                border: 6,
                                px: [2],
                                [theme.breakpoints.down("md")]: {
                                    py: [2],
                                },
                                borderRadius: 6,
                                borderStyle: 'solid',
                                borderColor: theme.palette.primary.main,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}>
                                <Box mb={4}>
                                    <ImageComponent src={`${imgBaseHost}/common/drawing-subscription-step-3.svg`}></ImageComponent>
                                </Box>
                                <Box>
                                    <Typography variant="h3" color="primary" mb={2}>{t("Pages.Welcome.Subscription.SubscriptionInformation.SubscriptionIsFree.Title")}</Typography>
                                    <Typography variant="subtitle2" color="primary"><Trans>{t("Pages.Welcome.Subscription.SubscriptionInformation.SubscriptionIsFree.Description")}</Trans></Typography>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item container spacing={4} md={4}>
                            <Grid item container spacing={4} md={12} alignContent="stretch">
                                <Grid item md={5} display={{ xs: "none", md: "flex" }} alignItems="stretch">
                                    <Paper sx={{
                                        bgcolor: 'white',
                                        border: 4,
                                        borderRadius: 6,
                                        borderStyle: 'solid',
                                        borderColor: theme.palette.primary.main,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexGrow: 1,
                                    }}>
                                        <ImageComponent src={`${imgBaseHost}/common/drawing-subscription-step-4.svg`}></ImageComponent>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={7} display="flex" alignItems="stretch">
                                    <Paper sx={{
                                        bgcolor: theme.palette.primary.main,
                                        p: 2,
                                        border: 4,
                                        borderRadius: 6,
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        <Typography color="white" variant="h4" mb={2}>{t("Pages.Welcome.Subscription.SubscriptionInformation.YourInformationIsSafe.Title")}</Typography>
                                        <Typography color="white" variant="subtitle2">{t("Pages.Welcome.Subscription.SubscriptionInformation.YourInformationIsSafe.Description")}</Typography>
                                        <Paper sx={{
                                            bgcolor: 'white',
                                            border: 4,
                                            borderRadius: 6,
                                            borderStyle: 'solid',
                                            borderColor: theme.palette.primary.main,
                                            display: { xs: "flex", md: "none" },
                                        }}>
                                            <ImageComponent src={`${imgBaseHost}/common/drawing-subscription-step-4.svg`}></ImageComponent>
                                        </Paper>
                                    </Paper>
                                </Grid>
                            </Grid>
                            <Grid item container md={12} display={{
                                xs: 'none',
                                md: 'flex'
                            }}>
                                <Paper sx={{
                                    bgcolor: 'white',
                                    p: 4,
                                    border: 4,
                                    borderRadius: 6,
                                    borderStyle: 'solid',
                                    borderColor: theme.palette.primary.main,
                                    display: 'flex',
                                    alignItems: "center"
                                }}>
                                    <Box mr={2}>
                                        <Box>
                                            <Typography variant="h5" mb={2}>{t("Pages.Welcome.Subscription.SubscriptionInformation.YourFirstOrder.Title")} <FavoriteIcon sx={{
                                                verticalAlign: "middle"
                                            }} /></Typography>
                                        </Box>
                                        <Typography variant="subtitle2" color="primary">{t("Pages.Welcome.Subscription.SubscriptionInformation.YourFirstOrder.Description")}</Typography>
                                    </Box>
                                    <Box ml={2}>
                                        <ImageComponent src={`${imgBaseHost}/common/drawing-subscription-step-5.svg`}></ImageComponent>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid item container xs={12} display={{
                            md: 'none',
                            xs: 'flex'
                        }}>
                            <Paper sx={{
                                bgcolor: 'white',
                                p: 4,
                                border: 4,
                                borderRadius: 6,
                                borderStyle: 'solid',
                                borderColor: theme.palette.primary.main,
                            }}>
                                <Grid item container xs={12} spacing={2}>
                                    <Grid item xs={6} sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                    }}>
                                        <Typography variant="h5" mb={2}>{t("Pages.Welcome.Subscription.SubscriptionInformation.YourFirstOrder.Title")} <FavoriteIcon sx={{
                                            mb: -.6
                                        }} /></Typography>

                                        <Typography variant="subtitle2" color="primary">{t("Pages.Welcome.Subscription.SubscriptionInformation.YourFirstOrder.Description")}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <ImageComponent width='100%' src={`${imgBaseHost}/common/drawing-subscription-step-5.svg`}></ImageComponent>
                                    </Grid>
                                </Grid>
                                <Grid item container xs={12} spacing={2}>
                                    <Grid item xs={6} >
                                        <ImageComponent src={`${imgBaseHost}/common/drawing-subscription-step-1.svg`}></ImageComponent>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="h5" color="primary" mb={1}>{t("Pages.Welcome.Subscription.SubscriptionInformation.GotQuestions.Title")}</Typography>
                                        <Typography variant="subtitle2" color="primary">{t("Pages.Welcome.Subscription.SubscriptionInformation.GotQuestions.Description")}</Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box >
            </Grid >
        </Grid >
    )
}