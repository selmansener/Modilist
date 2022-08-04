import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { UpdateEstimatedDeliveryDate } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const updateEstimatedDeliveryDateModel = createModel<RootModel>()({
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
        const { updateEstimatedDeliveryDateModel } = dispatch
        return {
            async updateEstimatedDeliveryDate(input: {
                salesOrderId: number,
                data: UpdateEstimatedDeliveryDate
            }): Promise<any> {
                updateEstimatedDeliveryDateModel.BUSY();

                const response = await api.salesOrders.apiV1SalesOrderSalesOrderIdUpdateEstimatedDeliveryDatePost(input.salesOrderId, input.data);

                updateEstimatedDeliveryDateModel.HANDLE_RESPONSE(response.status);
            }
        }
    }
});