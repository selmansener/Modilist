import { Grid, Link, Typography } from "@mui/material";
import format from "date-fns/format";
import tr from "date-fns/locale/tr";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImageComponent } from "../../../components/image/ImageComponent";
import { RootState, Dispatch } from "../../../store/store";

export function BlogSection() {
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

    return (
        <Grid item container xs={12} spacing={2}>
            <Grid item xs={6}>
                {blogMetaData?.imageUrl &&
                    <Link href={`https://modilist.com/blog${blogMetaData.blogUrl}`}>
                        <ImageComponent src={blogMetaData.imageUrl} asBackground />
                    </Link>
                }
            </Grid>
            <Grid item container xs={6} spacing={2}>
                <Grid item xs={12}>
                    <Link href={`https://modilist.com/blog${blogMetaData.blogUrl}`}>
                        <Typography variant="h5">
                            {blogMetaData.title}
                        </Typography>
                    </Link>
                </Grid>
                <Grid>
                    <Link href={`https://modilist.com/blog${blogMetaData.blogUrl}`}>
                        <Typography variant="body1">
                            {blogMetaData.description}
                        </Typography>
                    </Link>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                {blogMetaData.publishedDate &&
                    <Typography variant="body1" align="right">
                        {format(new Date(blogMetaData.publishedDate), "dd.MM.yyyy", { locale: tr })}
                    </Typography>
                }
            </Grid>
        </Grid>
    )
}