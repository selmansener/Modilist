import { Autocomplete, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch, RootState } from "../../../store/store";

export interface DistrictsProps {
    selectedCity?: string,
    value?: string,
    error?: boolean,
    helperText?: string | false,
    onChange: (value: { code?: string, name?: string }) => void;
    onBlur: (value: { code?: string, name?: string }) => void;
}

export function Districts(props: DistrictsProps) {
    const { t } = useTranslation();
    const { data: districts } = useSelector((state: RootState) => state.districtsModel);
    const dispatch = useDispatch<Dispatch>();
    const { value, error, helperText, onChange, onBlur, selectedCity } = props;
    const ref = useRef<HTMLInputElement>();

    useEffect(() => {
        if (selectedCity) {
            dispatch.districtsModel.getDistricts(selectedCity);
        }
    }, [selectedCity]);

    return (
    
        <Autocomplete
            id="district"
            value={districts?.find(x => x.name === value)}
            onChange={(e, value) => {
                onChange({
                    code: value?.code,
                    name: value?.name
                })
            }}
            onBlur={(e) => {
                const city = districts?.find(x => x.name === ref?.current?.value);
                onBlur({
                    code: city?.code,
                    name: city?.name
                })
            }}
            disablePortal
            options={districts && districts?.length > 0 ? districts?.map(district => {
                return {
                    ...district,
                    label: district.name
                }
            }) : []}
            renderInput={(params) => <TextField
                inputRef={ref}
                {...params}
                name={"district"}
                error={error}
                helperText={helperText}
                label={t("Generic.Address.District")}
            />}
        />
    );
}