import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../..";
import { AccountDTO, CreateAccount } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const account = createModel<RootModel>()({
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
        HANDLE_RESPONSE: (state: ResponseModel<AccountDTO>, data: AccountDTO, status: number) => {
            return {
                ...state,
                data,
                isBusy: false,
                status
            }
        },
        HANDLE_ERROR: (state: ResponseModel<AccountDTO>, status: number) => {
            return {
                ...state,
                isBusy: false,
                status
            }
        }
    },
    effects: (dispatch) => {
        const { account } = dispatch
        return {
            async getAccount(): Promise<any> {
                account.BUSY();

                const response = await api.users.apiV1UserGetGet();

                if (response.status === 200) {
                    account.HANDLE_RESPONSE(response.data, response.status);
                }
                else if (response.status === 404) {
                    account.HANDLE_ERROR(response.status);
                }
            },
            async createAccount(input: CreateAccount): Promise<any> {
                account.BUSY();

                const response = await api.users.apiV1UserCreatePost(input);

                if (response.status === 200) {
                    account.HANDLE_RESPONSE(response.data, response.status);
                }
            }
        }
    }
});