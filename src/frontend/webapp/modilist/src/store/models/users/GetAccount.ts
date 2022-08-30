import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { AccountDTO, AccountState, Gender } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const getAccountModel = createModel<RootModel>()({
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
            phone: "5",
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
            };
        },
        HANDLE_EXCEPTION: (state: ResponseModel<AccountDTO>, status: number) => {
            return {
                ...state,
                status
            }
        }
    },
    effects: (dispatch) => {
        const { getAccountModel } = dispatch
        return {
            async getAccount(): Promise<any> {
                getAccountModel.BUSY();

                const response = await api.accounts.apiV1AccountGetGet();

                if (response.status === 200) {
                    getAccountModel.HANDLE_RESPONSE(response.data, response.status);
                }
                else {
                    getAccountModel.HANDLE_EXCEPTION(response.status);
                }
            }
        }
    }
});