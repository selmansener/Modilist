import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { AddressDTO } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const getAllAddressesModel = createModel<RootModel>()({
    state: {
        isBusy: false,
        data: [] as AddressDTO[],
        status: 0,
    } as ResponseModel<AddressDTO[]>,
    reducers: {
        BUSY: (state: ResponseModel<AddressDTO[]>) => {
            return {
                ...state,
                isBusy: true
            }
        },
        HANDLE_RESPONSE: (state: ResponseModel<AddressDTO[]>, data: AddressDTO[], status: number) => {
            return {
                ...state,
                data: data,
                status,
                isBusy: false
            }
        },
        HANDLE_EXCEPTIONS: (state: ResponseModel<AddressDTO[]>, status: number) => {
            return {
                ...state,
                status,
                data: [],
                isBusy: false
            }
        }
    },
    effects: (dispatch) => {
        const { getAllAddressesModel } = dispatch
        return {
            async getAllAddresses(): Promise<any> {
                getAllAddressesModel.BUSY();

                const response = await api.addresses.apiV1AddressGetAllGet();

                if (response.status === 200) {
                    getAllAddressesModel.HANDLE_RESPONSE(response.data, response.status);
                }
                else {
                    getAllAddressesModel.HANDLE_EXCEPTIONS(response.status);

                }
            }
        }
    }
});