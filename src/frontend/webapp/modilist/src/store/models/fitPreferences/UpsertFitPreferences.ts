import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { FitPreferencesDTO, UpsertFitPreferences } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const upsertFitPreferencesModel = createModel<RootModel>()({
    state: {
        isBusy: false,
        data: undefined,
        status: 0
    } as ResponseModel<FitPreferencesDTO>,
    reducers: {
        BUSY: (state: ResponseModel<FitPreferencesDTO>) => {
            return {
                ...state,
                isBusy: true
            }
        },
        HANDLE_RESPONSE: (state: ResponseModel<FitPreferencesDTO>, data: FitPreferencesDTO, status: number) => {
            return {
                ...state,
                data,
                isBusy: false,
                status
            }
        },
        HANDLE_EXCEPTIONS: (state: ResponseModel<FitPreferencesDTO>, status: number) => {
            return {
                ...state,
                isBusy: false,
                status
            }
        },
        RESET: (state: ResponseModel<FitPreferencesDTO>) => {
            return {
                isBusy: false,
                data: undefined,
                status: 0
            }
        }
    },
    effects: (dispatch) => {
        const { upsertFitPreferencesModel } = dispatch
        return {
            async upsertFitPreferences(input: UpsertFitPreferences): Promise<any> {
                upsertFitPreferencesModel.BUSY();

                const response = await api.fitPreferences.apiV1FitPreferencesUpsertPost(input);

                if (response.status === 200) {
                    upsertFitPreferencesModel.HANDLE_RESPONSE(response.data, response.status);
                }
                else {
                    upsertFitPreferencesModel.HANDLE_EXCEPTIONS(response.status);
                }
            }
        }
    }
});