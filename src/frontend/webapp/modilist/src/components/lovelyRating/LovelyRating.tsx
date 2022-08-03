import { Rating, RatingProps, SvgIconProps, SxProps, Theme } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export interface LovelyRatingProps extends RatingProps {
    filledIconSx?: SxProps<Theme>;
    filledIconProps?: SvgIconProps;
    emptyIconSx?: SxProps<Theme>;
    emptyIconProps?: SvgIconProps;
}

export function LovelyRating(props: LovelyRatingProps) {
    const { filledIconSx, emptyIconSx, filledIconProps, emptyIconProps, ...ratingProps } = props;
    return (
        <Rating
            {...ratingProps}
            icon={<FavoriteIcon
                color="error"
                fontSize="inherit"
                sx={{
                    ...filledIconSx
                }} 
                {...filledIconProps}
                />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit"
                sx={{
                    ...emptyIconSx
                }}
                {...emptyIconProps}
            />}
        />
    )
}