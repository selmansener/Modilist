import { Box, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";

export default function ComingSoonLayout() {
    const [imageIsLoading, setImageIsLoading] = useState(true);
    const [videoIsLoading, setVideoIsLoading] = useState(true);

    useEffect(() => {
        document.title = "Coming Soon | Modilist";
    }, []);

    return <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        m: 10
    }}>
        {imageIsLoading ? <Skeleton variant="rectangular" width={420} height={140} sx={{mb: 3}}/> : <></>}
        <img src="https://stazureb2c.blob.core.windows.net/authentacation-pages/images/logo.svg" style={{ width: '420px', marginBottom: '24px' }} onLoad={() => {
            setImageIsLoading(false);
        }} />
        {videoIsLoading ? <Skeleton variant="rectangular" width={960} height={540}/> : <></>}
        <video src="https://stmodilistsharedwesteu.blob.core.windows.net/videos/coming-soon.mp4" autoPlay loop style={{ width: '960px' }} onLoadedData={() => {
            setVideoIsLoading(false)
        }} />
    </Box>
}