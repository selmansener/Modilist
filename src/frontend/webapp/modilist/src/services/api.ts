import { TestApiFactory, UserApiFactory } from "./swagger/api";
import axios from 'axios';
import { IPublicClientApplication } from "@azure/msal-browser";
import { config } from "../config";

export const apiFactory = function (msalInstance: IPublicClientApplication) {
    axios.interceptors.request.use(
        async options => {
            const account = msalInstance.getActiveAccount();
            const response = await msalInstance.acquireTokenSilent({
                ...config.loginRequest,
                account
            });

            if (!options || !options.headers) {
                throw Error("Cannot initialize api client");
            }

            options.headers.authorization = `Bearer ${response.accessToken}`;
            return options;
        },
        error => {
            Promise.reject(error);
        }
    );

    return {
        users: UserApiFactory(undefined, config.webApi, axios)
    }
}