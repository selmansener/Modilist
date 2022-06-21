import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../..";
import { CreatePaymentMethod, PaymentMethodDTO } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const createPaymentMethodModel = createModel<RootModel>()({
    state: {
        isBusy: false,
        data: {
            cardHolderName: "",
            cardNumber: "",
            expireMonth: "",
            expireYear: "",
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
        const { createPaymentMethodModel } = dispatch
        return {
            async createPaymentMethod(input: CreatePaymentMethod): Promise<any> {
                createPaymentMethodModel.BUSY();

                const response = await api.paymentMethods.apiV1PaymentMethodCreatePost(input);

                if (response.status === 200) {
                    createPaymentMethodModel.HANDLE_RESPONSE(response.data, response.status);
                }
                else {
                    createPaymentMethodModel.HANDLE_EXCEPTION(response.status);
                }
            }
        }
    }
});