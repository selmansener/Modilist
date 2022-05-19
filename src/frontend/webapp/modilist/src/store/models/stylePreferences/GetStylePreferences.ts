import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../..";
import { StylePreferencesDTO } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const getStylePreferencesModel = createModel<RootModel>()({
    state: {
        isBusy: false,
        data: undefined
    } as ResponseModel<StylePreferencesDTO>,
    reducers: {
        BUSY: (state: ResponseModel<StylePreferencesDTO>) => {
            return {
                ...state,
                isBusy: true
            }
        },
        HANDLE_RESPONSE: (state: ResponseModel<StylePreferencesDTO>, data: StylePreferencesDTO) => {
            return {
                ...state,
                data,
                isBusy: false
            }
        }
    },
    effects: (dispatch) => {
        const { getStylePreferencesModel } = dispatch
        return {
            async getStylePreferences(): Promise<any> {
                getStylePreferencesModel.BUSY();

                const response = await api.stylePreferences.apiV1StylePreferencesGetGet();

                if (response.status === 200) {
                    getStylePreferencesModel.HANDLE_RESPONSE(response.data);
                }
                // TODO: handle exceptions
            }
        }
    }
});