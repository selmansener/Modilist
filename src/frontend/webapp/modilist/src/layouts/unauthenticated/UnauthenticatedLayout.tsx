import * as React from 'react';
import { useMsal } from "@azure/msal-react";

export default function Unauthenticated() {
    const { instance } = useMsal();
    
    const loginRequest = {
        scopes: ["https://modilistauth.onmicrosoft.com/ae3eae4c-99f8-43ae-aae1-2139b03c3421/User.Read.All"]
    };

    instance.loginRedirect(loginRequest).catch(e => {
        console.log(e);
    });

    return (
        <></>
    );
}