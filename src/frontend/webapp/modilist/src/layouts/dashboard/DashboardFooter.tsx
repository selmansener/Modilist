import { Box, Container, Grid, Typography, useTheme } from "@mui/material";

function Copyright(props: any) {
    return (
        <Typography variant="body2" align="center" {...props}>
            {'Copyright © '}
            Modilist
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


export function DashboardFooter() {
    const theme = useTheme();

    return (
        <Box component="footer">
            <Grid container sx={{
                backgroundColor: theme.palette.primary.main
            }}>
                <Grid item xs={12} sx={{
                    m: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Copyright color={theme.palette.primary.contrastText} />
                </Grid>
            </Grid>
        </Box>
    )
}