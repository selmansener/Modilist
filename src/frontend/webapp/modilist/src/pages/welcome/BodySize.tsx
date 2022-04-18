import { Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";

export default function BodySize() {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h6' align='left' sx={{ m: 1 }}>
                        Kıyafet Ölçüleri
                    </Typography>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="tshirt-label">Tişört & Bluz</InputLabel>
                        <Select
                            labelId="tshirt-label"
                            id="tshirt"
                            value={null}
                            label="Tişört & Bluz"
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
                        <InputLabel id="skirt-dress-label">Etek & Elbise</InputLabel>
                        <Select
                            labelId="skirt-dress-label"
                            id="skirt-dress"
                            value={null}
                            label="Etek & Elbise"
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
                        <InputLabel id="jean-label">Pantolon & Jean</InputLabel>
                        <Select
                            labelId="jean-label"
                            id="jean"
                            value={null}
                            label="Pantolon & Jean"
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
                        <InputLabel id="bra-size-label">Sütyen - (Cup)</InputLabel>
                        <Select
                            labelId="bra-size-label"
                            id="bra-size"
                            value={null}
                            label="Sütyen - (Cup)"
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
                        <InputLabel id="bra-belt-label">Sütyen - (Sırt Çevresi)</InputLabel>
                        <Select
                            labelId="bra-belt-label"
                            id="bra-belt"
                            value={null}
                            label="Sütyen - (Sırt Çevresi)"
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
                        <InputLabel id="shoes-label">Ayakabı</InputLabel>
                        <Select
                            labelId="shoes-label"
                            id="shoes"
                            value={null}
                            label="Ayakabı"
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
                        Beden Ölçüleri
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label="Boyun Çevresi (cm)" type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label="Omuz Genişliği (cm)" type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label="Göğüs Çevresi (cm)" type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label="Bel Çevresi (cm)" type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label="Kalça Çevresi (cm)" type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label="Bacak Uzunluğu (cm)" type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} variant="outlined" />
                    </FormControl>
                </Grid>
            </Grid>
        </>
    )
}