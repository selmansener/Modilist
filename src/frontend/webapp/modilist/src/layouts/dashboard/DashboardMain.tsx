import { Box, Grid, Typography } from "@mui/material"
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

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
                mt: 14,
                mb: 4
            }}
        >
            {/* <Helmet>
                <title>{`${t(title)} | Modilist`}</title>
            </Helmet> */}
            <Grid container spacing={2}>
                <Outlet />
            </Grid>
        </Box>
    )
}