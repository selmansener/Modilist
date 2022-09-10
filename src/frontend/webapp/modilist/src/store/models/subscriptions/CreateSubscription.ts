import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { SubscriptionDTO, SubscriptionState } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const createSubscriptionModel = createModel<RootModel>()({
    state: {
        isBusy: false,
        data: {
            startedAt : undefined,
            reactivatedAt: undefined,
            suspendedAt: undefined,
            blockedAt: undefined,
            closedAt: undefined,
            state : SubscriptionState.None,
            maxPricingLimit: "0",
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
        const { createSubscriptionModel } = dispatch
        return {
            async createSubscription(): Promise<any> {
                createSubscriptionModel.BUSY();

                const response = await api.subscriptions.apiV1SubscriptionCreatePost();

                if (response.status === 200) {
                    createSubscriptionModel.HANDLE_RESPONSE(response.data, response.status);
                }
                else {
                    createSubscriptionModel.HANDLE_EXCEPTION(response.status);
                }
            }
        }
    }
});