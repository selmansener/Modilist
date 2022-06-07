import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { DashboardHeader, MenuItem } from './DashboardHeader';
import { DashboardMain } from './DashboardMain';
import { DashboardFooter } from './DashboardFooter';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '../../store/store';
import { AccountStatus } from '../../services/swagger/api';
import { useNavigate } from 'react-router-dom';
import Loading from '../callback/Loading';

interface DashboardProps {
  menuItems: MenuItem[]
}

export default function Dashboard(props: React.PropsWithChildren<DashboardProps>) {
  const navigate = useNavigate();
  const { isBusy: getAccountIsBusy, data: currentAccount, status: getAccountStatus } = useSelector((state: RootState) => state.getAccountModel);
  const dispatch = useDispatch<Dispatch>();
  const { menuItems } = props;

  useEffect(() => {
    if (currentAccount === undefined && !getAccountIsBusy) {
      dispatch.getAccountModel.getAccount();
    }
  }, []);


  useEffect(() => {
    if (currentAccount && !getAccountIsBusy && currentAccount.state === AccountStatus.Created) {
      navigate("/callback", { replace: true });
    }
  }, [currentAccount]);

  return (
    (
      getAccountIsBusy || currentAccount?.state === AccountStatus.Created ? <Loading /> :
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <DashboardHeader menuItems={menuItems} />
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 'auto' }}>
            <DashboardMain >
              {props.children}
            </DashboardMain>
            <DashboardFooter />
          </Box>
        </Box>
    )
  );
}