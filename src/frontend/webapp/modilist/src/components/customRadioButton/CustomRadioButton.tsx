import { Box, RadioGroup, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

interface CustomRadioButtonProps {
    value: string;
    checked: boolean;
    control: React.ReactNode;
    onChange: (value: string) => void;
    greyscale?: boolean;
}

function CustomRadioButton(props: CustomRadioButtonProps) {
    const { value, checked, control, onChange, greyscale } = props;
    const theme = useTheme();

    return <Box sx={{
        cursor: 'pointer',
        border: checked ? 1 : 0,
        borderColor: theme.palette.primary.main,
        borderRadius: checked ? 1 : 0,
        p: 1,
        m: 1,
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
    }} onClick={() => {
        onChange(value);
    }}>
        {control}
    </Box>
}

export interface CustomRadioButtonGroupProps {
    name: string;
    value?: string;
    contents: {
        value: string;
        element: React.ReactNode;
    }[],
    onChange: (value: string) => void;
    greyscale?: boolean;
}

export function CustomRadioButtonGroup(props: CustomRadioButtonGroupProps) {
    const { name, value, contents, onChange, greyscale } = props;
    const [innerValue, setInnerValue] = useState<string | undefined>(value);

    useEffect(() => {
        setInnerValue(value);
    }, [value])

    return <RadioGroup
        name={name}
        sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', flexWrap: 'wrap' }}>
        {contents.map(radio => <CustomRadioButton
            greyscale={greyscale}
            key={radio.value}
            value={radio.value}
            checked={radio.value === innerValue}
            control={radio.element}
            onChange={(val) => {
                setInnerValue(val);
                onChange(val);
            }}
        />)}
    </RadioGroup>
}
