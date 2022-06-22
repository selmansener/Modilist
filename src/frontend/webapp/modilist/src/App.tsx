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
    primary: {
      main: '#403E56',
    },
    secondary: {
      main: '#F57691',
    },
    error: {
      main: '#EE7266',
    },
    warning: {
      main: '#EF9C4F',
    },
    info: {
      main: '#98D1D0',
    },
    success: {
      main: '#A5F0CE',
    },
    text: {
      primary: '#403e56',
      secondary: 'rgba(64,62,86,0.7)',
      disabled: 'rgba(64,62,86,0.38)',
    }
  },
  typography: {
    fontFamily: 'poppins',
    h1: {
      fontSize: 64,
      fontFamily: 'poppins',
      fontWeight: 800,
    },
    h2: {
      fontSize: 40,
      fontFamily: 'poppins',
      fontWeight: 800,
    },
    h3: {
      fontSize: 32,
      fontFamily: 'poppins',
      fontWeight: 800,
    },
    h4: {
      fontSize: 24,
      fontFamily: 'poppins',
      fontWeight: 800,
    },
    h5: {
      fontSize: 20,
      fontFamily: 'poppins',
      fontWeight: 800,
    },
    h6: {
      fontSize: 14,
      fontFamily: 'poppins',
      fontWeight: 800,
    },
    subtitle1: {
      fontFamily: 'poppins',
      fontSize: 20,
    },
    subtitle2: {
      fontFamily: 'poppins',
      fontSize: 14,
    },
    body1: {
      fontFamily: 'poppins',
      fontSize: 16,
    },
    body2: {
      fontFamily: 'poppins',
      fontSize: 14,
      fontWeight: 300,
      lineHeight: 1.27,
    },
    fontWeightLight: 300,
    htmlFontSize: 16,
    fontWeightBold: 800,
    button: {
      fontSize: 20,
      fontWeight: 600,
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
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <Router environment={config.environment} isPublic />
        </UnauthenticatedTemplate>
      </ThemeProvider>
    </div>
  );
}

export default App;
