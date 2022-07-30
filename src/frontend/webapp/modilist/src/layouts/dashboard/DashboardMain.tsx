import { Box, Grid, Typography } from "@mui/material"
import { Helmet } from "react-helmet";
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
                mt: 14,
                mb: 4
            }}
        >
            <Helmet>
                <title>{`${t(title)} | Modilist`}</title>
            </Helmet>
            <Grid container spacing={2}>
                {title !== "" && <Grid item xs={12}>
                    {icon}
                    <Typography variant="h4" component="span">
                        &nbsp;{t(title)}
                    </Typography>
                </Grid>}
                <Grid item container xs={12} spacing={2}>
                    {props.children}
                </Grid>
            </Grid>
        </Box>
    )
}