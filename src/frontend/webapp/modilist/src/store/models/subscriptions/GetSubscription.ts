import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { SubscriptionDTO, SubscriptionPlan, SubscriptionState } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const getSubscriptionModel = createModel<RootModel>()({
    state: {
        isBusy: false,
        data: {
            startedAt : undefined,
            reactivatedAt: undefined,
            suspendedAt: undefined,
            blockedAt: undefined,
            closedAt: undefined,
            state : SubscriptionState.None,
            maxPricingLimit: "2500",
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
                data,
                isBusy: false,
                status
            }
        },
        HANDLE_EXCEPTIONS: (state: ResponseModel<SubscriptionDTO>, status: number) => {
            return {
                ...state,
                isBusy: false,
                status
            }
        }
    },
    effects: (dispatch) => {
        const { getSubscriptionModel } = dispatch
        return {
            async getSubscription(): Promise<any> {
                getSubscriptionModel.BUSY();

                const response = await api.subscriptions.apiV1SubscriptionGetGet();

                if (response.status === 200) {
                    getSubscriptionModel.HANDLE_RESPONSE(response.data, response.status);
                }
                else {
                    getSubscriptionModel.HANDLE_EXCEPTIONS(response.status);
                }
            }
        }
    }
});