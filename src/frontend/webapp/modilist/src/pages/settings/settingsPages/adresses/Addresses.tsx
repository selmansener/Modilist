import { Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../../../store/store";
import { AddressListItem } from "./components/AddressListItem";
import { NewAddressListItem } from "./components/NewAddressListItem";

export default function Addresses() {
    const {t} = useTranslation();
    const dispatch = useDispatch<Dispatch>();
    const { isBusy: isBusyAddresses, data: addresses, status: addressesStatus } = useSelector((state: RootState) => state.getAllAddressesModel);
    const { isBusy: isBusyChangeDefault, status: changeDefaultAddressStatus } = useSelector((state: RootState) => state.changeDefaultAddressModel);

    useEffect(() => {
        if (!isBusyAddresses) {
            dispatch.getAllAddressesModel.getAllAddresses();
        }
    }, []);

    useEffect(() => {
        if (!isBusyChangeDefault && changeDefaultAddressStatus === 200) {
            dispatch.changeDefaultAddressModel.RESET();

            dispatch.getAllAddressesModel.getAllAddresses();
        }
    }, [changeDefaultAddressStatus]);

    return (
        <Grid item container xs={12} spacing={2}>
            <Helmet>
                <title>{t("Pages.Titles.Addresses")} | Modilist</title>
            </Helmet>
            <Grid item xs={12}>
                <Typography variant="h4">
                    {t("Pages.Titles.Addresses")}
                </Typography>
            </Grid>
            {addresses?.map(address => {
                return (
                    <Grid key={address.name} item xs={4}>
                        <AddressListItem address={address}
                            setAsDefaultHandler={(name) => {
                                if (!isBusyChangeDefault && changeDefaultAddressStatus === 0) {
                                    dispatch.changeDefaultAddressModel.changeDefaultAddress(name);
                                }
                            }}
                        />
                    </Grid>
                )
            })}
            <Grid item xs={4}>
                <NewAddressListItem />
            </Grid>
        </Grid>
    )
}