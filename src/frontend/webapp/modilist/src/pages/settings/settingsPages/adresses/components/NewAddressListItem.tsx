import { Button, Divider, Grid, Paper } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useTranslation } from "react-i18next";
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import { useNavigate } from "react-router-dom";

export function NewAddressListItem() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return <Paper elevation={6} sx={{
        p: 2,
        minHeight: 260
    }}>
        <Grid item container xs={12} spacing={2}>
            <Grid item xs={12} display="flex" justifyContent="flex-end">
                <Button 
                    onClick={() => {
                        navigate("/settings/addresses/new");
                    }}
                    variant="outlined" 
                    startIcon={<AddCircleOutlineIcon />}>
                    {t("Pages.Addresses.AddressLineItem.AddNew")}
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center">
                <AddLocationAltOutlinedIcon
                    color="disabled"
                    sx={{
                        fontSize: 154
                    }} />
            </Grid>
        </Grid>
    </Paper>
}