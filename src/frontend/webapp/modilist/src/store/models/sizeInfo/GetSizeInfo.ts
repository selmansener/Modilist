import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../..";
import { BodyType, SizeInfoDTO } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const getSizeInfoModel = createModel<RootModel>()({
    state: {
        isBusy: false,
        data: {
            bodyType: BodyType.None,
            weight: 0,
            height: 0,
            upperBody: "",
            lowerBody: "",
            outWear: "",
            footWear: "",
            menUnderWear: "",
            womenUnderWearCup: "",
            womenUnderWearSize: "",
            additionalNotes: "",
            armLength: 0,
            bodyLength: 0,
            breastRadius: 0,
            footLength: 0,
            headRadius: 0,
            hipRadius: 0,
            legLength: 0,
            neckRadius: 0,
            shoulderWidth: 0,
            waistRadius: 0
        },
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
        }
    },
    effects: (dispatch) => {
        const { getSizeInfoModel } = dispatch
        return {
            async getSizeInfo(): Promise<any> {
                getSizeInfoModel.BUSY();

                const response = await api.sizeInfos.apiV1SizeInfoGetGet();

                if (response.status === 200) {
                    getSizeInfoModel.HANDLE_RESPONSE(response.data, response.status);
                }
                else {
                    getSizeInfoModel.HANDLE_EXCEPTIONS(response.status);
                }
            }
        }
    }
});