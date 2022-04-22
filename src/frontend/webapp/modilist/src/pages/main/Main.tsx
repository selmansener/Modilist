import { AuthError, InteractionRequiredAuthError } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { config } from "../../config";
import { Dispatch, RootState } from "../../store/store";

export function Main() {
    const { instance, accounts } = useMsal();
    const dispatch = useDispatch<Dispatch>();
    let createProductResponse = useSelector((state: RootState) => state.createProduct);

    // console.log(createProductResponse);

    return (
        <>
            <Typography variant="h1">Main</Typography>
            <Button onClick={() => {
                dispatch.createProduct.createProduct({
                    sku: "qqweqweq",
                    name: "feegeg"
                });
            }}>
                <Typography>Test</Typography>
            </Button>
            <Typography>
                SKU: {createProductResponse.sku}
            </Typography>

            <Typography>
                Name: {createProductResponse.name}
            </Typography>
        </>
    )
}