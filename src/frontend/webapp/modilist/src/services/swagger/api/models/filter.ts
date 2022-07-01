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
import { FilterOperation } from './filter-operation';
import { LogicalOperator } from './logical-operator';
/**
 * 
 * @export
 * @interface Filter
 */
export interface Filter {
    /**
     * 
     * @type {string}
     * @memberof Filter
     */
    propertyName?: string | null;
    /**
     * 
     * @type {ModelObject}
     * @memberof Filter
     */
    value?: any | null;
    /**
     * 
     * @type {FilterOperation}
     * @memberof Filter
     */
    operator?: FilterOperation;
    /**
     * 
     * @type {boolean}
     * @memberof Filter
     */
    caseSensitive?: boolean;
    /**
     * 
     * @type {LogicalOperator}
     * @memberof Filter
     */
    logicalOperator?: LogicalOperator;
}
