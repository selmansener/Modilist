import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { ResponseModel } from "../../response-model";

export const changeDefaultAddressModel = createModel<RootModel>()({
    state: {
        isBusy: false,
        status: 0
    } as ResponseModel,
    reducers: {
        BUSY: (state: ResponseModel) => {
            return {
                ...state,
                isBusy: true
            }
        },
        HANDLE_RESPONSE: (state: ResponseModel, status: number) => {
            return {
                ...state,
                status,
                isBusy: false
            }
        },
        RESET: (state: ResponseModel) => {
            return {
                ...state,
                isBusy: false,
                status: 0
            }
        }
    },
    effects: (dispatch) => {
        const { changeDefaultAddressModel } = dispatch
        return {
            async changeDefaultAddress(name: string): Promise<any> {
                changeDefaultAddressModel.BUSY();

                const response = await api.addresses.apiV1AddressSetAsDefaultNamePost(name);

                changeDefaultAddressModel.HANDLE_RESPONSE(response.status);
            }
        }
    }
});