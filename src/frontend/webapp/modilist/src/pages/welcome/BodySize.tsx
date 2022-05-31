import { Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AccountDTO } from "../../services/swagger/api";
import { Dispatch, RootState } from "../../store/store";


export default function BodySize() {
    const { t } = useTranslation();
    const { isBusy, data: initialAccount, status } = useSelector((state: RootState) => state.getAccountModel);
    const { activeStep, skipped } = useSelector((state: RootState) => state.welcomeStepsModel);
    const [account] = useState<AccountDTO>({});
    const [isValid, setIsValid] = useState<boolean>(false);
    const dispatch = useDispatch<Dispatch>();

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    useEffect(() => {
        dispatch.welcomeStepsModel.setNextCallback(() => {
            let newSkipped = skipped;
            if (isStepSkipped(activeStep)) {
                newSkipped = new Set(newSkipped.values());
                newSkipped.delete(activeStep);
            }

            dispatch.welcomeStepsModel.setActiveStep(activeStep + 1);
            dispatch.welcomeStepsModel.setSkipped(newSkipped);
        });

        dispatch.welcomeStepsModel.setBackCallback(() => {
            console.log(activeStep);

            let newSkipped = skipped;
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);

            console.log(newSkipped);
            const newStep = activeStep - 1;
            console.log(newStep);
            dispatch.welcomeStepsModel.setActiveStep(newStep);
            dispatch.welcomeStepsModel.setSkipped(newSkipped);
        });
    }, []);

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h6' align='left' sx={{ m: 1 }}>
                        {t('Pages.Welcome.BodySize.HeaderClothingSize')}
                    </Typography>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="tshirt-label">{t('Pages.Welcome.BodySize.TShirtBlouse')}</InputLabel>
                        <Select
                            labelId="tshirt-label"
                            id="tshirt"
                            value={null}
                            label={t('Pages.Welcome.BodySize.TShirtBlouse')}
                            onChange={() => { }}
                        >
                            <MenuItem value={"XXS"}>XS - 32</MenuItem>
                            <MenuItem value={"XS"}>XS - 34</MenuItem>
                            <MenuItem value={"S"}>S - 36</MenuItem>
                            <MenuItem value={"M"}>M - 38</MenuItem>
                            <MenuItem value={"L"}>L - 40</MenuItem>
                            <MenuItem value={"XL"}>XL - 42</MenuItem>
                            <MenuItem value={"XXL"}>XXL - 44</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="skirt-dress-label">{t('Pages.Welcome.BodySize.SkirtDress')}</InputLabel>
                        <Select
                            labelId="skirt-dress-label"
                            id="skirt-dress"
                            value={null}
                            label={t('Pages.Welcome.BodySize.SkirtDress')}
                            onChange={() => { }}
                        >
                            <MenuItem value={"XXS"}>XS - 32</MenuItem>
                            <MenuItem value={"XS"}>XS - 34</MenuItem>
                            <MenuItem value={"S"}>S - 36</MenuItem>
                            <MenuItem value={"M"}>M - 38</MenuItem>
                            <MenuItem value={"L"}>L - 40</MenuItem>
                            <MenuItem value={"XL"}>XL - 42</MenuItem>
                            <MenuItem value={"XXL"}>XXL - 44</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="jean-label">{t('Pages.Welcome.BodySize.PantsJean')}</InputLabel>
                        <Select
                            labelId="jean-label"
                            id="jean"
                            value={null}
                            label={t('Pages.Welcome.BodySize.PantsJean')}
                            onChange={() => { }}
                        >
                            <MenuItem value={"XXS"}>XS - 32</MenuItem>
                            <MenuItem value={"XS"}>XS - 34</MenuItem>
                            <MenuItem value={"S"}>S - 36</MenuItem>
                            <MenuItem value={"M"}>M - 38</MenuItem>
                            <MenuItem value={"L"}>L - 40</MenuItem>
                            <MenuItem value={"XL"}>XL - 42</MenuItem>
                            <MenuItem value={"XXL"}>XXL - 44</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="bra-size-label">{t('Pages.Welcome.BodySize.Bra')}</InputLabel>
                        <Select
                            labelId="bra-size-label"
                            id="bra-size"
                            value={null}
                            label={t('Pages.Welcome.BodySize.Bra')}
                            onChange={() => { }}
                        >
                            <MenuItem value={"A"}>A</MenuItem>
                            <MenuItem value={"B"}>B</MenuItem>
                            <MenuItem value={"C"}>C</MenuItem>
                            <MenuItem value={"D"}>D</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="bra-belt-label">{t('Pages.Welcome.BodySize.BraBelt')}</InputLabel>
                        <Select
                            labelId="bra-belt-label"
                            id="bra-belt"
                            value={null}
                            label={t('Pages.Welcome.BodySize.BraBelt')}
                            onChange={() => { }}
                        >
                            <MenuItem value={"70"}>70</MenuItem>
                            <MenuItem value={"75"}>75</MenuItem>
                            <MenuItem value={"80"}>80</MenuItem>
                            <MenuItem value={"85"}>85</MenuItem>
                            <MenuItem value={"90"}>90</MenuItem>
                            <MenuItem value={"95"}>95</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="shoes-label">{t('Pages.Welcome.BodySize.Shoes')}</InputLabel>
                        <Select
                            labelId="shoes-label"
                            id="shoes"
                            value={null}
                            label={t('Pages.Welcome.BodySize.Shoes')}
                            onChange={() => { }}
                        >
                            <MenuItem value={"35"}>35</MenuItem>
                            <MenuItem value={"36"}>36</MenuItem>
                            <MenuItem value={"37"}>37</MenuItem>
                            <MenuItem value={"38"}>38</MenuItem>
                            <MenuItem value={"39"}>39</MenuItem>
                            <MenuItem value={"40"}>40</MenuItem>
                            <MenuItem value={"41"}>41</MenuItem>
                            <MenuItem value={"42"}>42</MenuItem>
                            <MenuItem value={"43"}>43</MenuItem>
                            <MenuItem value={"44"}>44</MenuItem>
                            <MenuItem value={"45"}>45</MenuItem>
                            <MenuItem value={"46"}>46</MenuItem>
                            <MenuItem value={"47"}>47</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Divider variant="middle" />
                </Grid>
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