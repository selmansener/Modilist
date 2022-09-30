import { Alert, Grid, Snackbar, Typography } from "@mui/material";
import { ImageComponent, ImageProps } from "../../components/image/ImageComponent";
import { config } from "../../config";
import { alpha, styled } from '@mui/material/styles';
import { AccountState, Gender } from "../../services/swagger/api";
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
    const src = gender === Gender.Female ? `${config.cdnImg}/gender/female.svg` : `${config.cdnImg}/gender/male.svg`;
    const StyledImage = styled(ImageComponent)<ImageProps>(({ theme }) => ({
        [theme.breakpoints.up('md')]: {
            '&:hover': {
                transition: theme.transitions.create('opacity', {
                    easing: theme.transitions.easing.easeInOut,
                    duration: 500
                }),
                opacity: '1',
                cursor: 'pointer'
            },
            '&': isSelected ? {
                opacity: '1'
            } : {
                opacity: '0.5'
            },
        },
        [theme.breakpoints.down('md')]: {
            width: "75%",
            margin: "auto",
            display: "block"
        }
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
    const [snackbarStatus, setSnackbarStatus] = useState(false);

    const handleClick = (gender: Gender) => {
        if (!updateAccountIsBusy) {
            dispatch.updateAccountModel.updateAccount({
                ...account,
                gender
            });
        }
    }

    useEffect(() => {
        if (account?.state === AccountState.Active) {
            navigate("/");
        }
    }, []);

    useEffect(() => {
        if (!updateAccountIsBusy && updateAccountStatus === 200) {
            if (updateAccount) {
                dispatch.getAccountModel.HANDLE_RESPONSE(updateAccount, updateAccountStatus);
            }

            navigate("/welcome");
        }
        else if (updateAccountStatus !== 200 && updateAccountStatus !== 0) {
            setSnackbarStatus(true);
        }

        if (updateAccountStatus !== 0) {
            dispatch.updateAccountModel.RESET();
        }
    }, [updateAccountStatus])

    useEffect(() => {
        if (!getAccountIsBusy && account?.id === "") {
            dispatch.getAccountModel.getAccount();
        }
    }, [])

    return <Grid item container spacing={2}>
        <Grid item xs={12}>
            <Typography variant="h4" gutterBottom sx={{ mt: 2, mb: 4 }} align="center">
                {t('Layouts.Welcome.WelcomeLayout.Welcome')}
            </Typography>
            <Typography variant="subtitle1" gutterBottom align="center">
                {t('Layouts.Welcome.WelcomeLayout.Description1')}
            </Typography>
            <Typography variant={"h3"}
                sx={{
                    mt: 6,
                    mb: 5
                }}
                align="center"
            >
                {t("Pages.Welcome.GenderSelection.Gender")}
            </Typography>
        </Grid>
        <Grid item container xs={6} md={6} justifyContent="center">
            <GenderImage isSelected={account?.gender === Gender.Female} gender={Gender.Female} onClick={handleClick} />
        </Grid>
        <Grid item container xs={6} md={6} justifyContent="center">
            <GenderImage isSelected={account?.gender === Gender.Male} gender={Gender.Male} onClick={handleClick} />
        </Grid>
        <Snackbar
            open={snackbarStatus}
            autoHideDuration={6000}
            onClose={() => {
                setSnackbarStatus(false);
            }}>
            <Alert onClose={() => {
                setSnackbarStatus(false);
            }}
                severity="error"
                variant="filled">
                {t(`Generic.Forms.UnexpectedError`)}
            </Alert>
        </Snackbar>
    </Grid>
}