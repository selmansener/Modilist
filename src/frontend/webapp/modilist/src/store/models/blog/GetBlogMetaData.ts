import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { BlogMetaData } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const getBlogMetaDataModel = createModel<RootModel>()({
    state: {
        isBusy: false,
        data: undefined,
        status: 0
    } as ResponseModel<BlogMetaData>,
    reducers: {
        BUSY: (state: ResponseModel<BlogMetaData>) => {
            return {
                ...state,
                isBusy: true
            }
        },
        HANDLE_RESPONSE: (state: ResponseModel<BlogMetaData>, data: BlogMetaData, status: number) => {
            return {
                ...state,
                data: {
                    ...data
                },
                isBusy: false,
                status
            }
        },
        HANDLE_EXCEPTION: (state: ResponseModel<BlogMetaData>, status: number) => {
            return {
                ...state,
                status
            }
        },
        RESET: (state: ResponseModel<BlogMetaData>) => {
            return {
                isBusy: false,
                status: 0,
                data: undefined
            }
        }
    },
    effects: (dispatch) => {
        const { getBlogMetaDataModel } = dispatch
        return {
            async getBlogMetaData(): Promise<any> {
                getBlogMetaDataModel.BUSY();

                const response = await api.blog.apiV1BlogGetGet();

                if (response.status === 200) {
                    getBlogMetaDataModel.HANDLE_RESPONSE(response.data, response.status);
                }
                else {
                    getBlogMetaDataModel.HANDLE_EXCEPTION(response.status);
                }
            }
        }
    }
});