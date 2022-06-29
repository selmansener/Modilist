import { createModel } from "@rematch/core";
import { RootModel } from "..";

export type WelcomePageStepper = {
    activeStep: number,
    skipped: Set<number>
}


export const welcomePageStepper = createModel<RootModel>()({
    state: {
        activeStep: 0,

    } as WelcomePageStepper,
    reducers: {
        next: (state: WelcomePageStepper) => {
            return {
                ...state,
                activeStep: state.activeStep + 1,
            }
        },
        back: (state: WelcomePageStepper) => {
            return {
                ...state,
                activeStep: state.activeStep - 1,
            }
        }
    }
});