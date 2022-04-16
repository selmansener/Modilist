import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from "@azure/msal-react";
import Dashboard from './layouts/dashboard/DashboardLayout';
import Unauthenticated from './layouts/unauthenticated/UnauthenticatedLayout';

function App() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <div className="App">
      <AuthenticatedTemplate>
        <Dashboard />
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <Unauthenticated />
      </UnauthenticatedTemplate>

    </div>
  );
}

export default App;
