import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../..";
import { UpdateAccount, UpdateAccountOutputDTO, UpdateAccountOutputDTOCommonResponse } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const updateAccountModel = createModel<RootModel>()({
    state: {
        isBusy: false,
        response: {
            statusCode: 0,
            message: "",
            type: "",
            data: undefined
        }
    } as ResponseModel<UpdateAccountOutputDTOCommonResponse>,
    reducers: {
        BUSY: (state: ResponseModel<UpdateAccountOutputDTOCommonResponse>) => {
            return {
                ...state,
                isBusy: true
            }
        },
        HANDLE_RESPONSE: (state: ResponseModel<UpdateAccountOutputDTOCommonResponse>, statusCode: number, data?: UpdateAccountOutputDTO) => {
            return {
                ...state,
                response: {
                    ...state.response,
                    statusCode: statusCode,
                    data
                },
                isBusy: false
            }
        },
    },
    effects: (dispatch) => {
        const { updateAccountModel } = dispatch
        return {
            async updateAccount(input: UpdateAccount): Promise<UpdateAccountOutputDTOCommonResponse> {
                updateAccountModel.BUSY();

                const response = await api.users.apiV1UserUpdatePost(input);

                updateAccountModel.HANDLE_RESPONSE(response.data.statusCode ?? 0, response.data.data);

                return response.data;
            }
        }
    }
});