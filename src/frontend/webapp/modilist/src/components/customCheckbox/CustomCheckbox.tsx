import { Badge, Box, styled, SxProps, Theme, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

interface CustomCheckboxProps {
    value: string;
    isNegative: boolean;
    checked: boolean;
    onChange: (checked: boolean, value: string) => void;
}

function CustomCheckbox(props: React.PropsWithChildren<CustomCheckboxProps>) {
    const { isNegative, onChange, value, checked: initialChecked } = props;
    const theme = useTheme();
    const [checked, setChecked] = useState(initialChecked);

    const handleClick = () => {
        setChecked(!checked);
        onChange(!checked, value);
    }

    return (
        <Badge badgeContent={
            (checked ?
                (isNegative ? <CancelIcon color="error" /> : <CheckCircleIcon color="success" />)
                : <></>)
        } sx={{
            m: 1,
            flex: '0 0 20%',
            justifyContent: 'center',
            boxShadow: checked ? theme.shadows[1] : theme.shadows[0],
        }}>
            <Box
                onClick={handleClick}
                sx={{
                    display: 'flex',
                    boxShadow: checked ? theme.shadows[1] : theme.shadows[0],
                    p: 1,
                    cursor: 'pointer',
                    flexGrow: 1,
                    justifyContent: 'center'
                }}
            >
                {props.children}
            </Box>
        </Badge>
    )
}

export interface CustomCheckboxGroupProps {
    label: React.ReactNode;
    value: string;
    contents: {
        value: string;
        element: React.ReactNode;
    }[],
    isNegative?: boolean;
    onChange: (values: string[]) => void;
    sx?: SxProps<Theme>;
}

export function CustomCheckboxGroup(props: CustomCheckboxGroupProps) {
    const { value, label, contents, isNegative, onChange, sx } = props;
    const [values, setValues] = useState<string[]>(value === "" ? [] : value.split(','));

    const handleChange = (checked: boolean, value: string) => {
        const index = values.indexOf(value);

        let newValues: string[] = [];

        if (checked && index < 0) {
            newValues = [
                ...values,
                value
            ];

            setValues(newValues);
        }
        else {
            newValues = values.filter(x => x !== value);
            setValues(newValues);
        }

        onChange(newValues);
    }

    return (
        <>
            {label}
            <Box sx={sx ?? {
                display: 'flex',
                alignContent: 'space-evenly',
                flexWrap: 'wrap'
            }}
            >
                {contents.map((content) => {
                    return (
                        <CustomCheckbox isNegative={isNegative ?? false}
                            onChange={handleChange}
                            value={content.value}
                            key={content.value}
                            checked={values.indexOf(content.value) > -1}
                        >
                            {content.element}
                        </CustomCheckbox>
                    )
                })}
            </Box >
        </>
    )
}