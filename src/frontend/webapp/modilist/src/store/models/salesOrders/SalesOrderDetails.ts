import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { SalesOrderDetailsDTO, SalesOrderDTO } from "../../../services/swagger/api";
import { DQBResultDTO, ResponseModel } from "../../response-model";

export const salesOrderDetailsModel = createModel<RootModel>()({
    state: {
        isBusy: false,
        data: {},
        status: 0
    } as ResponseModel<SalesOrderDetailsDTO>,
    reducers: {
        BUSY: (state: ResponseModel<SalesOrderDetailsDTO>) => {
            return {
                ...state,
                isBusy: true
            }
        },
        HANDLE_RESPONSE: (state: ResponseModel<SalesOrderDetailsDTO>, data: SalesOrderDetailsDTO, status: number) => {
            return {
                ...state,
                data: {
                    ...data
                },
                isBusy: false,
                status
            }
        },
        HANDLE_EXCEPTION: (state: ResponseModel<SalesOrderDetailsDTO>, status: number) => {
            return {
                ...state,
                status
            }
        },
        RESET: (state: ResponseModel<SalesOrderDetailsDTO>) => {
            return {
                isBusy: false,
                status: 0,
                data: {}
            }
        }
    },
    effects: (dispatch) => {
        const { salesOrderDetailsModel } = dispatch
        return {
            async salesOrderDetails(id: number): Promise<any> {
                salesOrderDetailsModel.BUSY();

                const response = await api.salesOrders.apiV1SalesOrderSalesOrderIdGet(id);

                if (response.status === 200) {
                    salesOrderDetailsModel.HANDLE_RESPONSE(response.data, response.status);
                }
                else {
                    salesOrderDetailsModel.HANDLE_EXCEPTION(response.status);
                }
            }
        }
    }
});