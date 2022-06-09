import { Grid, Typography } from "@mui/material";
import { ImageComponent, ImageProps } from "../../components/image/ImageComponent";
import { config } from "../../config";
import { alpha, styled } from '@mui/material/styles';
import { Gender } from "../../services/swagger/api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../store/store";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface GenderProps {
    isSelected: boolean;
    gender: Gender;
    onClick: (selectedGender: Gender) => void;
}

function GenderImage(props: GenderProps) {
    const { isSelected, gender, onClick } = props;
    const src = gender === Gender.Female ? `${config.imgBaseHost}/gender/female.svg` : `${config.imgBaseHost}/gender/male.svg`;
    const StyledImage = styled(ImageComponent)<ImageProps>(({ theme }) => ({
        '&:hover': {
            filter: 'grayscale(0%)',
            cursor: 'pointer'
        },
        '&': isSelected ? {
            filter: 'grayscale(0%)'
        } : {
            filter: 'grayscale(100%)'
        },
    }));

    return <StyledImage
        src={src}
        onClick={(e) => {
            onClick(gender);
        }} />
}

export function GenderSelection() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { isBusy: getAccountIsBusy, data: account, status } = useSelector((state: RootState) => state.getAccountModel);
    const { isBusy: updateAccountIsBusy, data: updateAccount, status: updateAccountStatus } = useSelector((state: RootState) => state.updateAccountModel);
    const dispatch = useDispatch<Dispatch>();

    const handleClick = (gender: Gender) => {
        if (!updateAccountIsBusy) {
            dispatch.updateAccountModel.updateAccount({
                ...account,
                gender
            });
        }
    }

    useEffect(() => {
        if (!updateAccountIsBusy && updateAccountStatus === 200) {
            dispatch.updateAccountModel.RESET();
            navigate("/welcome");
        }

    }, [updateAccountStatus])

    useEffect(() => {
        if (!getAccountIsBusy && account === undefined) {
            dispatch.getAccountModel.getAccount();
        }
    }, [])

    return <Grid container spacing={2}>
        <Grid xs={12}>
            <Typography variant={"h4"}>{t("Pages.Welcome.GenderSelection.Gender")}</Typography>
        </Grid>
        <Grid xs={6}>
            <GenderImage isSelected={(updateAccount?.gender ?? account?.gender ?? Gender.None) === Gender.Female} gender={Gender.Female} onClick={handleClick} />
        </Grid>
        <Grid xs={6}>
            <GenderImage isSelected={(updateAccount?.gender ?? account?.gender ?? Gender.None) === Gender.Male} gender={Gender.Male} onClick={handleClick} />
        </Grid>
    </Grid>
}