import * as React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentIcon from '@mui/icons-material/Payment';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import HomeIcon from '@mui/icons-material/Home';
import { Addresses } from '../pages/adresses/Addresses';
import { Main } from '../pages/main/Main';
import { PaymentMethods } from '../pages/paymentMethods/PaymentMethods';
import { SizeInfo } from '../pages/sizeInfo/SizeInfo';
import { StylePreferences } from '../pages/stylePreferences/StylePreferences';
import { Environment } from '../config';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './dashboard/DashboardLayout';
import WelcomeLayout from './welcome/WelcomeLayout';
import NotFound from './notFound/NotFound';
import Unauthenticated from './unauthenticated/UnauthenticatedLayout';
import { GenderSelection } from '../pages/welcome/GenderSelection';
import { WelcomeSteps } from '../pages/welcome/WelcomeSteps';
import { SalesOrders } from '../pages/salesOrders/SalesOrders';
import { FitPreferences } from '../pages/fitPreferences/FitPreferences';
import { FabricProperties } from '../pages/fabricProperties/FabricProperties';
import { SalesOrderDetails } from '../pages/salesOrders/SalesOrderDetails';
import { Checkout } from '../pages/checkout/Checkout';
import { AccountSettings } from '../pages/accountSettings/AccountSettings';
import { CheckoutCompleted } from '../pages/checkout/CheckoutCompleted';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@mui/material';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import StraightenIcon from '@mui/icons-material/Straighten';
import GradientIcon from '@mui/icons-material/Gradient';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import { CheckoutFailed } from '../pages/checkout/CheckoutFailed';
import { NewPaymentMethod } from '../pages/paymentMethods/NewPaymentMethod';
import AddCardIcon from '@mui/icons-material/AddCard';
import { UpsertAddress } from '../pages/adresses/UpsertAddress';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import { VerificationLayout } from './verification/Verification';
import { AccountVerified } from '../pages/verification/AccountVerified';
import { AccountVerificationFailed } from '../pages/verification/AccountVerificationFailed';
import { AccountCreated } from '../pages/verification/AccountCreated';
import { Account } from '../pages/account/Account';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { About } from '../pages/about/About';
import { ComingSoon } from './comingSoon/ComingSoon';
import SettingsIcon from '@mui/icons-material/Settings';
import { Partnership } from '../pages/partnership/Partnership';
import { Careers } from '../pages/careers/Careers';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import { Contact } from '../pages/contact/Contact';

interface RouterOptions {
  title?: string,
  icon?: React.ReactNode,
  helmet: string,
  route: string,
  menuItem?: {
    icon: React.ReactNode;
    name: string;
  };
  component: React.ReactNode;
  layout: {
    path: string;
    component: React.ReactNode;
  };
  roles?: string[];
  isPublic: boolean;
  disabledEnvironments: Environment[];
}

const routes: RouterOptions[] = [
  {
    helmet: "Login",
    route: "",
    component: <></>,
    layout: {
      path: "/",
      component: <Unauthenticated />
    },
    isPublic: true,
    disabledEnvironments: []
  },
  {
    helmet: "Pages.Titles.About",
    route: "about",
    component: <About />,
    layout: {
      path: "/",
      component: <Dashboard />
    },
    isPublic: false,
    disabledEnvironments: []
  },
  {
    helmet: "Pages.Titles.Partnership",
    route: "partnership",
    component: <Partnership />,
    layout: {
      path: "/",
      component: <Dashboard />
    },
    isPublic: false,
    disabledEnvironments: []
  },
  {
    helmet: "Pages.Titles.Careers",
    route: "careers",
    component: <Careers />,
    layout: {
      path: "/",
      component: <Dashboard />
    },
    isPublic: false,
    disabledEnvironments: []
  },
  {
    helmet: "Pages.Titles.Contact",
    route: "contact",
    component: <Contact />,
    layout: {
      path: "/",
      component: <Dashboard />
    },
    isPublic: false,
    disabledEnvironments: ["production"]
  },
  {
    helmet: "Pages.Titles.Main",
    route: "",
    menuItem: {
      icon: <HomeOutlinedIcon sx={{
        verticalAlign: "sub"
      }} />,
      name: "Pages.Titles.Main"
    },
    component: <Main />,
    layout: {
      path: "/",
      component: <Dashboard />
    },
    isPublic: false,
    disabledEnvironments: []
  },
  {
    title: "Pages.Titles.SalesOrders",
    helmet: "Pages.Titles.SalesOrders",
    route: "sales-orders",
    menuItem: {
      icon: <ShoppingBasketOutlinedIcon sx={{
        verticalAlign: "sub"
      }} />,
      name: "Pages.Titles.SalesOrders"
    },
    component: <SalesOrders />,
    layout: {
      path: "/",
      component: <Dashboard />
    },
    isPublic: false,
    disabledEnvironments: []
  },
  {
    title: "Pages.Titles.SalesOrders",
    icon: <ShoppingBasketIcon sx={{
      verticalAlign: "sub"
    }} />,
    helmet: "Pages.Titles.SalesOrders",
    route: "sales-orders/:salesOrderId",
    component: <SalesOrderDetails />,
    layout: {
      path: "/",
      component: <Dashboard />
    },
    isPublic: false,
    disabledEnvironments: []
  },
  {
    title: "Pages.Titles.SalesOrders",
    icon: <ShoppingBasketIcon sx={{
      verticalAlign: "sub"
    }} />,
    helmet: "Pages.Titles.SalesOrders",
    route: "sales-orders/:salesOrderId/checkout",
    component: <Checkout />,
    layout: {
      path: "/",
      component: <Dashboard />
    },
    isPublic: false,
    disabledEnvironments: []
  },
  {
    title: "Pages.Titles.SalesOrders",
    helmet: "Pages.Titles.SalesOrders",
    route: "sales-orders/:salesOrderId/checkout-completed",
    component: <CheckoutCompleted />,
    layout: {
      path: "/",
      component: <Dashboard />
    },
    isPublic: false,
    disabledEnvironments: []
  },
  {
    title: "Pages.Titles.SalesOrders",
    helmet: "Pages.Titles.SalesOrders",
    route: "sales-orders/:salesOrderId/checkout-failed",
    component: <CheckoutFailed />,
    layout: {
      path: "/",
      component: <Dashboard />
    },
    isPublic: false,
    disabledEnvironments: []
  },
  {
    title: "Pages.Titles.SizeInfo",
    helmet: "Pages.Titles.SizeInfo",
    route: "size-info",
    menuItem: {
      icon: <AccessibilityNewIcon sx={{
        verticalAlign: "sub"
      }} />,
      name: "Pages.Titles.SizeInfo"
    },
    layout: {
      path: "/",
      component: <Dashboard />
    },
    component: <SizeInfo />,
    isPublic: false,
    disabledEnvironments: []
  },
  {
    title: "Pages.Titles.StylePreferences",
    helmet: "Pages.Titles.StylePreferences",
    route: "style-preferences",
    menuItem: {
      icon: <CheckroomIcon sx={{
        verticalAlign: "sub"
      }} />,
      name: "Pages.Titles.StylePreferences"
    },
    layout: {
      path: "/",
      component: <Dashboard />
    },
    component: <StylePreferences />,
    isPublic: false,
    disabledEnvironments: []
  },
  {
    title: "Pages.Titles.FitPreferences",
    helmet: "Pages.Titles.FitPreferences",
    route: "fit-preferences",
    menuItem: {
      icon: <StraightenIcon sx={{
        verticalAlign: "sub"
      }} />,
      name: "Pages.Titles.FitPreferences"
    },
    layout: {
      path: "/",
      component: <Dashboard />
    },
    component: <FitPreferences />,
    isPublic: false,
    disabledEnvironments: []
  },
  {
    title: "Pages.Titles.FabricProperties",
    helmet: "Pages.Titles.FabricProperties",
    route: "fabric-properties",
    menuItem: {
      icon: <GradientIcon sx={{
        verticalAlign: "sub"
      }} />,
      name: "Pages.Titles.FabricProperties"
    },
    layout: {
      path: "/",
      component: <Dashboard />
    },
    component: <FabricProperties />,
    isPublic: false,
    disabledEnvironments: []
  },
  {
    title: "Pages.Titles.Account",
    helmet: "Pages.Titles.Account",
    route: "account",
    icon: <ManageAccountsIcon sx={{
      verticalAlign: "sub"
    }} />,
    layout: {
      path: "/",
      component: <Dashboard />
    },
    component: <Account />,
    isPublic: false,
    disabledEnvironments: []
  },
  {
    title: "Pages.Titles.Settings",
    helmet: "Pages.Titles.Settings",
    route: "settings",
    icon: <SettingsIcon sx={{
      verticalAlign: "sub"
    }} />,
    layout: {
      path: "/",
      component: <Dashboard />
    },
    component: <AccountSettings />,
    isPublic: false,
    disabledEnvironments: []
  },
  {
    title: "Pages.Titles.PaymentMethods",
    helmet: "Pages.Titles.PaymentMethods",
    route: "payment-methods",
    menuItem: {
      icon: <PaymentIcon sx={{
        verticalAlign: "sub"
      }} />,
      name: "Pages.Titles.PaymentMethods"
    },
    layout: {
      path: "/",
      component: <Dashboard />
    },
    component: <PaymentMethods />,
    isPublic: false,
    disabledEnvironments: []
  },
  {
    title: "Pages.Titles.NewPaymentMethod",
    helmet: "Pages.Titles.NewPaymentMethod",
    icon: <AddCardIcon sx={{
      verticalAlign: "sub"
    }} />,
    route: "add-payment-method",
    layout: {
      path: "/",
      component: <Dashboard />
    },
    component: <NewPaymentMethod />,
    isPublic: false,
    disabledEnvironments: []
  },
  {
    title: "Pages.Titles.Addresses",
    helmet: "Pages.Titles.Addresses",
    route: "addresses",
    menuItem: {
      icon: <LocationOnIcon sx={{
        verticalAlign: "sub"
      }} />,
      name: "Pages.Titles.Addresses"
    },
    layout: {
      path: "/",
      component: <Dashboard />
    },
    component: <Addresses />,
    isPublic: false,
    disabledEnvironments: []
  },
  {
    title: "Pages.Titles.NewAddress",
    helmet: "Pages.Titles.NewAddress",
    icon: <AddLocationAltOutlinedIcon sx={{
      verticalAlign: "sub"
    }} />,
    route: "add-address",
    layout: {
      path: "/",
      component: <Dashboard />
    },
    component: <UpsertAddress />,
    isPublic: false,
    disabledEnvironments: []
  },
  {
    title: "Pages.Titles.UpdateAddress",
    helmet: "Pages.Titles.UpdateAddress",
    icon: <EditLocationAltIcon sx={{
      verticalAlign: "sub"
    }} />,
    route: "update-address/:addressId",
    layout: {
      path: "/",
      component: <Dashboard />
    },
    component: <UpsertAddress />,
    isPublic: false,
    disabledEnvironments: []
  },
  {
    helmet: "Pages.Titles.Welcome",
    route: "gender",
    layout: {
      path: "/welcome",
      component: <WelcomeLayout title="Pages.Titles.Welcome" />
    },
    component: <GenderSelection />,
    isPublic: false,
    disabledEnvironments: []
  },
  {
    helmet: "Pages.Titles.Welcome",
    route: "",
    layout: {
      path: "/welcome",
      component: <WelcomeLayout title="Pages.Titles.Welcome" />
    },
    component: <WelcomeSteps />,
    isPublic: false,
    disabledEnvironments: []
  },
  {
    helmet: "Pages.Titles.AccountVerification",
    route: "account-created",
    layout: {
      path: "/verification",
      component: <VerificationLayout />
    },
    component: <AccountCreated />,
    isPublic: false,
    disabledEnvironments: []
  },
  {
    helmet: "Pages.Titles.AccountVerification",
    route: "account-verified",
    layout: {
      path: "/verification",
      component: <VerificationLayout />
    },
    component: <AccountVerified />,
    isPublic: false,
    disabledEnvironments: []
  },
  {
    helmet: "Pages.Titles.AccountVerification",
    route: "account-verification-failed",
    layout: {
      path: "/verification",
      component: <VerificationLayout />
    },
    component: <AccountVerificationFailed />,
    isPublic: false,
    disabledEnvironments: []
  },
  {
    helmet: "Pages.Titles.Main",
    route: "coming-soon",
    layout: {
      path: "/",
      component: <ComingSoon />
    },
    component: <></>,
    isPublic: false,
    disabledEnvironments: ["production", "development", "int", "staging"]
  },
]

export const menuItems = routes.filter(x => x.menuItem !== undefined).map(x => {
  if (x.menuItem) {
    return {
      ...x.menuItem,
      route: x.route
    }
  }
  else {
    throw new Error("missing menuItem")
  }
});

export interface RouterProps {
  environment: Environment;
  isPublic: boolean;
  role?: string;
}

export function Router(props: RouterProps) {
  const { t } = useTranslation();
  const { environment, isPublic, role } = props;

  const filteredRoutes = routes.filter(route =>
    route.disabledEnvironments.every(env => env !== environment)
    && route.isPublic === isPublic
    && (route.roles === undefined || route.roles?.length === 0 || (route.roles && route.roles.some(r => r === role)))
  );

  const groupedRoutes = filteredRoutes.reduce((a: any, b: any) => {
    ((a[b["layout"]["path"]] as any) = a[b["layout"]["path"]] || []).push(b);
    return a;
  }, {});

  const RenderRoutes = () => {
    return Object.keys(groupedRoutes).map((key: string) => {
      var group: RouterOptions[] = groupedRoutes[key as keyof typeof groupedRoutes];
      return <Route key={key} path={key} element={group[0].layout.component as React.ReactNode}>
        {group.map(route => {
          return <Route key={route.route} path={route.route} element={
            <React.Fragment>
              <Helmet>
                {t(route.helmet)}
              </Helmet>
              {route.title && route.title !== "" && <Grid item xs={12}>
                {route.menuItem?.icon ?? route?.icon}
                <Typography variant="h4" component="span">
                  &nbsp;{t(route.title)}
                </Typography>
              </Grid>}
              <Grid item container xs={12} spacing={2}>
                {route.component}
              </Grid>
            </React.Fragment>
          } />
        })}
      </Route>
    })
  }

  return (
    <Routes>
      {RenderRoutes()}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}