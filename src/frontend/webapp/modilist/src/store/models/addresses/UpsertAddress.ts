import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { AddressDTO, UpsertAddress } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const upsertAddressModel = createModel<RootModel>()({
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
        },
        status: 0
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
        RESET: (state: ResponseModel<AddressDTO>) => {
            return {
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
                },
                status: 0
            }
        }
    },
    effects: (dispatch) => {
        const { upsertAddressModel } = dispatch
        return {
            async upsertAddress(input: { name: string, body: UpsertAddress }): Promise<any> {
                upsertAddressModel.BUSY();

                const response = await api.addresses.apiV1AddressUpsertNamePost(input.name, input.body);

                if (response.status === 200) {

                    upsertAddressModel.HANDLE_RESPONSE(response.data, response.status)
                }
                // TODO: handle exceptions
            }
        }
    }
});