import { RedirectRequest } from "@azure/msal-browser";
import { ApiConfig, MsalConfig } from "./auth/msalConfig.development";
import { EnvConfig } from "./config.development";

const env = process.env.REACT_APP_ENV ?? process.env.NODE_ENV ?? "development";

export type Environment = "production" | "staging" | "int" | "development";

export interface AppConfig extends ApiConfig, EnvConfig {
    environment: Environment;
    isDev: boolean;
    isInt: boolean;
    isStaging: boolean;
    isProduction: boolean;
    iyzicoApiKey: string;
    iyzicoSecretKey: string;
    msalConfig: MsalConfig;
    loginRequest: RedirectRequest;
    imgBaseHost: string;
}

const envConfig = require(`./config.${env}`).config as EnvConfig;
const msalConfig = require(`./auth/msalConfig.${env}`).msalConfig as MsalConfig;
const webApiConfig = require(`./auth/msalConfig.${env}`).apiConfig as ApiConfig;
const loginRequest = require(`./auth/msalConfig.${env}`).loginRequest as RedirectRequest;

export const config: AppConfig = {
    environment: env as Environment,
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