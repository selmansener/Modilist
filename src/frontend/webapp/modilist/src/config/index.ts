
const env = process.env.REACT_APP_ENV === undefined ? "development" : process.env.REACT_APP_ENV;

console.log(env);

const envConfig = require(`./config.${env}`).config;
const msalConfig = require(`./auth/msalConfig.${env}`).msalConfig;
const webApiConfig = require(`./auth/msalConfig.${env}`).webApi;
const loginRequest = require(`./auth/msalConfig.${env}`).loginRequest;

export const config = {
    isDev: env === "development",
    isInt: env === "int",
    isStaging: env === "staging",
    isProduction: env === "production",
    ...envConfig,
    ...msalConfig,
    ...webApiConfig,
    loginRequest
};