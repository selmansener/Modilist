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
import { CreateProductInputDTO } from '../models';
/**
 * TestApi - axios parameter creator
 * @export
 */
export const TestApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} [apiVersion] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiV1TestGet: async (apiVersion?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/v1/Test`;
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
                    ? await configuration.accessToken("Bearer", ["https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Test.Read"])
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
         * @param {CreateProductInputDTO} [body] 
         * @param {string} [apiVersion] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiV1TestPost: async (body?: CreateProductInputDTO, apiVersion?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/v1/Test`;
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
                    ? await configuration.accessToken("Bearer", ["https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Test.Read"])
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
 * TestApi - functional programming interface
 * @export
 */
export const TestApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} [apiVersion] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiV1TestGet(apiVersion?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await TestApiAxiosParamCreator(configuration).apiV1TestGet(apiVersion, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {CreateProductInputDTO} [body] 
         * @param {string} [apiVersion] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiV1TestPost(body?: CreateProductInputDTO, apiVersion?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<CreateProductInputDTO>>> {
            const localVarAxiosArgs = await TestApiAxiosParamCreator(configuration).apiV1TestPost(body, apiVersion, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * TestApi - factory interface
 * @export
 */
export const TestApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @param {string} [apiVersion] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiV1TestGet(apiVersion?: string, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return TestApiFp(configuration).apiV1TestGet(apiVersion, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {CreateProductInputDTO} [body] 
         * @param {string} [apiVersion] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiV1TestPost(body?: CreateProductInputDTO, apiVersion?: string, options?: AxiosRequestConfig): Promise<AxiosResponse<CreateProductInputDTO>> {
            return TestApiFp(configuration).apiV1TestPost(body, apiVersion, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * TestApi - object-oriented interface
 * @export
 * @class TestApi
 * @extends {BaseAPI}
 */
export class TestApi extends BaseAPI {
    /**
     * 
     * @param {string} [apiVersion] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TestApi
     */
    public async apiV1TestGet(apiVersion?: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return TestApiFp(this.configuration).apiV1TestGet(apiVersion, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {CreateProductInputDTO} [body] 
     * @param {string} [apiVersion] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TestApi
     */
    public async apiV1TestPost(body?: CreateProductInputDTO, apiVersion?: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<CreateProductInputDTO>> {
        return TestApiFp(this.configuration).apiV1TestPost(body, apiVersion, options).then((request) => request(this.axios, this.basePath));
    }
}
