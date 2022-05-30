import * as React from 'react';
import { useMsal } from "@azure/msal-react";
import { config } from '../../config';
import { useEffect, useState } from 'react';
import { AccountDTO } from '../../services/swagger/api/models';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '../../store/store';

export default function Unauthenticated() {
    const { instance } = useMsal();

    useEffect(() => {
        instance.loginRedirect(config.loginRequest)
            .catch(e => {
                console.log(e);
            });
    })

    return (
        <></>
    );
}