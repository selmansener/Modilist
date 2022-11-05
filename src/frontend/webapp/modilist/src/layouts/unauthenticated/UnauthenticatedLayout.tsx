import * as React from 'react';
import { useMsal } from "@azure/msal-react";
import { config } from '../../config';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export default function Unauthenticated() {
    const { instance } = useMsal();

    useEffect(() => {
        instance.loginRedirect(config.loginRequest)
            .catch(e => {
                console.log(e);
            });
    }, []);

    return (
        <React.Fragment>
            <Outlet />
        </React.Fragment>
    );
}