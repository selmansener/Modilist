import { Box, CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet";
import useWindowDimensions from "../../utils/windowDimensions";

export default function Loading() {
    const { height, width } = useWindowDimensions();

    return <Box sx={{
        display: 'flex',
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <Helmet>
            Loading | Modilist
        </Helmet>
        <CircularProgress />
    </Box>
}