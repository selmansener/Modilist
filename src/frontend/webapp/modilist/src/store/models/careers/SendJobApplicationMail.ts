import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { api } from "../../../App";
import { SendMail } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export interface SendMailWithAttachments {
    templateId?: string, 
    senderName?: string, 
    from?: string, 
    to?: string, 
    templateData?: string, 
    attachments?: Array<Blob>
}

export const sendJobApplicationMailModel = createModel<RootModel>()({
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
        const { sendJobApplicationMailModel } = dispatch
        return {
            async sendJobApplicationMail(input: SendMailWithAttachments): Promise<any> {
                sendJobApplicationMailModel.BUSY();

                const response = await api.messages.apiV1MessageSendEmailWithAttachmentsPostForm(input.templateId, input.senderName, input.from, input.to, input.templateData, input.attachments);
                sendJobApplicationMailModel.HANDLE_RESPONSE(response.status);
            }
        }
    }
});