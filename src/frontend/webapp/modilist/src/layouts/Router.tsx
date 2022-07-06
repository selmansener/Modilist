import * as React from 'react';
import BarChartIcon from '@mui/icons-material/BarChart';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentIcon from '@mui/icons-material/Payment';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import StraightenIcon from '@mui/icons-material/Straighten';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import BoyIcon from '@mui/icons-material/Boy';
import HomeIcon from '@mui/icons-material/Home';
import { Account } from '../pages/account/Account';
import { Addresses } from '../pages/adresses/Addresses';
import { Main } from '../pages/main/Main';
import { PaymentMethods } from '../pages/paymentMethods/PaymentMethods';
import { SizeInfo } from '../pages/sizeInfo/SizeInfo';
import { StylePreferences } from '../pages/stylePreferences/StylePreferences';
import { Environment } from '../config';
import { Route, Routes } from 'react-router-dom';
import Page from '../pages/Page';
import Dashboard from './dashboard/DashboardLayout';
import WelcomeLayout from './welcome/WelcomeLayout';
import Callback from './callback/CallbackLayout';
import ComingSoonLayout from './comingSoon/ComingSoonLayout';
import NotFound from './notFound/NotFound';
import Unauthenticated from './unauthenticated/UnauthenticatedLayout';
import { GenderSelection } from '../pages/welcome/GenderSelection';
import { WelcomeSteps } from '../pages/welcome/WelcomeSteps';
import { SalesOrders } from '../pages/salesOrders/SalesOrders';
import { FitPreferences } from '../pages/fitPreferences/FitPreferences';
import { FabricProperties } from '../pages/fabricProperties/FabricProperties';
import { SalesOrderDetails } from '../pages/salesOrders/SalesOrderDetails';
import { Checkout } from '../pages/checkout/Checkout';

interface RouterOptions {
  title: string,
  route: string,
  menuItem?: {
    icon: React.ReactNode;
    name: string;
  };
  component: React.ReactNode;
  layout: string;
  roles?: string[];
  isPublic: boolean;
  environments: Environment[];
}

const routes: RouterOptions[] = [
  {
    title: "Login",
    route: "/",
    component: <></>,
    layout: "unauthenticated",
    isPublic: true,
    environments: ["production", "development", "int", "staging"]
  },
  {
    title: "Coming Soon",
    route: "/",
    component: <></>,
    layout: "comingsoon",
    isPublic: false,
    environments: ["production"]
  },
  {
    title: "Loading",
    route: "/callback",
    component: <></>,
    layout: "callback",
    isPublic: false,
    environments: ["production", "development", "int", "staging"]
  },
  {
    title: "Pages.Titles.Main",
    route: "/",
    menuItem: {
      icon: <HomeIcon />,
      name: "Pages.Titles.Main"
    },
    component: <Main />,
    layout: "dashboard",
    isPublic: false,
    environments: ["development", "int", "staging"]
  },
  {
    title: "Pages.Titles.SalesOrders",
    route: "/sales-orders",
    menuItem: {
      icon: <ShoppingBasketIcon />,
      name: "Pages.Titles.SalesOrders"
    },
    component: <SalesOrders />,
    layout: "dashboard",
    isPublic: false,
    environments: ["development", "int", "staging"]
  },
  {
    title: "Pages.Titles.SalesOrders",
    route: "/sales-orders/:salesOrderId",
    component: <SalesOrderDetails />,
    layout: "dashboard",
    isPublic: false,
    environments: ["development", "int", "staging"]
  },
  {
    title: "Pages.Titles.SalesOrders",
    route: "/sales-orders/:salesOrderId/checkout",
    component: <Checkout />,
    layout: "dashboard",
    isPublic: false,
    environments: ["development", "int", "staging"]
  },
  {
    title: "Pages.Titles.SizeInfo",
    route: "/size-info",
    menuItem: {
      icon: <BoyIcon />,
      name: "Pages.Titles.SizeInfo"
    },
    layout: "dashboard",
    component: <SizeInfo />,
    isPublic: false,
    environments: ["development", "int", "staging"]
  },
  {
    title: "Pages.Titles.StylePreferences",
    route: "/style-preferences",
    menuItem: {
      icon: <BoyIcon />,
      name: "Pages.Titles.StylePreferences"
    },
    layout: "dashboard",
    component: <StylePreferences />,
    isPublic: false,
    environments: ["development", "int", "staging"]
  },
  {
    title: "Pages.Titles.FitPreferences",
    route: "/fit-preferences",
    menuItem: {
      icon: <BoyIcon />,
      name: "Pages.Titles.FitPreferences"
    },
    layout: "dashboard",
    component: <FitPreferences />,
    isPublic: false,
    environments: ["development", "int", "staging"]
  },
  {
    title: "Pages.Titles.FabricProperties",
    route: "/fit-preferences",
    menuItem: {
      icon: <BoyIcon />,
      name: "Pages.Titles.FabricProperties"
    },
    layout: "dashboard",
    component: <FabricProperties />,
    isPublic: false,
    environments: ["development", "int", "staging"]
  },
  {
    title: "Kayıtlı Kartlarım",
    route: "/payment-methods",
    menuItem: {
      icon: <PaymentIcon />,
      name: "Kayıtlı Kartlarım"
    },
    layout: "dashboard",
    component: <PaymentMethods />,
    isPublic: false,
    environments: ["development", "int", "staging"]
  },
  {
    title: "Adreslerim",
    route: "/addresses",
    menuItem: {
      icon: <LocationOnIcon />,
      name: "Adreslerim"
    },
    layout: "dashboard",
    component: <Addresses />,
    isPublic: false,
    environments: ["development", "int", "staging"]
  },
  {
    title: "Hoşgeldiniz",
    route: "/welcome/gender",
    layout: "welcome",
    component: <GenderSelection />,
    isPublic: false,
    environments: ["development", "int", "staging"]
  },
  {
    title: "Hoşgeldiniz",
    route: "/welcome",
    layout: "welcome",
    component: <WelcomeSteps />,
    isPublic: false,
    environments: ["development", "int", "staging"]
  },
  {
    title: "NotFound",
    route: "*",
    layout: "",
    component: <></>,
    isPublic: false,
    environments: ["production", "development", "int", "staging"]
  },
  {
    title: "NotFound",
    route: "*",
    layout: "",
    component: <></>,
    isPublic: true,
    environments: ["production", "development", "int", "staging"]
  },
]

export interface RouterProps {
  environment: Environment;
  isPublic: boolean;
  role?: string;
}

export function Router(props: RouterProps) {
  const { environment, isPublic, role } = props;

  const filteredRoutes = routes.filter(route =>
    route.environments.some(env => env === environment)
    && route.isPublic === isPublic
    && (route.roles === undefined || route.roles?.length === 0 || (route.roles && route.roles.some(r => r === role)))
  );

  const RenderRoute = (routeOptions: RouterOptions) => {
    // TODO: replace switch with router Outlet or Layout
    switch (routeOptions.layout) {
      case "dashboard":
        return (<Dashboard 
          title={routeOptions.title}
          icon={routeOptions.menuItem?.icon}
          menuItems={filteredRoutes.filter(x => x.menuItem !== undefined).map(x => {
          if (x.menuItem) {
            return {
              ...x.menuItem,
              route: x.route
            }
          }
          else {
            throw new Error("missing menuItem")
          }
        })}>
          {routeOptions.component}
        </Dashboard>);
      case "welcome":
        return (<WelcomeLayout>
          {routeOptions.component}
        </WelcomeLayout>)
      case "callback":
        return (<Callback />)
      case "comingsoon":
        return (<ComingSoonLayout />)
      case "unauthenticated":
        return (<Unauthenticated />)
      default:
        return <NotFound />
    }
  }

  return (
    <Routes>
      {filteredRoutes.map((route: RouterOptions) => {
        return <Route key={route.route} path={route.route} element={(
          <Page title={route.title}>
            {RenderRoute(route)}
          </Page>
        )} />
      })}
    </Routes>
  )
}