import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { SendMail } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const sendContactFormModel = createModel<RootModel>()({
    state: {
        isBusy: false,
        status: 0
    } as ResponseModel,
    reducers: {
        BUSY: (state: ResponseModel) => {
            return {
                ...state,
                isBusy: true
            }
        },
        HANDLE_RESPONSE: (state: ResponseModel, status: number) => {
            return {
                ...state,
                isBusy: false,
                status
            }
        },
        RESET: (state: ResponseModel) => {
            return {
                ...state,
                isBusy: false,
                status: 0
            }
        }
    },
    effects: (dispatch) => {
        const { sendContactFormModel } = dispatch
        return {
            async sendContactFormMail(input: SendMail): Promise<any> {
                sendContactFormModel.BUSY();

                const response = await api.messages.apiV1MessageSendEmailPost(input);
                sendContactFormModel.HANDLE_RESPONSE(response.status);
            }
        }
    }
});