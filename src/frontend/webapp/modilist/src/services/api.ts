import { AddressApiFactory, StylePreferencesApiFactory, UserApiFactory } from "./swagger/api";
import axios, { AxiosRequestConfig } from 'axios';
import { InteractionRequiredAuthError, IPublicClientApplication } from "@azure/msal-browser";
import { config } from "../config";

export const apiFactory = function (msalInstance: IPublicClientApplication) {
    axios.interceptors.request.use(
        async (config: AxiosRequestConfig) => {
            if (config.headers === undefined) {
                config.headers = {};
            }
            // ...
            return config;
        },
        (error) => error
    );

    axios.interceptors.request.use(
        async options => {
            const account = msalInstance.getActiveAccount();

            if (!account) {
                return options;
            }

            const response = await msalInstance.acquireTokenSilent({
                ...config.loginRequest,
                account
            }).catch(error => {
                if (error instanceof InteractionRequiredAuthError) {
                    msalInstance.logoutRedirect({
                        account
                    });
                }
            });

            if (!options || !options.headers) {
                throw Error("Cannot initialize api client");
            }

            options.headers.authorization = `Bearer ${response?.accessToken}`;
            return options;
        },
        error => {
            Promise.reject(error);
        }
    );

    axios.interceptors.response.use(undefined,
        async error => {
            if (error instanceof InteractionRequiredAuthError) {
                const account = msalInstance.getActiveAccount();
                await msalInstance.logoutRedirect({
                    account
                });
            }

            return error.response;
        });

    return {
        users: UserApiFactory(undefined, config.webApi, axios),
        stylePreferences: StylePreferencesApiFactory(undefined, config.webApi, axios),
        addresses: AddressApiFactory(undefined, config.webApi, axios)
    }
}