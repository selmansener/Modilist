import { AppBar, Box, Container, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { useEffect } from "react";
import { RootState, Dispatch } from "../../store/store";
import { useDispatch, useSelector } from 'react-redux';
import { useMsal } from "@azure/msal-react";
import { Link, Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import { AccountState } from "../../services/swagger/api";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { ImageComponent } from "../../components/image/ImageComponent";
import LogoutIcon from '@mui/icons-material/Logout';
import { WelcomeFooter } from "./WelcomeFooter";
import { RouteConfig } from "../../router/routes";
import React from "react";
import { WelcomeSteps } from "../../pages/welcome/WelcomeSteps";

export default function WelcomeLayout() {
    const { instance: msal, accounts } = useMsal();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { isBusy: getAccountIsBusy, data: account, status: getAccountStatus } = useSelector((state: RootState) => state.getAccountModel);
    const dispatch = useDispatch<Dispatch>();

    const logout = () => {
        msal.logoutRedirect({
            account: accounts[0]
        });
    }

    useEffect(() => {
        if (!getAccountIsBusy && account?.id === "") {
            dispatch.getAccountModel.getAccount();
        }
    }, []);

    useEffect(() => {
        if (account?.id === "") {
            if (getAccountStatus === 404) {
                const activeAccount = msal.getActiveAccount();

                if (activeAccount && activeAccount.idTokenClaims) {
                    dispatch.createAccountModel.createAccount({
                        id: (activeAccount.idTokenClaims as any)["oid"],
                        email: (activeAccount.idTokenClaims as any)["emails"][0]
                    });
                }
            }

            return;
        }

        if (account?.state === AccountState.Active) {
            navigate("/", { replace: true });
        }

    }, [getAccountStatus]);

    return (
        <Box>
            <Box component="main" mb={8}>
                <Helmet>
                    <title>{`Bak bu sana yakışır | Modilist`}</title>
                </Helmet>
                <AppBar position="static">
                    <Toolbar>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexGrow: 1
                        }}>
                            <Link to="/style-form/gender-selection">
                                <ImageComponent width={200} src="/whitehorizontallogo.svg" />
                            </Link>
                        </Box>
                        <IconButton
                            size="large"
                            onClick={logout}
                            color="inherit"
                            sx={{
                                display: { xs: 'none', sm: 'inline' },
                            }}
                        >
                            <LogoutIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="xl" sx={{
                    mt: 4,
                    mb: 2,
                    minHeight: `${window.innerHeight - 465}px`
                }}>
                    <Grid container>
                        <Outlet />
                    </Grid>
                </Container>
            </Box>
            <WelcomeFooter />
            <ScrollRestoration />
        </Box>
    )
}

const GenderSelectionPage = React.lazy(() => import("../../pages/welcome/GenderSelection"));
const SizeInfoPage = React.lazy(() => import("../../pages/welcome/SizeInfo"));
const StylePreferencesPage = React.lazy(() => import("../../pages/welcome/StylePreferences"));
const FitPreferencesPage = React.lazy(() => import("../../pages/welcome/FitPreferences"));
const FabricPreferencesPage = React.lazy(() => import("../../pages/welcome/FabricProperties"));
const SubscriptionPage = React.lazy(() => import("../../pages/welcome/Subscription"));

export const welcomeRoutes: RouteConfig = {
    path: "/style-form",
    element: <WelcomeLayout />,
    isPublic: false,
    leafNodes: [
        {
            path: "gender-selection",
            element: <GenderSelectionPage />
        },
        {
            path: "step",
            element: <WelcomeSteps />,
            leafNodes: [
                {
                    path: "size-info",
                    element: <SizeInfoPage />
                },
                {
                    path: "style-preferences",
                    element: <StylePreferencesPage />,
                },
                {
                    path: "fit-preferences",
                    element: <FitPreferencesPage />,
                },
                {
                    path: "fabric-preferences",
                    element: <FabricPreferencesPage />,
                },
                {
                    path: "subscription",
                    element: <SubscriptionPage />,
                }
            ]
        }
    ]
}

