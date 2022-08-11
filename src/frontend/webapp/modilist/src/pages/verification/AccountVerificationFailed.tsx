import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export function AccountVerificationFailed() {
    const { t } = useTranslation();

    return (
        <Grid container spacing={2} textAlign="center" mt={4}>
            <Grid item xs={12}>
                <Typography variant="h4">
                    {t("Pages.AccountVerificationFailed.FailedMessage")}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    {t("Pages.AccountVerificationFailed.WeAreOnIt")}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    {t("Pages.AccountVerificationFailed.SuggestionMessage")}
                </Typography>
            </Grid>
        </Grid>
    )
}