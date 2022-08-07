import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { AddressDTO } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const getAddressModel = createModel<RootModel>()({
    state: {
        isBusy: false,
        data: undefined,
        status: 0,
    } as ResponseModel<AddressDTO>,
    reducers: {
        BUSY: (state: ResponseModel<AddressDTO>) => {
            return {
                ...state,
                isBusy: true
            }
        },
        HANDLE_RESPONSE: (state: ResponseModel<AddressDTO>, data: AddressDTO, status: number) => {
            return {
                ...state,
                data: {
                    ...state.data,
                    ...data
                },
                isBusy: false,
                status: status
            }
        },
    },
    effects: (dispatch) => {
        const { getAddressModel } = dispatch
        return {
            async getAddress(addressId: number): Promise<any> {
                getAddressModel.BUSY();

                const response = await api.addresses.apiV1AddressGetIdGet(addressId);

                if (response.status === 200) {

                    getAddressModel.HANDLE_RESPONSE(response.data, response.status)
                }
                // TODO: handle exceptions
            }
        }
    }
});