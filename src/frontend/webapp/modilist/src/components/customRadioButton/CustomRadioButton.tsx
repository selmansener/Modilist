import { Box, RadioGroup, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

interface CustomRadioButtonProps {
    value: string;
    checked: boolean;
    control: React.ReactNode;
    onChange: (value: string) => void;
}

function CustomRadioButton(props: CustomRadioButtonProps) {
    const { value, checked, control, onChange } = props;
    const theme = useTheme();

    return <Box sx={{
        border: checked ? 1 : 0,
        borderColor: theme.palette.primary.main,
        borderRadius: checked ? ((theme.shape.borderRadius as number)) : 0,
        p: 1,
        m: 1
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
}

export function CustomRadioButtonGroup(props: CustomRadioButtonGroupProps) {
    const { name, value, contents, onChange } = props;
    const [innerValue, setInnerValue] = useState<string | undefined>(value);

    useEffect(() => {
        setInnerValue(value);
    }, [value])

    return <RadioGroup
        name={name}
        sx={{ display: 'flex', alignContent: 'space-evenly', flexDirection: 'row', flexWrap: 'wrap' }}>
        {contents.map(radio => <CustomRadioButton
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
