import { Stepper, Typography, Step, StepLabel, styled, StepIconProps, Box, CircularProgress, useTheme, Grid, Fab, Paper } from "@mui/material";
import NavigationIcon from '@mui/icons-material/Navigation';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../store/store";
import { Trans, useTranslation } from "react-i18next";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import CheckroomIcon from '@mui/icons-material/Checkroom';
import StraightenIcon from '@mui/icons-material/Straighten';
import GradientIcon from '@mui/icons-material/Gradient';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';


const steps = [
    {
        title: 'Layouts.Welcome.WelcomeLayout.Steps.TitleBodySize',
        pathname: '/style-form/step/size-info'
    },
    {
        title: 'Layouts.Welcome.WelcomeLayout.Steps.TitleStylePreferences',
        pathname: '/style-form/step/style-preferences'
    },
    {
        title: 'Layouts.Welcome.WelcomeLayout.Steps.TitleFitPreferences',
        pathname: '/style-form/step/fit-preferences'
    },
    {
        title: 'Layouts.Welcome.WelcomeLayout.Steps.TitleFabricProperties',
        pathname: '/style-form/step/fabric-preferences'
    },
    {
        title: 'Layouts.Welcome.WelcomeLayout.Steps.TitleSubscription',
        pathname: '/style-form/step/subscription'
    },
];



export function WelcomeSteps() {
    const { t } = useTranslation();
    const location = useLocation();
    const [scrollPosition, setScrollPosition] = useState(0);
    const windowHeight = window.innerHeight;
    const [activeStep, setActiveStep] = useState(0);

    const StepIconRoot = styled('div')<{
        ownerState: { completed?: boolean; active?: boolean };
    }>(({ theme, ownerState }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
        zIndex: 1,
        color: '#fff',
        [theme.breakpoints.down("md")]: {
            width: 36,
            height: 36,
        },
        [theme.breakpoints.up("md")]: {
            width: 50,
            height: 50,
        },
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
            1: <AccessibilityNewIcon />,
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

    const getScrollTopDisplayValue = () => {
        const threshold = windowHeight * 35 / 100;

        return scrollPosition > threshold;
    }

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const index = steps.findIndex(x => x.pathname === location.pathname);
        setActiveStep(index);
    }, [location]);

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
                                        <Typography variant="body1" sx={{
                                            mt: 1,
                                            display: { xs: 'none', md: 'block' }
                                        }} align="center">{t(step.title)}</Typography>
                                        <Typography variant="body2" sx={{
                                            mt: 1,
                                            display: { xs: 'block', md: 'none' }
                                        }} align="center">{t(step.title)}</Typography>
                                    </Trans>
                                </StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </Grid>
            <Grid item container xs={12} spacing={2}>
                <Outlet />
            </Grid>
            {getScrollTopDisplayValue() && <Fab
                sx={{ position: "fixed", bottom: 20, right: 20 }} variant="extended" onClick={() => {
                    window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                    });
                }}>
                <NavigationIcon sx={{ mr: 1 }} />
                {t('Layouts.Welcome.WelcomeSteps.Buttons.Navigate')}
            </Fab>}
        </Grid>
    );
}