import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { CreateReturn, ReturnDTO } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const createReturnModel = createModel<RootModel>()({
    state: {
        isBusy: false,
        data: {},
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
                data: {}
            }
        }
    },
    effects: (dispatch) => {
        const { createReturnModel } = dispatch
        return {
            async createReturn(createReturn: CreateReturn): Promise<any> {
                createReturnModel.BUSY();

                const response = await api.returns.apiV1ReturnCreatePost(createReturn);

                if (response.status === 200) {
                    createReturnModel.HANDLE_RESPONSE(response.data, response.status);
                }
                else {
                    createReturnModel.HANDLE_EXCEPTION(response.status);
                }
            }
        }
    }
});