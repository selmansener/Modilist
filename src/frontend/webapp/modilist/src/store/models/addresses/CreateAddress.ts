import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../..";
import { AddressDTO, CreateAddress } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const createAddressModel = createModel<RootModel>()({
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
        HANDLE_RESPONSE: (state: ResponseModel<AddressDTO>, data: AddressDTO) => {
            return {
                ...state,
                data: {
                    ...state.data,
                    ...data
                },
                isBusy: false
            }
        },
    },
    effects: (dispatch) => {
        const { createAddressModel } = dispatch
        return {
            async createAddress(input: CreateAddress): Promise<any> {
                createAddressModel.BUSY();

                const response = await api.addresses.apiV1AddressCreatePost(input);

                if (response.status === 200) {

                    createAddressModel.HANDLE_RESPONSE(response.data)
                }
                // TODO: handle exceptions
            }
        }
    }
});