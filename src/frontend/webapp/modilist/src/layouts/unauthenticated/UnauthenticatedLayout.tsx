import * as React from 'react';
import { useMsal } from "@azure/msal-react";
import { config } from '../../config';

export default function Unauthenticated() {
    const { instance } = useMsal();

    instance.loginRedirect(config.loginRequest)
        .catch(e => {
            console.log(e);
        });

    React.useEffect(() => {
        document.title = "Modilist";
    }, []);

    return (
        <></>
    );
}