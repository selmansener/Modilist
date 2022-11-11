import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ImageComponent } from "../../components/image/ImageComponent";
import { config } from "../../config";

export default function About() {
    const { t } = useTranslation();
    const { cdnImg } = config;

    return (
        <Grid item container xs={12}>
            <Grid item xs={12} mt={2} mb={2}>
                <Typography variant="h1" align="center">
                    {t("Pages.About.Title")}
                </Typography>
            </Grid>
            <Grid item xs={12} mt={2} mb={4}>
                <Typography variant="h6" align="center">
                    {t("Pages.About.Description.1")}
                </Typography>
                <Typography variant="h6" align="center">
                    {t("Pages.About.Description.2")}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <ImageComponent src={`${cdnImg}/about/about_individual.webp`} width="100%" />
            </Grid>
            <Grid item xs={6} px={[8]} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Typography variant="h2" align="center" mb={4}>
                    {t("Pages.About.IndividualTitle")}
                </Typography>
                <Typography variant="h6" align="center">
                    {t("Pages.About.Individual")}
                </Typography>
            </Grid>
            <Grid item xs={6} px={[8]} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Typography variant="h2" align="center" mb={4}>
                    {t("Pages.About.TechnologicalTitle")}
                </Typography>
                <Typography variant="h6" align="center">
                    {t("Pages.About.Technological")}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <ImageComponent src={`${cdnImg}/about/about_tech.webp`} width="100%" />
            </Grid>
            <Grid item xs={6}>
                <ImageComponent src={`${cdnImg}/about/about_sustain.webp`} width="100%" />
            </Grid>
            <Grid item xs={6} px={[8]} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Typography variant="h2" align="center" mb={4}>
                    {t("Pages.About.SustainableTitle")}
                </Typography>
                <Typography variant="h6" align="center">
                    {t("Pages.About.Sustainable")}
                </Typography>
            </Grid>
        </Grid>
    )
}