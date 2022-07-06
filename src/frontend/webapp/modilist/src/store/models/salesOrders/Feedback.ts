import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { AddOrUpdateFeedback, AddOrUpdateFeedbackDTO } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const addOrUpdateFeedbackModel = createModel<RootModel>()({
    state: {
        isBusy: false,
        data: {},
        status: 0
    } as ResponseModel<AddOrUpdateFeedbackDTO>,
    reducers: {
        BUSY: (state: ResponseModel<AddOrUpdateFeedbackDTO>) => {
            return {
                ...state,
                isBusy: true
            }
        },
        HANDLE_RESPONSE: (state: ResponseModel<AddOrUpdateFeedbackDTO>, data: AddOrUpdateFeedbackDTO, status: number) => {
            return {
                ...state,
                data: {
                    ...data
                },
                isBusy: false,
                status
            }
        },
        HANDLE_EXCEPTION: (state: ResponseModel<AddOrUpdateFeedbackDTO>, status: number) => {
            return {
                ...state,
                status
            }
        },
        RESET: (state: ResponseModel<AddOrUpdateFeedbackDTO>) => {
            return {
                isBusy: false,
                status: 0,
                data: {}
            }
        }
    },
    effects: (dispatch) => {
        const { addOrUpdateFeedbackModel } = dispatch
        return {
            async addOrUpdateFeedback(feedback: {
                salesOrderId: number,
                salesOrderLineItemId: number,
                input: AddOrUpdateFeedback
            }): Promise<any> {
                addOrUpdateFeedbackModel.BUSY();

                const response = await api.salesOrders.apiV1SalesOrderSalesOrderIdFeedbackSalesOrderLineItemIdPost(feedback.salesOrderId, feedback.salesOrderLineItemId, feedback.input);

                if (response.status === 200) {
                    addOrUpdateFeedbackModel.HANDLE_RESPONSE(response.data, response.status);
                }
                else {
                    addOrUpdateFeedbackModel.HANDLE_EXCEPTION(response.status);
                }
            }
        }
    }
});