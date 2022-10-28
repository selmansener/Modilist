import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { CreateNewPaymentMethod, CreatePaymentMethod, PaymentMethodDTO } from "../../../services/swagger/api";
import { isResponseModel, ResponseModel } from "../../response-model";

export const createNewPaymentMethodModel = createModel<RootModel>()({
    state: {
        isBusy: false,
        data: {
            cardHolderName: "",
            cardNumber: "",
            expireMonth: "",
            expireYear: "",
            cardName: "",
        },
        status: 0,
        errorType: ""
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
        HANDLE_EXCEPTION: (state: ResponseModel<PaymentMethodDTO>, status: number, errorType?: string) => {
            return {
                ...state,
                status,
                errorType
            }
        },
        RESET: (state: ResponseModel<PaymentMethodDTO>) => {
            return {
                ...state,
                isBusy: false,
                data: {
                    cardHolderName: "",
                    cardNumber: "",
                    expireMonth: "",
                    expireYear: "",
                    cardName: "",
                },
                status: 0
            }
        }
    },
    effects: (dispatch) => {
        const { createNewPaymentMethodModel } = dispatch
        return {
            async createNewPaymentMethod(input: CreateNewPaymentMethod): Promise<any> {
                createNewPaymentMethodModel.BUSY();

                const response = await api.payments.apiV1PaymentCreateNewPaymentMethodPost(input);
                if (response.status === 200) {
                    createNewPaymentMethodModel.HANDLE_RESPONSE(response.data, response.status);
                }
                else {
                    if (isResponseModel(response.data)) {
                        createNewPaymentMethodModel.HANDLE_EXCEPTION(response.status, (response.data as ResponseModel).errorType);
                    }
                    else {
                        createNewPaymentMethodModel.HANDLE_EXCEPTION(response.status);
                    }
                }
            }
        }
    }
});