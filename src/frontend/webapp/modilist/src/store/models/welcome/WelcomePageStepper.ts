import { createModel } from "@rematch/core";
import { RootModel } from "..";

export type WelcomePageStepper = {
    activeStep: number,
    skipped: Set<number>
}

const isStepSkipped = (skipped: Set<number>, step: number) => {
    return skipped.has(step);
};

export const welcomePageStepper = createModel<RootModel>()({
    state: {
        activeStep: 0,
        skipped: new Set<number>(),
    } as WelcomePageStepper,
    reducers: {
        next: (state: WelcomePageStepper) => {
            let newSkipped = state.skipped;
            if (isStepSkipped(state.skipped, state.activeStep)) {
                newSkipped = new Set(newSkipped.values());
                newSkipped.delete(state.activeStep);
            }

            return {
                ...state,
                activeStep: state.activeStep + 1,
                skipped: newSkipped
            }
        },
        back: (state: WelcomePageStepper) => {
            let newSkipped = state.skipped;
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(state.activeStep);

            return {
                ...state,
                activeStep: state.activeStep - 1,
                skipped: newSkipped
            }
        }
    }
});