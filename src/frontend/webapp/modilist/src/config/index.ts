const env = process.env.REACT_APP_ENV ?? process.env.NODE_ENV ?? "development";

console.log(env);

const envConfig = require(`./config.${env}`).config;
const msalConfig = require(`./auth/msalConfig.${env}`).msalConfig;
const webApiConfig = require(`./auth/msalConfig.${env}`).apiConfig;
const loginRequest = require(`./auth/msalConfig.${env}`).loginRequest;

export const config = {
    isDev: env === "development",
    isInt: env === "int",
    isStaging: env === "staging",
    isProduction: env === "production",
    ...envConfig,
    ...webApiConfig,
    loginRequest,
    msalConfig,
    imgBaseHost: "https://stmodilistsharedwesteu.blob.core.windows.net/img"
};