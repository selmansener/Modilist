import { Box, Container, Grid } from "@mui/material"
import { Outlet } from "react-router-dom";

interface DashboardMainProps {
}

export function DashboardMain(props: React.PropsWithChildren<DashboardMainProps>) {

    return (

        <Box
            component="main"
            sx={{
                minHeight: `${window.innerHeight - 465}px`,
                overflow: 'auto',
                p: 2,
                mt: 14,
                mb: 4,
                mx: [4],
            }}
        >
            <Container maxWidth="xl" sx={{
                minHeight: `${window.innerHeight - 465}px`,
            }}>
                <Grid container spacing={4} sx={{
                    minHeight: `${window.innerHeight - 465}px`,
                }}>
                    <Outlet />
                </Grid>
            </Container>
        </Box>
    )
}