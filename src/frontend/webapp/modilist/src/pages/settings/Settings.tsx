import { useMsal } from "@azure/msal-react";
import { Grid, MenuItem, MenuList, Paper, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { config } from "../../config";

export default function Settings() {
    const routePrefix = "/settings";
    const { instance: msal, accounts } = useMsal();
    const { resetRequest } = config;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();

    const resetPassword = () => {
        msal.loginRedirect({
            ...resetRequest,
            account: accounts[0]
        }).then(resp => console.log(resp)); 
    }

    const logout = () => {
        msal.logoutRedirect({
            account: accounts[0]
        });
    }

    const menuItems = [
        {
            path: `${routePrefix}/account`,
            title: "Layouts.Dashboard.Settings.PersonalInfo",
        },
        {
            path: `${routePrefix}/subscription`,
            title: "Layouts.Dashboard.Settings.SubscriptionInfo",
        },
        {
            path: `${routePrefix}/addresses`,
            title: "Layouts.Dashboard.Settings.Address",
        },
        {
            path: `${routePrefix}/payment-methods`,
            title: "Layouts.Dashboard.Settings.Payment",
        },
        // {
        //     path: `${routePrefix}/offers`,
        //     title: "Layouts.Dashboard.Settings.Offers",
        // },
    ]

    return (
        <Grid item container xs={12} spacing={4}>
            <Grid item xs={2}>
                <Typography variant="h4" color="primary">{t("Layouts.Dashboard.Settings.Title")}</Typography>
                <Paper elevation={0} variant="outlined" sx={{
                    mt: 2
                }}>
                    <MenuList>
                        {menuItems.map(item => {
                            return <MenuItem sx={location.pathname === item.path ? {
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText,
                                "&.MuiMenuItem-root:hover": {
                                  color: theme.palette.text.primary,
                                }
                              } : undefined} key={item.path} onClick={() => {
                                navigate(item.path);
                            }}>{t(item.title)}</MenuItem>
                        })}
                        <MenuItem onClick={resetPassword}>{t("Layouts.Dashboard.Settings.ResetPassword")}</MenuItem>
                        <MenuItem onClick={logout}>{t("Layouts.Dashboard.Settings.Logout")}</MenuItem>
                    </MenuList>
                </Paper>
            </Grid>
            <Grid item xs={10}>
                <Outlet />
            </Grid>
        </Grid>
    )
}