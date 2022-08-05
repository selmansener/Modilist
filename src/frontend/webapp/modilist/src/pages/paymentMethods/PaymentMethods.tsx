import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, Dispatch } from "../../store/store";
import { NewPaymentMethodListItem } from "./components/NewPaymentMethodListItem";
import { PaymentMethodListItem } from "./components/PaymentMethodListItem";

export function PaymentMethods() {
    const dispatch = useDispatch<Dispatch>();
    const { isBusy, data: paymentMethods } = useSelector((state: RootState) => state.getAllPaymentMethodsModel);

    useEffect(() => {
        if (!isBusy) {
            dispatch.getAllPaymentMethodsModel.getAllPaymentMethods();
        }
    }, []);

    return (
        <Grid item container xs={12} spacing={2}>
            {paymentMethods?.map(paymentMethod => {
                return <Grid key={paymentMethod.lastFourDigit} item xs={4}>
                    <PaymentMethodListItem paymentMethod={paymentMethod} />
                </Grid>
            })}
            <Grid item xs={4} >
                <NewPaymentMethodListItem />
            </Grid>
        </Grid>
    )
}