import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { ActiveSalesOrderDTO } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const activeSalesOrderModel = createModel<RootModel>()({
    state: {
        isBusy: false,
        data: {},
        status: 0
    } as ResponseModel<ActiveSalesOrderDTO>,
    reducers: {
        BUSY: (state: ResponseModel<ActiveSalesOrderDTO>) => {
            return {
                ...state,
                isBusy: true
            }
        },
        HANDLE_RESPONSE: (state: ResponseModel<ActiveSalesOrderDTO>, data: ActiveSalesOrderDTO, status: number) => {
            return {
                ...state,
                data: {
                    ...data
                },
                isBusy: false,
                status
            }
        },
        HANDLE_EXCEPTION: (state: ResponseModel<ActiveSalesOrderDTO>, status: number) => {
            return {
                ...state,
                status
            }
        },
        RESET: (state: ResponseModel<ActiveSalesOrderDTO>) => {
            return {
                isBusy: false,
                status: 0,
                data: {}
            }
        }
    },
    effects: (dispatch) => {
        const { activeSalesOrderModel } = dispatch
        return {
            async activeSalesOrder(): Promise<any> {
                activeSalesOrderModel.BUSY();

                const response = await api.salesOrders.apiV1SalesOrderActiveGet();

                if (response.status === 200) {
                    activeSalesOrderModel.HANDLE_RESPONSE(response.data, response.status);
                }
                else {
                    activeSalesOrderModel.HANDLE_EXCEPTION(response.status);
                }
            }
        }
    }
});