import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { PaymentMethodDTO } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const getAllPaymentMethodsModel = createModel<RootModel>()({
    state: {
        isBusy: false,
        data: [],
        status: 0
    } as ResponseModel<PaymentMethodDTO[]>,
    reducers: {
        BUSY: (state: ResponseModel<PaymentMethodDTO[]>) => {
            return {
                ...state,
                isBusy: true
            }
        },
        HANDLE_RESPONSE: (state: ResponseModel<PaymentMethodDTO[]>, data: PaymentMethodDTO[], status: number) => {
            return {
                ...state,
                data: [
                    ...data
                ],
                isBusy: false,
                status
            }
        },
        HANDLE_EXCEPTION: (state: ResponseModel<PaymentMethodDTO[]>, status: number) => {
            return {
                ...state,
                status
            }
        }
    },
    effects: (dispatch) => {
        const { getAllPaymentMethodsModel } = dispatch
        return {
            async getAllPaymentMethods(): Promise<any> {
                getAllPaymentMethodsModel.BUSY();

                const response = await api.payments.apiV1PaymentGetAllGet();

                if (response.status === 200) {
                    getAllPaymentMethodsModel.HANDLE_RESPONSE(response.data, response.status);
                }
                else {
                    getAllPaymentMethodsModel.HANDLE_EXCEPTION(response.status);
                }
            }
        }
    }
});