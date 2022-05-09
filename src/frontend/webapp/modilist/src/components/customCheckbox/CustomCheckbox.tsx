import { Badge, Box, styled, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

interface CustomCheckboxProps {
    value: string;
    isNegative: boolean;
    onChange: (checked: boolean, value: string) => void;
}

function CustomCheckbox(props: React.PropsWithChildren<CustomCheckboxProps>) {
    const { isNegative, onChange, value } = props;
    const theme = useTheme();
    const [checked, setChecked] = useState(false);


    const handleClick = () => {
        setChecked(!checked);
    }

    useEffect(() => {
        onChange(checked, value);
    }, [checked]);

    return (
        <Badge badgeContent={
            (checked ?
                (isNegative ? <CancelIcon color="error" fontSize="large" /> : <CheckCircleIcon color="success" fontSize="large" />)
                : <></>)
        } sx={{
            m: 1
        }}>
            <Box
                onClick={handleClick}
                sx={{
                    boxShadow: checked ? theme.shadows[1] : theme.shadows[0],
                    p: 1,
                    cursor: 'pointer'
                }}
            >
                {props.children}
            </Box>
        </Badge>
    )
}

export interface CustomCheckboxGroupProps {
    label: React.ReactNode;
    contents: {
        value: string;
        element: React.ReactNode;
    }[],
    isNegative?: boolean;
    onChange: (values: string[]) => void;
}

export function CustomCheckboxGroup(props: CustomCheckboxGroupProps) {
    const { label, contents, isNegative, onChange } = props;
    const [values, setValues] = useState<string[]>([]);

    const handleChange = (checked: boolean, value: string) => {
        const index = values.indexOf(value);

        if (checked && index < 0) {
            setValues([
                ...values,
                value
            ]);
        }
        else {
            const newValues = values.filter(x => x !== value);
            setValues(newValues);
        }
    }

    useEffect(() => {
        onChange(values);
    }, [values]);

    return (
        <>
            {label}
            <Box sx={{ display: 'flex', alignContent: 'space-evenly' }} >
                {contents.map((content) => {
                    return (
                        <CustomCheckbox isNegative={isNegative ?? false}
                            onChange={handleChange}
                            value={content.value}
                            key={content.value}>
                            {content.element}
                        </CustomCheckbox>
                    )
                })}
            </Box >
        </>
    )
}