
import { Button, FormControl, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { config } from '../../config/';
import { Dispatch, RootState } from "../../store/store";

interface Card {
    cardAlias: string;
    cardHolderName: string;
    cardNumber: string;
    expireMonth: string;
    expireYear: string;
}

interface CreateCardRequest {
    locale: string;
    conversationId: string;
    email: string;
    externalId: string;
    card: Card;
}

export default function PaymentMethod() {
    const { activeStep, skipped } = useSelector((state: RootState) => state.welcomeStepsModel);
    const dispatch = useDispatch<Dispatch>();

    const [createCardRequest, setCreateCardRequest] = useState<CreateCardRequest>({
        locale: 'TR',
        conversationId: '123456789',
        email: 'selman.sener@modilist.com',
        externalId: '1',
        card: {
            cardAlias: 'default',
            cardHolderName: '',
            cardNumber: '',
            expireMonth: '',
            expireYear: ''
        }
    });


    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    useEffect(() => {
        dispatch.welcomeStepsModel.setNextCallback(() => {
            // TODO: activate account at this step
            let newSkipped = skipped;
            if (isStepSkipped(activeStep)) {
                newSkipped = new Set(newSkipped.values());
                newSkipped.delete(activeStep);
            }

            dispatch.welcomeStepsModel.setActiveStep(activeStep + 1);
            dispatch.welcomeStepsModel.setSkipped(newSkipped);
        });

        dispatch.welcomeStepsModel.setBackCallback(() => {
            let newSkipped = skipped;
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);

            const newStep = activeStep - 1;
            dispatch.welcomeStepsModel.setActiveStep(newStep);
            dispatch.welcomeStepsModel.setSkipped(newSkipped);
        });
    }, []);

    const sendRequest = () => {
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h6' align='left' sx={{ m: 1 }}>
                        Ödeme Yöntemi
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <div style={{ display: 'flex', justifyContent: 'left' }}>
                        <FormControl sx={{ m: 1, width: 680 }}>
                            <TextField
                                label="Kart Üzerindeki İsim"
                                variant="outlined"
                                onChange={(e) => {
                                    setCreateCardRequest({
                                        ...createCardRequest,
                                        card: {
                                            ...createCardRequest.card,
                                            cardHolderName: e.target.value
                                        }
                                    })
                                }} />
                        </FormControl>
                    </div>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField
                            label="Son Kullanma Tarihi (Ay)"
                            variant="outlined"
                            onChange={(e) => {
                                setCreateCardRequest({
                                    ...createCardRequest,
                                    card: {
                                        ...createCardRequest.card,
                                        expireMonth: e.target.value
                                    }
                                })
                            }}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField
                            label="Son Kullanma Tarihi (Yıl)"
                            variant="outlined"
                            onChange={(e) => {
                                setCreateCardRequest({
                                    ...createCardRequest,
                                    card: {
                                        ...createCardRequest.card,
                                        expireYear: e.target.value
                                    }
                                })
                            }} />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField
                            label="CVV"
                            variant="outlined"
                            onChange={(e) => {
                                // setCreateCardRequest({
                                //     ...createCardRequest,
                                //     card: {
                                //         ...createCardRequest.card,
                                //         : e.target.value
                                //     }
                                // })
                            }} />
                    </FormControl>
                </Grid>

                {/* TODO: formatter implementation */}
                {/* https://mui.com/material-ui/react-text-field/#integration-with-3rd-party-input-libraries */}
                <Grid item xs={8}>
                    <FormControl sx={{ m: 1, width: 680 }}>
                        <TextField
                            label="Kart Numarası"
                            type="number"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            variant="outlined"
                            onChange={(e) => {
                                setCreateCardRequest({
                                    ...createCardRequest,
                                    card: {
                                        ...createCardRequest.card,
                                        cardNumber: e.target.value
                                    }
                                })
                            }} />
                    </FormControl>
                </Grid>
            </Grid>

            <Button onClick={sendRequest}>
                gönder
            </Button>
        </>
    )
}