import { Box, Container } from "@mui/material"

interface DashboardMainProps {
}

export function DashboardMain(props: React.PropsWithChildren<DashboardMainProps>) {
    return (

        <Box
            component="main"
            sx={{
                minHeight: '100vh',
                overflow: 'auto',
            }}
        >
            <Container fixed maxWidth="lg" sx={{ mt: 18, mb: 4 }}>
                {props.children}
            </Container>
        </Box>
    )
}