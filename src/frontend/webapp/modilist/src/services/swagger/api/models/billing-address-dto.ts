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
import { BillingType } from './billing-type';
/**
 * 
 * @export
 * @interface BillingAddressDTO
 */
export interface BillingAddressDTO {
    /**
     * 
     * @type {string}
     * @memberof BillingAddressDTO
     */
    fullName?: string;
    /**
     * 
     * @type {string}
     * @memberof BillingAddressDTO
     */
    idNumber?: string;
    /**
     * 
     * @type {string}
     * @memberof BillingAddressDTO
     */
    addressName?: string;
    /**
     * 
     * @type {string}
     * @memberof BillingAddressDTO
     */
    phone?: string;
    /**
     * 
     * @type {string}
     * @memberof BillingAddressDTO
     */
    zipCode?: string;
    /**
     * 
     * @type {string}
     * @memberof BillingAddressDTO
     */
    city?: string;
    /**
     * 
     * @type {string}
     * @memberof BillingAddressDTO
     */
    country?: string;
    /**
     * 
     * @type {string}
     * @memberof BillingAddressDTO
     */
    district?: string;
    /**
     * 
     * @type {string}
     * @memberof BillingAddressDTO
     */
    fullAddress?: string;
    /**
     * 
     * @type {string}
     * @memberof BillingAddressDTO
     */
    companyName?: string;
    /**
     * 
     * @type {string}
     * @memberof BillingAddressDTO
     */
    email?: string;
    /**
     * 
     * @type {string}
     * @memberof BillingAddressDTO
     */
    taxNumber?: string;
    /**
     * 
     * @type {BillingType}
     * @memberof BillingAddressDTO
     */
    billingType?: BillingType;
}
