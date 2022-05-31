import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../..";
import { StylePreferencesDTO } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const createStylePreferencesModel = createModel<RootModel>()({
    state: {
        isBusy: false,
        data: undefined,
        status: 0
    } as ResponseModel<StylePreferencesDTO>,
    reducers: {
        BUSY: (state: ResponseModel<StylePreferencesDTO>) => {
            return {
                ...state,
                isBusy: true
            }
        },
        HANDLE_RESPONSE: (state: ResponseModel<StylePreferencesDTO>, data: StylePreferencesDTO, status: number) => {
            return {
                ...state,
                data,
                isBusy: false,
                status
            }
        },
    },
    effects: (dispatch) => {
        const { createStylePreferencesModel } = dispatch
        return {
            async createStylePreferences(): Promise<any> {
                createStylePreferencesModel.BUSY();

                const response = await api.stylePreferences.apiV1StylePreferencesCreatePost();

                if (response.status === 200) {
                    createStylePreferencesModel.HANDLE_RESPONSE(response.data, response.status);
                }
                // TODO: handle exceptions
            }
        }
    }
});