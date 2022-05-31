import { createModel } from "@rematch/core";
import { number } from "yup";
import { RootModel } from "..";

export type WelcomeStepState = {
    activeStep: 0;
    skipped: Set<number>;
    nextCallback: () => void;
    backCallback: () => void;
}

export const welcomeStepsModel = createModel<RootModel>()({
    state: {
        activeStep: 0,
        skipped: new Set<number>(),
        nextCallback: () => {},
        backCallback: () => {}
    } as WelcomeStepState,
    reducers: {
        setBackCallback: (state: WelcomeStepState, backCallback: () => void) => {
            return {
                ...state,
                backCallback
            }
        },
        setNextCallback: (state: WelcomeStepState, nextCallback: () => void) => {
            return {
                ...state,
                nextCallback
            }
        },
        setActiveStep: (state: WelcomeStepState, activeStep) => {
            return {
                ...state,
                activeStep
            }
        },
        setSkipped: (state: WelcomeStepState, skipped: Set<number>) => {
            return {
                ...state,
                skipped
            }
        }
    }
});