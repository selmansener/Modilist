import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';

export function AccountVerified() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [counter, setCounter] = useState(5);

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/welcome/gender", {
                replace: true
            });
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/welcome/gender", {
                replace: true
            });
        }, 3500);
        return () => clearTimeout(timer);
    }, []);

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
                <MarkEmailReadIcon color="success" sx={{
                    fontSize: 72
                }} />
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    {t("Pages.AccountVerified.Timer", { counter: counter })}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="secondary" onClick={() => {
                    navigate("/welcome/gender", {
                        replace: true
                    });
                }}>
                    {t("Pages.AccountVerified.NavigateToForm")}
                </Button>
            </Grid>
        </Grid>
    )
}