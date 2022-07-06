import { Rating, RatingProps, SxProps, Theme } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export interface LovelyRatingProps extends RatingProps {
    filledIconSx?: SxProps<Theme>;
    emptyIconSx?: SxProps<Theme>;
}

export function LovelyRating(props: LovelyRatingProps) {
    const { filledIconSx, emptyIconSx, ...ratingProps } = props;
    return (
        <Rating
            {...props}
            icon={<FavoriteIcon
                color="secondary"
                fontSize="inherit"
                sx={{
                    ...filledIconSx
                }} />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit"
                sx={{
                    ...emptyIconSx
                }}
            />}
        />
    )
}