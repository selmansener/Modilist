import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { UpdateRequestedStyle } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const updateRequestedStyleModel = createModel<RootModel>()({
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
                isBusy: false,
                status
            }
        },
        RESET: (state: ResponseModel) => {
            return {
                isBusy: false,
                status: 0,
            }
        }
    },
    effects: (dispatch) => {
        const { updateRequestedStyleModel } = dispatch
        return {
            async updateRequestedStyle(input: {
                salesOrderId: number,
                data: UpdateRequestedStyle
            }): Promise<any> {
                updateRequestedStyleModel.BUSY();

                const response = await api.salesOrders.apiV1SalesOrderSalesOrderIdUpdateRequestedStylePost(input.salesOrderId, input.data);

                updateRequestedStyleModel.HANDLE_RESPONSE(response.status);
            }
        }
    }
});