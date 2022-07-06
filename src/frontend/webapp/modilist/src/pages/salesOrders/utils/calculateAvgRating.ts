import { LineItemFeedbackDTO, SalesOrderDetailsDTO, SalesOrderDTO } from "../../../services/swagger/api";

export function calculateAvgLineItemRating(lineItemFeedback: LineItemFeedbackDTO) {
    let total = 0;
    let count = 0;
    // TODO: This is not safe since line item properties may change and more number field may added to calculation. A better method is casting to a strict interface to ensure getting right fields.
    var keys = Object.keys(lineItemFeedback);
    keys.forEach(key => {
        var element = lineItemFeedback[key as keyof typeof lineItemFeedback];
        if (key !== "id" && key !== "price" && element && typeof element === "number") {
            total += element;
            count++;
        }
    });

    return Math.round(total / count * 2) / 2;
}

export function calculateAvgSalesOrderRating(salesOrder: SalesOrderDetailsDTO) {
    let total = 0;
    let count = 0;
    if (salesOrder !== undefined && salesOrder?.lineItems !== undefined) {
        salesOrder.lineItems.forEach(lineItem => {
            if (lineItem.feedback !== undefined) {
                let lineItemTotal = calculateAvgLineItemRating(lineItem.feedback);
                total += lineItemTotal;
                count++;
            }
        });
    }
    console.log(total);
    return Math.round(total / count * 2) / 2;
}