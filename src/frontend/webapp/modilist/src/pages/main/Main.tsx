import { AuthError, InteractionRequiredAuthError } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { config } from "../../config";
import { Dispatch, RootState } from "../../store/store";

export function Main() {
    const { instance, accounts } = useMsal();

    return (
        <>
            <Typography variant="h1">Main</Typography>
            <Button onClick={() => {
                const account = instance.getActiveAccount();

                if (!account) {
                    return;
                }

                instance.acquireTokenRedirect({
                    account: account,
                    scopes: config.loginRequest.scopes,
                    authority: "https://modilistauth.b2clogin.com/modilistauth.onmicrosoft.com/B2C_1_edit_profile"
                })
            }}>
                <Typography>Edit profile</Typography>
            </Button>
        </>
    )
}