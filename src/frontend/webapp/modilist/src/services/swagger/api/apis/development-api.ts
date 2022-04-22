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
import { SeedServiceType } from '../models';
/**
 * DevelopmentApi - axios parameter creator
 * @export
 */
export const DevelopmentApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {SeedServiceType} [seedServiceType] 
         * @param {boolean} [recreateDb] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiV1SeedPost: async (seedServiceType?: SeedServiceType, recreateDb?: boolean, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/v1/Seed`;
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

            if (seedServiceType !== undefined) {
                localVarQueryParameter['seedServiceType'] = seedServiceType;
            }

            if (recreateDb !== undefined) {
                localVarQueryParameter['recreateDb'] = recreateDb;
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
 * DevelopmentApi - functional programming interface
 * @export
 */
export const DevelopmentApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {SeedServiceType} [seedServiceType] 
         * @param {boolean} [recreateDb] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiV1SeedPost(seedServiceType?: SeedServiceType, recreateDb?: boolean, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await DevelopmentApiAxiosParamCreator(configuration).apiV1SeedPost(seedServiceType, recreateDb, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * DevelopmentApi - factory interface
 * @export
 */
export const DevelopmentApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @param {SeedServiceType} [seedServiceType] 
         * @param {boolean} [recreateDb] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiV1SeedPost(seedServiceType?: SeedServiceType, recreateDb?: boolean, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return DevelopmentApiFp(configuration).apiV1SeedPost(seedServiceType, recreateDb, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * DevelopmentApi - object-oriented interface
 * @export
 * @class DevelopmentApi
 * @extends {BaseAPI}
 */
export class DevelopmentApi extends BaseAPI {
    /**
     * 
     * @param {SeedServiceType} [seedServiceType] 
     * @param {boolean} [recreateDb] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DevelopmentApi
     */
    public async apiV1SeedPost(seedServiceType?: SeedServiceType, recreateDb?: boolean, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return DevelopmentApiFp(this.configuration).apiV1SeedPost(seedServiceType, recreateDb, options).then((request) => request(this.axios, this.basePath));
    }
}