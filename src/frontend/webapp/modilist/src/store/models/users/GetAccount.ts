import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../..";
import { GetAccountOutputDTO, GetAccountOutputDTOCommonResponse } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const getAccountModel = createModel<RootModel>()({
    state: {
        isBusy: false,
        response: {
            statusCode: 0,
            message: "",
            type: "",
            data: undefined
        }
    } as ResponseModel<GetAccountOutputDTOCommonResponse>,
    reducers: {
        BUSY: (state: ResponseModel<GetAccountOutputDTOCommonResponse>) => {
            return {
                ...state,
                isBusy: true
            }
        },
        HANDLE_RESPONSE: (state: ResponseModel<GetAccountOutputDTOCommonResponse>, statusCode: number, data: GetAccountOutputDTO | undefined) => {
            return {
                ...state,
                response: {
                    ...state.response,
                    statusCode: statusCode,
                    data
                },
                isBusy: false
            }
        }
    },
    effects: (dispatch) => {
        const { getAccountModel } = dispatch
        return {
            async getAccount(): Promise<any> {
                getAccountModel.BUSY();

                const response = await api.users.apiV1UserGetGet();

                getAccountModel.HANDLE_RESPONSE(response.data.statusCode ?? 0, response.data.data)
            }
        }
    }
});