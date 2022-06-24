import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { PreferedFabricPropertiesDTO } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const getPreferedFabricPropertiesModel = createModel<RootModel>()({
    state: {
        isBusy: false,
        data: undefined,
        status: 0
    } as ResponseModel<PreferedFabricPropertiesDTO>,
    reducers: {
        BUSY: (state: ResponseModel<PreferedFabricPropertiesDTO>) => {
            return {
                ...state,
                isBusy: true
            }
        },
        HANDLE_RESPONSE: (state: ResponseModel<PreferedFabricPropertiesDTO>, data: PreferedFabricPropertiesDTO, status: number) => {
            return {
                ...state,
                data,
                isBusy: false,
                status
            }
        },
        HANDLE_EXCEPTIONS: (state: ResponseModel<PreferedFabricPropertiesDTO>, status: number) => {
            return {
                ...state,
                isBusy: false,
                status
            }
        }
    },
    effects: (dispatch) => {
        const { getPreferedFabricPropertiesModel } = dispatch
        return {
            async getPreferedFabricProperties(): Promise<any> {
                getPreferedFabricPropertiesModel.BUSY();

                const response = await api.preferedFabricProperties.apiV1PreferedFabricPropertiesGetGet();

                if (response.status === 200) {
                    getPreferedFabricPropertiesModel.HANDLE_RESPONSE(response.data, response.status);
                }
                else {
                    getPreferedFabricPropertiesModel.HANDLE_EXCEPTIONS(response.status);
                }
            }
        }
    }
});