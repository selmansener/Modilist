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
import { useEffect, useState } from 'react';
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


function App() {
  const { instance: msal } = useMsal();
  const { isProduction } = config;
  const { isBusy: getAccountIsBusy, data: currentAccount, status: getAccountStatus } = useSelector((state: RootState) => state.getAccountModel);
  const { isBusy: createAccountIsBusy, data: createAccount, status: createAccountStatus } = useSelector((state: RootState) => state.createAccountModel);
  const dispatch = useDispatch<Dispatch>();
  const [isBusy]  = useState<boolean>(getAccountIsBusy || createAccountIsBusy);

  useEffect(() => {
    document.title = "Modilist";
  }, []);

  useEffect(() => {
    if (currentAccount === undefined && !isBusy) {
      dispatch.getAccountModel.getAccount();
    }
  }, [currentAccount]);

  useEffect(() => {
    if (createAccountStatus === 200 && createAccount) {
      dispatch.getAccountModel.HANDLE_RESPONSE(createAccount, createAccountStatus);
    }
  }, [createAccountStatus])

  useEffect(() => {
    if (getAccountStatus === 404) {
      const activeAccount = msal.getActiveAccount();
      
      if (activeAccount && activeAccount.idTokenClaims) {
        dispatch.createAccountModel.createAccount({
          id: (activeAccount.idTokenClaims as any)["oid"],
          email: (activeAccount.idTokenClaims as any)["emails"][0]
        });
      }
    }
  }, [getAccountStatus]);

  const RenderLayout = () => {
    if (isBusy || !currentAccount) {
      return <LoadingLayout />
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
