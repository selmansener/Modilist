import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { UpdateAdditionalRequests } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const updateAdditionalRequestsModel = createModel<RootModel>()({
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
        const { updateAdditionalRequestsModel } = dispatch
        return {
            async updateAdditionalRequests(input: {
                salesOrderId: number,
                data: UpdateAdditionalRequests
            }): Promise<any> {
                updateAdditionalRequestsModel.BUSY();

                const response = await api.salesOrders.apiV1SalesOrderSalesOrderIdUpdateAdditionalRequestsPost(input.salesOrderId, input.data);

                updateAdditionalRequestsModel.HANDLE_RESPONSE(response.status);
            }
        }
    }
});