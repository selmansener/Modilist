import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { ResponseModel } from "../../response-model";

export const changeDefaultPaymentMethodModel = createModel<RootModel>()({
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
        HANDLE_RESPONSE: (state: ResponseModel, status: number) => {
            return {
                ...state,
                status,
                isBusy: false
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
        const { changeDefaultPaymentMethodModel } = dispatch
        return {
            async changeDefaultPaymentMethod(cardName: string): Promise<any> {
                changeDefaultPaymentMethodModel.BUSY();

                const response = await api.payments.apiV1PaymentSetAsDefaultCardNamePost(cardName);

                changeDefaultPaymentMethodModel.HANDLE_RESPONSE(response.status);
            }
        }
    }
});