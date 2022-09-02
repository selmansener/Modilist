import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { ResponseModel } from "../../response-model";

export const activateSubscriptionModel = createModel<RootModel>()({
    state: {
        isBusy: false,
        status: 0
    } as ResponseModel,
    reducers: {
        BUSY: (state: ResponseModel) => {
            return {
                ...state,
                isBusy: true
            }
        },
        HANDLE_RESPONSE: (state: ResponseModel,status: number) => {
            return {
                ...state,
                isBusy: false,
                status
            }
        },
        RESET: (state: ResponseModel) => {
            return {
                ...state,
                isBusy: false,
                status: 0
            }
        }
    },
    effects: (dispatch) => {
        const { activateSubscriptionModel } = dispatch
        return {
            async activateSubscription(): Promise<any> {
                activateSubscriptionModel.BUSY();

                const response = await api.subscriptions.apiV1SubscriptionActivatePost();

                activateSubscriptionModel.HANDLE_RESPONSE(response.status);
            }
        }
    }
});