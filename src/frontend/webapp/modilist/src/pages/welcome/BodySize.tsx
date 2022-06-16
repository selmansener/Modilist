import { Box, Button, ButtonGroup, Divider, FormControl, FormHelperText, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { BodyType, Gender, SizeInfoDTO } from "../../services/swagger/api";
import { Dispatch, RootState } from "../../store/store";
import { FormikTouched, useFormik } from 'formik';
import * as Yup from "yup";
import { camelCase } from "change-case";
import { CustomRadioButtonGroup } from "../../components/customRadioButton/CustomRadioButton";
import { ImageComponent } from "../../components/image/ImageComponent";
import { config } from "../../config";
import { WeigthIcon } from "../../components/customIcons/WeightIcon";
import { MeasureIcon } from "../../components/customIcons/MeasureIcon";

type BodyTypeElement = {
    name: string;
    img: string;
}

export default function BodySize() {
    const { imgBaseHost } = config;
    const { t } = useTranslation();
    const { isBusy: getAccountIsBusy, data: account, status } = useSelector((state: RootState) => state.getAccountModel);
    const { isBusy: getSizeInfoIsBusy, data: initialSizeInfo, status: getSizeInfoStatus } = useSelector((state: RootState) => state.getSizeInfoModel);
    const { isBusy: upsertSizeInfoIsBusy, data: upsertSizeInfo, status: upsertStatus } = useSelector((state: RootState) => state.upsertSizeInfoModel);
    const { activeStep, skipped } = useSelector((state: RootState) => state.welcomeStepsModel);
    const [sizeInfo, setSizeInfo] = useState<SizeInfoDTO>({
        bodyType: BodyType.None,
        weight: 0,
        height: 0,
        upperBody: "",
        lowerBody: "",
        outWear: "",
        footWear: "",
        menUnderWear: "",
        womenUnderWearCup: "",
        womenUnderWearSize: "",
        additionalNotes: "",
        armLength: 0,
        bodyLength: 0,
        breastRadius: 0,
        footLength: 0,
        headRadius: 0,
        hipRadius: 0,
        legLength: 0,
        neckRadius: 0,
        shoulderWidth: 0,
        waistRadius: 0
    });
    const [isValid, setIsValid] = useState<boolean>(false);
    const [requiredField] = useState(t("FormValidation.RequiredField"));

    const [schema, setSchema] = useState(Yup.object({
        upperBody: Yup.string().required(requiredField),
        lowerBody: Yup.string().required(requiredField),
        outWear: Yup.string().required(requiredField),
        footWear: Yup.string().required(requiredField),
        bodyType: Yup.string().notOneOf(["None"], requiredField).required(requiredField),
        weight: Yup.number().integer().moreThan(0, requiredField).required(requiredField),
        height: Yup.number().integer().moreThan(0, requiredField).required(requiredField),
    }));

    const dispatch = useDispatch<Dispatch>();

    const [sizeSymbols] = useState<string[]>(["XXS", "XS", "S", "M", "L", "XL", "XXL"]);

    const [braSizes] = useState<string[]>(["70", "75", "80", "85", "90", "95", "100", "105", "110"]);

    const [braCup] = useState<string[]>(["A", "B", "C", "D"]);

    const [footWearSizes, setFootWearSizes] = useState<number[]>([]);

    const [bodyTypes, setBodyTypes] = useState<BodyTypeElement[]>([])

    const [sections, setSections] = useState<string[]>([
        "UpperBody",
        "LowerBody",
        "OutWear",
    ]);

    const [bodySizes] = useState<string[]>([
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
    ]);

    useEffect(() => {
        if (account) {
            setBodyTypes([
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
            ]);
        }

        if (account && account.gender === Gender.Female) {
            const newSchema = schema.shape({
                womenUnderWearCup: Yup.string().required(requiredField),
                womenUnderWearSize: Yup.string().required(requiredField),
            });

            setSchema(newSchema);
        }
        else if (account && account.gender === Gender.Male) {
            setSections([
                ...sections,
                "MenUnderWear"
            ]);

            const newSchema = schema.shape({
                menUnderWear: Yup.string().required(requiredField),
            });

            setSchema(newSchema);
        }
    }, [account]);

    useEffect(() => {
        if (initialSizeInfo === undefined && !getSizeInfoIsBusy) {
            dispatch.getSizeInfoModel.getSizeInfo();
        }

        if (!getAccountIsBusy && account === undefined) {
            dispatch.getAccountModel.getAccount();
        }

        if (footWearSizes.length === 0) {
            const sizes = [];
            for (let i = 35; i <= 45; i++) {
                sizes.push(i);
            }

            setFootWearSizes(sizes);
        }
    }, []);

    useEffect(() => {
        if (initialSizeInfo && !getSizeInfoIsBusy && getSizeInfoStatus === 200) {
            setSizeInfo(initialSizeInfo);
        }
    }, [initialSizeInfo]);

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    useEffect(() => {
        if (upsertStatus === 200 && upsertSizeInfo) {
            dispatch.getSizeInfoModel.HANDLE_RESPONSE(upsertSizeInfo, upsertStatus);

            dispatch.upsertSizeInfoModel.RESET();

            let newSkipped = skipped;
            if (isStepSkipped(activeStep)) {
                newSkipped = new Set(newSkipped.values());
                newSkipped.delete(activeStep);
            }

            dispatch.welcomeStepsModel.setActiveStep(activeStep + 1);
            dispatch.welcomeStepsModel.setSkipped(newSkipped);
        }
    }, [upsertSizeInfo])

    useEffect(() => {
        if (isValid && !upsertSizeInfoIsBusy && sizeInfo) {
            dispatch.upsertSizeInfoModel.upsertSizeInfo({
                ...sizeInfo,
                gender: account?.gender,
            });
        }
    }, [isValid]);

    useEffect(() => {
        dispatch.welcomeStepsModel.setNextCallback(() => {
            handleSubmit();

            validateForm(sizeInfo).then((errors) => {
                setIsValid(Object.keys(errors).length === 0);
            });
        });

        dispatch.welcomeStepsModel.setBackCallback(() => {
            let newSkipped = skipped;
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);

            const newStep = activeStep - 1;

            dispatch.welcomeStepsModel.setActiveStep(newStep);
            dispatch.welcomeStepsModel.setSkipped(newSkipped);
        });
    }, [sizeInfo]);

    const {
        handleChange,
        handleBlur,
        touched,
        errors,
        validateForm,
        handleSubmit,
    } = useFormik({
        enableReinitialize: true,
        initialValues: sizeInfo,
        validationSchema: schema,
        onSubmit: (values) => {
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
                                    name={sectionName}
                                    labelId={`${sectionName}-label`}
                                    id={sectionName}
                                    value={sizeInfo[sectionName as keyof typeof sizeInfo]}
                                    label={t(`Pages.Welcome.BodySize.${_section}`)}
                                    onChange={(e) => {
                                        handleChange(e);

                                        if (e.target.value) {
                                            setSizeInfo({
                                                ...sizeInfo,
                                                [sectionName]: e.target.value
                                            })
                                        }
                                    }}
                                    onBlur={(e) => {
                                        handleBlur(e);

                                        if (e.target.value) {
                                            setSizeInfo({
                                                ...sizeInfo,
                                                [sectionName]: e.target.value
                                            })
                                        }
                                    }}
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
                                    value={sizeInfo[sizeName as keyof typeof sizeInfo]}
                                    onChange={(e) => {
                                        setSizeInfo({
                                            ...sizeInfo,
                                            [sizeName as keyof typeof sizeInfo]: e.target.value
                                        });
                                    }}
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
                                    setSizeInfo({
                                        ...sizeInfo,
                                        bodyType: value as BodyType
                                    });

                                    handleChange(value);
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
                                name="weight"
                                label={t('Pages.Welcome.BodySize.Weight')}
                                type="number"
                                value={sizeInfo.weight}
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                variant="outlined"
                                error={touched.weight && errors.weight !== undefined}
                                helperText={touched.weight && errors.weight}
                                onChange={(e) => {
                                    setSizeInfo({
                                        ...sizeInfo,
                                        weight: parseInt(e.target.value)
                                    })

                                    handleChange(e);
                                }}
                                onBlur={(handleBlur)}
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
                                name="height"
                                label={t('Pages.Welcome.BodySize.Height')}
                                type="number"
                                value={sizeInfo.height}
                                error={touched.height && errors.height !== undefined}
                                helperText={touched.height && errors.height}
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                variant="outlined"
                                onChange={(e) => {
                                    setSizeInfo({
                                        ...sizeInfo,
                                        height: parseInt(e.target.value)
                                    })

                                    handleChange(e);
                                }}
                                onBlur={(handleBlur)}
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
                                name={'footWear'}
                                labelId={`footWear-label`}
                                id={'footWear'}
                                value={sizeInfo.footWear}
                                label={t(`Pages.Welcome.BodySize.FootWear`)}
                                onChange={(e) => {
                                    if (e.target.value) {
                                        setSizeInfo({
                                            ...sizeInfo,
                                            footWear: e.target.value
                                        })
                                    }

                                    handleChange(e);
                                }}
                                onBlur={(e) => {
                                    setSizeInfo({
                                        ...sizeInfo,
                                        footWear: e.target.value
                                    })

                                    handleBlur(e);
                                }}
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
                                    name={'womenUnderWearCup'}
                                    labelId={`womenUnderWearCup-label`}
                                    id={'womenUnderWearCup'}
                                    value={sizeInfo?.womenUnderWearCup}
                                    label={t(`Pages.Welcome.BodySize.WomenUnderWearCup`)}
                                    onChange={(e) => {
                                        handleChange(e);

                                        if (e.target.value) {
                                            setSizeInfo({
                                                ...sizeInfo,
                                                womenUnderWearCup: e.target.value
                                            })
                                        }
                                    }}
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
                                    name={'womenUnderWearSize'}
                                    labelId={`womenUnderWearSize-label`}
                                    id={'womenUnderWearSize'}
                                    value={sizeInfo.womenUnderWearSize}
                                    label={t(`Pages.Welcome.BodySize.WomenUnderWearSize`)}
                                    onChange={(e) => {
                                        handleChange(e);

                                        if (e.target.value) {
                                            setSizeInfo({
                                                ...sizeInfo,
                                                womenUnderWearSize: e.target.value
                                            })
                                        }
                                    }}
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
                            value={sizeInfo?.additionalNotes}
                            onChange={(e) => {
                                setSizeInfo({
                                    ...sizeInfo,
                                    additionalNotes: e.target.value
                                })
                            }}
                            variant="outlined"
                            multiline
                            rows={5}
                            maxRows={8} />
                    </FormControl>
                </Grid>
            </Grid>
        </>
    )
}