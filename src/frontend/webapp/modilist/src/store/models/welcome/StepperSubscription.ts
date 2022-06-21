import { createModel } from "@rematch/core";
import { RootModel } from "..";

export type StepperSubscription = {
    personal: () => void;
    contactInfo: () => void,
    subscriptionDetails: () => void,
    paymentMethod: () => void
}

export const stepperSubscription = createModel<RootModel>()({
    state: {
        personal: () => { },
        contactInfo: () => { },
        subscriptionDetails: () => { },
        paymentMethod: () => { }
    } as StepperSubscription,
    reducers: {
        setPersonal: (state: StepperSubscription, callback: () => void) => {
            return {
                ...state,
                personal: callback
            }
        },
        setContactInfo: (state: StepperSubscription, callback: () => void) => {
            return {
                ...state,
                contactInfo: callback
            }
        },
        setSubscriptionDetails: (state: StepperSubscription, callback: () => void) => {
            return {
                ...state,
                subscriptionDetails: callback
            }
        },
        setPaymentMethod: (state: StepperSubscription, callback: () => void) => {
            return {
                ...state,
                paymentMethod: callback
            }
        }
    }
});