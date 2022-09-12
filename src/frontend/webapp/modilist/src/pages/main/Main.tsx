import { Button, Grid, Paper, Typography, useTheme, FormControl, TextField, Stack } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useTranslation } from "react-i18next";
import { BlogSection } from "./components/BlogSection";
import React from "react";
import { Helmet } from "react-helmet";
import { ImageComponent } from "../../components/image/ImageComponent";
import { config } from "../../config";
import { InvitationDialog } from "./components/InvitationDialog";
import { ActiveOrder } from "./components/ActiveOrder";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";




export function Main() {
    const theme = useTheme();
    const { t } = useTranslation();
    const { cdnImg: imgBaseHost } = config;
    const { isBusy: getAccountIsBusy, data: getAccountResponse } = useSelector((state: RootState) => state.getAccountModel);
    const [openDialogBox, setOpenDialogBox] = React.useState(false);

    const handleClickOpen = () => {
        setOpenDialogBox(true);
    };

    const handleClose = () => {
        setOpenDialogBox(false);
    };

    return (
        <React.Fragment>
            <Helmet>
                <title>{"Bak bu sana yakışır | Modilist "}</title>
            </Helmet>
            <Grid item container xs={12} spacing={4}>
                <Grid item xs={12}>
                    <Typography variant="h4" component="span">
                        {t("Pages.Main.Welcome", { username: getAccountResponse?.firstName })}
                    </Typography>
                </Grid>
                <Grid item container xs={6} spacing={4}>
                    <ActiveOrder />
                    <Grid item xs={12}>
                        <Paper elevation={6} sx={{
                            display: 'flex',
                            p: 5,
                            minHeight: '340px'
                        }}>
                            <Grid item container xs={12} alignItems="center">
                                <Grid item xs={6}>
                                    <ImageComponent src={`${imgBaseHost}/common/first-order-discount.svg`} width={272} />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h4" align="center" >{t("Pages.Main.FirstOrderPromotion.1")}</Typography>
                                    <Typography variant="h1" align="center" >{t("Pages.Main.FirstOrderPromotion.2")}</Typography>
                                </Grid>
                            </Grid>

                        </Paper>
                    </Grid>
                </Grid>
                <Grid item container xs={6} spacing={4} display="flex" alignContent="flex-start">
                    <Grid item xs={12}>
                        <Paper elevation={6} sx={{
                            p: 2,
                            minHeight: 428
                        }}>
                            <BlogSection />
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper elevation={6} sx={{
                            display: 'flex',
                            p: 5,
                            minHeight: '340px'
                        }}>
                            <Grid item container xs={12} alignItems="center">
                                <Grid item xs={4} sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                }}>
                                    <ImageComponent src={`${imgBaseHost}/common/invite-image.svg`} width={272} />
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h4" align="center" >{t("Pages.Main.FriendshipPromotion.1")}</Typography>
                                    <Typography variant="h1" align="center" >{t("Pages.Main.FriendshipPromotion.2")}</Typography>
                                </Grid>
                                <Grid item xs={4} sx={{
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    justifyContent: 'center',
                                    flexDirection: 'column'
                                }}>
                                    <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                                        <Typography align="center" color={theme.palette.secondary.contrastText}>{t("Pages.Main.SendInvitation")}</Typography>
                                        <ArrowRightAltIcon />
                                    </Button>
                                    <InvitationDialog
                                        openDialog={openDialogBox}
                                        onClose={handleClose}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}