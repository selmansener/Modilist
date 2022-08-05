import { Box, Divider, Grid, Link, MenuItem, Select, SelectChangeEvent, Typography, useTheme } from "@mui/material";
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

const supportedLanguages = [
    {
        code: "tr",
        lang: "Türkçe",
        iconCode: "tr"
    },
    {
        code: "en",
        lang: "English",
        iconCode: "us"
    },
]

export function DashboardFooter() {
    const theme = useTheme();
    const { t, i18n } = useTranslation();
    const { instagram, facebook, twitter, linkedIn } = config.socialMediaLinks;
    const { imgBaseHost } = config;

    const handleLanguageChange = (event: SelectChangeEvent) => {
        let lang;
        switch (event.target.value) {
            case "en":
            case "en-GB":
            case "en-US":
                lang = "en";
                break;
            case "tr":
                lang = "tr";
        }

        i18n.changeLanguage(lang);
    }

    return (
        <Box component="footer" sx={{
            ml: 2,
        }}>
            <Grid container spacing={2} sx={{
                backgroundColor: theme.palette.primary.main
            }}>
                <Grid item container xs={12} spacing={2}>
                    <Grid item container xs={4} spacing={2} alignContent="center">
                        <Grid item xs={12}>
                            <ImageComponent src="/modilist-logo-large.png" asBackground height={150} />
                        </Grid>
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
                        <Grid item xs={12}>
                        </Grid>
                    </Grid>
                    <Grid item container xs={4} spacing={2}>
                        <Grid item xs={6} sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-evenly',
                            alignItems: 'flex-start'
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
                            justifyContent: 'space-evenly',
                            alignItems: 'flex-start'
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
                    <Grid item container xs={4} >
                        <Grid item xs={12} sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end'
                        }}>
                            <Select
                                value={i18n.language}
                                onChange={handleLanguageChange}
                                sx={{ mr: 2, backgroundColor: "#fff" }}
                            >
                                {supportedLanguages.map(supportedLang => (
                                    <MenuItem value={supportedLang.code} key={supportedLang.lang}>
                                        <img
                                            loading="lazy"
                                            width="20"
                                            src={`https://flagcdn.com/w20/${supportedLang.iconCode}.png`}
                                            srcSet={`https://flagcdn.com/w40/${supportedLang.iconCode}.png 2x`}
                                            alt={supportedLang.code}
                                        />
                                        <Typography variant="caption" sx={{ pl: 1 }}>
                                            {supportedLang.lang}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} display="flex" justifyContent="flex-end" alignItems="flex-end" pr={2}>
                            <ImageComponent src={`${imgBaseHost}/common/iyzico-footer-white.png`} height={25} />
                        </Grid>
                    </Grid>
                    {/* <Grid item container xs={4} spacing={2} color="#fff">
                    </Grid> */}
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