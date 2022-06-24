import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { District } from "../../../services/swagger/api/models/";
import { ResponseModel } from "../../response-model";

export const districtsModel = createModel<RootModel>()({
    state: {
        isBusy: false,
        data: undefined
    } as ResponseModel<District[]>,
    reducers: {
        BUSY: (state: ResponseModel<District[]>) => {
            return {
                ...state,
                isBusy: true
            }
        },
        HANDLE_RESPONSE: (state: ResponseModel<District[]>, data: District[]) => {
            return {
                ...state,
                data,
                isBusy: false
            }
        }
    },
    effects: (dispatch) => {
        const { districtsModel } = dispatch
        return {
            async getDistricts(cityCode: string): Promise<any> {
                districtsModel.BUSY();

                const response = await api.addresses.apiV1AddressGetDistrictsCityCodeGet(cityCode);

                if (response.status === 200) {
                    districtsModel.HANDLE_RESPONSE(response.data);
                }
                // TODO: handle exceptions
            }
        }
    }
});