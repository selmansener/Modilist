import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../..";
import { AccountDTO } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const getAccountModel = createModel<RootModel>()({
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
        }
    },
    effects: (dispatch) => {
        const { getAccountModel } = dispatch
        return {
            async getAccount(): Promise<any> {
                getAccountModel.BUSY();

                const response = await api.users.apiV1UserGetGet();

                if (response.status === 200) {
                    getAccountModel.HANDLE_RESPONSE(response.data);
                }
                // TODO: handle exceptions
            }
        }
    }
});