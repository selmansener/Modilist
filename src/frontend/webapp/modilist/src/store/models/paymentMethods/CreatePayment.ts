import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { PaymentDTO } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const createPaymentModel = createModel<RootModel>()({
    state: {
        isBusy: false,
        data: undefined,
        status: 0
    } as ResponseModel<PaymentDTO>,
    reducers: {
        BUSY: (state: ResponseModel<PaymentDTO>) => {
            return {
                ...state,
                isBusy: true
            }
        },
        HANDLE_RESPONSE: (state: ResponseModel<PaymentDTO>, data: PaymentDTO, status: number) => {
            return {
                ...state,
                data: {
                    ...data
                },
                isBusy: false,
                status
            }
        },
        HANDLE_EXCEPTION: (state: ResponseModel<PaymentDTO>, status: number) => {
            return {
                ...state,
                status
            }
        },
        RESET: (state: ResponseModel<PaymentDTO>) => {
            return {
                isBusy: false,
                data: undefined,
                status: 0
            }
        }
    },
    effects: (dispatch) => {
        const { createPaymentModel } = dispatch
        return {
            async createPayment(salesOrderId: number): Promise<any> {
                createPaymentModel.BUSY();

                const response = await api.payments.apiV1PaymentCreateSalesOrderIdPost(salesOrderId);

                if (response.status === 200) {
                    createPaymentModel.HANDLE_RESPONSE(response.data, response.status);
                }
                else {
                    createPaymentModel.HANDLE_EXCEPTION(response.status);
                }
            }
        }
    }
});