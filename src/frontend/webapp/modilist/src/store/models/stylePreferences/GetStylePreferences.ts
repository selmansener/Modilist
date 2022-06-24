import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { StylePreferencesDTO } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const getStylePreferencesModel = createModel<RootModel>()({
    state: {
        isBusy: false,
        data: {
            bodyPartsToHide: "",
            bodyPartsToHighlight: "",
            choiceReasons: "",
            excludedAccessoryCategories: "",
            excludedBagCategories: "",
            excludedFootwearCategories: "",
            excludedLowerCategories: "",
            excludedOuterCategories: "",
            excludedUnderwearCategories: "",
            excludedUpperCategories: "",
            lovesShopping: 0,
            openToSuggestions: 0,
            prefersHijabClothing: false
        },
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
        HANDLE_EXCEPTIONS: (state: ResponseModel<StylePreferencesDTO>, status: number) => {
            return {
                ...state,
                isBusy: false,
                status
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
                    getStylePreferencesModel.HANDLE_RESPONSE(response.data, response.status);
                }
                else {
                    getStylePreferencesModel.HANDLE_EXCEPTIONS(response.status);
                }
            }
        }
    }
});