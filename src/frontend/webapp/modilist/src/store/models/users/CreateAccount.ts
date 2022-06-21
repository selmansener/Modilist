import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../..";
import { AccountDTO, AccountState, CreateAccount, Gender } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const createAccountModel = createModel<RootModel>()({
    state: {
        isBusy: false,
        data: {
            birthDate: null,
            email: "",
            firstName: "",
            lastName: "",
            gender: Gender.None,
            id: "",
            instagramUserName: "",
            jobTitle: "",
            phone: "",
            state: AccountState.None
        },
        status: 0
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
                data: {
                    ...state.data,
                    ...data
                },
                isBusy: false,
                status
            }
        },
        HANDLE_EXCEPTION: (state: ResponseModel<AccountDTO>, status: number) => {
            return {
                ...state,
                status
            }
        }
    },
    effects: (dispatch) => {
        const { createAccountModel } = dispatch
        return {
            async createAccount(input: CreateAccount): Promise<any> {
                createAccountModel.BUSY();

                const response = await api.accounts.apiV1AccountCreatePost(input);

                if (response.status === 200) {
                    createAccountModel.HANDLE_RESPONSE(response.data, response.status);
                }
                else {
                    createAccountModel.HANDLE_EXCEPTION(response.status);
                }
            }
        }
    }
});