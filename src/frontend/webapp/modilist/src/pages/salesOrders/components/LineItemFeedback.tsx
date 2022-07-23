import { Button, Grid, Link, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ImageComponent } from "../../../components/image/ImageComponent";
import { LineItemFeedbackDTO, ProductDTO, SalesOrderLineItemState } from "../../../services/swagger/api";
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import React, { useState } from "react";
import { LovelyRating } from "../../../components/lovelyRating/LovelyRating";
import { LineItemFeedbackModal } from "./LineItemFeedbackModal";
import { calculateAvgLineItemRating } from "../utils/calculateAvgRating";

export interface LineItemFeedbackProps {
    state: SalesOrderLineItemState;
    product: ProductDTO;
    lineItemFeedback: LineItemFeedbackDTO;
    salesOrderId: number;
    lineItemId: number;
}

export function LineItemFeedback(props: LineItemFeedbackProps) {
    const { product, state, lineItemFeedback, lineItemId, salesOrderId } = props;
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClickOpen = () => {
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    const RenderStateIcon = () => {
        if (state === SalesOrderLineItemState.None) {
            return <></>
        }

        if (state === SalesOrderLineItemState.Sold) {
            return <SentimentSatisfiedAltOutlinedIcon color="success" />;
        }
        else {
            return <SentimentDissatisfiedOutlinedIcon color="error" />;
        }
    }

    const RenderProductSKU = () => {
        if (state === SalesOrderLineItemState.None) {
            return <></>
        }

        return (
            <React.Fragment>
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
            </React.Fragment>
        )
    }

    const RenderTotalRating = () => {
        if (state === SalesOrderLineItemState.None) {
            return <></>
        }

        return (
            <React.Fragment>
                <Grid item xs={6}>
                    <LovelyRating
                        readOnly
                        value={calculateAvgLineItemRating(lineItemFeedback)}
                        precision={0.5} />
                </Grid>
                <Grid item xs={6}>
                    <Link sx={{
                        textDecorationLine: 'none',
                        cursor: 'pointer'
                    }} onClick={handleClickOpen}>
                        <Typography variant="body1" color="secondary" align="right">
                            {t("Pages.SalesOrderFeedback.Evaluate")}
                        </Typography>
                    </Link>
                </Grid>
            </React.Fragment>
        )
    }

    return (
        <Grid item container xs={12} spacing={2} sx={{
            border: 1,
            pr: 2,
            pb: 2,
        }}>
            <Grid item xs={12}>
                {product.images && product.images.length > 0 && <ImageComponent src={product.images[0].url ?? ""} asBackground sx={{
                    height: '260px'
                }} />}
            </Grid>
            {RenderTotalRating()}
            {RenderProductSKU()}
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
                {RenderStateIcon()}
            </Grid>
            <Grid item xs={6}>
                <Typography variant="body1" align="right">
                    {product.price}
                </Typography>
            </Grid>
            {state === SalesOrderLineItemState.None &&
                <Grid item xs={12}>
                    <Button variant="outlined"
                        fullWidth
                        onClick={handleClickOpen}>
                        {t("Pages.SalesOrderFeedback.EvaluateButton")}
                    </Button>
                </Grid>
            }
            <LineItemFeedbackModal
                open={isModalOpen}
                product={product}
                salesOrderId={salesOrderId}
                lineItemId={lineItemId}
                lineItemFeedback={lineItemFeedback}
                onClose={handleClose}
            />
        </Grid>
    )
}