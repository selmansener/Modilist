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
 * @interface SalesOrderDTO
 */
export interface SalesOrderDTO {
    /**
     * 
     * @type {number}
     * @memberof SalesOrderDTO
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof SalesOrderDTO
     */
    accountId?: string;
    /**
     * 
     * @type {SalesOrderState}
     * @memberof SalesOrderDTO
     */
    state?: SalesOrderState;
    /**
     * 
     * @type {string}
     * @memberof SalesOrderDTO
     */
    cargoState?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SalesOrderDTO
     */
    cargoTrackingCode?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof SalesOrderDTO
     */
    shippedAt?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof SalesOrderDTO
     */
    deliveredAt?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof SalesOrderDTO
     */
    completedAt?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof SalesOrderDTO
     */
    createdAt?: Date;
    /**
     * 
     * @type {SalesOrderAddressDTO}
     * @memberof SalesOrderDTO
     */
    salesOrderAddress?: SalesOrderAddressDTO;
}
