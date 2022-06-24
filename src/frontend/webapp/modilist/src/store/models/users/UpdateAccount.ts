import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { AccountDTO, AccountState, Gender, UpdateAccount } from "../../../services/swagger/api";
import { Dictonary, ErrorResponse, ResponseModel } from "../../response-model";

export const updateAccountModel = createModel<RootModel>()({
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
        HANDLE_RESPONSE: (state: ResponseModel<AccountDTO>, status: number, data?: AccountDTO) => {
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
        HANDLE_VALIDATION_EXCEPTIONS: (state: ResponseModel<AccountDTO>, errors: Dictonary, status: number) => {
            return {
                ...state,
                errors,
                type: "ValidationException",
                isBusy: false,
                status
            }
        },
        HANDLE_EXCEPTIONS: (state: ResponseModel<AccountDTO>, status: number) => {
            return {
                ...state,
                isBusy: false,
                status
            }
        },
        RESET: (state: ResponseModel<AccountDTO>) => {
            return {
                isBusy: false,
                data: {
                    birthDate: new Date(),
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
            }
        }
    },
    effects: (dispatch) => {
        const { updateAccountModel } = dispatch
        return {
            async updateAccount(input: UpdateAccount): Promise<any> {
                updateAccountModel.BUSY();

                const response = await api.accounts.apiV1AccountUpdatePost(input);

                if (response) {

                    if (response && response.status === 200) {
                        updateAccountModel.HANDLE_RESPONSE(response.status, response.data);
                    }
                    else if (response.status === 400) {

                        const { errorType, errors } = response.data as ErrorResponse;

                        if (errorType === "ValidationException" && errors) {

                            updateAccountModel.HANDLE_VALIDATION_EXCEPTIONS(errors, response.status);
                        }
                    }
                    else {
                        updateAccountModel.HANDLE_EXCEPTIONS(response.status);
                    }
                }
            }
        }
    }
});