import { TestApiFactory } from "./swagger/api";
import axios from 'axios';
import { IPublicClientApplication } from "@azure/msal-browser";
import { config } from "../config";

const apiFactory = function (msalInstance: IPublicClientApplication) {
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
        test: TestApiFactory(undefined, config.msalConfig.apiConfig.webApi, axios)
    }
}

export default apiFactory;