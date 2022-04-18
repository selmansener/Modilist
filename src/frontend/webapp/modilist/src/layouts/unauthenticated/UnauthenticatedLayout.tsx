import * as React from 'react';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from '../../config/auth/msalConfig';

export default function Unauthenticated() {
    const { instance } = useMsal();
    
    instance.loginRedirect(loginRequest)
    .catch(e => {
        console.log(e);
    });

    return (
        <></>
    );
}