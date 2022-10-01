import { Divider, Grid, Link, Typography } from "@mui/material";
import format from "date-fns/format";
import tr from "date-fns/locale/tr";
import { Trans, useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImageComponent } from "../../../components/image/ImageComponent";
import { RootState, Dispatch } from "../../../store/store";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';

export function BlogSection() {
    const { t } = useTranslation();
    const dispatch = useDispatch<Dispatch>();
    const { isBusy, data: blogMetaData, status } = useSelector((state: RootState) => state.getBlogMetaDataModel);

    useEffect(() => {
        if (!isBusy && status === 0) {
            dispatch.getBlogMetaDataModel.getBlogMetaData();
        }
    }, []);

    if (!blogMetaData) {
        return <></>
    }

    const getDescription = () => {
        if (!blogMetaData.description) {
            return "";
        }

        return blogMetaData.description?.length > 250 ? `${blogMetaData.description?.substring(0, 250)}...` : blogMetaData.description;
    }

    return (
        <Grid item container xs={12} spacing={2} >
            <Grid item container xs={12}>
                <Grid item xs={6}>
                    <Typography variant="h6" align="left" component={"span"}> {t("Pages.Main.Modilist")}</Typography>
                    <Typography variant="body1" component={"span"}>{t("Pages.Main.Blog")}</Typography>

                </Grid>
                <Grid item xs={6}>
                    {blogMetaData.publishedDate &&
                        <Typography variant="body1" align="right">
                            {format(new Date(blogMetaData.publishedDate), "MMM YYY", { locale: tr })}
                        </Typography>
                    }

                </Grid>
            </Grid>
            <Grid item container xs={12}>
                    <Grid item xs={12}>
                        {blogMetaData?.imageUrl &&
                            <Link href={`https://modilist.com${blogMetaData.blogUrl}`} target="_blank">
                                <ImageComponent src={blogMetaData.imageUrl} asBackground height={450} />
                            </Link>
                        }
                    </Grid>
                </Grid>
            <Grid item container xs={12} spacing={2}>
                <Grid item xs={10}>
                    <Link href={`https://modilist.com${blogMetaData.blogUrl}`} target="_blank" underline="none" style={{
                        textDecoration: 'none'
                    }}>
                        <Typography variant="h4" align="left">
                            {blogMetaData.title}
                        </Typography>
                    </Link>
                </Grid>
                <Grid item xs={2} textAlign="center" sx={{
                    mt: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                }}>
                        <Link href={`https://modilist.com${blogMetaData.blogUrl}`} target="_blank" underline="none" style={{
                            textDecoration: 'none'
                        }}>
                            <Typography variant="body2">
                            {t("Pages.Main.Details")}
                            </Typography>
                        </Link>
                    
                </Grid>
            </Grid>
        </Grid>
    )
}