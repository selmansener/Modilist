import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { SuspendSubscription } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const suspendSubscriptionModel = createModel<RootModel>()({
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
        const { suspendSubscriptionModel } = dispatch
        return {
            async suspendSubscription(input: SuspendSubscription): Promise<any> {
                suspendSubscriptionModel.BUSY();

                const response = await api.subscriptions.apiV1SubscriptionSuspendPost(input);

                suspendSubscriptionModel.HANDLE_RESPONSE(response.status);
            }
        }
    }
});