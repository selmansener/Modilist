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
import { CreateReturn } from '../models';
import { ReturnDTO } from '../models';
/**
 * ReturnApi - axios parameter creator
 * @export
 */
export const ReturnApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {CreateReturn} [body] 
         * @param {string} [apiVersion] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiV1ReturnCreatePost: async (body?: CreateReturn, apiVersion?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/v1/Return.Create`;
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
                    ? await configuration.accessToken("Bearer", ["https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Accounts", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/StylePreferences", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Addresses", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/PaymentMethods", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Subscriptions", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Products", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/SalesOrders", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Returns", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Discounts", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Development"])
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
        /**
         * 
         * @param {number} salesOrderId 
         * @param {string} [apiVersion] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiV1ReturnGetSalesOrderIdGet: async (salesOrderId: number, apiVersion?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'salesOrderId' is not null or undefined
            if (salesOrderId === null || salesOrderId === undefined) {
                throw new RequiredError('salesOrderId','Required parameter salesOrderId was null or undefined when calling apiV1ReturnGetSalesOrderIdGet.');
            }
            const localVarPath = `/api/v1/Return.Get/{salesOrderId}`
                .replace(`{${"salesOrderId"}}`, encodeURIComponent(String(salesOrderId)));
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
                    ? await configuration.accessToken("Bearer", ["https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Accounts", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/StylePreferences", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Addresses", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/PaymentMethods", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Subscriptions", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Products", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/SalesOrders", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Returns", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Discounts", "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Development"])
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
    }
};

/**
 * ReturnApi - functional programming interface
 * @export
 */
export const ReturnApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {CreateReturn} [body] 
         * @param {string} [apiVersion] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiV1ReturnCreatePost(body?: CreateReturn, apiVersion?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<ReturnDTO>>> {
            const localVarAxiosArgs = await ReturnApiAxiosParamCreator(configuration).apiV1ReturnCreatePost(body, apiVersion, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {number} salesOrderId 
         * @param {string} [apiVersion] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiV1ReturnGetSalesOrderIdGet(salesOrderId: number, apiVersion?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<ReturnDTO>>> {
            const localVarAxiosArgs = await ReturnApiAxiosParamCreator(configuration).apiV1ReturnGetSalesOrderIdGet(salesOrderId, apiVersion, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * ReturnApi - factory interface
 * @export
 */
export const ReturnApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @param {CreateReturn} [body] 
         * @param {string} [apiVersion] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiV1ReturnCreatePost(body?: CreateReturn, apiVersion?: string, options?: AxiosRequestConfig): Promise<AxiosResponse<ReturnDTO>> {
            return ReturnApiFp(configuration).apiV1ReturnCreatePost(body, apiVersion, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} salesOrderId 
         * @param {string} [apiVersion] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiV1ReturnGetSalesOrderIdGet(salesOrderId: number, apiVersion?: string, options?: AxiosRequestConfig): Promise<AxiosResponse<ReturnDTO>> {
            return ReturnApiFp(configuration).apiV1ReturnGetSalesOrderIdGet(salesOrderId, apiVersion, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ReturnApi - object-oriented interface
 * @export
 * @class ReturnApi
 * @extends {BaseAPI}
 */
export class ReturnApi extends BaseAPI {
    /**
     * 
     * @param {CreateReturn} [body] 
     * @param {string} [apiVersion] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ReturnApi
     */
    public async apiV1ReturnCreatePost(body?: CreateReturn, apiVersion?: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<ReturnDTO>> {
        return ReturnApiFp(this.configuration).apiV1ReturnCreatePost(body, apiVersion, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {number} salesOrderId 
     * @param {string} [apiVersion] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ReturnApi
     */
    public async apiV1ReturnGetSalesOrderIdGet(salesOrderId: number, apiVersion?: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<ReturnDTO>> {
        return ReturnApiFp(this.configuration).apiV1ReturnGetSalesOrderIdGet(salesOrderId, apiVersion, options).then((request) => request(this.axios, this.basePath));
    }
}
