import { AuthError, InteractionRequiredAuthError } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { Button, Typography } from "@mui/material";
import { config } from "../../config";


async function callApi(accessToken: string) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch("http://localhost:5088/api/v1/test", options)
        .then(response => response.json())
        .catch(error => console.log(error));
}

export function Main() {
    const { instance, accounts } = useMsal();

    return (
        <>
            <Typography variant="h1">Main</Typography>
            <Button onClick={() => {

                instance.acquireTokenSilent({
                    ...config.loginRequest,
                    account: accounts[0],
                    forceRefresh: true
                })
                    .then(response => {
                        const testApi = TestApiFactory({
                            basePath: "http://localhost:5088/api/",
                            accessToken: response.accessToken,
                        });

                        api.test.

                        testApi.apiV1TestPost({
                            sku: "test",
                            name: "test2"
                        }).then(resp => {
                            
                            console.log("test2")
                            console.log(resp.json())
                        })
                            .catch(er => {
                                console.log("test2")
                                console.log(er)
                            });

                        // callApi(response.accessToken)
                        //     .then(resp => console.log(resp.json()))
                        //     .catch(er => console.log(er))
                    })
                    .catch(async (error) => {
                        if (error instanceof InteractionRequiredAuthError) {
                            // fallback to interaction when silent call fails
                            return instance.acquireTokenRedirect(config.loginRequest);
                        }
                    }).catch(error => {
                        console.log(error);
                    });
            }}>
                <Typography>Test</Typography>
            </Button>
        </>
    )
}