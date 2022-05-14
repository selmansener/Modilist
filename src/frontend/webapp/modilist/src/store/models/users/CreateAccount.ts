import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../..";
import { AccountDTO, CreateAccount } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const createAccountModel = createModel<RootModel>()({
    state: {
        isBusy: false,
        data: undefined
    } as ResponseModel<AccountDTO>,
    reducers: {
        BUSY: (state: ResponseModel<AccountDTO>) => {
            return {
                ...state,
                isBusy: true
            }
        },
        HANDLE_RESPONSE: (state: ResponseModel<AccountDTO>, data: AccountDTO) => {
            return {
                ...state,
                data,
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

                if (response.status === 200) {

                    createAccountModel.HANDLE_RESPONSE(response.data)
                }
                // TODO: handle exceptions
            }
        }
    }
});