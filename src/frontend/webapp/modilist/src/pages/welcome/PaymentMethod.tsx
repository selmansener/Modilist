
import { Button, FormControl, Grid, TextField, Typography } from "@mui/material";
import Iyzipay from 'iyzipay';
import { useState } from "react";
import { useSelector } from "react-redux";
import { config } from '../../config/';

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
    const [iyzipay] = useState<Iyzipay>(new Iyzipay({
        apiKey: config.iyzicoApiKey,
        secretKey: config.iyzicoSecretKey,
        uri: 'https://sandbox-api.iyzipay.com'
    }));

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

    const sendRequest = () => {
        iyzipay.card.create(createCardRequest, (err, result) => {
            console.log(err, result);
        });
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