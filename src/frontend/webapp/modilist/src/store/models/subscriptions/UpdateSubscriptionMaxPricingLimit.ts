import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../..";
import { SubscriptionDTO, SubscriptionState, SubscriptionSuspentionReason, SubscriptionBlockingReason, UpdateSubscriptionMaxPricingLimit } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const updateSubscriptionMaxPricingLimitModel = createModel<RootModel>()({
    state: {
        isBusy: false,
        data: {
            startedAt : undefined,
            reactivatedAt: undefined,
            suspendedAt: undefined,
            blockedAt: undefined,
            closedAt: undefined,
            state : SubscriptionState.None,
            suspentionReason : SubscriptionSuspentionReason.None,
            blockingReason : SubscriptionBlockingReason.None,
            maxPricingLimit: 0,
        },
        status: 0
    } as ResponseModel<SubscriptionDTO>,
    reducers: {
        BUSY: (state: ResponseModel<SubscriptionDTO>) => {
            return {
                ...state,
                isBusy: true
            }
        },
        HANDLE_RESPONSE: (state: ResponseModel<SubscriptionDTO>, data: SubscriptionDTO, status: number) => {
            return {
                ...state,
                data: {
                    ...data
                },
                isBusy: false,
                status
            }
        },
        HANDLE_EXCEPTION: (state: ResponseModel<SubscriptionDTO>, status: number) => {
            return {
                ...state,
                status
            }
        }
    },
    effects: (dispatch) => {
        const { updateSubscriptionMaxPricingLimitModel } = dispatch
        return {
            async updateSubscriptionMaxPricingLimit(input: UpdateSubscriptionMaxPricingLimit): Promise<any> {
                updateSubscriptionMaxPricingLimitModel.BUSY();

                const response = await api.subscriptions.apiV1SubscriptionUpdateMaxPricingLimitPost(input);

                if (response.status === 200) {
                    updateSubscriptionMaxPricingLimitModel.HANDLE_RESPONSE(response.data, response.status);
                }
                else {
                    updateSubscriptionMaxPricingLimitModel.HANDLE_EXCEPTION(response.status);
                }
            }
        }
    }
});