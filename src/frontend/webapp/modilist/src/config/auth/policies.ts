/**
 * Enter here the user flows and custom policies for your B2C application
 * To learn more about user flows, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */
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
            authority: "https://modilistauth.b2clogin.com/modilistauth.onmicrosoft.com/b2c_1_reset",
        },
        editProfile: {
            authority: "https://modilistauth.b2clogin.com/modilistauth.onmicrosoft.com/b2c_1_edit_profile"
        }
    },
    authorityDomain: "modilistauth.b2clogin.com"
}