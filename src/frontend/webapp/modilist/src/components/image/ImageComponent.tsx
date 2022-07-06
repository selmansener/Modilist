import { Box, Skeleton, SxProps, Theme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import BrokenImageIcon from '@mui/icons-material/BrokenImage';

export interface ImageProps {
    className?: string;
    src: string;
    alt?: string;
    asBackground?: boolean;
    sx?: SxProps<Theme>;
    onClick?: React.MouseEventHandler<HTMLImageElement>;
}

export function ImageComponent(props: ImageProps) {
    const { src, asBackground, sx } = props;
    const ref = useRef<HTMLElement>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (ref && ref?.current && ref.current.parentElement) {
            setHeight(ref.current.parentElement.offsetHeight);
            setWidth(ref.current.parentElement.offsetWidth);
        }
    }, []);

    const RenderImage = () => {
        if (error) {
            return <BrokenImageIcon
                fontSize="large"
                sx={{
                    width: width,
                    height: height
                }}
            />
        }

        if (asBackground) {
            var image = new Image();
            image.addEventListener("loadstart", () => {
                setLoading(true);
            });

            image.addEventListener("load", () => {
                setLoading(false);
            });

            image.addEventListener("error", () => {
                setError(true);
            })

            const Img = () => {
                return <Box sx={{
                    ...sx,
                    backgroundImage: `url(${src})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain'
                }}>
    
                </Box>
            }

            image.src = src;

            return <Img />;
        }
        else {
            return <img {...props}
                onLoadStart={() => {
                    setLoading(true);
                }}
                onLoad={() => {
                    setLoading(false);
                }}
                onError={() => {
                    setLoading(false);
                    setError(true);
                }} />
        }
    }

    return <Box ref={ref}>
        {loading && <Skeleton sx={{ width: width, height: height }} animation="wave" variant="rectangular" />}
        {RenderImage()}
    </Box>
}