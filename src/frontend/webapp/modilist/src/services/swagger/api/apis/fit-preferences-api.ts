/* tslint:disable */
/* eslint-disable */
/**
 * ModilistAPI
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import globalAxios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { FitPreferencesDTO } from '../models';
import { UpsertFitPreferences } from '../models';
/**
 * FitPreferencesApi - axios parameter creator
 * @export
 */
export const FitPreferencesApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} [apiVersion] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiV1FitPreferencesGetGet: async (apiVersion?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/v1/FitPreferences/Get`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // oauth required
            if (configuration && configuration.accessToken) {
                const localVarAccessTokenValue = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken("Bearer", ["https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Accounts.Get", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Accounts.Create", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Accounts.Update", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/StylePreferences.Get", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/StylePreferences.Create", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/StylePreferences.Update", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Address.Get", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Address.Create", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Address.Update", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/SizeInfo.Get", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/SizeInfo.Upsert", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/PreferedFabricProperties.Get", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/PreferedFabricProperties.Upsert", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/FitPreferences.Get", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/FitPreferences.Upsert", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/PaymentMethods.Create", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Subscriptions.Get", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Subscriptions.Create", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Subscriptions.Update", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Products.Get", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Products.Create", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Products.Update", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/SalesOrders.Get", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/SalesOrders.Create", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/SalesOrders.Update", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Development"])
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + localVarAccessTokenValue;
            }

            if (apiVersion !== undefined) {
                localVarQueryParameter['api-version'] = apiVersion;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {UpsertFitPreferences} [body] 
         * @param {string} [apiVersion] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiV1FitPreferencesUpsertPost: async (body?: UpsertFitPreferences, apiVersion?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/v1/FitPreferences/Upsert`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // oauth required
            if (configuration && configuration.accessToken) {
                const localVarAccessTokenValue = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken("Bearer", ["https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Accounts.Get", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Accounts.Create", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Accounts.Update", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/StylePreferences.Get", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/StylePreferences.Create", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/StylePreferences.Update", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Address.Get", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Address.Create", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Address.Update", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/SizeInfo.Get", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/SizeInfo.Upsert", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/PreferedFabricProperties.Get", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/PreferedFabricProperties.Upsert", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/FitPreferences.Get", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/FitPreferences.Upsert", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/PaymentMethods.Create", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Subscriptions.Get", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Subscriptions.Create", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Subscriptions.Update", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Products.Get", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Products.Create", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Products.Update", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/SalesOrders.Get", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/SalesOrders.Create", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/SalesOrders.Update", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Development"])
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + localVarAccessTokenValue;
            }

            if (apiVersion !== undefined) {
                localVarQueryParameter['api-version'] = apiVersion;
            }

            localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || (localVarRequestOptions.headers && localVarRequestOptions.headers['Content-Type'] === 'application/json');
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * FitPreferencesApi - functional programming interface
 * @export
 */
export const FitPreferencesApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} [apiVersion] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiV1FitPreferencesGetGet(apiVersion?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<FitPreferencesDTO>>> {
            const localVarAxiosArgs = await FitPreferencesApiAxiosParamCreator(configuration).apiV1FitPreferencesGetGet(apiVersion, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {UpsertFitPreferences} [body] 
         * @param {string} [apiVersion] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiV1FitPreferencesUpsertPost(body?: UpsertFitPreferences, apiVersion?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<FitPreferencesDTO>>> {
            const localVarAxiosArgs = await FitPreferencesApiAxiosParamCreator(configuration).apiV1FitPreferencesUpsertPost(body, apiVersion, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * FitPreferencesApi - factory interface
 * @export
 */
export const FitPreferencesApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @param {string} [apiVersion] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiV1FitPreferencesGetGet(apiVersion?: string, options?: AxiosRequestConfig): Promise<AxiosResponse<FitPreferencesDTO>> {
            return FitPreferencesApiFp(configuration).apiV1FitPreferencesGetGet(apiVersion, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {UpsertFitPreferences} [body] 
         * @param {string} [apiVersion] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiV1FitPreferencesUpsertPost(body?: UpsertFitPreferences, apiVersion?: string, options?: AxiosRequestConfig): Promise<AxiosResponse<FitPreferencesDTO>> {
            return FitPreferencesApiFp(configuration).apiV1FitPreferencesUpsertPost(body, apiVersion, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * FitPreferencesApi - object-oriented interface
 * @export
 * @class FitPreferencesApi
 * @extends {BaseAPI}
 */
export class FitPreferencesApi extends BaseAPI {
    /**
     * 
     * @param {string} [apiVersion] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FitPreferencesApi
     */
    public async apiV1FitPreferencesGetGet(apiVersion?: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<FitPreferencesDTO>> {
        return FitPreferencesApiFp(this.configuration).apiV1FitPreferencesGetGet(apiVersion, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {UpsertFitPreferences} [body] 
     * @param {string} [apiVersion] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FitPreferencesApi
     */
    public async apiV1FitPreferencesUpsertPost(body?: UpsertFitPreferences, apiVersion?: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<FitPreferencesDTO>> {
        return FitPreferencesApiFp(this.configuration).apiV1FitPreferencesUpsertPost(body, apiVersion, options).then((request) => request(this.axios, this.basePath));
    }
}
