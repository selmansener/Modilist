import './App.css';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import Dashboard from './layouts/dashboard/DashboardLayout';
import Unauthenticated from './layouts/unauthenticated/UnauthenticatedLayout';
import { AccountInfo } from '@azure/msal-browser';
import Welcome from './layouts/welcome/WelcomeLayout';

function App() {
  const { accounts } = useMsal();
  const account = accounts[0] as AccountInfo;
  // TODO: change with user idToken.newUser
  const newUser = false;
  
  return (
    <div className="App">
      <AuthenticatedTemplate>
        {
          newUser ? <Welcome /> : <Dashboard />
        }
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <Unauthenticated />
      </UnauthenticatedTemplate>

    </div>
  );
}

export default App;
