import { Box, Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../store/store";
import { SalesOrderListItem } from "./components/SalesOrderListItem";
import { Pagination, QueryBuilder, SortDirection, SortField, StringFilter, StringFilterOperation } from "dynamic-query-builder-client";

enum SalesOrderStateMap {
    All = 0,
    Active = 1,
    Completed = 2,
    Returned = 3,
}

export function SalesOrders() {
    const { t } = useTranslation();
    const dispatch = useDispatch<Dispatch>();
    const { isBusy: salesOrdersIsBusy, data: salesOrders } = useSelector((state: RootState) => state.salesOrdersQueryModel);
    const [filters, setFilters] = useState({
        salesOrderState: SalesOrderStateMap.All
    });

    const queryBuilder = new QueryBuilder({
        filters: [],
        pagination: new Pagination({
            offset: 0,
            count: 5,
        }),
        sortBy: [
            new SortField({
                property: "CreatedAt",
                by: SortDirection.DESC,
            }),
        ],
    });

    useEffect(() => {
        const builder = new QueryBuilder({
            filters: [
            ],
            pagination: new Pagination({
                offset: 0,
                count: 5,
            }),
            sortBy: [
                new SortField({
                    property: "CreatedAt",
                    by: SortDirection.DESC,
                }),
            ],
        });

        switch (filters.salesOrderState) {
            case SalesOrderStateMap.Active:
                builder.filters.push(new StringFilter({
                    op: StringFilterOperation.In,
                    property: "State",
                    value: "Created,Prepared,Shipped,Delivered"
                }))
                break;
            case SalesOrderStateMap.Completed:
                builder.filters.push(new StringFilter({
                    op: StringFilterOperation.Equals,
                    property: "State",
                    value: "Completed"
                }))
                break;
            case SalesOrderStateMap.All:
                // TODO: Add Return is not null filter
                break;
            case SalesOrderStateMap.All:
            default:
                break;
        }

        let query = builder.build();

        if (query[0] !== "&") {
            query = "&" + query;
        }

        dispatch.salesOrdersQueryModel.RESET();

        if (!salesOrdersIsBusy) {
            dispatch.salesOrdersQueryModel.salesOrdersQuery(query);
        }
    }, [filters]);

    const handleChange = (e: any) => {
        setFilters({
            salesOrderState: e.target.value
        });
    }

    return (
        <Grid item container xs={12} spacing={2}>
            <Grid item container xs={12} sx={{
                display: 'flex',
                justifyContent: 'flex-end'
            }}>
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel id="sales-order-state-label">{t("Pages.SalesOrders.Filters.SalesOrderStateTitle")}</InputLabel>
                        <Select
                            labelId="sales-order-state-label"
                            id="sales-order-state"
                            value={filters.salesOrderState}
                            label={t("Pages.SalesOrders.Filters.SalesOrderStateTitle")}
                            onChange={handleChange}
                        >
                            <MenuItem value={SalesOrderStateMap.All}>{t("Pages.SalesOrders.Filters.SalesOrderState.All")}</MenuItem>
                            <MenuItem value={SalesOrderStateMap.Active}>{t("Pages.SalesOrders.Filters.SalesOrderState.Active")}</MenuItem>
                            <MenuItem value={SalesOrderStateMap.Completed}>{t("Pages.SalesOrders.Filters.SalesOrderState.Completed")}</MenuItem>
                            <MenuItem value={SalesOrderStateMap.Returned}>{t("Pages.SalesOrders.Filters.SalesOrderState.Returned")}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            {salesOrders?.data.map(salesOrder => {
                return <SalesOrderListItem salesOrder={salesOrder} />
            })}
            <Grid item xs={12} sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {salesOrdersIsBusy && <CircularProgress sx={{
                    mb: 2
                }}/>}
                <Button
                    disabled={salesOrdersIsBusy || (salesOrders?.data.length ?? 0) >= (salesOrders?.count ?? 0)}
                    variant="contained"
                    onClick={() => {
                        queryBuilder.pagination = new Pagination({
                            offset: salesOrders?.data.length,
                            count: 5
                        })

                        const query = queryBuilder.build();

                        dispatch.salesOrdersQueryModel.salesOrdersQuery(query);
                    }}>
                    {t("Pages.SalesOrders.LoadMore")}
                </Button>
            </Grid>
            <Grid item xs={12}>
            </Grid>
        </Grid>
    )
}