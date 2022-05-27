import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../..";
import { AddressDTO } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const getDefaultAddressModel = createModel<RootModel>()({
    state: {
        isBusy: false,
        data: undefined
    } as ResponseModel<AddressDTO>,
    reducers: {
        BUSY: (state: ResponseModel<AddressDTO>) => {
            return {
                ...state,
                isBusy: true
            }
        },
        HANDLE_RESPONSE: (state: ResponseModel<AddressDTO>, data: AddressDTO) => {
            return {
                ...state,
                data,
                isBusy: false
            }
        }
    },
    effects: (dispatch) => {
        const { getDefaultAddressModel } = dispatch
        return {
            async getDefaultAddress(): Promise<any> {
                getDefaultAddressModel.BUSY();

                const response = await api.addresses.apiV1AddressGetDefaultGet();

                if (response.status === 200) {
                    getDefaultAddressModel.HANDLE_RESPONSE(response.data);
                }
                // TODO: handle exceptions
            }
        }
    }
});