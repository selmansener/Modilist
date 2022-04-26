import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { DashboardHeader } from './DashboardHeader';
import { DashboardMain } from './DashboardMain';
import { DashboardFooter } from './DashboardFooter';

function DashboardContent() {

  return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <DashboardHeader />
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 'auto' }}>
          <DashboardMain />
          <DashboardFooter />
        </Box>
      </Box>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}