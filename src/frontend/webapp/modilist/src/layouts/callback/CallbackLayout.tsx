import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { config } from "../../config";
import { AccountState } from "../../services/swagger/api";
import { Dispatch, RootState } from "../../store/store";
import Loading from "./Loading";

export default function Callback() {
    const { instance: msal } = useMsal();
    const navigate = useNavigate();
    const { isBusy: getAccountIsBusy, data: currentAccount, status: getAccountStatus } = useSelector((state: RootState) => state.getAccountModel);
    const { isBusy: createAccountIsBusy, data: createAccount, status: createAccountStatus } = useSelector((state: RootState) => state.createAccountModel);
    const [isBusy] = useState<boolean>(getAccountIsBusy || createAccountIsBusy);
    const dispatch = useDispatch<Dispatch>();

    useEffect(() => {
        // let activeAccount = msal.getActiveAccount();

        // console.log("initActiveAccount", activeAccount);

        // if (activeAccount === undefined || activeAccount === null) {
        //     const accounts = msal.getAllAccounts();

        //     if (accounts.length > 0) {
        //         activeAccount = accounts[0];
        //         msal.setActiveAccount(activeAccount);
        //     }
        // }

        // if (currentAccount?.id === "" && !isBusy) {
        //     if (activeAccount) {
        //         msal.acquireTokenSilent({
        //             ...config.loginRequest,
        //             account: activeAccount
        //         }).then((response) => {
                    
        //             console.log("tokenresp");
        //             dispatch.getAccountModel.getAccount();
        //         })
        //     }
        // }
    }, []);

    useEffect(() => {
        if (currentAccount !== undefined && currentAccount?.id !== "") {
            if (currentAccount.state === AccountState.Created && !isBusy) {
                navigate("/welcome/gender", { replace: true });
            }
            else {
                console.log("navigate");
                navigate("/", { replace: true });
            }
        }

    }, [currentAccount]);

    useEffect(() => {
        if (createAccountStatus === 200 && createAccount) {
            dispatch.getAccountModel.HANDLE_RESPONSE(createAccount, createAccountStatus);
        }
    }, [createAccountStatus])

    useEffect(() => {
        if (getAccountStatus === 404) {
            const activeAccount = msal.getActiveAccount();

            console.log("activeAccount", activeAccount);

            if (activeAccount && activeAccount.idTokenClaims) {
                dispatch.createAccountModel.createAccount({
                    id: (activeAccount.idTokenClaims as any)["oid"],
                    email: (activeAccount.idTokenClaims as any)["emails"][0]
                });
            }
        }
    }, [getAccountStatus]);

    return (
        <Loading />
    )
}