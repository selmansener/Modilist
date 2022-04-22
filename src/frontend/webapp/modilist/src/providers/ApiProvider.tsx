import { IPublicClientApplication } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import React, { PropsWithChildren } from "react";
import apiFactory from "../services/api";


type ApiProviderProps = PropsWithChildren<{}>

export default function ApiProvider(props?: ApiProviderProps) {
    const { instance } = useMsal();
    const api = apiFactory(instance);

    const ApiContext = React.createContext(api);

    return (
        <ApiContext.Provider value={(api)}>
            {props?.children}
        </ApiContext.Provider>
    )
}