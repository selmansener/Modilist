import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { SalesOrderDTO } from "../../../services/swagger/api";
import { DQBResultDTO, ResponseModel } from "../../response-model";

export const salesOrdersQueryModel = createModel<RootModel>()({
    state: {
        isBusy: false,
        data: {
            data: [],
            count: 0
        },
        status: 0
    } as ResponseModel<DQBResultDTO<SalesOrderDTO>>,
    reducers: {
        BUSY: (state: ResponseModel<DQBResultDTO<SalesOrderDTO>>) => {
            return {
                ...state,
                isBusy: true
            }
        },
        HANDLE_RESPONSE: (state: ResponseModel<DQBResultDTO<SalesOrderDTO>>, data: DQBResultDTO<SalesOrderDTO>, status: number) => {
            return {
                ...state,
                data: {
                    count: data.count,
                    data: [
                        ...(state.data ? state.data.data : []),
                        ...data.data
                    ]
                },
                isBusy: false,
                status
            }
        },
        HANDLE_EXCEPTION: (state: ResponseModel<DQBResultDTO<SalesOrderDTO>>, status: number) => {
            return {
                ...state,
                status
            }
        },
        RESET: (state: ResponseModel<DQBResultDTO<SalesOrderDTO>>) => {
            return {
                isBusy: false,
                status: 0,
                data: {
                    data: [],
                    count: 0
                }
            }
        }
    },
    effects: (dispatch) => {
        const { salesOrdersQueryModel } = dispatch
        return {
            async salesOrdersQuery(query?: string): Promise<any> {
                salesOrdersQueryModel.BUSY();

                const response = await api.salesOrders.apiV1SalesOrderQueryGet(query);

                if (response.status === 200) {
                    salesOrdersQueryModel.HANDLE_RESPONSE(response.data as DQBResultDTO<SalesOrderDTO>, response.status);
                }
                else {
                    salesOrdersQueryModel.HANDLE_EXCEPTION(response.status);
                }
            }
        }
    }
});