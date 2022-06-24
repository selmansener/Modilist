import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { City } from "../../../services/swagger/api/models/city";
import { ResponseModel } from "../../response-model";

export const citiesModel = createModel<RootModel>()({
    state: {
        isBusy: false,
        data: undefined
    } as ResponseModel<City[]>,
    reducers: {
        BUSY: (state: ResponseModel<City[]>) => {
            return {
                ...state,
                isBusy: true
            }
        },
        HANDLE_RESPONSE: (state: ResponseModel<City[]>, data: City[]) => {
            return {
                ...state,
                data,
                isBusy: false
            }
        }
    },
    effects: (dispatch) => {
        const { citiesModel } = dispatch
        return {
            async getCities(): Promise<any> {
                citiesModel.BUSY();

                const response = await api.addresses.apiV1AddressGetCitiesGet();

                if (response.status === 200) {
                    citiesModel.HANDLE_RESPONSE(response.data);
                }
                // TODO: handle exceptions
            }
        }
    }
});