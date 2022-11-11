import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { DashboardHeader, MenuItem } from './DashboardHeader';
import { DashboardMain } from './DashboardMain';
import { DashboardFooter } from './DashboardFooter';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '../../store/store';
import { AccountState } from '../../services/swagger/api';
import { Outlet, ScrollRestoration, useLocation, useNavigate } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import useWindowDimensions from '../../utils/windowDimensions';
import { CircularProgress } from '@mui/material';
import { config } from '../../config';
import { ImageComponent } from '../../components/image/ImageComponent';
import { RouteConfig } from '../../router/routes';
import React from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

import CheckroomIcon from '@mui/icons-material/Checkroom';
import StraightenIcon from '@mui/icons-material/Straighten';
import GradientIcon from '@mui/icons-material/Gradient';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';

function Loading() {
  const { height, width } = useWindowDimensions();
  const { cdnImg } = config;

  return <Box sx={{
    display: 'flex',
    width: width,
    height: height,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <ImageComponent src={`${cdnImg}/logo/Modilist-logo.png`} width="25%" sx={{
      textAlign: 'center',
      mb: 4
    }} />
    <CircularProgress />
  </Box>
}

export default function Dashboard() {
  const { instance: msal } = useMsal();
  const navigate = useNavigate();
  const location = useLocation();
  const { isBusy: getAccountIsBusy, data: currentAccount, status: getAccountStatus } = useSelector((state: RootState) => state.getAccountModel);
  const { isBusy: createAccountIsBusy, data: createAccountResponse, status: createAccountStatus } = useSelector((state: RootState) => state.createAccountModel);
  const dispatch = useDispatch<Dispatch>();
  const menuItems = dashboardRoutes.leafNodes?.filter(x => x.menuItem).map(x => {
    return {
      name: x.menuItem?.name,
      icon: x.menuItem?.icon,
      route: `/${x.path}`
    } as MenuItem
  });

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

      navigate("/style-form/gender-selection", { replace: true });
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

    if (!currentAccount?.isVerified) {
      navigate("/verification/account-created", { replace: true });
      return;
    }

    if (currentAccount?.state === AccountState.Created) {
      navigate("/style-form/gender-selection", { replace: true });
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
          <ScrollRestoration />
        </Box>
    )
  );
}

const MainPage = React.lazy(() => import("../../pages/main/Main"));
const AboutPage = React.lazy(() => import("../../pages/about/About"));
const PartnershipPage = React.lazy(() => import("../../pages/partnership/Partnership"));
const CareersPage = React.lazy(() => import("../../pages/careers/Careers"));
const ContactPage = React.lazy(() => import("../../pages/contact/Contact"));
const SalesOrdersPage = React.lazy(() => import("../../pages/salesOrders/SalesOrders"));
const SalesOrderDetailsPage = React.lazy(() => import("../../pages/salesOrders/SalesOrderDetails"));
const CheckoutPage = React.lazy(() => import("../../pages/checkout/Checkout"));
const CheckoutCompletedPage = React.lazy(() => import("../../pages/checkout/CheckoutCompleted"));
const CheckoutFailedPage = React.lazy(() => import("../../pages/checkout/CheckoutCompleted"));

const SizeInfoPage = React.lazy(() => import("../../pages/sizeInfo/SizeInfo"));
const StylePreferencesPage = React.lazy(() => import("../../pages/stylePreferences/StylePreferences"));
const FitPreferencesPage = React.lazy(() => import("../../pages/fitPreferences/FitPreferences"));
const FabricPropertiesPage = React.lazy(() => import("../../pages/fabricProperties/FabricProperties"));
const AccountSettingsPage = React.lazy(() => import("../../pages/settings/settingsPages/Account"));
const SubscriptionSettingsPage = React.lazy(() => import("../../pages/settings/settingsPages/Subscription"));
const PaymentMethodsPage = React.lazy(() => import("../../pages/settings/settingsPages/paymentMethods/PaymentMethods"));
const NewPaymentMethodPage = React.lazy(() => import("../../pages/settings/settingsPages/paymentMethods/NewPaymentMethod"));
const AddressesPage = React.lazy(() => import("../../pages/settings/settingsPages/adresses/Addresses"));
const UpsertAddressPage = React.lazy(() => import("../../pages/settings/settingsPages/adresses/UpsertAddress"));
const SettingsPage = React.lazy(() => import("../../pages/settings/Settings"));

export const dashboardRoutes: RouteConfig = {
  path: "/",
  element: <Dashboard />,
  isPublic: false,
  leafNodes: [
    {
      path: "",
      element: <MainPage />,
      menuItem: {
        name: "Pages.Titles.Main",
        icon: <HomeOutlinedIcon sx={{
          verticalAlign: "sub"
        }} />
      }
    },
    {
      path: "about",
      element: <AboutPage />,
    },
    {
      path: "partnership",
      element: <PartnershipPage />
    },
    {
      path: "careers",
      element: <CareersPage />
    },
    {
      path: "contact",
      element: <ContactPage />
    },
    {
      path: "sales-orders",
      element: <SalesOrdersPage />,
      menuItem: {
        icon: <ShoppingBasketOutlinedIcon sx={{
          verticalAlign: "sub"
        }} />,
        name: "Pages.Titles.SalesOrders"
      }
    },
    {
      path: "sales-orders/:salesOrderId",
      element: <SalesOrderDetailsPage />,
    },
    {
      path: "sales-orders/:salesOrderId/checkout",
      element: <CheckoutPage />
    },
    {
      path: "sales-orders/:salesOrderId/checkout-completed",
      element: <CheckoutCompletedPage />
    },
    {
      path: "sales-orders/:salesOrderId/checkout-failed",
      element: <CheckoutFailedPage />
    },
    {
      path: "size-info",
      element: <SizeInfoPage />
    },
    {
      path: "style-preferences",
      element: <StylePreferencesPage />
    },
    {
      path: "fit-preferences",
      element: <FitPreferencesPage />
    },
    {
      path: "fabric-properties",
      element: <FabricPropertiesPage />
    },
    {
      path: "settings",
      element: <SettingsPage />,
      leafNodes: [
        {
          path: "account",
          element: <AccountSettingsPage />,
        },
        {
          path: "subscription",
          element: <SubscriptionSettingsPage />
        },
        {
          path: "payment-methods",
          element: <PaymentMethodsPage />,
        },
        {
          path: "payment-methods/new",
          element: <NewPaymentMethodPage />
        },
        {
          path: "addresses",
          element: <AddressesPage />,
        },
        {
          path: "addresses/new",
          element: <UpsertAddressPage />
        },
        {
          path: "addresses/:addressId",
          element: <UpsertAddressPage />
        }

      ]
    },
  ]
}