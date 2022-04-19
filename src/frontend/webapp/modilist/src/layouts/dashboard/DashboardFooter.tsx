import { Box, Container, createTheme, Typography } from "@mui/material";

// TODO: temayı tek bir yerden al
const mdTheme = createTheme({
    palette: {
        primary: {
            main: '#06273a'
        },
        secondary: {
            main: '#ffeddf'
        },
        background: {
            default: '#294260'
        },
        text: {
            primary: '#ffeddf',
            secondary: '#ffeddf'
        }
    }
});

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
        <Box component="footer" sx={{
            background: mdTheme.palette.primary.main,
            color: mdTheme.palette.secondary.main
        }}>
            <Container fixed maxWidth="lg" sx={{ mb: 4 }}>
                <Copyright sx={{ pt: 4 }} />
            </Container>
        </Box>
    )
}