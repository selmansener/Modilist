import './App.css';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { config } from './config';
import { Router } from './layouts/Router';


const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#D98E04',
      contrastText: 'rgba(255,255,255,0.87)',
    },
    secondary: {
      main: '#73341D',
    },
  },
};

const mdTheme = createTheme(themeOptions);


i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}.json'
    },
    detection: {
      order: ['navigator', 'querystring', 'cookie', 'localStorage', 'sessionStorage', 'htmlTag', 'path', 'subdomain']
    },
    fallbackLng: "tr",
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });


function App() {

  return (
    <div className="App">
      <ThemeProvider theme={mdTheme} >
        <AuthenticatedTemplate>
          <Router environment={config.environment} isPublic={false} />
          {/* {isProduction ? <ComingSoonLayout /> : <RenderLayout />} */}
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <Router environment={config.environment} isPublic />
          {/* <Unauthenticated /> */}
        </UnauthenticatedTemplate>
      </ThemeProvider>
    </div>
  );
}

export default App;
