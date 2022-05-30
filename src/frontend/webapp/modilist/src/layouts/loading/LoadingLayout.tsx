import { Box, CircularProgress } from "@mui/material";
import useWindowDimensions from "../../utils/windowDimensions";

export default function LoadingLayout() {
    const { height, width } = useWindowDimensions();

    return <Box sx={{
        display: 'flex',
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <CircularProgress />
    </Box>
}