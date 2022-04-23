import './App.css';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import Dashboard from './layouts/dashboard/DashboardLayout';
import Unauthenticated from './layouts/unauthenticated/UnauthenticatedLayout';
import { AccountInfo } from '@azure/msal-browser';
import Welcome from './layouts/welcome/WelcomeLayout';
import { Backdrop, CircularProgress } from '@mui/material';

function App() {
  const { instance, accounts } = useMsal();

  const account = instance.getActiveAccount();
  let newUser = false;
  if (account) {
    newUser = (account.idTokenClaims as any)["newUser"];
  }

  console.log(account);
  console.log(newUser);

  return (
    <div className="App">
      <AuthenticatedTemplate>
        {(newUser === false ?
          <Backdrop open={true}
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <CircularProgress color="inherit" />
          </Backdrop> : newUser === undefined ?  <Dashboard /> : <Welcome />
        )}
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <Unauthenticated />
      </UnauthenticatedTemplate>
    </div>
  );
}

export default App;
