import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../..";
import { StylePreferencesDTO, UpdateStylePreferences } from "../../../services/swagger/api";
import { Dictonary, ErrorResponse, ResponseModel } from "../../response-model";

export const updateStylePreferencesModel = createModel<RootModel>()({
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
        HANDLE_RESPONSE: (state: ResponseModel<StylePreferencesDTO>, data?: StylePreferencesDTO) => {
            return {
                ...state,
                data,
                isBusy: false
            }
        },
        HANDLE_VALIDATION_EXCEPTIONS: (state: ResponseModel<StylePreferencesDTO>, errors: Dictonary) => {
            return {
                ...state,
                errors,
                type: "ValidationException",
                isBusy: false
            }
        }
    },
    effects: (dispatch) => {
        const { updateStylePreferencesModel } = dispatch
        return {
            async updateAccount(input: UpdateStylePreferences): Promise<any> {
                updateStylePreferencesModel.BUSY();

                const response = await api.stylePreferences.apiV1StylePreferencesUpdatePost(input);

                if (response) {

                    if (response && response.status === 200) {
                        updateStylePreferencesModel.HANDLE_RESPONSE(response.data);
                    }
                    // TODO: handle exceptions
                    else if (response.status === 400) {

                        const { errorType, errors } = response.data as ErrorResponse;

                        if (errorType === "ValidationException" && errors) {

                            updateStylePreferencesModel.HANDLE_VALIDATION_EXCEPTIONS(errors);
                        }
                    }
                }
            }
        }
    }
});