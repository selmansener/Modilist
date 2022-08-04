import { Dialog, DialogContent, Grid, Typography, Divider, TextField, Button, DialogActions } from "@mui/material"
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { addDays } from "date-fns";
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import trLocale from 'date-fns/locale/tr';
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../../store/store";
import compareAsc from 'date-fns/compareAsc'

export interface DeliveryDateDialogProps {
    open: boolean;
    currentDate: Date;
    salesOrderId: number;
    handleClose: (isDateChanged: boolean) => void;
}

export function DeliveryDateDialog(props: DeliveryDateDialogProps) {
    const { t } = useTranslation();
    const { open, currentDate, salesOrderId, handleClose } = props;
    const minDate = addDays(currentDate, -3);
    const maxDate = addDays(currentDate, 7);
    const [deliveryDate, setDeliveryDate] = useState<Date | null>(currentDate);
    const dispatch = useDispatch<Dispatch>();
    const { isBusy, status } = useSelector((state: RootState) => state.updateEstimatedDeliveryDateModel);

    useEffect(() => {
        if (status === 200) {
            dispatch.updateEstimatedDeliveryDateModel.RESET();
            handleClose(true);
        }
    }, [status]);

    const changeDate = () => {
        const doesDateChanged = deliveryDate ? compareAsc(deliveryDate, currentDate) : false;
        if (doesDateChanged !== 0) {
            if (!isBusy && deliveryDate) {
                dispatch.updateEstimatedDeliveryDateModel.updateEstimatedDeliveryDate({
                    salesOrderId: salesOrderId,
                    data: {
                        estimatedDeliveryDate: deliveryDate
                    }
                })
            }
        }
        else {
            handleClose(false);
        }
    }

    return (
        <Dialog
            open={open}
            onClose={() => {
                handleClose(false);
            }}
        >
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h5">
                            {t("Components.DeliveryDateDialog.Title")}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" fontWeight={800}>
                            {t("Components.DeliveryDateDialog.Content")}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} locale={trLocale}>
                            <StaticDatePicker
                                showToolbar
                                toolbarTitle={t("Pages.Checkout.SelectReturnDate")}
                                orientation="portrait"
                                minDate={minDate}
                                maxDate={maxDate}
                                onError={(reason) => {
                                    // TODO: formik set error
                                    console.log(reason);
                                }}
                                views={["month", "day"]}
                                displayStaticWrapperAs="desktop"
                                value={deliveryDate}
                                disablePast
                                onChange={(newValue) => {
                                    setDeliveryDate(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    handleClose(false);
                }}>
                    {t("Generic.Forms.Close")}
                </Button>
                <Button onClick={() => {
                    changeDate();
                }} autoFocus>
                    {t("Generic.Forms.Submit")}
                </Button>
            </DialogActions>
        </Dialog>
    )
}