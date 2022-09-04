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
import { SendMail } from '../models';
/**
 * MessageApi - axios parameter creator
 * @export
 */
export const MessageApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {SendMail} [body] 
         * @param {string} [apiVersion] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiV1MessageSendEmailPost: async (body?: SendMail, apiVersion?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/v1/Message.SendEmail`;
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
        /**
         * 
         * @param {string} [templateId] 
         * @param {string} [senderName] 
         * @param {string} [from] 
         * @param {string} [to] 
         * @param {string} [templateData] 
         * @param {Array<Blob>} [attachments] 
         * @param {string} [apiVersion] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiV1MessageSendEmailWithAttachmentsPostForm: async (templateId?: string, senderName?: string, from?: string, to?: string, templateData?: string, attachments?: Array<Blob>, apiVersion?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/v1/Message.SendEmailWithAttachments`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;
            const localVarFormParams = new FormData();

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


            if (templateId !== undefined) { 
                localVarFormParams.append('TemplateId', templateId as any);
            }

            if (senderName !== undefined) { 
                localVarFormParams.append('SenderName', senderName as any);
            }

            if (from !== undefined) { 
                localVarFormParams.append('From', from as any);
            }

            if (to !== undefined) { 
                localVarFormParams.append('To', to as any);
            }

            if (templateData !== undefined) { 
                localVarFormParams.append('TemplateData', templateData as any);
            }
            if (attachments) {
                attachments.forEach((element) => {
                    localVarFormParams.append('Attachments', element as any);
                })
            }

            localVarHeaderParameter['Content-Type'] = 'multipart/form-data';
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
            localVarRequestOptions.data = localVarFormParams;

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * MessageApi - functional programming interface
 * @export
 */
export const MessageApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {SendMail} [body] 
         * @param {string} [apiVersion] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiV1MessageSendEmailPost(body?: SendMail, apiVersion?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await MessageApiAxiosParamCreator(configuration).apiV1MessageSendEmailPost(body, apiVersion, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {string} [templateId] 
         * @param {string} [senderName] 
         * @param {string} [from] 
         * @param {string} [to] 
         * @param {string} [templateData] 
         * @param {Array<Blob>} [attachments] 
         * @param {string} [apiVersion] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiV1MessageSendEmailWithAttachmentsPostForm(templateId?: string, senderName?: string, from?: string, to?: string, templateData?: string, attachments?: Array<Blob>, apiVersion?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await MessageApiAxiosParamCreator(configuration).apiV1MessageSendEmailWithAttachmentsPostForm(templateId, senderName, from, to, templateData, attachments, apiVersion, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * MessageApi - factory interface
 * @export
 */
export const MessageApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @param {SendMail} [body] 
         * @param {string} [apiVersion] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiV1MessageSendEmailPost(body?: SendMail, apiVersion?: string, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return MessageApiFp(configuration).apiV1MessageSendEmailPost(body, apiVersion, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} [templateId] 
         * @param {string} [senderName] 
         * @param {string} [from] 
         * @param {string} [to] 
         * @param {string} [templateData] 
         * @param {Array<Blob>} [attachments] 
         * @param {string} [apiVersion] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiV1MessageSendEmailWithAttachmentsPostForm(templateId?: string, senderName?: string, from?: string, to?: string, templateData?: string, attachments?: Array<Blob>, apiVersion?: string, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return MessageApiFp(configuration).apiV1MessageSendEmailWithAttachmentsPostForm(templateId, senderName, from, to, templateData, attachments, apiVersion, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * MessageApi - object-oriented interface
 * @export
 * @class MessageApi
 * @extends {BaseAPI}
 */
export class MessageApi extends BaseAPI {
    /**
     * 
     * @param {SendMail} [body] 
     * @param {string} [apiVersion] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MessageApi
     */
    public async apiV1MessageSendEmailPost(body?: SendMail, apiVersion?: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return MessageApiFp(this.configuration).apiV1MessageSendEmailPost(body, apiVersion, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {string} [templateId] 
     * @param {string} [senderName] 
     * @param {string} [from] 
     * @param {string} [to] 
     * @param {string} [templateData] 
     * @param {Array<Blob>} [attachments] 
     * @param {string} [apiVersion] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MessageApi
     */
    public async apiV1MessageSendEmailWithAttachmentsPostForm(templateId?: string, senderName?: string, from?: string, to?: string, templateData?: string, attachments?: Array<Blob>, apiVersion?: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return MessageApiFp(this.configuration).apiV1MessageSendEmailWithAttachmentsPostForm(templateId, senderName, from, to, templateData, attachments, apiVersion, options).then((request) => request(this.axios, this.basePath));
    }
}
