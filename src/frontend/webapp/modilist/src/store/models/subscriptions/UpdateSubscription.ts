import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { SubscriptionDTO, SubscriptionPlan, SubscriptionState, UpdateSubscription } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const updateSubscriptionModel = createModel<RootModel>()({
    state: {
        isBusy: false,
        data: {
            startedAt: undefined,
            reactivatedAt: undefined,
            suspendedAt: undefined,
            blockedAt: undefined,
            closedAt: undefined,
            state: SubscriptionState.None,
            maxPricingLimit: "0",
            plan: SubscriptionPlan.InEveryMonth
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
        const { updateSubscriptionModel } = dispatch
        return {
            async updateSubscription(input: UpdateSubscription): Promise<any> {
                updateSubscriptionModel.BUSY();

                const response = await api.subscriptions.apiV1SubscriptionUpdatePost(input);

                if (response.status === 200) {
                    updateSubscriptionModel.HANDLE_RESPONSE(response.data, response.status);
                }
                else {
                    updateSubscriptionModel.HANDLE_EXCEPTION(response.status);
                }
            }
        }
    }
});