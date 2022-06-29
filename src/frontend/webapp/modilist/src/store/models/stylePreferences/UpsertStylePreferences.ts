import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { StylePreferencesDTO, UpsertStylePreferences } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const upsertStylePreferencesModel = createModel<RootModel>()({
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
        RESET: (state: ResponseModel<StylePreferencesDTO>) => {
            return {
                ...state,
                status: 0,
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
                }
            }
        }
    },
    effects: (dispatch) => {
        const { upsertStylePreferencesModel } = dispatch
        return {
            async upsertStylePreferences(input: UpsertStylePreferences): Promise<any> {
                upsertStylePreferencesModel.BUSY();

                const response = await api.stylePreferences.apiV1StylePreferencesUpsertPost(input);

                if (response.status === 200) {
                    upsertStylePreferencesModel.HANDLE_RESPONSE(response.data, response.status);
                }
                // TODO: handle exceptions
            }
        }
    }
});