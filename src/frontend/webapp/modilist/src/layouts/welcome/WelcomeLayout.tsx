import { AppBar, Box, Container, Grid, Toolbar, Typography } from "@mui/material";
import { useEffect } from "react";
import { RootState, Dispatch } from "../../store/store";
import { useDispatch, useSelector } from 'react-redux';
import { useMsal } from "@azure/msal-react";
import { Outlet, useNavigate } from "react-router-dom";
import { AccountState } from "../../services/swagger/api";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { ImageComponent } from "../../components/image/ImageComponent";

export interface WelcomeLayoutProps {
    title: string;
}

export default function WelcomeLayout(props: React.PropsWithChildren<WelcomeLayoutProps>) {
    const { instance: msal } = useMsal();
    const { title } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { isBusy: getAccountIsBusy, data: account, status: getAccountStatus } = useSelector((state: RootState) => state.getAccountModel);
    const dispatch = useDispatch<Dispatch>();

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
        <Box component="main">
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
    )
}
