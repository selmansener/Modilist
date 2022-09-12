import { createModel } from "@rematch/core";
import { ResolveOptions } from "yup/lib/Condition";
import { RootModel } from "..";
import { api } from "../../../App";
import { SendInvitation, StylePreferencesDTO } from "../../../services/swagger/api";
import { ResponseModel } from "../../response-model";

export const sendInvitationEmailsModel = createModel<RootModel>()({
    state: {
        isBusy: false,
        data: {
            invitationEmails: []
        },
        status: 0
    } as ResponseModel<SendInvitation>,
    reducers: {
        BUSY: (state: ResponseModel<SendInvitation>) => {
            return {
                ...state,
                isBusy: true
            }
        },
        HANDLE_RESPONSE: (state: ResponseModel<SendInvitation>, status: number) => {
            return {
                ...state,
                isBusy: false,
                status
            }
        },
        RESET: (state: ResponseModel<SendInvitation>) => {
            return {
                isBusy: false,
                status: 0,
            }
        }
    },
    effects: (dispatch) => {
        const {sendInvitationEmailsModel} = dispatch
        return {
            async sendInvitationEmails(input: SendInvitation):
            Promise<any> {
                sendInvitationEmailsModel.BUSY();

            const response = await api.discounts.apiV1DiscountSendPost(input);

            if(response.status === 200) {
                sendInvitationEmailsModel.HANDLE_RESPONSE(response.status);
            }
        }
    }
    }
});