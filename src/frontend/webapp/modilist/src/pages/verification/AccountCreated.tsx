import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export function AccountCreated() {
    const { t } = useTranslation();

    return (
        <Grid container spacing={2} textAlign="center"  mt={4}>
            <Grid item xs={12}>
                <Typography variant="h4">
                    {t("Pages.AccountCreated.WelcomeMessage")}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    {t("Pages.AccountCreated.CheckMailMessage")}
                </Typography>
            </Grid>
        </Grid>
    )
}