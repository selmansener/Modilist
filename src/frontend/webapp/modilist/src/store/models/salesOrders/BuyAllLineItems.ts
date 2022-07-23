import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { ResponseModel } from "../../response-model";

export const buyAllLineItemsModel = createModel<RootModel>()({
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
        const { buyAllLineItemsModel } = dispatch
        return {
            async buyAllLineItems(salesOrderId: number): Promise<any> {
                buyAllLineItemsModel.BUSY();

                const response = await api.salesOrders.apiV1SalesOrderSalesOrderIdBuyAllPost(salesOrderId);

                buyAllLineItemsModel.HANDLE_RESPONSE(response.status);
            }
        }
    }
});