import { Autocomplete, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { City } from "../../../services/swagger/api";
import { Dispatch, RootState } from "../../../store/store";

export interface CitiesProps {
    value?: string,
    error?: boolean,
    helperText?: string | false,
    onChange: (value: { code?: string, name?: string }) => void;
    onBlur: (value: { code?: string, name?: string }) => void;
}

export function Cities(props: CitiesProps) {
    const { t } = useTranslation();
    const { data: cities } = useSelector((state: RootState) => state.citiesModel);
    const dispatch = useDispatch<Dispatch>();
    const { value, error, helperText, onChange, onBlur } = props;
    const ref = useRef<HTMLInputElement>();

    useEffect(() => {
        dispatch.citiesModel.getCities();
    }, []);

    const getCity = () => {
        const city = cities?.find(x => x.name === value);
        if (city) {
            return {
                ...city,
                label: city.name
            }
        }
        else {
            return {
                name: "",
                code: "",
                label: ""
            }
        }
    }

    return (
        <Autocomplete
            id="city"
            value={getCity()}
            onChange={(e, value) => {
                onChange({
                    code: value?.code,
                    name: value?.name
                })
            }}
            onBlur={(e) => {
                const city = cities?.find(x => x.name === ref?.current?.value);
                onBlur({
                    code: city?.code,
                    name: city?.name
                })
            }}
            disablePortal
            options={cities && cities?.length > 0 ? cities?.map(city => {
                return {
                    ...city,
                    label: city.name
                }
            }) : []}
            renderInput={(params) => <TextField
                inputRef={ref}
                {...params}
                name={"city"}
                error={error}
                helperText={helperText}
                label={t("Generic.Address.City")}
            />}
        />
    );
}