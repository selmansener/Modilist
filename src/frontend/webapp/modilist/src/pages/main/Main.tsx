import { Button, Grid, Paper, Typography, useTheme, Link, FormControl, TextField, Stack } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useTranslation } from "react-i18next";
import { BlogSection } from "./components/BlogSection";
import { NavLink } from 'react-router-dom';
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
    const { isBusy: getStylePreferencesIsBusy, data: getStylePreferencesModel} = useSelector((state: RootState) => state.getStylePreferencesModel);
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
                    <Typography variant="h3" component="span">
                        {t("Pages.Main.Welcome", { username: getAccountResponse?.firstName })}
                    </Typography>
                </Grid>
                <Grid item container xs={12} spacing={4}>
                    <ActiveOrder />
                </Grid>
                <Grid item container xs={12} spacing={4} display="flex" alignContent="flex-start"> 
                    <Grid item container xs={7} spacing={4}>
                        {getStylePreferencesModel?.lovesShopping == 0 && <Grid item xs={12} >
                            <Paper elevation={0} sx={{
                                display: 'flex',
                                p: 3,
                                minHeight: '340px',
                                backgroundColor: '#ECE5FF',
                            }}>
                                <Grid item container xs={12} alignItems="center">
                                    <Grid item xs={8}>
                                        <Grid item xs={12}>
                                            <Typography variant="h4" align="left" sx={{
                                                pb: 3
                                            }} >{t("Pages.Main.ContinueStyleForm.1")}</Typography>
                                            <Typography variant="body1" align="left" >{t("Pages.Main.ContinueStyleForm.2")}</Typography>
                                            <Typography variant="body1" align="left" >{t("Pages.Main.ContinueStyleForm.3")}</Typography>

                                        </Grid>
                                        <Grid item xs={12} sx={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            pt: 3,
                                        }}>
                                            <NavLink to={`/style-preferences`} target="_blank" style={{
                                                textDecoration: 'none'
                                            }}>
                                                <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                                                    <Typography variant="h6" align="center" color={theme.palette.secondary.contrastText}>{t("Pages.Main.GoToStyleForm")}</Typography>
                                                </Button>
                                            </NavLink>

                                        </Grid>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Grid item xs={6} sx={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            justifyContent: 'center',
                                        }}>
                                            <ImageComponent src={`${imgBaseHost}/common/style-form-continue.svg`} width={290} />
                                        </Grid>
                                    </Grid>
                                </Grid>


                            </Paper>
                        </Grid> }
                        <Grid item xs={12}>
                            <Paper elevation={0} sx={{
                                display: 'flex',
                                p: 3,
                                minheight: '340px',
                            }}>
                                <Grid item container xs={12} alignItems="center">
                                    <Grid item xs={8}>
                                        <Grid item xs={12}>
                                            <Typography variant="h4" align="left" sx={{
                                                pb: 3
                                            }} >{t("Pages.Main.OffersSpecialForYou.1")}</Typography>
                                            <Typography variant="body1" align="left" >{t("Pages.Main.OffersSpecialForYou.2")}</Typography>
                                            <Typography variant="body1" align="left" >{t("Pages.Main.OffersSpecialForYou.3")}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sx={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            pt: 3,
                                        }}>
                                            <Button variant="outlined" onClick={handleClickOpen}>
                                                <Typography align="center" variant="h6">{t("Pages.Main.Offers")}</Typography>
                                            </Button>
                                        </Grid>

                                    </Grid>
                                    <Grid item xs={4}>
                                        <Grid item xs={6} sx={{
                                            display: 'flex',
                                            alignItems: 'flex-end',
                                        }}>
                                            <ImageComponent src={`${imgBaseHost}/common/offers.svg`} width={250} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid item xs={5}>
                        <Paper elevation={0} sx={{
                            p: 1,
                            ml: 2,
                            minHeight: 428
                        }}>
                            <BlogSection />
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}