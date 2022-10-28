import { Box, Button, Divider, Grid, Link, Paper, Tooltip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import UpdateIcon from '@mui/icons-material/Update';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { ImageComponent } from "../../../components/image/ImageComponent";
import { config } from "../../../config";
import { PaymentMethodDTO } from "../../../services/swagger/api";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../../store/store";
import { useEffect } from "react";

export interface PaymentMethodListItemProps {
    paymentMethod: PaymentMethodDTO,
    setAsDefaultPaymentMethod: (cardName: string) => void;
}

export function PaymentMethodListItem(props: PaymentMethodListItemProps) {
    const { t } = useTranslation();
    const { paymentMethod, setAsDefaultPaymentMethod } = props;
    const { cdnImg: imgBaseHost } = config;

    const getMaskedCardNumber = () => {
        let cardNumber: string | null | undefined = paymentMethod?.binNumber;

        if (!cardNumber) {
            return "";
        }

        let endResult = "";
        for (let i = 0; i < 5; i++) {
            if (i * 4 > cardNumber.length) {
                endResult += " ****";
                continue;
            }

            if (i !== 0) {
                endResult += (" " + cardNumber.substring(i * 4, 4));
            }
            else {
                endResult += cardNumber.substring(i * 4, 4);
            }
        }

        return endResult;
    }

    return <Paper elevation={6} sx={{
        p: 2
    }}>
        <Grid item container xs={12} spacing={2}>
            <Grid item xs={6} display="flex" alignItems="center">
                <Typography variant="body1" component="span" fontWeight={800}>
                    {t("Pages.PaymentMethods.PaymentMethodListItem.CardName")}
                </Typography>
                <Typography variant="body1" component="span" ml={1}>
                    {paymentMethod.cardName}
                </Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="flex-end">
                {paymentMethod.isDefault ?
                    <Tooltip
                        title={t("Pages.PaymentMethods.PaymentMethodListItem.DeleteWarning")}
                        placement="left"
                    >
                        <span>
                            <Button
                                disabled
                                variant="outlined"
                                startIcon={<DeleteForeverOutlinedIcon />}
                            >
                                {t("Generic.Forms.Delete")}
                            </Button>
                        </span>
                    </Tooltip>
                    : <Button
                        variant="outlined"
                        disabled
                        startIcon={<DeleteForeverOutlinedIcon />}>
                        {t("Generic.Forms.Delete")}
                    </Button>}
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12} display="flex" alignItems="center">
                <Typography variant="body1" component="span" fontWeight={800}>
                    {t("Pages.PaymentMethods.PaymentMethodListItem.BankName")}
                </Typography>
                <Typography variant="body1" component="span" ml={1}>
                    {paymentMethod.cardBankName}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1" component="span" fontWeight={800}>
                    {t("Pages.PaymentMethods.PaymentMethodListItem.CardNumber")}
                </Typography>
                <Typography variant="body1" component="span" ml={1}>
                    {getMaskedCardNumber()}
                </Typography>
            </Grid>
            <Grid item xs={6} sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center'
            }}>
                <ImageComponent src={`${imgBaseHost}/card-logo/${paymentMethod.cardAssociation}.svg`} width={150} />
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="flex-end" alignItems="flex-end">
                {paymentMethod.isDefault ?
                    <Typography variant="body1" fontWeight={800}>
                        {t("Pages.PaymentMethods.PaymentMethodListItem.Default")}
                    </Typography> :
                    <Button variant="outlined" startIcon={<CheckCircleOutlineIcon />}
                        onClick={() => {
                            if (paymentMethod.cardName) {
                                setAsDefaultPaymentMethod(paymentMethod.cardName);
                            }
                        }}>
                        {t("Pages.PaymentMethods.PaymentMethodListItem.SetAsDefault")}
                    </Button>
                }
            </Grid>
        </Grid>
    </Paper>
}