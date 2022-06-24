import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { PreferedFabricPropertiesDTO, UpsertPreferedFabricProperties } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const upsertPreferedFabricPropertiesModel = createModel<RootModel>()({
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
        },
        RESET: (state: ResponseModel<PreferedFabricPropertiesDTO>) => {
            return {
                isBusy: false,
                data: undefined,
                status: 0
            }
        }
    },
    effects: (dispatch) => {
        const { upsertPreferedFabricPropertiesModel } = dispatch
        return {
            async upsertPreferedFabricProperties(input: UpsertPreferedFabricProperties): Promise<any> {
                upsertPreferedFabricPropertiesModel.BUSY();

                const response = await api.preferedFabricProperties.apiV1PreferedFabricPropertiesUpsertPost(input);

                if (response.status === 200) {
                    upsertPreferedFabricPropertiesModel.HANDLE_RESPONSE(response.data, response.status);
                }
                else {
                    upsertPreferedFabricPropertiesModel.HANDLE_EXCEPTIONS(response.status);
                }
            }
        }
    }
});