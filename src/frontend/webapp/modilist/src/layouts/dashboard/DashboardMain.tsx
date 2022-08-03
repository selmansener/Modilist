import { Box, Grid } from "@mui/material"
import { Outlet } from "react-router-dom";

interface DashboardMainProps {
}

export function DashboardMain(props: React.PropsWithChildren<DashboardMainProps>) {

    return (

        <Box
            component="main"
            sx={{
                minHeight: '100vh',
                overflow: 'auto',
                p: 2,
                mt: 14,
                mb: 4,
                mx: [4],
            }}
        >
            <Grid container spacing={4}>
                <Outlet />
            </Grid>
        </Box>
    )
}