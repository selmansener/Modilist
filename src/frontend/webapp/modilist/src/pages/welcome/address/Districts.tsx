import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch, RootState } from "../../../store/store";

export interface DistrictsProps {
    selectedCity?: string,
    value?: string,
    onChange: (event: SelectChangeEvent<string>, child: React.ReactNode) => void,
    onBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
}

export function Districts(props: DistrictsProps) {
    const { t } = useTranslation();
    const { data: districts } = useSelector((state: RootState) => state.districtsModel);
    const dispatch = useDispatch<Dispatch>();
    const { value, onChange, onBlur, selectedCity } = props;

    useEffect(() => {
        if (selectedCity) {
            dispatch.districtsModel.getDistricts(selectedCity);
        }
    }, [selectedCity]);

    return (<Select
        name={"district"}
        labelId="district-label"
        id="district"
        value={value}
        label={t("Generic.District")}
        onChange={onChange}
        onBlur={onBlur}
    >
        {districts?.map(district => {
            return <MenuItem value={district.code}>{district?.name}</MenuItem>
        })}
    </Select>);
}