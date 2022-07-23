import { Box, Divider, Grid, Link, Typography, useTheme } from "@mui/material";
import { NavLink } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { ImageComponent } from "../../components/image/ImageComponent";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { config } from "../../config";

function Copyright(props: any) {
    return (
        <Typography variant="body2" align="center" {...props} sx={{
            mb: 2
        }}>
            {'Copyright © '}
            Modilist
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export function DashboardFooter() {
    const theme = useTheme();
    const { t } = useTranslation();
    const { instagram, facebook, twitter, linkedIn } = config.socialMediaLinks;

    return (
        <Box component="footer">
            <Grid container spacing={2} sx={{
                backgroundColor: theme.palette.primary.main
            }}>
                <Grid item container xs={12} spacing={2}>
                    <Grid item container xs={4} spacing={2} alignContent="center">
                        <Grid item xs={12}>
                            <Typography variant="h4" color="#fff" align="center">
                                {t("Layouts.Dashboard.Footer.FollowUs")}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} alignContent="center" textAlign="center">
                            <Link href={instagram} target="_blank" color="#fff" sx={{
                                px: [1]
                            }}>
                                <InstagramIcon />
                            </Link>
                            <Link href={facebook} target="_blank" color="#fff" sx={{
                                px: [1]
                            }}>
                                <FacebookIcon />
                            </Link>
                            <Link href={twitter} target="_blank" color="#fff" sx={{
                                px: [1]
                            }}>
                                <TwitterIcon />
                            </Link>
                            <Link href={linkedIn} target="_blank" color="#fff" sx={{
                                px: [1]
                            }}>
                                <LinkedInIcon />
                            </Link>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <ImageComponent src="/modilist-logo-large.png" asBackground height={150} />
                    </Grid>
                    <Grid item container xs={4} spacing={2} color="#fff">
                        <Grid item xs={6} sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-around'
                        }}>
                            <NavLink to={"#"}>
                                <Typography color="#fff">
                                    {t("Layouts.Dashboard.Footer.Links.AboutUs")}
                                </Typography>
                            </NavLink>
                            <NavLink to={"#"}>
                                <Typography color="#fff">
                                    {t("Layouts.Dashboard.Footer.Links.FAQ")}
                                </Typography>
                            </NavLink>
                            <NavLink to={"#"}>
                                <Typography color="#fff">
                                    {t("Layouts.Dashboard.Footer.Links.Partnership")}
                                </Typography>
                            </NavLink>
                            <NavLink to={"#"}>
                                <Typography color="#fff">
                                    {t("Layouts.Dashboard.Footer.Links.OpenPositions")}
                                </Typography>
                            </NavLink>
                            <NavLink to={"#"}>
                                <Typography color="#fff">
                                    {t("Layouts.Dashboard.Footer.Links.DeveloperAPI")}
                                </Typography>
                            </NavLink>
                        </Grid>
                        <Grid item xs={6} sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-around'
                        }}>
                            <NavLink to={"#"}>
                                <Typography color="#fff">
                                    {t("Layouts.Dashboard.Footer.Links.KVKK")}
                                </Typography>
                            </NavLink>
                            <NavLink to={"#"}>
                                <Typography color="#fff">
                                    {t("Layouts.Dashboard.Footer.Links.OnlineSalesAgreement")}
                                </Typography>
                            </NavLink>
                            <NavLink to={"#"}>
                                <Typography color="#fff">
                                    {t("Layouts.Dashboard.Footer.Links.PrivacyAndCookiePolicies")}
                                </Typography>
                            </NavLink>
                            <NavLink to={"#"}>
                                <Typography color="#fff">
                                    {t("Layouts.Dashboard.Footer.Links.UsageAgreement")}
                                </Typography>
                            </NavLink>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider color="#fff" />
                    </Grid>
                    <Grid item xs={12}>
                        <Copyright color={theme.palette.primary.contrastText} />
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}