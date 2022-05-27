import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { UpdateAccount } from "../../../services/swagger/api";

export type WelcomePageModel = {
    account: UpdateAccount,
}

export const welcomePageModel = createModel<RootModel>()({
    state: {
        account: {
            firstName: '',
            lastName: '',
            birthDate: null,
            gender: 'None',
            jobTitle: '',
            instagramUserName: '',
            phone: ''
        },
        
    } as WelcomePageModel,
    reducers: {
        setAccount: (state: WelcomePageModel, account: UpdateAccount) => {
            return {
                ...state,
                account: {
                    ...account
                }
            }
        }
    }
});