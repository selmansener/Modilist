import { Box, Container, Grid, Typography } from "@mui/material"
import { useTranslation } from "react-i18next";

interface DashboardMainProps {
    title: string,
    icon: React.ReactNode,
}

export function DashboardMain(props: React.PropsWithChildren<DashboardMainProps>) {
    const { t } = useTranslation();
    const { title, icon } = props;

    return (

        <Box
            component="main"
            sx={{
                minHeight: '100vh',
                overflow: 'auto',
                p: 2,
                mt: 10, 
                mb: 4
            }}
        >
            <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4">
                            {icon}
                            {t(title)}
                        </Typography>
                    </Grid>
                    <Grid item container xs={12} spacing={2}>
                        {props.children}
                    </Grid>
                </Grid>
        </Box>
    )
}