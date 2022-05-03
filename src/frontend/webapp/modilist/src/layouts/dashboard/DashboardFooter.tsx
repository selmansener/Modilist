import { Box, Container,  Typography } from "@mui/material";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            Modilist
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


export function DashboardFooter() {
    return (
        <Box component="footer">
            <Container fixed maxWidth="lg" sx={{ mb: 4 }}>
                <Copyright sx={{ pt: 4 }} />
            </Container>
        </Box>
    )
}