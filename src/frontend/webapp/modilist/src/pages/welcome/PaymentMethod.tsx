import { FormControl, Grid, TextField, Typography } from "@mui/material";

export default function PaymentMethod() {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h6' align='left' sx={{ m: 1 }}>
                        Ödeme Yöntemi
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <div style={{ display: 'flex', justifyContent: 'left' }}>
                        <FormControl sx={{ m: 1, width: 680 }}>
                            <TextField label="Kart Üzerindeki İsim" variant="outlined" />
                        </FormControl>
                    </div>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label="Son Kullanma Tarihi" variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label="CVV" variant="outlined" />
                    </FormControl>
                </Grid>

                {/* TODO: formatter implementation */}
                {/* https://mui.com/material-ui/react-text-field/#integration-with-3rd-party-input-libraries */}
                <Grid item xs={8}>
                    <FormControl sx={{ m: 1, width: 680 }}>
                        <TextField label="Kart Numarası" type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} variant="outlined" />
                    </FormControl>
                </Grid>


            </Grid>
        </>
    )
}