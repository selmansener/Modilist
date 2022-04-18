import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";

export default function ContactInfo() {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h6' align='left' sx={{ m: 1 }}>
                        Teslimat Adresi
                    </Typography>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label="Ad" variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label="Soyad" variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label="Telefon" type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="city-label">İl</InputLabel>
                        <Select
                            labelId="city-label"
                            id="city"
                            value={null}
                            label="İl"
                            onChange={() => { }}
                        >
                            <MenuItem value={"İSTANBUL"}>İSTANBUL</MenuItem>
                            <MenuItem value={"ANKARA"}>ANKARA</MenuItem>
                            <MenuItem value={"İZMİR"}>İZMİR</MenuItem>
                            <MenuItem value={"BURSA"}>BURSA</MenuItem>
                            <MenuItem value={"ADANA"}>ADANA</MenuItem>
                            <MenuItem value={"ADIYAMAN"}>ADIYAMAN</MenuItem>
                            <MenuItem value={"AFYONKARAHİSAR"}>AFYONKARAHİSAR</MenuItem>
                            <MenuItem value={"AĞRI"}>AĞRI</MenuItem>
                            <MenuItem value={"AKSARAY"}>AKSARAY</MenuItem>
                            <MenuItem value={"AMASYA"}>AMASYA</MenuItem>
                            <MenuItem value={"ANTALYA"}>ANTALYA</MenuItem>
                            <MenuItem value={"ARDAHAN"}>ARDAHAN</MenuItem>
                            <MenuItem value={"ARTVİN"}>ARTVİN</MenuItem>
                            <MenuItem value={"AYDIN"}>AYDIN</MenuItem>
                            <MenuItem value={"BALIKESİR"}>BALIKESİR</MenuItem>
                            <MenuItem value={"BARTIN"}>BARTIN</MenuItem>
                            <MenuItem value={"BATMAN"}>BATMAN</MenuItem>
                            <MenuItem value={"BAYBURT"}>BAYBURT</MenuItem>
                            <MenuItem value={"BİLECİK"}>BİLECİK</MenuItem>
                            <MenuItem value={"BİNGÖL"}>BİNGÖL</MenuItem>
                            <MenuItem value={"BİTLİS"}>BİTLİS</MenuItem>
                            <MenuItem value={"BOLU"}>BOLU</MenuItem>
                            <MenuItem value={"BURDUR"}>BURDUR</MenuItem>
                            <MenuItem value={"ÇANAKKALE"}>ÇANAKKALE</MenuItem>
                            <MenuItem value={"ÇANKIRI"}>ÇANKIRI</MenuItem>
                            <MenuItem value={"ÇORUM"}>ÇORUM</MenuItem>
                            <MenuItem value={"DENİZLİ"}>DENİZLİ</MenuItem>
                            <MenuItem value={"DİYARBAKIR"}>DİYARBAKIR</MenuItem>
                            <MenuItem value={"DÜZCE"}>DÜZCE</MenuItem>
                            <MenuItem value={"EDİRNE"}>EDİRNE</MenuItem>
                            <MenuItem value={"ELAZIĞ"}>ELAZIĞ</MenuItem>
                            <MenuItem value={"ERZİNCAN"}>ERZİNCAN</MenuItem>
                            <MenuItem value={"ERZURUM"}>ERZURUM</MenuItem>
                            <MenuItem value={"ESKİŞEHİR"}>ESKİŞEHİR</MenuItem>
                            <MenuItem value={"GAZİANTEP"}>GAZİANTEP</MenuItem>
                            <MenuItem value={"GİRESUN"}>GİRESUN</MenuItem>
                            <MenuItem value={"GÜMÜŞHANE"}>GÜMÜŞHANE</MenuItem>
                            <MenuItem value={"HAKKARİ"}>HAKKARİ</MenuItem>
                            <MenuItem value={"HATAY"}>HATAY</MenuItem>
                            <MenuItem value={"IĞDIR"}>IĞDIR</MenuItem>
                            <MenuItem value={"ISPARTA"}>ISPARTA</MenuItem>
                            <MenuItem value={"KAHRAMANMARAŞ"}>KAHRAMANMARAŞ</MenuItem>
                            <MenuItem value={"KARABÜK"}>KARABÜK</MenuItem>
                            <MenuItem value={"KARAMAN"}>KARAMAN</MenuItem>
                            <MenuItem value={"KARS"}>KARS</MenuItem>
                            <MenuItem value={"KASTAMONU"}>KASTAMONU</MenuItem>
                            <MenuItem value={"KAYSERİ"}>KAYSERİ</MenuItem>
                            <MenuItem value={"KIRIKKALE"}>KIRIKKALE</MenuItem>
                            <MenuItem value={"KIRKLARELİ"}>KIRKLARELİ</MenuItem>
                            <MenuItem value={"KIRŞEHİR"}>KIRŞEHİR</MenuItem>
                            <MenuItem value={"KİLİS"}>KİLİS</MenuItem>
                            <MenuItem value={"KOCAELİ"}>KOCAELİ</MenuItem>
                            <MenuItem value={"KONYA"}>KONYA</MenuItem>
                            <MenuItem value={"KÜTAHYA"}>KÜTAHYA</MenuItem>
                            <MenuItem value={"MALATYA"}>MALATYA</MenuItem>
                            <MenuItem value={"MANİSA"}>MANİSA</MenuItem>
                            <MenuItem value={"MARDİN"}>MARDİN</MenuItem>
                            <MenuItem value={"MERSİN"}>MERSİN</MenuItem>
                            <MenuItem value={"MUĞLA"}>MUĞLA</MenuItem>
                            <MenuItem value={"MUŞ"}>MUŞ</MenuItem>
                            <MenuItem value={"NEVŞEHİR"}>NEVŞEHİR</MenuItem>
                            <MenuItem value={"NİĞDE"}>NİĞDE</MenuItem>
                            <MenuItem value={"ORDU"}>ORDU</MenuItem>
                            <MenuItem value={"OSMANİYE"}>OSMANİYE</MenuItem>
                            <MenuItem value={"RİZE"}>RİZE</MenuItem>
                            <MenuItem value={"SAKARYA"}>SAKARYA</MenuItem>
                            <MenuItem value={"SAMSUN"}>SAMSUN</MenuItem>
                            <MenuItem value={"SİİRT"}>SİİRT</MenuItem>
                            <MenuItem value={"SİNOP"}>SİNOP</MenuItem>
                            <MenuItem value={"SİVAS"}>SİVAS</MenuItem>
                            <MenuItem value={"ŞANLIURFA"}>ŞANLIURFA</MenuItem>
                            <MenuItem value={"ŞIRNAK"}>ŞIRNAK</MenuItem>
                            <MenuItem value={"TEKİRDAĞ"}>TEKİRDAĞ</MenuItem>
                            <MenuItem value={"TOKAT"}>TOKAT</MenuItem>
                            <MenuItem value={"TRABZON"}>TRABZON</MenuItem>
                            <MenuItem value={"TUNCELİ"}>TUNCELİ</MenuItem>
                            <MenuItem value={"UŞAK"}>UŞAK</MenuItem>
                            <MenuItem value={"VAN"}>VAN</MenuItem>
                            <MenuItem value={"YALOVA"}>YALOVA</MenuItem>
                            <MenuItem value={"YOZGAT"}>YOZGAT</MenuItem>
                            <MenuItem value={"ZONGULDAK"}>ZONGULDAK</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                {/* TODO: hepsiburada'dan ilçe listesi alınacak, city/province ayrı component olabilir */}
                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="province-label">İlçe</InputLabel>
                        <Select
                            labelId="province-label"
                            id="province"
                            value={null}
                            label="İlçe"
                            onChange={() => { }}
                        >
                            <MenuItem value={"XXS"}>İlçe</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label="Posta Kodu" type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} variant="outlined" />
                    </FormControl>
                </Grid>


                <Grid item xs={8}>
                    <FormControl sx={{ m: 1, width: 680 }}>
                        <TextField label="Adres"
                            variant="outlined"
                            multiline
                            rows={4} />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label="Adres Adı" variant="outlined" />
                    </FormControl>
                </Grid>
            </Grid>
        </>
    )
}