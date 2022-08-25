import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { ImageComponent } from "../../components/image/ImageComponent";
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

export function ComingSoon() {
    const [muted, setMuted] = useState(true);
    const [position, setPosition] = useState({
        top: 0,
        left: 0
    });

    const videoRef = useRef<HTMLVideoElement | null>(null);

    const updateSize = () => {
        const videoRect = videoRef?.current?.getBoundingClientRect();
        if (videoRect) {
            const x = videoRect.x + 15;
            const y = videoRect.y + 15;

            setPosition({
                top: y,
                left: x
            });
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
                    onClick={() => {
                        setMuted(!muted);
                    }}
                    sx={{
                        cursor: "pointer"
                    }}>
                    <Box sx={{
                        position: "absolute",
                        color: "#fff",
                        left: position.left,
                        top: position.top,
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        p: 2,
                        width: 58,
                        height: 58,
                        borderRadius: '50%'
                    }}>
                        {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                    </Box>
                    <video ref={videoRef} autoPlay loop muted={muted} width="80%" src="https://stmodilistsharedwesteu.blob.core.windows.net/videos/opener.webm" />
                </Grid>
            </Grid>
        </Container >
    )
}