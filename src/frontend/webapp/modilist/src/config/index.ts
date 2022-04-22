const env = process.env.NODE_ENV === undefined ? "development" : process.env.NODE_ENV;

const envConfig = require(`./config.${env}`).config;
const msalConfig = require(`./auth/msalConfig.${env}`).msalConfig;
const webApiConfig = require(`./auth/msalConfig.${env}`).apiConfig;
const loginRequest = require(`./auth/msalConfig.${env}`).loginRequest;

export const config = {
    isDev: env === "development",
    isProduction: env === "production",
    ...envConfig,
    ...webApiConfig,
    loginRequest,
    msalConfig,
};