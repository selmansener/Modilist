import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { AddressDTO } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const getDefaultAddressModel = createModel<RootModel>()({
    state: {
        isBusy: false,
        data: {
            accountId: "",
            city: "",
            district: "",
            firstName: "",
            fullAddress: "",
            isDefault: true,
            lastName: "",
            name: "",
            phone: "",
            zipCode: ""
        }
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
                status,
                isBusy: false
            }
        },
        HANDLE_EXCEPTIONS: (state: ResponseModel<AddressDTO>, status: number) => {
            return {
                ...state,
                status,
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
                    getDefaultAddressModel.HANDLE_RESPONSE(response.data, response.status);
                }
                else {
                    getDefaultAddressModel.HANDLE_EXCEPTIONS(response.status);

                }
            }
        }
    }
});