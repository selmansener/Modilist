import './App.css';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import Dashboard from './layouts/dashboard/DashboardLayout';
import Unauthenticated from './layouts/unauthenticated/UnauthenticatedLayout';
import Welcome from './layouts/welcome/WelcomeLayout';
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { config } from './config';
import ComingSoonLayout from './layouts/comingSoon/ComingSoonLayout';
import { useEffect } from 'react';
import { AccountStatus } from './services/swagger/api';
import { Dispatch, RootState } from './store/store';
import { useDispatch, useSelector } from 'react-redux';
import LoadingLayout from './layouts/loading/LoadingLayout';


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


function Callback() {
  const { instance: msal } = useMsal();
  const { isBusy, status } = useSelector((state: RootState) => state.account);
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    dispatch.account.getAccount();
  }, []);

  useEffect(() => {
    if (status === 404) {
      const activeAccount = msal.getActiveAccount();

      if (activeAccount && activeAccount.idTokenClaims) {
        dispatch.account.createAccount({
          id: (activeAccount.idTokenClaims as any)["oid"],
          email: (activeAccount.idTokenClaims as any)["emails"][0]
        });
      }
    }
    else {
      console.log(window.location.origin);
      window.location.replace(window.location.origin);
    }
  }, [status])

  if (isBusy) {
    return <LoadingLayout />
  }

  return <></>
}


function App() {
  const { isProduction } = config;
  const { isBusy, data: currentAccount } = useSelector((state: RootState) => state.account);
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    document.title = "Modilist";
  }, []);

  useEffect(() => {
    if (currentAccount === undefined && !isBusy) {
      dispatch.account.getAccount();
    }
  }, [])

  const RenderLayout = () => {
    if (isBusy) {
      return <LoadingLayout />
    }

    if (window.location.pathname === "/callback") {
      return <Callback />
    }

    if (currentAccount?.state === AccountStatus.Created) {
      return <Welcome />
    }

    return <Dashboard />
  }

  return (
    <div className="App">
      <ThemeProvider theme={mdTheme} >
        <AuthenticatedTemplate>
          {isProduction ? <ComingSoonLayout /> : <RenderLayout />}
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <Unauthenticated />
        </UnauthenticatedTemplate>
      </ThemeProvider>
    </div>
  );
}

export default App;
