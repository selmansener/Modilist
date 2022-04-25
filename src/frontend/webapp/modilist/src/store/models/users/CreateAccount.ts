import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../..";
import { CommonResponse, CreateAccount } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const createAccountModel = createModel<RootModel>()({
    state: {
        isBusy: undefined,
        response: {
            statusCode: 0,
            message: "",
            type: ""
        }
    } as ResponseModel<CommonResponse>,
    reducers: {
        BUSY: (state: ResponseModel<CommonResponse>) => {
            return {
                ...state,
                isBusy: true
            }
        },
        HANDLE_RESPONSE: (state: ResponseModel<CommonResponse>, statusCode: number) => {
            return {
                ...state,
                response: {
                    ...state.response,
                    statusCode: statusCode
                },
                isBusy: false
            }
        },
    },
    effects: (dispatch) => {
        const { createAccountModel } = dispatch
        return {
            async createAccount(input: CreateAccount): Promise<any> {
                createAccountModel.BUSY();

                const response = await api.users.apiV1UserCreatePost(input);

                createAccountModel.HANDLE_RESPONSE(response.data.statusCode)
            }
        }
    }
});