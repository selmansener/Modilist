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
import { StylePreferencesDTO } from '../models';
import { UpsertStylePreferences } from '../models';
/**
 * StylePreferencesApi - axios parameter creator
 * @export
 */
export const StylePreferencesApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} [apiVersion] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiV1StylePreferencesGetGet: async (apiVersion?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/v1/StylePreferences/Get`;
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
                    ? await configuration.accessToken("Bearer", ["https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Accounts", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/StylePreferences", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Addresses", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/PaymentMethods", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Subscriptions", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Products", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/SalesOrders", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Returns", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Development"])
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
         * @param {UpsertStylePreferences} [body] 
         * @param {string} [apiVersion] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiV1StylePreferencesUpsertPost: async (body?: UpsertStylePreferences, apiVersion?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/v1/StylePreferences/Upsert`;
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
                    ? await configuration.accessToken("Bearer", ["https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Accounts", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/StylePreferences", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Addresses", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/PaymentMethods", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Subscriptions", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Products", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/SalesOrders", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Returns", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Development"])
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
 * StylePreferencesApi - functional programming interface
 * @export
 */
export const StylePreferencesApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} [apiVersion] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiV1StylePreferencesGetGet(apiVersion?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<StylePreferencesDTO>>> {
            const localVarAxiosArgs = await StylePreferencesApiAxiosParamCreator(configuration).apiV1StylePreferencesGetGet(apiVersion, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {UpsertStylePreferences} [body] 
         * @param {string} [apiVersion] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiV1StylePreferencesUpsertPost(body?: UpsertStylePreferences, apiVersion?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<StylePreferencesDTO>>> {
            const localVarAxiosArgs = await StylePreferencesApiAxiosParamCreator(configuration).apiV1StylePreferencesUpsertPost(body, apiVersion, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * StylePreferencesApi - factory interface
 * @export
 */
export const StylePreferencesApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @param {string} [apiVersion] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiV1StylePreferencesGetGet(apiVersion?: string, options?: AxiosRequestConfig): Promise<AxiosResponse<StylePreferencesDTO>> {
            return StylePreferencesApiFp(configuration).apiV1StylePreferencesGetGet(apiVersion, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {UpsertStylePreferences} [body] 
         * @param {string} [apiVersion] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiV1StylePreferencesUpsertPost(body?: UpsertStylePreferences, apiVersion?: string, options?: AxiosRequestConfig): Promise<AxiosResponse<StylePreferencesDTO>> {
            return StylePreferencesApiFp(configuration).apiV1StylePreferencesUpsertPost(body, apiVersion, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * StylePreferencesApi - object-oriented interface
 * @export
 * @class StylePreferencesApi
 * @extends {BaseAPI}
 */
export class StylePreferencesApi extends BaseAPI {
    /**
     * 
     * @param {string} [apiVersion] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof StylePreferencesApi
     */
    public async apiV1StylePreferencesGetGet(apiVersion?: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<StylePreferencesDTO>> {
        return StylePreferencesApiFp(this.configuration).apiV1StylePreferencesGetGet(apiVersion, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {UpsertStylePreferences} [body] 
     * @param {string} [apiVersion] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof StylePreferencesApi
     */
    public async apiV1StylePreferencesUpsertPost(body?: UpsertStylePreferences, apiVersion?: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<StylePreferencesDTO>> {
        return StylePreferencesApiFp(this.configuration).apiV1StylePreferencesUpsertPost(body, apiVersion, options).then((request) => request(this.axios, this.basePath));
    }
}
