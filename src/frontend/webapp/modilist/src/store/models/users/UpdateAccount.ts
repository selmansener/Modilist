import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../..";
import { AccountDTO, UpdateAccount } from "../../../services/swagger/api";
import { Dictonary, ErrorResponse, ResponseModel } from "../../response-model";

export const updateAccountModel = createModel<RootModel>()({
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
        HANDLE_RESPONSE: (state: ResponseModel<AccountDTO>, data?: AccountDTO) => {
            return {
                ...state,
                data,
                isBusy: false
            }
        },
        HANDLE_VALIDATION_EXCEPTIONS: (state: ResponseModel<AccountDTO>, errors: Dictonary) => {
            return {
                ...state,
                errors,
                type: "ValidationException",
                isBusy: false
            }
        }
    },
    effects: (dispatch) => {
        const { updateAccountModel } = dispatch
        return {
            async updateAccount(input: UpdateAccount): Promise<any> {
                updateAccountModel.BUSY();

                const response = await api.users.apiV1UserUpdatePost(input);

                if (response) {

                    if (response && response.status === 200) {
                        updateAccountModel.HANDLE_RESPONSE(response.data);
                    }
                    // TODO: handle exceptions
                    else if (response.status === 400) {

                        const { errorType, errors } = response.data as ErrorResponse;

                        if (errorType === "ValidationException" && errors) {

                            updateAccountModel.HANDLE_VALIDATION_EXCEPTIONS(errors);
                        }
                    }
                }
            }
        }
    }
});