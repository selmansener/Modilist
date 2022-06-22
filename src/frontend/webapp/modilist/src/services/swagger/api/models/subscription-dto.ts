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
import { SubscriptionBlockingReason } from './subscription-blocking-reason';
import { SubscriptionState } from './subscription-state';
import { SubscriptionSuspentionReason } from './subscription-suspention-reason';
/**
 * 
 * @export
 * @interface SubscriptionDTO
 */
export interface SubscriptionDTO {
    /**
     * 
     * @type {Date}
     * @memberof SubscriptionDTO
     */
    startedAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof SubscriptionDTO
     */
    reactivatedAt?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof SubscriptionDTO
     */
    suspendedAt?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof SubscriptionDTO
     */
    blockedAt?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof SubscriptionDTO
     */
    closedAt?: Date | null;
    /**
     * 
     * @type {SubscriptionState}
     * @memberof SubscriptionDTO
     */
    state?: SubscriptionState;
    /**
     * 
     * @type {SubscriptionSuspentionReason}
     * @memberof SubscriptionDTO
     */
    suspentionReason?: SubscriptionSuspentionReason;
    /**
     * 
     * @type {SubscriptionBlockingReason}
     * @memberof SubscriptionDTO
     */
    blockingReason?: SubscriptionBlockingReason;
    /**
     * 
     * @type {number}
     * @memberof SubscriptionDTO
     */
    maxPricingLimit?: number;
}