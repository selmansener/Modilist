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
import { SalesOrderLineItemState } from './sales-order-line-item-state';
/**
 * 
 * @export
 * @interface AddSalesOrderLineItemDTO
 */
export interface AddSalesOrderLineItemDTO {
    /**
     * 
     * @type {number}
     * @memberof AddSalesOrderLineItemDTO
     */
    id?: number;
    /**
     * 
     * @type {number}
     * @memberof AddSalesOrderLineItemDTO
     */
    salesOrderId?: number;
    /**
     * 
     * @type {SalesOrderLineItemState}
     * @memberof AddSalesOrderLineItemDTO
     */
    state?: SalesOrderLineItemState;
    /**
     * 
     * @type {number}
     * @memberof AddSalesOrderLineItemDTO
     */
    productId?: number;
}
