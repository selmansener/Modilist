import { Box, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";


export interface ImageProps {
    className?: string;
    src: string;
    alt?: string;
    onClick?: React.MouseEventHandler<HTMLImageElement>;
}

export function ImageComponent(props: ImageProps) {
    const [loading, setLoading] = useState(true);

    return <Box>
        {loading && <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />}
        <img {...props} onLoad={() => {
            setLoading(false);
        }} />
    </Box>
}