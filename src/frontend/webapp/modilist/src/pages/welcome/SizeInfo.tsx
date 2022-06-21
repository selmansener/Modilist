import { Box, Button, CircularProgress, Divider, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Gender } from "../../services/swagger/api";
import { Dispatch, RootState } from "../../store/store";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { camelCase } from "change-case";
import { CustomRadioButtonGroup } from "../../components/customRadioButton/CustomRadioButton";
import { ImageComponent } from "../../components/image/ImageComponent";
import { config } from "../../config";
import { WeigthIcon } from "../../components/customIcons/WeightIcon";
import { MeasureIcon } from "../../components/customIcons/MeasureIcon";

let footWearSizes: number[] = [];

if (footWearSizes.length === 0) {
    const sizes = [];
    for (let i = 35; i <= 45; i++) {
        sizes.push(i);
    }

    footWearSizes = sizes;
}

export default function SizeInfo() {
    const { imgBaseHost } = config;
    const dispatch = useDispatch<Dispatch>();
    const { t } = useTranslation();
    const { isBusy: getAccountIsBusy, data: account, status } = useSelector((state: RootState) => state.getAccountModel);
    const { isBusy: getSizeInfoIsBusy, data: initialSizeInfo, status: getSizeInfoStatus } = useSelector((state: RootState) => state.getSizeInfoModel);
    const { isBusy: upsertSizeInfoIsBusy, data: upsertSizeInfo, status: upsertStatus } = useSelector((state: RootState) => state.upsertSizeInfoModel);
    const isBusy = getAccountIsBusy || getSizeInfoIsBusy || upsertSizeInfoIsBusy;
    const requiredField = t("FormValidation.RequiredField");

    const schema = Yup.object({
        upperBody: Yup.string().required(requiredField),
        lowerBody: Yup.string().required(requiredField),
        outWear: Yup.string().required(requiredField),
        footWear: Yup.string().required(requiredField),
        bodyType: Yup.string().notOneOf(["None"], requiredField).required(requiredField),
        weight: Yup.number().integer().moreThan(0, requiredField).required(requiredField),
        height: Yup.number().integer().moreThan(0, requiredField).required(requiredField),
        womenUnderWearCup: account?.gender === Gender.Female ? Yup.string().required(requiredField) : Yup.string().optional(),
        womenUnderWearSize: account?.gender === Gender.Female ? Yup.string().required(requiredField) : Yup.string().optional(),
        menUnderWear: account?.gender === Gender.Male ? Yup.string().required(requiredField) : Yup.string().optional()
    });

    const sizeSymbols = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];

    const braSizes = ["70", "75", "80", "85", "90", "95", "100", "105", "110"];

    const braCup = ["A", "B", "C", "D"];

    const bodyTypes = account?.gender ? [
        {
            name: "Round",
            img: `${imgBaseHost}/body-types/${account?.gender}Round.svg`
        },
        {
            name: "Straight",
            img: `${imgBaseHost}/body-types/${account?.gender}Straight.svg`
        },
        {
            name: "Fit",
            img: `${imgBaseHost}/body-types/${account?.gender}Fit.svg`
        },
        {
            name: "Spoon",
            img: `${imgBaseHost}/body-types/${account?.gender}Spoon.svg`
        },
        {
            name: "Triangle",
            img: `${imgBaseHost}/body-types/${account?.gender}Triangle.svg`
        },
    ] : [];

    const sections = account?.gender === Gender.Male ? [
        "UpperBody",
        "LowerBody",
        "OutWear",
        "MenUnderWear"
    ] : [
        "UpperBody",
        "LowerBody",
        "OutWear",
    ];

    const bodySizes = [
        "BodyLength",
        "HeadRadius",
        "ArmLength",
        "NeckRadius",
        "ShoulderWidth",
        "BreastRadius",
        "WaistRadius",
        "HipRadius",
        "LegLength",
        "FootLength",
    ];

    useEffect(() => {
        if (!getAccountIsBusy && account === undefined) {
            dispatch.getAccountModel.getAccount();
        }

        if (!getSizeInfoIsBusy) {
            dispatch.getSizeInfoModel.getSizeInfo();
        }
    }, []);

    useEffect(() => {
        if (upsertStatus === 200 && upsertSizeInfo) {
            dispatch.getSizeInfoModel.HANDLE_RESPONSE(upsertSizeInfo, upsertStatus);

            dispatch.upsertSizeInfoModel.RESET();

            dispatch.welcomePageStepper.next();
        }
    }, [upsertSizeInfo]);

    const {
        handleChange,
        handleBlur,
        touched,
        errors,
        values: sizeInfo,
        submitForm,
    } = useFormik({
        enableReinitialize: true,
        initialValues: initialSizeInfo ?? {},
        validationSchema: schema,
        onSubmit: (values) => {
            if (!upsertSizeInfoIsBusy) {
                dispatch.upsertSizeInfoModel.upsertSizeInfo({
                    ...values,
                    gender: account?.gender
                });
            }
        },
    });

    type SectionProps = {
        sectionData: string[],
        sizeData: string[],
    }

    const Section = (props: SectionProps) => {
        const { sectionData, sizeData } = props;

        return <>
            {sectionData.map(_section => {
                const sectionName = camelCase(_section);

                return (
                    <Grid item key={sectionName} xs={4}>
                        <Typography variant='h6' align='left' sx={{ mb: 2 }}>
                            {t(`Pages.Welcome.BodySize.${_section}`)}
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-evenly'
                        }}>
                            <Box sx={{
                                width: '70px',
                                mr: 2
                            }}>
                                <ImageComponent src={`${imgBaseHost}/main-category/${_section}.svg`} />
                            </Box>
                            <FormControl fullWidth error={touched[sectionName as keyof typeof touched] && errors[sectionName as keyof typeof errors] !== undefined}>
                                <InputLabel id={`${sectionName}-label`}>{t(`Pages.Welcome.BodySize.${_section}`)}</InputLabel>
                                <Select
                                    disabled={isBusy}
                                    name={sectionName}
                                    labelId={`${sectionName}-label`}
                                    id={sectionName}
                                    value={sizeInfo[sectionName as keyof typeof sizeInfo]}
                                    label={t(`Pages.Welcome.BodySize.${_section}`)}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <MenuItem disabled value={"None"}>
                                        <em>{t('Pages.Welcome.Personal.MenuItem')}</em>
                                    </MenuItem>
                                    {sizeData.map(size => {
                                        return <MenuItem key={size} value={size}>{size}</MenuItem>
                                    })}
                                </Select>
                                <FormHelperText>{touched[sectionName as keyof typeof touched] && errors[sectionName as keyof typeof errors]}</FormHelperText>
                            </FormControl>
                        </Box>

                    </Grid>
                )
            })}
        </>
    }

    const BodySizes = () => {
        const gender = account?.gender ? camelCase(account?.gender.toString()) : undefined;

        return <>
            {
                bodySizes.map(bodySize => {
                    const sizeName = camelCase(bodySize);

                    return <Grid item key={sizeName} xs={6}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-evenly'
                        }}>
                            <Box sx={{
                                width: '70px',
                                mr: 2
                            }}>
                                {gender && <ImageComponent src={`${imgBaseHost}/body-size/${gender}/${bodySize}.svg`} />}
                            </Box>
                            <FormControl fullWidth>
                                <TextField
                                    disabled={isBusy}
                                    value={sizeInfo[sizeName as keyof typeof sizeInfo]}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    label={t(`Pages.Welcome.BodySize.${bodySize}`)} type="number"
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    variant="outlined" />
                            </FormControl>
                        </Box>
                    </Grid>
                })
            }
        </>
    }

    return (
        <>
            <Grid container spacing={2}>
                {account?.gender !== Gender.None &&
                    <>
                        <Grid item xs={12}>
                            <Typography variant="h4">{t("Pages.Welcome.BodySize.BodyType")}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth error={touched.bodyType && errors.bodyType !== undefined}>
                                <FormHelperText>
                                    <Typography variant={"h4"} align={"center"}>{touched.bodyType && errors?.bodyType}</Typography>
                                </FormHelperText>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}>
                                    <CustomRadioButtonGroup
                                        name="bodyType"
                                        value={sizeInfo?.bodyType}
                                        onChange={(value) => {
                                            handleChange("bodyType")(value);
                                        }}
                                        contents={
                                            bodyTypes.map(type => {
                                                return {
                                                    value: type.name,
                                                    element: <Box sx={{
                                                        width: '150px',
                                                    }}>
                                                        <ImageComponent src={type.img} />
                                                    </Box>
                                                }
                                            })}
                                    />
                                </Box>
                            </FormControl>
                        </Grid>
                    </>}

                <Grid item xs={6}>
                    <Typography variant={"h4"}
                        sx={{
                            mb: 2
                        }}
                    >
                        {t("Pages.Welcome.BodySize.Weight")}
                    </Typography>
                    <Box sx={{
                        display: 'flex'
                    }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <WeigthIcon fontSize="large" sx={{
                                mr: 2
                            }} />
                        </Box>

                        <FormControl fullWidth>
                            <TextField
                                disabled={isBusy}
                                name="weight"
                                label={t('Pages.Welcome.BodySize.Weight')}
                                type="number"
                                value={sizeInfo.weight}
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                variant="outlined"
                                error={touched.weight && errors.weight !== undefined}
                                helperText={touched.weight && errors.weight}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </FormControl>
                    </Box>
                </Grid>

                <Grid item xs={6}>
                    <Typography variant={"h4"}
                        sx={{
                            mb: 2
                        }}
                    >
                        {t("Pages.Welcome.BodySize.Height")}
                    </Typography>

                    <Box sx={{
                        display: 'flex'
                    }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <MeasureIcon fontSize="large" sx={{
                                mr: 2
                            }} />
                        </Box>

                        <FormControl fullWidth>
                            <TextField
                                disabled={isBusy}
                                name="height"
                                label={t('Pages.Welcome.BodySize.Height')}
                                type="number"
                                value={sizeInfo.height}
                                error={touched.height && errors.height !== undefined}
                                helperText={touched.height && errors.height}
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                variant="outlined"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </FormControl>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Divider variant="middle" />
                </Grid>

                <Grid item xs={12}>
                    <Typography variant={"h4"}>{t("Pages.Welcome.BodySize.CategorySizes")}</Typography>
                </Grid>

                <Section
                    sectionData={sections}
                    sizeData={sizeSymbols}
                />

                <Grid item xs={4}>
                    <Typography variant='h6' align='left' sx={{ mb: 2 }}>
                        {t(`Pages.Welcome.BodySize.FootWear`)}
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                    }}>
                        <Box sx={{
                            display: 'flex',
                            width: '70px',
                            mr: 2,
                            alignItems: 'center'
                        }}>
                            <ImageComponent src={`${imgBaseHost}/main-category/FootWear.svg`} />
                        </Box>
                        <FormControl fullWidth error={touched.footWear && errors.footWear !== undefined}>
                            <InputLabel id={`footWear-label`}>{t(`Pages.Welcome.BodySize.FootWear`)}</InputLabel>
                            <Select
                                disabled={isBusy}
                                name={'footWear'}
                                labelId={`footWear-label`}
                                id={'footWear'}
                                value={sizeInfo.footWear}
                                label={t(`Pages.Welcome.BodySize.FootWear`)}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <MenuItem disabled>
                                    <em>{t('Pages.Welcome.Personal.MenuItem')}</em>
                                </MenuItem>
                                {footWearSizes.map(size => {
                                    return <MenuItem key={size} value={size.toString()}>{size}</MenuItem>
                                })}
                            </Select>
                            <FormHelperText>{touched.footWear && errors?.footWear}</FormHelperText>
                        </FormControl>
                    </Box>
                </Grid>

                {account?.gender === Gender.Female && <>
                    <Grid item xs={4}>
                        <Typography variant='h6' align='left' sx={{ mb: 2 }}>
                            {t(`Pages.Welcome.BodySize.WomenUnderWearCup`)}
                        </Typography>

                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-evenly'
                        }}>
                            <Box sx={{
                                width: '70px',
                                mr: 2,
                            }}>
                                <ImageComponent src={`${imgBaseHost}/main-category/WomenUnderWearCup.svg`} />
                            </Box>
                            <FormControl fullWidth error={touched.womenUnderWearCup && errors.womenUnderWearCup !== undefined}>
                                <InputLabel id={`womenUnderWearCup-label`}>{t(`Pages.Welcome.BodySize.WomenUnderWearCup`)}</InputLabel>
                                <Select
                                    disabled={isBusy}
                                    name={'womenUnderWearCup'}
                                    labelId={`womenUnderWearCup-label`}
                                    id={'womenUnderWearCup'}
                                    value={sizeInfo?.womenUnderWearCup}
                                    label={t(`Pages.Welcome.BodySize.WomenUnderWearCup`)}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <MenuItem disabled>
                                        <em>{t('Pages.Welcome.Personal.MenuItem')}</em>
                                    </MenuItem>
                                    {braCup.map(size => {
                                        return <MenuItem key={size} value={size}>{size}</MenuItem>
                                    })}
                                </Select>
                                <FormHelperText>{touched.womenUnderWearCup && errors?.womenUnderWearCup}</FormHelperText>
                            </FormControl>
                        </Box>
                    </Grid>

                    <Grid item xs={4}>
                        <Typography variant='h6' align='left' sx={{ mb: 2 }}>
                            {t(`Pages.Welcome.BodySize.WomenUnderWearSize`)}
                        </Typography>

                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-evenly'
                        }}>
                            <Box sx={{
                                width: '70px',
                                mr: 2,
                            }}>
                                <ImageComponent src={`${imgBaseHost}/main-category/WomenUnderWearSize.svg`} />
                            </Box>
                            <FormControl fullWidth error={touched.womenUnderWearSize && errors.womenUnderWearSize !== undefined}>
                                <InputLabel id={`womenUnderWearSize-label`}>{t(`Pages.Welcome.BodySize.WomenUnderWearSize`)}</InputLabel>
                                <Select
                                    disabled={isBusy}
                                    name={'womenUnderWearSize'}
                                    labelId={`womenUnderWearSize-label`}
                                    id={'womenUnderWearSize'}
                                    value={sizeInfo.womenUnderWearSize}
                                    label={t(`Pages.Welcome.BodySize.WomenUnderWearSize`)}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <MenuItem disabled value={""}>
                                        <em>{t('Pages.Welcome.Personal.MenuItem')}</em>
                                    </MenuItem>
                                    {braSizes.map(size => {
                                        return <MenuItem key={size} value={size}>{size}</MenuItem>
                                    })}
                                </Select>
                                <FormHelperText>{touched.womenUnderWearSize && errors.womenUnderWearSize}</FormHelperText>
                            </FormControl>
                        </Box>
                    </Grid>
                </>}

                <Grid item xs={12}>
                    <Divider variant="middle" />
                </Grid>

                <Grid item xs={12}>
                    <Typography variant='h6' align='left' sx={{ m: 1 }}>
                        {t('Pages.Welcome.BodySize.HeaderBodySize')}
                    </Typography>
                </Grid>

                <BodySizes />

                <Grid item xs={12}>
                    <Typography variant='h6' align='left' sx={{ m: 1 }}>
                        {t('Pages.Welcome.BodySize.AdditionalNotes')}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <TextField
                            disabled={isBusy}
                            value={sizeInfo?.additionalNotes}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            variant="outlined"
                            multiline
                            rows={5}
                            maxRows={8} />
                    </FormControl>
                </Grid>
                <Grid item container xs={6} justifyContent="flex-start">
                    <Button
                        disabled
                    >
                        {t('Layouts.Welcome.WelcomeSteps.Buttons.Back')}
                    </Button>
                </Grid>
                <Grid item container xs={6} justifyContent="flex-end">
                    <Button
                        disabled={isBusy}
                        onClick={() => {
                            submitForm();
                        }}
                        variant="outlined">
                        {isBusy && <CircularProgress sx={{
                            width: "18px !important",
                            height: "18px !important",
                            mr: 2
                        }} />}
                        {t('Layouts.Welcome.WelcomeSteps.Buttons.Next')}
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}