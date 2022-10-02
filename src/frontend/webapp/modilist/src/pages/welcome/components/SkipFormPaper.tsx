import { Grid, Paper, Box, Typography, Button } from "@mui/material";
import { t } from "i18next";
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { ImageComponent } from "../../../components/image/ImageComponent";
import { config } from "../../../config";
import { Dispatch } from "../../../store/store";


export default function SkipFormPaper() {

    const { cdnImg: imgBaseHost } = config;
    const dispatch = useDispatch<Dispatch>();
    const { t } = useTranslation();

    return (
        <Grid item xs={12} textAlign="center">
            <Paper elevation={1} sx={{
                display: 'flex',
                p: 5,
                minHeight: '300px',
                bgcolor: '#ECE5FF'
            }}>
                <Grid container textAlign="center">
                    <Grid item container xs={12} textAlign="center" sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: "center",
                        justifyContent: 'center'
                    }}>
                        <Box minHeight={200} mr={5} sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Typography variant="h3">{t('Layouts.Welcome.WelcomeSteps.SkipFormForNow')}</Typography>
                            <Box>
                                <Typography variant="body1">{t('Layouts.Welcome.WelcomeSteps.StyleFormSkipDescription1')}</Typography>
                                <Typography variant="body1"><Trans>{t('Layouts.Welcome.WelcomeSteps.StyleFormSkipDescription2')}</Trans></Typography>
                                <Typography variant="body1">{t('Layouts.Welcome.WelcomeSteps.StyleFormSkipDescription3')}</Typography>
                            </Box>
                            <Button onClick={() => {
                                dispatch.welcomePageStepper.skipToStep(4);
                            }} variant="contained" color="secondary">{t('Layouts.Welcome.WelcomeSteps.SkipToSubscription')}</Button>
                        </Box>
                        <ImageComponent src={`${imgBaseHost}/common/style-form-continue.svg`}></ImageComponent>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}