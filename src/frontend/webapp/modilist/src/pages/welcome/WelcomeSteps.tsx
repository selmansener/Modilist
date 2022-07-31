import { Stepper, Typography, Step, StepLabel, styled, StepIconProps, Box, CircularProgress, useTheme, Grid, Fab, Paper } from "@mui/material";
import NavigationIcon from '@mui/icons-material/Navigation';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../store/store";
import { Trans, useTranslation } from "react-i18next";
import { FabricProperties } from "./FabricProperties";
import { FitPreferences } from "./FitPreferences";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useNavigate } from "react-router-dom";
import { SizeInfo } from "./SizeInfo";
import { StylePreferences } from "./StylePreferences";
import { Subscription } from "./Subscription";
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import StraightenIcon from '@mui/icons-material/Straighten';
import GradientIcon from '@mui/icons-material/Gradient';
import CardMembershipIcon from '@mui/icons-material/CardMembership';

const steps = [
    {
        title: 'Layouts.Welcome.WelcomeLayout.Steps.TitleBodySize',
        component: <SizeInfo />
    },
    {
        title: 'Layouts.Welcome.WelcomeLayout.Steps.TitleStylePreferences',
        component: <StylePreferences />
    },
    {
        title: 'Layouts.Welcome.WelcomeLayout.Steps.TitleFitPreferences',
        component: <FitPreferences />
    },
    {
        title: 'Layouts.Welcome.WelcomeLayout.Steps.TitleFabricProperties',
        component: <FabricProperties />
    },
    {
        title: 'Layouts.Welcome.WelcomeLayout.Steps.TitleSubscription',
        component: <Subscription />
    },
];



export function WelcomeSteps() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { activeStep } = useSelector((state: RootState) => state.welcomePageStepper);
    const { isBusy: activateAccountIsBusy, data: activateAccount, status: activateAccountStatus } = useSelector((state: RootState) => state.activateAccountModel);

    const { isBusy: createFirstOrderIsBusy, data: createFirstOrderData, status: createFirstOrderStatus } = useSelector((state: RootState) => state.createFirstOrderModel);
    const dispatch = useDispatch<Dispatch>();

    useEffect(() => {
        if (activateAccountStatus === 200 && activateAccount) {
            dispatch.getAccountModel.HANDLE_RESPONSE(activateAccount, activateAccountStatus);
            if (!createFirstOrderIsBusy && createFirstOrderStatus === 0) {
                dispatch.createFirstOrderModel.createFirstOrder();
            }
        }
    }, [activateAccountStatus]);

    useEffect(() => {
        if (!createFirstOrderIsBusy && createFirstOrderStatus === 200) {
            navigate("/", { replace: true });
        }
    }, [createFirstOrderStatus]);

    const StepIconRoot = styled('div')<{
        ownerState: { completed?: boolean; active?: boolean };
    }>(({ theme, ownerState }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        ...(ownerState.active && {
            backgroundImage:
                'linear-gradient( 136deg, rgb(47,34,68) 0%, rgb(150, 141, 179) 100%)',
            boxShadow: '0 4px 6px 0 rgba(150, 141, 179,.45)',
        }),
        ...(ownerState.completed && {
            backgroundImage:
                'linear-gradient( 136deg, rgb(47,34,68) 0%, rgb(150, 141, 179) 100%)',
        }),
    }));

    function ColorlibStepIcon(props: StepIconProps) {
        const { active, completed, className } = props;

        const icons: { [index: string]: React.ReactElement } = {
            1: <SensorOccupiedIcon />,
            2: <CheckroomIcon />,
            3: <StraightenIcon />,
            4: <GradientIcon />,
            5: <CardMembershipIcon />,
        };

        return (
            <StepIconRoot ownerState={{ completed, active }} className={className}>
                {icons[String(props.icon)]}
            </StepIconRoot>
        );
    }

    useEffect(() => {
        if (!activateAccountIsBusy && activeStep === steps.length && activateAccountStatus === 0) {
            dispatch.activateAccountModel.activateAccount();
        }
    }, [activeStep]);

    return (
        <Grid item container>
            <Grid item xs={12}>
                <Stepper activeStep={activeStep}>
                    {steps.map((step) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: {
                            optional?: React.ReactNode;
                        } = {};
                        return (
                            <Step key={step.title} {...stepProps} sx={{
                                minHeight: '120px',
                                mb: 2
                            }}>
                                <StepLabel {...labelProps} StepIconComponent={ColorlibStepIcon}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                    <Trans>
                                        <Typography sx={{
                                            mt: 1
                                        }} align="center">{t(step.title)}</Typography>
                                    </Trans>
                                </StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ mb: 4 }} align="center">
                    {t('Layouts.Welcome.WelcomeLayout.Description1')}
                </Typography>
            </Grid>



            {activeStep === steps.length
                ? <Grid item xs={12}>
                    <CircularProgress />
                </Grid>
                : <Grid item container xs={12} spacing={2}>
                    {steps[activeStep].component}
                </Grid>
            }
            <Fab sx={{ position: "fixed", bottom: 80, right: 20 }} variant="extended" onClick={() => {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            }}><NavigationIcon sx={{ mr: 1 }} />
                {t('Layouts.Welcome.WelcomeSteps.Buttons.Navigate')}</Fab>
        </Grid>
    );
}