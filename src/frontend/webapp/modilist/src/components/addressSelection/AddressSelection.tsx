import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, Link, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AddressDTO } from "../../services/swagger/api";
import { RootState, Dispatch } from "../../store/store";


interface AddressItemProps {
    id?: number;
    name?: string;
    fullAddress?: string;
    district?: string;
    city?: string;
    phone?: string;
    onSelect: (selectedId: number) => void;
}

function AddressItem(props: AddressItemProps) {
    const { t } = useTranslation();
    const {
        id,
        name,
        fullAddress,
        district,
        city,
        phone,
        onSelect,
    } = props;

    const getMaskedPhone = () => {
        const lastFourNumber = phone?.substring(phone.length - 4, phone.length);
        return `+90******${lastFourNumber}`
    }

    return (
        <React.Fragment>
            <Grid item xs={6}>
                <Typography variant="body1" fontWeight={800}>
                    {name}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="body1" fontWeight={800} align="right">
                    <Link
                        onClick={() => {
                            if (id) {
                                onSelect(id);
                            }
                        }}
                        sx={{
                            cursor: 'pointer'
                        }}>
                        {t("Components.AddressSelection.Select")}
                    </Link>
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1">
                    {fullAddress}
                </Typography>
                <Typography variant="body1">
                    {district} / {city}
                </Typography>
                <Typography variant="body1">
                    {getMaskedPhone()}
                </Typography>
            </Grid>
        </React.Fragment>
    )
}

export interface AddressSelectionProps {
    open: boolean;
    contentText: string;
    handleClose: () => void;
    onSelect: (selectedAddress: AddressDTO) => void;
}

export function AddressSelection(props: AddressSelectionProps) {
    const dispatch = useDispatch<Dispatch>();
    const { isBusy: isBusy, data: addresses, status: status } = useSelector((state: RootState) => state.getAllAddressesModel);
    const { t } = useTranslation();
    const { open, contentText, handleClose, onSelect } = props;

    useEffect(() => {
        if (!isBusy && status === 0) {
            dispatch.getAllAddressesModel.getAllAddresses();
        }
    }, []);

    const handleAddressSelection = (id: number) => {
        if (addresses) {
            const selectedAddress = addresses.find(x => x.id == id);
            if (selectedAddress) {
                onSelect(selectedAddress);
            }
        }
    }

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            open={open}
            onClose={handleClose}
        >
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h5">
                            {t("Components.AddressSelection.Title")}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" fontWeight={800}>
                            {t(contentText)}
                        </Typography>
                    </Grid>
                    {addresses && addresses.map((address, index) => {
                        if (index === addresses.length - 1) {
                            return <AddressItem key={address.name} {...address} onSelect={handleAddressSelection} />
                        }

                        return <React.Fragment key={address.name}>
                            <AddressItem {...address} onSelect={handleAddressSelection} />
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                        </React.Fragment>
                    })}
                </Grid>
            </DialogContent>
        </Dialog>
    )
}