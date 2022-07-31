import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { SalesOrderDTO } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const createFirstOrderModel = createModel<RootModel>()({
    state: {
        isBusy: false,
        data: {},
        status: 0
    } as ResponseModel<SalesOrderDTO>,
    reducers: {
        BUSY: (state: ResponseModel<SalesOrderDTO>) => {
            return {
                ...state,
                isBusy: true
            }
        },
        HANDLE_RESPONSE: (state: ResponseModel<SalesOrderDTO>, data: SalesOrderDTO, status: number) => {
            return {
                ...state,
                data: {
                    ...data
                },
                isBusy: false,
                status
            }
        },
        HANDLE_EXCEPTION: (state: ResponseModel<SalesOrderDTO>, status: number) => {
            return {
                ...state,
                status
            }
        },
        RESET: (state: ResponseModel<SalesOrderDTO>) => {
            return {
                isBusy: false,
                status: 0,
                data: {}
            }
        }
    },
    effects: (dispatch) => {
        const { createFirstOrderModel } = dispatch
        return {
            async createFirstOrder(): Promise<any> {
                createFirstOrderModel.BUSY();

                const response = await api.salesOrders.apiV1SalesOrderCreateFirstOrderPost();

                if (response.status === 200) {
                    createFirstOrderModel.HANDLE_RESPONSE(response.data, response.status);
                }
                else {
                    createFirstOrderModel.HANDLE_EXCEPTION(response.status);
                }
            }
        }
    }
});