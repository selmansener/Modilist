import { AppBar, Box, Container, Grid, Toolbar, Typography } from "@mui/material";
import { useEffect } from "react";
import { RootState, Dispatch } from "../../store/store";
import { useDispatch, useSelector } from 'react-redux';
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import { AccountState } from "../../services/swagger/api";

export interface WelcomeLayoutProps { }

export default function WelcomeLayout(props: React.PropsWithChildren<WelcomeLayoutProps>) {
    const { instance: msal } = useMsal();
    const navigate = useNavigate();
    const { isBusy: getAccountIsBusy, data: account, status: getAccountStatus } = useSelector((state: RootState) => state.getAccountModel);
    const dispatch = useDispatch<Dispatch>();

    useEffect(() => {
        document.title = "Hoşgeldiniz | Modilist";
    }, []);

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
            <AppBar position="static">
                <Toolbar>
                    <Typography sx={{ flexGrow: 1 }} align="center" color="#fff">
                        Modilist
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="xl" sx={{
                mt: 2,
                mb: 2
            }}>
                <Grid container>
                    {props.children}
                </Grid>
            </Container>
        </Box>
    )
}
