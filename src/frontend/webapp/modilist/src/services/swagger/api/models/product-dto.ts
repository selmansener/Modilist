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
import { ProductImageDTO } from './product-image-dto';
/**
 * 
 * @export
 * @interface ProductDTO
 */
export interface ProductDTO {
    /**
     * 
     * @type {number}
     * @memberof ProductDTO
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof ProductDTO
     */
    sku?: string;
    /**
     * 
     * @type {string}
     * @memberof ProductDTO
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof ProductDTO
     */
    category?: string;
    /**
     * 
     * @type {string}
     * @memberof ProductDTO
     */
    brand?: string | null;
    /**
     * 
     * @type {number}
     * @memberof ProductDTO
     */
    price?: number;
    /**
     * 
     * @type {number}
     * @memberof ProductDTO
     */
    priceWithoutVAT?: number;
    /**
     * 
     * @type {number}
     * @memberof ProductDTO
     */
    vat?: number;
    /**
     * 
     * @type {string}
     * @memberof ProductDTO
     */
    size?: string;
    /**
     * 
     * @type {Array<ProductImageDTO>}
     * @memberof ProductDTO
     */
    images?: Array<ProductImageDTO>;
}
