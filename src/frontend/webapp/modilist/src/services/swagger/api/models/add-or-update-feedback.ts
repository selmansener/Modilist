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
import { LineItemSizeFeedback } from './line-item-size-feedback';
import { SalesOrderLineItemState } from './sales-order-line-item-state';
/**
 * 
 * @export
 * @interface AddOrUpdateFeedback
 */
export interface AddOrUpdateFeedback {
    /**
     * 
     * @type {SalesOrderLineItemState}
     * @memberof AddOrUpdateFeedback
     */
    lineItemState?: SalesOrderLineItemState;
    /**
     * 
     * @type {number}
     * @memberof AddOrUpdateFeedback
     */
    price?: number;
    /**
     * 
     * @type {LineItemSizeFeedback}
     * @memberof AddOrUpdateFeedback
     */
    size?: LineItemSizeFeedback;
    /**
     * 
     * @type {number}
     * @memberof AddOrUpdateFeedback
     */
    style?: number;
    /**
     * 
     * @type {number}
     * @memberof AddOrUpdateFeedback
     */
    fit?: number;
    /**
     * 
     * @type {number}
     * @memberof AddOrUpdateFeedback
     */
    color?: number;
    /**
     * 
     * @type {number}
     * @memberof AddOrUpdateFeedback
     */
    quality?: number;
    /**
     * 
     * @type {number}
     * @memberof AddOrUpdateFeedback
     */
    fabric?: number;
    /**
     * 
     * @type {number}
     * @memberof AddOrUpdateFeedback
     */
    pattern?: number;
    /**
     * 
     * @type {number}
     * @memberof AddOrUpdateFeedback
     */
    perfectMatch?: number;
    /**
     * 
     * @type {boolean}
     * @memberof AddOrUpdateFeedback
     */
    sendSimilarProducts?: boolean;
    /**
     * 
     * @type {number}
     * @memberof AddOrUpdateFeedback
     */
    brand?: number;
    /**
     * 
     * @type {string}
     * @memberof AddOrUpdateFeedback
     */
    additionalNotes?: string | null;
}
