import { Button, ButtonGroup, Divider, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Gender, SizeInfoDTO } from "../../services/swagger/api";
import { Dispatch, RootState } from "../../store/store";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { camelCase } from "change-case";

export default function BodySize() {
    const { t } = useTranslation();
    const { isBusy, data: account, status } = useSelector((state: RootState) => state.getAccountModel);
    const { isBusy: getSizeInfoIsBusy, data: initialSizeInfo } = useSelector((state: RootState) => state.getSizeInfoModel);
    const { isBusy: upsertSizeInfoIsBusy, data: upsertSizeInfo, status: upsertStatus } = useSelector((state: RootState) => state.upsertSizeInfoModel);
    const { activeStep, skipped } = useSelector((state: RootState) => state.welcomeStepsModel);
    const [sizeInfo, setSizeInfo] = useState<SizeInfoDTO>({});
    const [isValid, setIsValid] = useState<boolean>(false);
    const [requiredField] = useState(t("FormValidation.RequiredField"));

    const [schema, setSchema] = useState(Yup.object({
        tshirt: Yup.string().required(requiredField),
        sweater: Yup.string().required(requiredField),
        sweatshirt: Yup.string().required(requiredField),
        shirt: Yup.string().required(requiredField),
        sleevelessUnderShirt: Yup.string().required(requiredField),
        pants: Yup.string().required(requiredField),
        jeans: Yup.string().required(requiredField),
        shorts: Yup.string().required(requiredField),
        sweatpants: Yup.string().required(requiredField),
    }));

    const dispatch = useDispatch<Dispatch>();

    const [sizeSymbols] = useState<string[]>(["XXS", "XS", "S", "M", "L", "XL", "XXL"]);

    const [braSizes] = useState<string[]>(["70", "75", "80", "85", "90", "95", "100", "105", "110"]);

    const [braSuffixes] = useState<string[]>(["A", "B", "C", "D", "DD"]);

    const [upperWears, setUpperWears] = useState<string[]>([
        "Tshirt",
        "Sweater",
        "Sweatshirt",
        "Shirt",
    ]);

    const [lowerWears, setLowerWears] = useState<string[]>([
        "Pants",
        "Jeans",
        "Shorts",
        "Sweatpants"
    ]);

    const [underWears, setUnderWears] = useState<string[]>([
        "SleevelessUnderShirt",
    ]);

    const [underWearsBra] = useState<string[]>([
        "Bralet",
        "Bustier"
    ]);

    useEffect(() => {
        if (account && account.gender === Gender.Female) {
            setUpperWears([
                ...upperWears,
                "Crop",
                "Blouse",
                "Tunik",
                "Dress",
                "Overalls"
            ]);

            setLowerWears([
                ...lowerWears,
                "Skirt",
                "Leggings"
            ]);

            setUnderWears([
                ...underWears,
                "Panties"
            ]);

            const newSchema = schema.shape({
                crop: Yup.string().required(requiredField),
                blouse: Yup.string().required(requiredField),
                bustier: Yup.string().required(requiredField),
                bralet: Yup.string().required(requiredField),
                tunik: Yup.string().required(requiredField),
                dress: Yup.string().required(requiredField),
                overalls: Yup.string().required(requiredField),
                skirt: Yup.string().required(requiredField),
                leggings: Yup.string().required(requiredField),
            });

            setSchema(newSchema);
        }
        else if (account && account.gender === Gender.Male) {
            setUnderWears([
                ...underWears,
                "Boxer"
            ]);
            
            const newSchema = schema.shape({
                boxer: Yup.string().required(requiredField),
            });
            
            setSchema(newSchema);
        }
    }, [account]);

    useEffect(() => {
        if (initialSizeInfo === undefined && !getSizeInfoIsBusy) {
            dispatch.getSizeInfoModel.getSizeInfo();
        }
    }, []);

    useEffect(() => {
        if (initialSizeInfo) {
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
        //setValues,
    } = useFormik({
        enableReinitialize: true,
        initialValues: sizeInfo,
        validationSchema: schema,
        onSubmit: (values) => {
        },
    });

    // const underwearSizes = () => {
    //     const sizes: string[] = [];
    //     braSuffixes.map(suffix => {
    //         braSizes.map(size => {
    //             sizes.push(`${size}${suffix}`)
    //         })
    //     })

    //     return sizes;
    // }

    type SectionProps = {
        sectionData: string[],
        sizeData: string[],
        title: string
    }

    useEffect(() => {
        console.log("sizeInfo", sizeInfo);
    }, [sizeInfo])

    const Section = (props: SectionProps) => {
        const { sectionData, sizeData, title } = props;

        return <>
            <Grid item xs={12}>
                <Typography variant='h6' align='left' sx={{ m: 1 }}>
                    {t(`Pages.Welcome.BodySize.${title}`)}
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography>Hepsini Değiştir</Typography>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    {sizeData.map(size => {
                        return <Button
                            key={size}
                            onClick={() => {
                                const newSizeInfo: SizeInfoDTO = {};
                                sectionData.map((section: string) => {
                                    newSizeInfo[camelCase(section) as keyof typeof sizeInfo] = size as any;
                                });

                                setSizeInfo({
                                    ...sizeInfo,
                                    ...newSizeInfo
                                });

                                // setValues({
                                //     ...sizeInfo,
                                //     ...newSizeInfo
                                // });
                            }}
                        >
                            {size}
                        </Button>
                    })}
                </ButtonGroup>
            </Grid>

            {sectionData.map(_section => {
                const section = camelCase(_section);

                return (
                    <Grid item key={section} xs={4}>
                        <FormControl sx={{ m: 1, width: 300 }} error={touched[section as keyof typeof touched] && errors[section as keyof typeof errors] !== undefined}>
                            <InputLabel id={`${section}-label`}>{t(`ProductCategories.${_section}`)}</InputLabel>
                            <Select
                                name={section}
                                labelId={`${section}-label`}
                                id={section}
                                value={sizeInfo[section as keyof typeof sizeInfo]}
                                label={t(`ProductCategories.${_section}`)}
                                onChange={(e) => {
                                    handleChange(e);

                                    if (e.target.value) {
                                        setSizeInfo({
                                            ...sizeInfo,
                                            [section]: e.target.value
                                        })
                                    }
                                }}
                                onBlur={(e) => {
                                    handleBlur(e);

                                    if (e.target.value) {
                                        setSizeInfo({
                                            ...sizeInfo,
                                            [section]: e.target.value
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
                            <FormHelperText>{touched[section as keyof typeof touched] && errors[section as keyof typeof errors]}</FormHelperText>
                        </FormControl>
                    </Grid>
                )
            })}

            <Grid item xs={12}>
                <Divider variant="middle" />
            </Grid>
        </>
    }

    return (
        <>
            <Grid container spacing={2}>

                <Section
                    sectionData={upperWears}
                    sizeData={sizeSymbols}
                    title={"UpperWear"}
                />
                <Section
                    sectionData={lowerWears}
                    sizeData={sizeSymbols}
                    title={"LowerWear"}
                />
                <Section
                    sectionData={underWears}
                    sizeData={sizeSymbols}
                    title={"UnderWear"}
                />
                {account?.gender === Gender.Female &&
                    <Section
                        sectionData={underWearsBra}
                        sizeData={braSuffixes}
                        title={"UnderWearsBra"}
                    />
                }
                <Grid item xs={12}>
                    <Typography variant='h6' align='left' sx={{ m: 1 }}>
                        {t('Pages.Welcome.BodySize.HeaderBodySize')}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label={t('Pages.Welcome.BodySize.NeckCircumference')} type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label={t('Pages.Welcome.BodySize.ShoulderWidth')} type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label={t('Pages.Welcome.BodySize.BustCircumference')} type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label={t('Pages.Welcome.BodySize.WaistCircumference')} type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label={t('Pages.Welcome.BodySize.HipCircumference')} type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label={t('Pages.Welcome.BodySize.LegLength')} type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label={t('Pages.Welcome.BodySize.Height')} type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label={t('Pages.Welcome.BodySize.Weight')} type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} variant="outlined" />
                    </FormControl>
                </Grid>
            </Grid>
        </>
    )
}