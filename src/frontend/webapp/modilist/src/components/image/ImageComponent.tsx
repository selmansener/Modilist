import { Box, Skeleton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import BrokenImageIcon from '@mui/icons-material/BrokenImage';

export interface ImageProps {
    className?: string;
    src: string;
    alt?: string;
    onClick?: React.MouseEventHandler<HTMLImageElement>;
}

export function ImageComponent(props: ImageProps) {
    const ref = useRef<HTMLElement>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (ref && ref?.current && ref.current.parentElement) {
            setHeight(ref.current.parentElement.offsetHeight);
            setWidth(ref.current.parentElement.offsetWidth);
        }
    }, []);

    return <Box ref={ref}>
        {loading && <Skeleton sx={{ width: width, height: height }} animation="wave" variant="rectangular" />}
        {error && <BrokenImageIcon
            fontSize="large"
            sx={{
                width: width,
                height: height
            }}
        />}
        {!error && <img {...props}
            onLoad={() => {
                setLoading(false);
            }}
            onError={() => {
                setLoading(false);
                setError(true);
            }} />}
    </Box>
}