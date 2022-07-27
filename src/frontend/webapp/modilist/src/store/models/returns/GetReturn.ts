import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { ReturnDTO } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const getReturnModel = createModel<RootModel>()({
    state: {
        isBusy: false,
        data: undefined,
        status: 0
    } as ResponseModel<ReturnDTO>,
    reducers: {
        BUSY: (state: ResponseModel<ReturnDTO>) => {
            return {
                ...state,
                isBusy: true
            }
        },
        HANDLE_RESPONSE: (state: ResponseModel<ReturnDTO>, data: ReturnDTO, status: number) => {
            return {
                ...state,
                data: {
                    ...data
                },
                isBusy: false,
                status
            }
        },
        HANDLE_EXCEPTION: (state: ResponseModel<ReturnDTO>, status: number) => {
            return {
                ...state,
                status
            }
        },
        RESET: (state: ResponseModel<ReturnDTO>) => {
            return {
                isBusy: false,
                status: 0,
                data: undefined
            }
        }
    },
    effects: (dispatch) => {
        const { getReturnModel } = dispatch
        return {
            async getReturn(salesOrderId: number): Promise<any> {
                getReturnModel.BUSY();

                const response = await api.returns.apiV1ReturnGetSalesOrderIdPost(salesOrderId);

                if (response.status === 200) {
                    getReturnModel.HANDLE_RESPONSE(response.data, response.status);
                }
                else {
                    getReturnModel.HANDLE_EXCEPTION(response.status);
                }
            }
        }
    }
});