import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { FitPreferencesDTO } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const getFitPreferencesModel = createModel<RootModel>()({
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
        }
    },
    effects: (dispatch) => {
        const { getFitPreferencesModel } = dispatch
        return {
            async getFitPreferences(): Promise<any> {
                getFitPreferencesModel.BUSY();

                const response = await api.fitPreferences.apiV1FitPreferencesGetGet();

                if (response.status === 200) {
                    getFitPreferencesModel.HANDLE_RESPONSE(response.data, response.status);
                }
                else {
                    getFitPreferencesModel.HANDLE_EXCEPTIONS(response.status);
                }
            }
        }
    }
});