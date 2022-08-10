import { Divider, Grid, Link, Typography } from "@mui/material";
import format from "date-fns/format";
import tr from "date-fns/locale/tr";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImageComponent } from "../../../components/image/ImageComponent";
import { RootState, Dispatch } from "../../../store/store";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';

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

    const getDescription = () => {
        if (!blogMetaData.description) {
            return "";
        }

        return blogMetaData.description?.length > 250 ? `${blogMetaData.description?.substring(0, 250)}...` : blogMetaData.description;
    }

    return (
        <Grid item container xs={12} spacing={2}>
            <Grid item xs={6}>
                {blogMetaData?.imageUrl &&
                    <Link href={`https://modilist.com${blogMetaData.blogUrl}`} target="_blank">
                        <ImageComponent src={blogMetaData.imageUrl} asBackground height={250} />
                    </Link>
                }
            </Grid>
            <Grid item container xs={6} spacing={2}>
                <Grid item xs={12}>
                    <Link href={`https://modilist.com${blogMetaData.blogUrl}`} target="_blank" underline="none">
                        <Typography variant="h5" align="left">
                            {blogMetaData.title}
                            <OpenInNewOutlinedIcon sx={{
                                verticalAlign: 'text-bottom',
                                ml: 1
                            }} />
                        </Typography>
                    </Link>
                </Grid>
                <Grid item xs={12}>
                    <Link href={`https://modilist.com${blogMetaData.blogUrl}`} target="_blank" sx={{
                        textDecoration: 'none'
                    }}>
                        <Typography variant="body1">
                            {getDescription()}
                        </Typography>
                    </Link>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item container xs={12} spacing={2}>
                <Grid item xs={4}>
                    <VisibilityIcon sx={{
                        verticalAlign: "text-bottom"
                    }} />
                    <Typography variant="body1" component="span" ml={1}>
                        {blogMetaData.viewCount}
                    </Typography>
                    <FavoriteBorderIcon color="error" sx={{
                        verticalAlign: "text-bottom",
                        ml: 1
                    }} />
                    <Typography variant="body1" component="span" ml={1}>
                        {blogMetaData.likeCount}
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    {blogMetaData.publishedDate &&
                        <Typography variant="body1" align="right">
                            {format(new Date(blogMetaData.publishedDate), "dd MMM", { locale: tr })}
                        </Typography>
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}