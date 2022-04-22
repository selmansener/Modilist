import { LogLevel } from "@azure/msal-browser";

export const apiConfig = {
    b2cScopes: ["https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/Test.Read"],
    webApi: "http://localhost:5088"
};

export const b2cPolicies = {
    names: {
        signUpSignIn: "b2c_1_susi",
        forgotPassword: "b2c_1_reset",
        editProfile: "b2c_1_edit_profile"
    },
    authorities: {
        signUpSignIn: {
            authority: "https://modilistauth.b2clogin.com/modilistauth.onmicrosoft.com/B2C_1_signIn_signUp",
        },
        forgotPassword: {
            authority: "https://modilistauth.b2clogin.com/modilistauth.onmicrosoft.com/B2C_1_reset",
        },
        editProfile: {
            authority: "https://modilistauth.b2clogin.com/modilistauth.onmicrosoft.com/B2C_1_edit_profile"
        }
    },
    authorityDomain: "modilistauth.b2clogin.com"
}

/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */
export const msalConfig = {
    auth: {
        clientId: "70773d38-9a72-4f72-af81-17eb6737353c", // This is the ONLY mandatory field; everything else is optional.
        authority: b2cPolicies.authorities.signUpSignIn.authority, // Choose sign-up/sign-in user-flow as your default.
        knownAuthorities: [b2cPolicies.authorityDomain], // You must identify your tenant's domain as a known authority.
        redirectUri: "https://localhost:3000", // You must register this URI on Azure Portal/App Registration. Defaults to "window.location.href".
        postLogoutRedirectUri: "https://localhost:3000",
        navigateToLoginRequestUrl: true
    },
    cache: {
        cacheLocation: "localStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level: any, message: any, containsPii: any) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            }
        }
    }
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    scopes: [...apiConfig.b2cScopes, "openid", "offline_access" ]
};

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const graphConfig = {
    graphMeEndpoint: "Enter_the_Graph_Endpoint_Herev1.0/me"
};
