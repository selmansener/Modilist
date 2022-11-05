import { Box, Button, RadioGroup, SxProps, Theme, Typography, useTheme } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";

interface CustomRadioButtonProps {
    value: string;
    checked: boolean;
    control: {
        element: string | React.ReactNode;
        label?: string | React.ReactNode | ((selected: boolean) => React.ReactNode);
    };
    onChange: (value: string) => void;
    greyscale?: boolean;
    sx?: SxProps<Theme>;
}

function CustomRadioButton(props: CustomRadioButtonProps) {
    const { value, checked, control, onChange, greyscale, sx } = props;
    const theme = useTheme();

    function RenderLabel(checked: boolean, label?: string | React.ReactNode | ((selected: boolean) => React.ReactNode)) {
        if (!label) {
            return;
        }

        if (typeof label === 'string' || React.isValidElement(label)) {
            return <Box sx={{
                cursor: 'pointer',
                borderColor: theme.palette.secondary.main,
                borderRadius: checked ? 2 : 0,
                bgcolor: checked ? theme.palette.secondary.main : 'white',
                boxSizing: 'border-box',
                textAlign: 'center',
                color: checked ? 'white' : theme.palette.primary.main,
                p: 1,
                m: 1,
                display: 'inline-block',
                [theme.breakpoints.up("md")]: {
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
                },
                ...sx
            }} onClick={() => {
                onChange(value);
            }}>
                {label}
            </Box>
        }

        if (typeof label === 'function') {
            return <Box onClick={() => {
                onChange(value);
            }}>
                {label(checked)}
            </Box>
        }
    }

    return (
        <Box sx={{
            textAlign: 'center',
            ...sx
        }}>
            <Box sx={{
                cursor: 'pointer',
                border: checked ? 4 : 0,
                borderColor: checked ? (theme.palette.secondary.main) : '',
                borderRadius: 4,
                bgcolor: (checked ? '#eae8f0' : 'white'),
                textAlign: 'center',
                m: 1,
                p: 1,
                boxSizing: 'border-box',
                [theme.breakpoints.up("md")]: {
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
                },
                ...sx
            }} onClick={() => {
                onChange(value);
            }}>
                {control.element}
            </Box>
            {RenderLabel(checked, control.label)}
        </Box>
    )
}
export interface CustomRadioButtonGroupProps {
    name: string;
    value?: string;
    contents: {
        value: string;
        element: string | React.ReactNode;
        label?: string | React.ReactNode | ((selected: boolean) => React.ReactNode);
    }[],
    onChange: (value: string) => void;
    greyscale?: boolean;
    containerSx?: SxProps<Theme>;
    radioButtonSx?: SxProps<Theme>;
}

export function CustomRadioButtonGroup(props: CustomRadioButtonGroupProps) {
    const { name, value, contents, onChange, greyscale, containerSx, radioButtonSx } = props;
    const [innerValue, setInnerValue] = useState<string | undefined>(value);

    useEffect(() => {
        setInnerValue(value);
    }, [value])

    return <RadioGroup
        name={name}
        sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', overflowY: { xs: 'auto', md: 'unset' }, flexWrap: { xs: 'nowrap', md: 'wrap' }, ...containerSx }}>
        {contents.map(radio => <CustomRadioButton
            sx={radioButtonSx}
            greyscale={greyscale}
            key={radio.value}
            value={radio.value}
            checked={radio.value === innerValue}
            control={radio}
            onChange={(val) => {
                onChange(val);
            }}
        />)}
    </RadioGroup>
}
