import './App.css';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import Dashboard from './layouts/dashboard/DashboardLayout';
import Unauthenticated from './layouts/unauthenticated/UnauthenticatedLayout';
import Welcome from './layouts/welcome/WelcomeLayout';
import { Backdrop, CircularProgress, createTheme, ThemeProvider } from '@mui/material';
import i18n from "i18next";
import { getDefaults, initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const mdTheme = createTheme({
  palette: {
    primary: {
      main: '#F2EEE2',
      contrastText: '#00222C'
    },
    secondary: {
      main: '#E1E4F2',
      contrastText: '#000608'
    },
    error: {
      main: '#C92443',
    },
    warning: {
      main: '#6E662F',
    },
    info: {
      main: '#516971'
    },
    success: {
      main: '#37704F'
    },
    background: {
      default: '#FFFFFF',
      paper: '#F2EEE2'
    },
    text: {
      primary: '#00222C',
      secondary: '#000608'
    }
  }
});


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
  const { instance } = useMsal();

  const account = instance.getActiveAccount();
  let newUser = false;
  if (account) {
    newUser = (account.idTokenClaims as any)["newUser"];
  }

  return (
    <div className="App">
      <ThemeProvider theme={mdTheme} >
        <AuthenticatedTemplate>
          {(newUser === false ?
            <Backdrop open={true}
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
              <CircularProgress color="inherit" />
            </Backdrop> : newUser === undefined ? <Dashboard /> : <Welcome />
          )}
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <Unauthenticated />
        </UnauthenticatedTemplate>
      </ThemeProvider>
    </div>
  );
}

export default App;
