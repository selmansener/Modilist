import { Box, Skeleton } from "@mui/material";
import { useState } from "react";


export interface ImageProps {
    src: string,
    alt?: string,
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