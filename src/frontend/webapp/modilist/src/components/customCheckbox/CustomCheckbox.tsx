import { Badge, Box, styled, SxProps, Theme, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { ImageComponent } from "../image/ImageComponent";

interface CustomCheckboxProps {
    value: string;
    isNegative: boolean;
    label: string;
    checked: boolean;
    greyscale?: boolean;
    onChange: (checked: boolean, value: string) => void;
    sx?: SxProps<Theme>;
}

function CustomCheckbox(props: React.PropsWithChildren<CustomCheckboxProps>) {
    const { isNegative, onChange, value, checked: initialChecked, greyscale, label, sx } = props;
    const theme = useTheme();
    const [checked, setChecked] = useState(initialChecked);

    const handleClick = () => {
        setChecked(!checked);
        onChange(!checked, value);
    }

    return (
        <Box textAlign="center" sx={{
            ...sx
        }}>
            <Box
                onClick={handleClick}
                sx={{
                    display: 'flex',
                    border: checked ? 4 : 0,
                    borderColor: checked ? (isNegative ? theme.palette.error.main : theme.palette.success.main) : '',
                    borderRadius: checked ? 2 : 0,
                    boxSizing: 'border-box',
                    p: 1,
                    cursor: 'pointer',
                    flexGrow: 1,
                    justifyContent: 'center',
                    '&:hover': {
                        transition: theme.transitions.create('opacity', {
                            easing: theme.transitions.easing.easeInOut,
                            duration: 500
                        }),
                        opacity: (greyscale ? '1' : 'none'),
                        cursor: 'pointer'
                    },
                    '&': checked ? {
                        opacity: (greyscale ? '1' : 'none')
                    } : {
                        opacity: (greyscale ? '0.5' : 'none')
                    },
                }}
            >
                {props.children}
            </Box>
            <Box sx={{
                mt: 1,
                bgcolor: checked ? (isNegative ? theme.palette.error.main : theme.palette.success.main) : '',
                borderRadius: 2,
                boxSizing: 'border-box',
                p: 1,
                display: 'inline-block'
            }}>
                <Typography variant="body1" align="center" color={checked ? 'white' : ''}>{label}</Typography>
            </Box>
        </Box>
    )
}

export interface CustomCheckboxGroupProps {
    label?: React.ReactNode;
    value: string;
    contents: {
        value: string;
        imageSrc: string;
        labelText: string;
    }[],
    isNegative?: boolean;
    onChange: (values: string[]) => void;
    sx?: SxProps<Theme>;
    checkboxSx?: SxProps<Theme>;
    greyscale?: boolean;
}

export function CustomCheckboxGroup(props: CustomCheckboxGroupProps) {
    const { value, label, contents, isNegative, onChange, sx, checkboxSx, greyscale } = props;
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

    const defaultStyle: SxProps<Theme> = {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        overflowY: { xs: 'auto', md: 'unset' },
        flexWrap: { xs: 'nowrap', md: 'wrap' }
    }

    return (
        <>
            {label}
            <Box sx={{
                ...defaultStyle,
                ...sx,
            }}
            >
                {contents.map((content) => {
                    return (
                        <CustomCheckbox
                            greyscale={greyscale}
                            isNegative={isNegative ?? false}
                            onChange={handleChange}
                            value={content.value}
                            key={content.value}
                            checked={values.indexOf(content.value) > -1}
                            label={content.labelText}
                            sx={checkboxSx}
                        >
                            <ImageComponent width='100%' src={content.imageSrc} />
                        </CustomCheckbox>
                    )
                })}
            </Box >
        </>
    )
}