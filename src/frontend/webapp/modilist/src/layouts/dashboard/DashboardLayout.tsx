import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { DashboardHeader, MenuItem } from './DashboardHeader';
import { DashboardMain } from './DashboardMain';
import { DashboardFooter } from './DashboardFooter';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '../../store/store';
import { AccountState } from '../../services/swagger/api';
import { Outlet, useNavigate } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import useWindowDimensions from '../../utils/windowDimensions';
import { CircularProgress } from '@mui/material';
import { menuItems } from '../Router';

function Loading() {
  const { height, width } = useWindowDimensions();

  return <Box sx={{
    display: 'flex',
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <CircularProgress />
  </Box>
}

export default function Dashboard() {
  const { instance: msal } = useMsal();
  const navigate = useNavigate();
  const { isBusy: getAccountIsBusy, data: currentAccount, status: getAccountStatus } = useSelector((state: RootState) => state.getAccountModel);
  const { isBusy: createAccountIsBusy, data: createAccountResponse, status: createAccountStatus } = useSelector((state: RootState) => state.createAccountModel);
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    let activeAccount = msal.getActiveAccount();
    if (activeAccount === undefined || activeAccount === null) {
      const accounts = msal.getAllAccounts();

      if (accounts.length > 0) {
        activeAccount = accounts[0];
        msal.setActiveAccount(activeAccount);
      }
    }

    if (!getAccountIsBusy && currentAccount?.id === "") {
      dispatch.getAccountModel.getAccount();
    }
  }, []);

  useEffect(() => {
    if (createAccountStatus === 200) {
      if (createAccountResponse) {
        dispatch.getAccountModel.HANDLE_RESPONSE(createAccountResponse, createAccountStatus);
        dispatch.createAccountModel.RESET();
      }

      navigate("/welcome/gender", { replace: true });
    }

  }, [createAccountStatus]);

  useEffect(() => {
    if (currentAccount?.id === "") {
      if (getAccountStatus === 404) {
        const activeAccount = msal.getActiveAccount();

        if (activeAccount && activeAccount.idTokenClaims) {
          dispatch.createAccountModel.createAccount({
            id: (activeAccount.idTokenClaims as any)["oid"],
            email: (activeAccount.idTokenClaims as any)["emails"][0]
          });
        }
      }

      return;
    }

    if (currentAccount?.state === AccountState.Created) {
      navigate("/welcome/gender", { replace: true });
    }

  }, [getAccountStatus]);

  return (
    (
      getAccountIsBusy || currentAccount?.state === AccountState.Created ? <Loading /> :
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <DashboardHeader menuItems={menuItems} account={currentAccount} />
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 'auto' }}>
            <DashboardMain>
              <Outlet />
            </DashboardMain>
            <DashboardFooter />
          </Box>
        </Box>
    )
  );
}