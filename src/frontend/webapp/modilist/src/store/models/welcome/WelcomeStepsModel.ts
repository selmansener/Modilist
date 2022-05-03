import { createModel } from "@rematch/core";
import { RootModel } from "..";

export type WelcomeStepState = {
    onSubmit: () => void;
    validator: () => boolean;
}

export const welcomeStepsModel = createModel<RootModel>()({
    state: {
        onSubmit: () => {},
        validator: () => true
    } as WelcomeStepState,
    reducers: {
        SET_ONSUBMIT: (state: WelcomeStepState, onSubmit: () => void) => {
            return {
                ...state,
                onSubmit
            }
        },
        SET_VALIDATOR: (state: WelcomeStepState, validator: () => boolean) => {
            return {
                ...state,
                validator
            }
        }
    },
    effects: (dispatch) => {
        const { welcomeStepsModel } = dispatch
        return {
            setValidator(validator: () => boolean) {
                welcomeStepsModel.SET_VALIDATOR(validator);
            },
            setOnSubmit(onSubmit: () => void) {
                welcomeStepsModel.SET_ONSUBMIT(onSubmit);
            }
        }
    }
});