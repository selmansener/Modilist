import { Stepper, Typography, Step, StepLabel, Box, Button, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../store/store";
import i18n from "i18next";
import { Trans, useTranslation } from "react-i18next";
import BodySize from "./BodySize";
import ContactInfo from "./ContactInfo";
import PaymentMethod from "./PaymentMethod";
import Personal from "./Personal";
import StylePreferences from "./StylePreferences";
import Subscription from "./Subscription";
import { FabricProperties } from "./FabricProperties";

const steps = [
    {
        title: 'Layouts.Welcome.WelcomeLayout.Steps.TitleBodySize',
        component: <BodySize />
    },
    {
        title: 'Layouts.Welcome.WelcomeLayout.Steps.TitlePersonal',
        component: <Personal />
    },
    {
        title: 'Layouts.Welcome.WelcomeLayout.Steps.TitleStylePreferences',
        component: <StylePreferences />
    },
    {
        title: 'Layouts.Welcome.WelcomeLayout.Steps.TitleFabricProperties',
        component: <FabricProperties />
    },
    {
        title: 'Layouts.Welcome.WelcomeLayout.Steps.TitleContactInfo',
        component: <ContactInfo />
    },
    {
        title: 'Layouts.Welcome.WelcomeLayout.Steps.TitleSubscription',
        component: <Subscription />
    },
    {
        title: 'Layouts.Welcome.WelcomeLayout.Steps.TitlePaymentMethod',
        component: <PaymentMethod />
    },
];


export function WelcomeSteps() {

    const { t } = useTranslation();

    // const [activeStep, setActiveStep] = useState(0);
    // const [skipped, setSkipped] = useState(new Set<number>());
    const { activeStep, skipped, nextCallback, backCallback } = useSelector((state: RootState) => state.welcomeStepsModel);
    const dispatch = useDispatch<Dispatch>();

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        //onSubmit();

        //console.log(validator());

        // if (!validator()) {
        //     return;
        // }

        // let newSkipped = skipped;
        // if (isStepSkipped(activeStep)) {
        //     newSkipped = new Set(newSkipped.values());
        //     newSkipped.delete(activeStep);
        // }

        // setActiveStep((prevActiveStep) => prevActiveStep + 1);
        // setSkipped(newSkipped);
    };

    const handleBack = () => {
        //setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <>
            <Stepper activeStep={activeStep}>
                {steps.map((step, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                        optional?: React.ReactNode;
                    } = {};
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={step.title} {...stepProps}>
                            <StepLabel {...labelProps}>
                                <Trans>
                                    {t(step.title)}
                                </Trans>
                            </StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            mt: 2
                        }}
                    >
                        {steps[activeStep].component}
                    </Paper>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={backCallback}
                            sx={{ mr: 1 }}
                        >
                            {t('Layouts.Welcome.WelcomeSteps.Buttons.Back')}
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={nextCallback} variant="outlined">
                            {activeStep === steps.length - 1 ? t('Layouts.Welcome.WelcomeSteps.Buttons.Finish') : t('Layouts.Welcome.WelcomeSteps.Buttons.Next')}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </>
    );
}