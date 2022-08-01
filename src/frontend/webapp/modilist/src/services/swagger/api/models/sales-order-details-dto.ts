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
import { SalesOrderAddressDTO } from './sales-order-address-dto';
import { SalesOrderLineItemDTO } from './sales-order-line-item-dto';
import { SalesOrderState } from './sales-order-state';
/**
 * 
 * @export
 * @interface SalesOrderDetailsDTO
 */
export interface SalesOrderDetailsDTO {
    /**
     * 
     * @type {number}
     * @memberof SalesOrderDetailsDTO
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof SalesOrderDetailsDTO
     */
    accountId?: string;
    /**
     * 
     * @type {SalesOrderState}
     * @memberof SalesOrderDetailsDTO
     */
    state?: SalesOrderState;
    /**
     * 
     * @type {string}
     * @memberof SalesOrderDetailsDTO
     */
    cargoState?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SalesOrderDetailsDTO
     */
    cargoTrackingCode?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof SalesOrderDetailsDTO
     */
    shippedAt?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof SalesOrderDetailsDTO
     */
    deliveredAt?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof SalesOrderDetailsDTO
     */
    completedAt?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof SalesOrderDetailsDTO
     */
    createdAt?: Date;
    /**
     * 
     * @type {Array<SalesOrderLineItemDTO>}
     * @memberof SalesOrderDetailsDTO
     */
    lineItems?: Array<SalesOrderLineItemDTO>;
    /**
     * 
     * @type {SalesOrderAddressDTO}
     * @memberof SalesOrderDetailsDTO
     */
    salesOrderAddress?: SalesOrderAddressDTO;
}