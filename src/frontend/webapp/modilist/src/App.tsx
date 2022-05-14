import './App.css';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import Dashboard from './layouts/dashboard/DashboardLayout';
import Unauthenticated from './layouts/unauthenticated/UnauthenticatedLayout';
import Welcome from './layouts/welcome/WelcomeLayout';
import { Backdrop, CircularProgress, createTheme, ThemeOptions, ThemeProvider } from '@mui/material';
import i18n from "i18next";
import { getDefaults, initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';


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
          {/* <Welcome /> */}
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <Unauthenticated />
        </UnauthenticatedTemplate>
      </ThemeProvider>
    </div>
  );
}

export default App;
