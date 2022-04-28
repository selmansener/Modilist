import './App.css';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import Dashboard from './layouts/dashboard/DashboardLayout';
import Unauthenticated from './layouts/unauthenticated/UnauthenticatedLayout';
import Welcome from './layouts/welcome/WelcomeLayout';
import { Backdrop, CircularProgress, createTheme, ThemeProvider } from '@mui/material';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

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
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      // TODO: take this from a file
      en: {
        translation: {
          "Welcome to React": "Kişisel Bilgiler"
        }
      }
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

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
