import { AppBar, Box, Container, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { useEffect } from "react";
import { RootState, Dispatch } from "../../store/store";
import { useDispatch, useSelector } from 'react-redux';
import { useMsal } from "@azure/msal-react";
import { Outlet, useNavigate } from "react-router-dom";
import { AccountState } from "../../services/swagger/api";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { ImageComponent } from "../../components/image/ImageComponent";
import { DashboardFooter } from "../dashboard/DashboardFooter";
import LogoutIcon from '@mui/icons-material/Logout';
import { WelcomeFooter } from "./WelcomeFooter";

export interface WelcomeLayoutProps {
    title: string;
}

export default function WelcomeLayout(props: React.PropsWithChildren<WelcomeLayoutProps>) {
    const { instance: msal, accounts } = useMsal();
    const { title } = props;
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
                    {`${t(title)} | Modilist`}
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
                    mb: 2
                }}>
                    <Grid container>
                        <Outlet />
                    </Grid>
                </Container>
            </Box>
            <WelcomeFooter />
        </Box>
    )
}
