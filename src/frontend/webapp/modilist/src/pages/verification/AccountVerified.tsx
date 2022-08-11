import { Button, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";

export function AccountVerified() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Grid container spacing={2} textAlign="center" mt={4}>
            <Grid item xs={12}>
                <Typography variant="h4">
                    {t("Pages.AccountVerified.SuccessMessage")}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    {t("Pages.AccountVerified.Thanks")}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    {t("Pages.AccountVerified.NavigationMessage")}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="secondary">
                    <NavLink to="/welcome/gender">
                        {t("Pages.AccountVerified.NavigateToForm")}
                    </NavLink>
                </Button>
            </Grid>
        </Grid>
    )
}