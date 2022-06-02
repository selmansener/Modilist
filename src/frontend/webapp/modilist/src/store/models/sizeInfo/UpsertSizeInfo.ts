import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../..";
import { SizeInfoDTO, UpsertSizeInfo } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const upsertSizeInfoModel = createModel<RootModel>()({
    state: {
        isBusy: false,
        data: undefined,
        status: 0
    } as ResponseModel<SizeInfoDTO>,
    reducers: {
        BUSY: (state: ResponseModel<SizeInfoDTO>) => {
            return {
                ...state,
                isBusy: true
            }
        },
        HANDLE_RESPONSE: (state: ResponseModel<SizeInfoDTO>, data: SizeInfoDTO, status: number) => {
            return {
                ...state,
                data,
                isBusy: false,
                status
            }
        },
        HANDLE_EXCEPTIONS: (state: ResponseModel<SizeInfoDTO>, status: number) => {
            return {
                ...state,
                isBusy: false,
                status
            }
        },
        RESET: (state: ResponseModel<SizeInfoDTO>) => {
            return {
                isBusy: false,
                data: undefined,
                status: 0
            }
        }
    },
    effects: (dispatch) => {
        const { upsertSizeInfoModel } = dispatch
        return {
            async upsertSizeInfo(input: UpsertSizeInfo): Promise<any> {
                upsertSizeInfoModel.BUSY();

                const response = await api.sizeInfos.apiV1SizeInfoUpsertPost(input);

                if (response.status === 200) {
                    upsertSizeInfoModel.HANDLE_RESPONSE(response.data, response.status);
                }
                else {
                    upsertSizeInfoModel.HANDLE_EXCEPTIONS(response.status);
                }
            }
        }
    }
});