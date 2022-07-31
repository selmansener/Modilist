import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { PaymentMethodDTO } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const getDefaultPaymentMethodModel = createModel<RootModel>()({
    state: {
        isBusy: false,
        data: {
            cardAssociation: "",
            cardFamily: "",
            cardBankName: "",
            cardBankCode: 0,
            lastFourDigit: "",
            isDefault: false,
        },
        status: 0
    } as ResponseModel<PaymentMethodDTO>,
    reducers: {
        BUSY: (state: ResponseModel<PaymentMethodDTO>) => {
            return {
                ...state,
                isBusy: true
            }
        },
        HANDLE_RESPONSE: (state: ResponseModel<PaymentMethodDTO>, data: PaymentMethodDTO, status: number) => {
            return {
                ...state,
                data: {
                    ...data
                },
                isBusy: false,
                status
            }
        },
        HANDLE_EXCEPTION: (state: ResponseModel<PaymentMethodDTO>, status: number) => {
            return {
                ...state,
                status
            }
        }
    },
    effects: (dispatch) => {
        const { getDefaultPaymentMethodModel } = dispatch
        return {
            async getDefaultPaymentMethod(): Promise<any> {
                getDefaultPaymentMethodModel.BUSY();

                const response = await api.payments.apiV1PaymentGetDefaultPaymentMethodPost();

                if (response.status === 200) {
                    getDefaultPaymentMethodModel.HANDLE_RESPONSE(response.data, response.status);
                }
                else {
                    getDefaultPaymentMethodModel.HANDLE_EXCEPTION(response.status);
                }
            }
        }
    }
});