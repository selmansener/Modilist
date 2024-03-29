import { AccountApi, StylePreferencesApi, AddressApi, SizeInfoApi, PreferedFabricPropertiesApi, FitPreferencesApi, SubscriptionApi, SalesOrderApi, ReturnApi, BlogApi, PaymentApi, MessageApi, DiscountApi } from "./swagger/api";
import axios from 'axios';
import { InteractionRequiredAuthError, IPublicClientApplication } from "@azure/msal-browser";
import { config } from "../config";

export interface ModilistApi {
    accounts: AccountApi,
    stylePreferences: StylePreferencesApi,
    addresses: AddressApi,
    sizeInfos: SizeInfoApi,
    preferedFabricProperties: PreferedFabricPropertiesApi,
    fitPreferences: FitPreferencesApi,
    subscriptions: SubscriptionApi,
    paymentMethods: PaymentApi,
    salesOrders: SalesOrderApi,
    discounts: DiscountApi
}

export function apiFactory(msal: IPublicClientApplication) {
    axios.interceptors.request.use(
        async options => {
            const account = msal.getActiveAccount();

            if (!account) {
                return options;
            }

            const response = await msal.acquireTokenSilent({
                ...config.loginRequest,
                account
            }).catch(error => {
                if (error instanceof InteractionRequiredAuthError) {
                    msal.logoutRedirect({
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
                const account = msal.getActiveAccount();
                await msal.logoutRedirect({
                    account
                });
            }

            return error.response;
        });

    return {
        accounts: new AccountApi(undefined, config.webApi, axios),
        addresses: new AddressApi(undefined, config.webApi, axios),
        stylePreferences: new StylePreferencesApi(undefined, config.webApi, axios),
        sizeInfos: new SizeInfoApi(undefined, config.webApi, axios),
        preferedFabricProperties: new PreferedFabricPropertiesApi(undefined, config.webApi, axios),
        fitPreferences: new FitPreferencesApi(undefined, config.webApi, axios),
        subscriptions: new SubscriptionApi(undefined, config.webApi, axios),
        payments: new PaymentApi(undefined, config.webApi, axios),
        salesOrders: new SalesOrderApi(undefined, config.webApi, axios),
        returns: new ReturnApi(undefined, config.webApi, axios),
        blog: new BlogApi(undefined, config.webApi, axios),
        messages: new MessageApi(undefined, config.webApi),
        discounts: new DiscountApi(undefined, config.webApi, axios)
    }
}