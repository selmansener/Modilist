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
import { SalesOrderState } from './sales-order-state';
/**
 * 
 * @export
 * @interface ActiveSalesOrderDTO
 */
export interface ActiveSalesOrderDTO {
    /**
     * 
     * @type {number}
     * @memberof ActiveSalesOrderDTO
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof ActiveSalesOrderDTO
     */
    accountId?: string;
    /**
     * 
     * @type {SalesOrderState}
     * @memberof ActiveSalesOrderDTO
     */
    state?: SalesOrderState;
    /**
     * 
     * @type {string}
     * @memberof ActiveSalesOrderDTO
     */
    cargoState?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ActiveSalesOrderDTO
     */
    cargoTrackingCode?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof ActiveSalesOrderDTO
     */
    shippedAt?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof ActiveSalesOrderDTO
     */
    deliveredAt?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof ActiveSalesOrderDTO
     */
    completedAt?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof ActiveSalesOrderDTO
     */
    createdAt?: Date;
    /**
     * 
     * @type {SalesOrderAddressDTO}
     * @memberof ActiveSalesOrderDTO
     */
    salesOrderAddress?: SalesOrderAddressDTO;
    /**
     * 
     * @type {string}
     * @memberof ActiveSalesOrderDTO
     */
    additionalRequests?: string;
    /**
     * 
     * @type {string}
     * @memberof ActiveSalesOrderDTO
     */
    requestedStyle?: string;
}
