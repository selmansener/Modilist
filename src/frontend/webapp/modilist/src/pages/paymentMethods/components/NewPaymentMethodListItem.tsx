import { Button, Divider, Grid, Paper } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useTranslation } from "react-i18next";
import AddCardIcon from '@mui/icons-material/AddCard';
import { useNavigate } from "react-router-dom";

export function NewPaymentMethodListItem() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return <Paper elevation={6} sx={{
        p: 2
    }}>
        <Grid item container xs={12} spacing={2}>
            <Grid item xs={12} display="flex" justifyContent="flex-end">
                <Button 
                    onClick={() => {
                        navigate("/add-payment-method");
                    }}
                    variant="outlined" 
                    startIcon={<AddCircleOutlineIcon />}>
                    {t("Pages.PaymentMethods.PaymentMethodListItem.AddNew")}
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center">
                <AddCardIcon
                    color="disabled"
                    sx={{
                        fontSize: 192
                    }} />
            </Grid>
        </Grid>
    </Paper>
}