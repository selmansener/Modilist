import { Paper, Grid, Button, Typography, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import UpdateIcon from '@mui/icons-material/Update';
import { AddressDTO } from "../../../services/swagger/api";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export interface AddressListItemProps {
    address: AddressDTO;
    setAsDefaultHandler: (name: string) => void;
}

export function AddressListItem(props: AddressListItemProps) {
    const { t } = useTranslation();
    const { address, setAsDefaultHandler } = props;

    return (
        <Paper elevation={6} sx={{
            p: 2,
            minHeight: 260,
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'space-between',
            flexDirection: 'column'
        }}>
            <Grid item container xs={12} spacing={2}>
                <Grid item xs={6} display="flex" alignItems="center">
                    <Typography variant="body1" fontWeight={800}>
                        {t("Pages.Addresses.AddressLineItem.AddressName")}
                    </Typography>
                    <Typography variant="body1" ml={1}>
                        {address.name}
                    </Typography>
                </Grid>
                <Grid item xs={6} display="flex" justifyContent="flex-end">
                    <Button
                        variant="outlined"
                        startIcon={<UpdateIcon />}
                    >
                        {t("Generic.Forms.Edit")}
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" component="span" fontWeight={800}>
                        {t("Pages.Addresses.AddressLineItem.FullAddress")}
                    </Typography>
                    <Typography variant="body1" component="span" ml={1}>
                        {address.fullAddress}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container xs={12} spacing={2} justifyContent="flex-end">
                {address.isDefault ?
                    <Typography variant="body1" fontWeight={800}>
                        {t("Pages.Addresses.AddressLineItem.Default")}
                    </Typography> :
                    <Button
                        onClick={() => {
                            if (address.name) {
                                setAsDefaultHandler(address.name);
                            }
                        }}
                        variant="outlined"
                        startIcon={<CheckCircleOutlineIcon />}>
                        {t("Pages.Addresses.AddressLineItem.SetAsDefault")}
                    </Button>
                }
            </Grid>
        </Paper>
    )
}