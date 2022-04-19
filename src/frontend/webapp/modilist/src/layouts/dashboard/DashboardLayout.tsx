import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../../config/auth/msalConfig';
import { DashboardHeader } from './DashboardHeader';
import { DashboardMain } from './DashboardMain';
import { DashboardFooter } from './DashboardFooter';

// TODO: temayı tek bir yerden al
const mdTheme = createTheme({
  palette: {
    primary: {
      main: '#06273a'
    },
    secondary: {
      main: '#ffeddf'
    },
    background: {
      default: '#294260'
    },
    text: {
      primary: '#ffeddf',
      secondary: '#ffeddf'
    }
  }
});

async function callApi(accessToken: string) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers: headers
  };

  return fetch("http://localhost:5088/api/v1/test", options)
    .then(response => response.json())
    .catch(error => console.log(error));
}

function DashboardContent() {
  const { instance, accounts } = useMsal();

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <DashboardHeader />
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 'auto' }}>
          <Button onClick={() => {

            instance.acquireTokenSilent({
              ...loginRequest,
              account: accounts[0]
            })
              .then(response => {
                callApi(response.accessToken)
                  .then(resp => console.log(resp.json()))
                  .catch(er => console.log(er))
              })
              .catch(error => console.log(error));
          }}>
            <Typography>Test</Typography>
          </Button>
          <DashboardMain />
          <DashboardFooter />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}