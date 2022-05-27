import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../..";
import { AddressDTO, UpsertAddress } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const upsertAddressModel = createModel<RootModel>()({
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
        },
    },
    effects: (dispatch) => {
        const { upsertAddressModel } = dispatch
        return {
            async upsertAddress(input: { name: string, body: UpsertAddress }): Promise<any> {
                upsertAddressModel.BUSY();

                const response = await api.addresses.apiV1AddressUpsertNamePost(input.name, input.body);

                if (response.status === 200) {

                    upsertAddressModel.HANDLE_RESPONSE(response.data)
                }
                // TODO: handle exceptions
            }
        }
    }
});