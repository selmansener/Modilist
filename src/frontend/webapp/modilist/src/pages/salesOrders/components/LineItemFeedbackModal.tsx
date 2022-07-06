import { Dialog, DialogTitle, Grid, Typography, DialogContent, Box, Button, FormGroup, FormControlLabel, Checkbox, FormControl, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { ImageComponent } from "../../../components/image/ImageComponent";
import { LovelyRating } from "../../../components/lovelyRating/LovelyRating";
import { LineItemFeedbackDTO, LineItemSizeFeedback, ProductDTO, SalesOrderLineItemState } from "../../../services/swagger/api";
import { Dispatch, RootState } from "../../../store/store";
import { calculateAvgLineItemRating } from "../utils/calculateAvgRating";

export interface LineItemFeedbackModalProps {
    open: boolean;
    product: ProductDTO;
    lineItemId: number;
    salesOrderId: number;
    lineItemFeedback: LineItemFeedbackDTO;
    onClose: () => void;
}

export function LineItemFeedbackModal(props: LineItemFeedbackModalProps) {
    const { t } = useTranslation();
    const dispatch = useDispatch<Dispatch>();
    const { open, salesOrderId, lineItemId, product, lineItemFeedback, onClose } = props;
    const { isBusy, status } = useSelector((state: RootState) => state.addOrUpdateFeedbackModel);
    const [feedback, setFeedback] = useState(lineItemFeedback);

    const submit = (lineItemState: SalesOrderLineItemState) => {
        if (!isBusy) {
            dispatch.addOrUpdateFeedbackModel.addOrUpdateFeedback({
                salesOrderId: salesOrderId,
                salesOrderLineItemId: lineItemId,
                input: {
                    ...feedback,
                    lineItemState: lineItemState
                }
            })
        }
    }

    useEffect(() => {
        if (status === 200) {
            dispatch.addOrUpdateFeedbackModel.RESET();
            dispatch.salesOrderDetailsModel.salesOrderDetails(salesOrderId);
            onClose();
        }
    }, [status]);

    return (
        <Dialog onClose={onClose} open={open} fullWidth maxWidth="xl">
            <DialogTitle>
                <Grid item container xs={12} spacing={2}>
                    <Grid item xs={1}>
                    </Grid>
                    <Grid item container xs={10} spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h4" align="center">{t("Pages.SalesOrderFeedback.Feedback.Title")}</Typography>
                        </Grid>
                        <Grid item container xs={12} spacing={2}>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3} display="flex" justifyContent="center">
                                <Typography display="inline" variant="body1">{t("Pages.SalesOrderFeedback.Feedback.LowScore")}</Typography>
                                <LovelyRating defaultValue={1} readOnly />
                            </Grid>
                            <Grid item xs={3} display="flex" justifyContent="center">
                                <Typography display="inline" variant="body1">{t("Pages.SalesOrderFeedback.Feedback.HighScore")}</Typography>
                                <LovelyRating defaultValue={5} readOnly />
                            </Grid>
                            <Grid item xs={3}></Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={1}>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <Grid item container xs={12} spacing={2}>
                    <Grid item container xs={8} spacing={2}>
                        <Grid item xs={2}>
                            <Typography>
                                {t("Pages.SalesOrderFeedback.Feedback.PerfectMatch")}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <LovelyRating
                                value={feedback?.perfectMatch ?? 0}
                                onChange={(e, value) => {
                                    setFeedback({
                                        ...feedback,
                                        perfectMatch: value ?? 0
                                    });
                                }}
                                precision={0.5}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>
                                {t("Pages.SalesOrderFeedback.Feedback.Brand")}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <LovelyRating
                                value={feedback?.brand ?? 0}
                                onChange={(e, value) => {
                                    setFeedback({
                                        ...feedback,
                                        brand: value ?? 0
                                    });
                                }}
                                precision={0.5} />
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>
                                {t("Pages.SalesOrderFeedback.Feedback.Fabric")}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <LovelyRating
                                value={feedback?.fabric ?? 0}
                                onChange={(e, value) => {
                                    setFeedback({
                                        ...feedback,
                                        fabric: value ?? 0
                                    });
                                }}
                                precision={0.5} />
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>
                                {t("Pages.SalesOrderFeedback.Feedback.Style")}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <LovelyRating
                                value={feedback?.style ?? 0}
                                onChange={(e, value) => {
                                    setFeedback({
                                        ...feedback,
                                        style: value ?? 0
                                    });
                                }}
                                precision={0.5} />
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>
                                {t("Pages.SalesOrderFeedback.Feedback.Quality")}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <LovelyRating
                                value={feedback?.quality ?? 0}
                                onChange={(e, value) => {
                                    setFeedback({
                                        ...feedback,
                                        quality: value ?? 0
                                    });
                                }}
                                precision={0.5} />
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>
                                {t("Pages.SalesOrderFeedback.Feedback.Color")}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <LovelyRating
                                value={feedback?.color ?? 0}
                                onChange={(e, value) => {
                                    setFeedback({
                                        ...feedback,
                                        color: value ?? 0
                                    });
                                }}
                                precision={0.5} />
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>
                                {t("Pages.SalesOrderFeedback.Feedback.Fit")}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <LovelyRating
                                value={feedback?.fit ?? 0}
                                onChange={(e, value) => {
                                    setFeedback({
                                        ...feedback,
                                        fit: value ?? 0
                                    });
                                }}
                                precision={0.5} />
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>
                                {t("Pages.SalesOrderFeedback.Feedback.Pattern")}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <LovelyRating
                                value={feedback?.pattern ?? 0}
                                onChange={(e, value) => {
                                    setFeedback({
                                        ...feedback,
                                        pattern: value ?? 0
                                    });
                                }}
                                precision={0.5} />
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>
                                {t("Pages.SalesOrderFeedback.Feedback.Price")}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <LovelyRating
                                value={feedback?.price ?? 0}
                                onChange={(e, value) => {
                                    setFeedback({
                                        ...feedback,
                                        price: value ?? 0
                                    });
                                }}
                                precision={0.5} />
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>
                                {t("Pages.SalesOrderFeedback.Feedback.Size.Question")}
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <Button
                                variant={feedback.size === LineItemSizeFeedback.Small ? "contained" : "outlined"}
                                size="small"
                                sx={{ mr: 2 }}
                                onClick={() => {
                                    setFeedback({
                                        ...feedback,
                                        size: LineItemSizeFeedback.Small
                                    })
                                }}>
                                {t("Pages.SalesOrderFeedback.Feedback.Size.Small")}
                            </Button>
                            <Button
                                variant={feedback.size === LineItemSizeFeedback.ExactFit ? "contained" : "outlined"}
                                size="small"
                                sx={{ mr: 2 }}
                                onClick={() => {
                                    setFeedback({
                                        ...feedback,
                                        size: LineItemSizeFeedback.ExactFit
                                    })
                                }}>
                                {t("Pages.SalesOrderFeedback.Feedback.Size.Fit")}
                            </Button>
                            <Button
                                variant={feedback.size === LineItemSizeFeedback.Large ? "contained" : "outlined"}
                                size="small"
                                onClick={() => {
                                    setFeedback({
                                        ...feedback,
                                        size: LineItemSizeFeedback.Large
                                    })
                                }}>
                                {t("Pages.SalesOrderFeedback.Feedback.Size.Large")}
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox
                                    checked={feedback.sendSimilarProducts}
                                    onChange={(e, checked) => {
                                        setFeedback({
                                            ...feedback,
                                            sendSimilarProducts: checked
                                        })
                                    }} />} label={
                                        <Typography variant="body1">
                                            {t("Pages.SalesOrderFeedback.Feedback.SendSimilarProducts")}
                                        </Typography>
                                    } />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={"body1"} fontWeight={800}>
                                {t("Pages.SalesOrderFeedback.Feedback.AdditionalNotes")}
                            </Typography>
                            <FormControl fullWidth>
                                <TextField
                                    variant="outlined"
                                    multiline
                                    rows={5}
                                    onChange={(e) => {
                                        setFeedback({
                                            ...feedback,
                                            additionalNotes: e.target.value
                                        })
                                    }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} display="flex" justifyContent={'flex-end'}>
                            <Button
                                disabled={isBusy}
                                variant="outlined"
                                size="medium"
                                sx={{
                                    width: '200px',
                                    height: '50px'
                                }}
                                onClick={() => {
                                    submit(SalesOrderLineItemState.Returned);
                                }}>
                                {t("Pages.SalesOrderFeedback.Feedback.Return")}
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item container xs={4} spacing={2}>
                        <Grid item xs={12}>
                            {product.images && product.images.length > 0 && <ImageComponent src={product.images[0].url ?? ""} asBackground sx={{
                                height: '260px'
                            }} />}
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" fontWeight={800}>
                                {t("Pages.SalesOrderFeedback.SKU")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" align="right">
                                {product.sku}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" fontWeight={800}>
                                {product.category}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" align="right">
                                {product.size}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">
                                {product.brand}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            {/* WARN: This one should be empty */}
                        </Grid>
                        <Grid item xs={6}>
                            <LovelyRating
                                readOnly
                                precision={0.5}
                                value={calculateAvgLineItemRating(feedback)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" align="right">
                                {product.price}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                disabled={isBusy}
                                variant="contained"
                                size="medium"
                                sx={{
                                    width: '200px',
                                    height: '50px'
                                }}
                                onClick={() => {
                                    submit(SalesOrderLineItemState.Sold);
                                }}>
                                {t("Pages.SalesOrderFeedback.Feedback.Buy")}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
}