import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { UpdateSalesOrderAddress } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const updateSalesOrderAddressModel = createModel<RootModel>()({
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
        const { updateSalesOrderAddressModel } = dispatch
        return {
            async updateSalesOrderAddress(input: {
                salesOrderId: number,
                data: UpdateSalesOrderAddress
            }): Promise<any> {
                updateSalesOrderAddressModel.BUSY();

                const response = await api.salesOrders.apiV1SalesOrderSalesOrderIdUpdateAddressPost(input.salesOrderId, input.data);

                updateSalesOrderAddressModel.HANDLE_RESPONSE(response.status);
            }
        }
    }
});