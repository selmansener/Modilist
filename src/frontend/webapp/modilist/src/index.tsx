import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { BrowserRouter } from "react-router-dom";
import { config } from './config';
import { Provider } from 'react-redux'
import { apiFactory } from './services/api';
import { store } from './store/store';

const msalInstance = new PublicClientApplication(config.msalConfig);

const allAccounts = msalInstance.getAllAccounts();
if (allAccounts.length > 0) {
  msalInstance.setActiveAccount(allAccounts[0]);
}

export const api = apiFactory(msalInstance);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <MsalProvider instance={msalInstance}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </MsalProvider>
);
root.render(
  <MsalProvider instance={msalInstance}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </MsalProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
