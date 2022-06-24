import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { AddressDTO, UpdateAddress } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const updateAddressModel = createModel<RootModel>()({
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
        const { updateAddressModel } = dispatch
        return {
            async updateAddress(input: { name: string, body: UpdateAddress }): Promise<any> {
                updateAddressModel.BUSY();

                const response = await api.addresses.apiV1AddressUpdateNamePost(input.name, input.body);

                if (response.status === 200) {

                    updateAddressModel.HANDLE_RESPONSE(response.data)
                }
                // TODO: handle exceptions
            }
        }
    }
});