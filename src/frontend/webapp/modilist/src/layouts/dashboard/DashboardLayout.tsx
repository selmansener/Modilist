import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
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
      default: '#ffeddf',
      paper: '#294260'
    },
    text: {
      primary: '#ffeddf',
      secondary: '#ffeddf'
    }
  }
});


function DashboardContent() {

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <DashboardHeader />
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 'auto' }}>
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