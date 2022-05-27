import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../../store/store";

export interface CitiesProps {
    value?: string,
    onChange: (event: SelectChangeEvent<string>, child: React.ReactNode) => void,
    onBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
}

export function Cities(props: CitiesProps) {
    const { t } = useTranslation();
    const { data: cities } = useSelector((state: RootState) => state.citiesModel);
    const dispatch = useDispatch<Dispatch>();
    const { value, onChange, onBlur } = props;

    useEffect(() => {
        dispatch.citiesModel.getCities();
    }, []);

    return (<Select
        name={"city"}
        labelId="city-label"
        id="city"
        value={value}
        label={t("Generic.City")}
        onChange={onChange}
        onBlur={onBlur}
    >
        {cities?.map(city => {
            return <MenuItem value={city.code}>{city?.name}</MenuItem>
        })}
    </Select>);
}