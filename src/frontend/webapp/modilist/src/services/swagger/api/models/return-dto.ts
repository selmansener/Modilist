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
import { ReturnAddressDTO } from './return-address-dto';
/**
 * 
 * @export
 * @interface ReturnDTO
 */
export interface ReturnDTO {
    /**
     * 
     * @type {number}
     * @memberof ReturnDTO
     */
    id?: number;
    /**
     * 
     * @type {number}
     * @memberof ReturnDTO
     */
    salesOrderId?: number;
    /**
     * 
     * @type {ReturnAddressDTO}
     * @memberof ReturnDTO
     */
    returnAddress?: ReturnAddressDTO;
    /**
     * 
     * @type {string}
     * @memberof ReturnDTO
     */
    cargoTrackingCode?: string;
    /**
     * 
     * @type {Date}
     * @memberof ReturnDTO
     */
    requestedPickupDate?: Date;
}
