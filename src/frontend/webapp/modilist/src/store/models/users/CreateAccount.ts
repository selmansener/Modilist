import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../..";
import { CommonResponse, CreateAccount } from "../../../services/swagger/api";

export const createAccountModel = createModel<RootModel>()({
    state: {
        statusCode: 0,
        message: "",
        type: ""
    } as CommonResponse,
    reducers: {
        HANDLE_RESPONSE: (state: CommonResponse, statusCode: number) => {
            return {
                ...state,
                statusCode
            }
        },
    },
    effects: (dispatch) => {
        const { createAccountModel } = dispatch
        return {
            async createAccount(input: CreateAccount): Promise<any> {
                const response = await api.users.apiV1UserCreatePost(input);
                
                createAccountModel.HANDLE_RESPONSE(response.data.statusCode)
            },
        }
    }
});