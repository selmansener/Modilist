import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { ImageComponent } from "../../components/image/ImageComponent";
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

export function ComingSoon() {
    const [muted, setMuted] = useState(true);
    const [position, setPosition] = useState({
        top: 0,
        right: 0
    });
    const videoContainer = useRef<HTMLDivElement | null>(null);

    const updateSize = () => {
        const rect = videoContainer?.current?.getBoundingClientRect();
        console.log(rect);
        if (rect) {
            setPosition({
                top: rect.top,
                right: (rect.width * 12 / 100) + rect.left
            })
        }
    }

    useEffect(() => {
        updateSize();

        window.addEventListener("resize", updateSize);

        return () => {
            window.removeEventListener("resize", updateSize);
        }
    }, []);

    console.log(position);

    return (
        <Container maxWidth="xl">
            <Grid container spacing={2}>
                <Grid item xs={12} textAlign="center">
                    <ImageComponent src="originalhorizontallogoslogan.svg" width={280} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h3" align="center">
                        Çok yakında hizmetinizdeyiz
                    </Typography>
                </Grid>
                <Grid item xs={12}
                    textAlign="center"
                    ref={videoContainer}
                    onClick={() => {
                        setMuted(!muted);
                    }}
                    sx={{
                        cursor: "pointer"
                    }}>
                    <Box sx={{
                        position: "absolute",
                        color: "#fff",
                        // right: `${position.right + 180}px`,
                        right: `${position.right}px`,
                        top: `${position.top + 30}px`,
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        p: 2,
                        width: 58,
                        height: 58,
                        borderRadius: '50%'
                    }}>
                        {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                    </Box>
                    <video autoPlay loop muted={muted} width="80%" src="https://stmodilistsharedwesteu.blob.core.windows.net/videos/opener.webm" />
                </Grid>
            </Grid>
        </Container >
    )
}