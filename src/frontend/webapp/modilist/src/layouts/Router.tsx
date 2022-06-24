import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentIcon from '@mui/icons-material/Payment';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import StraightenIcon from '@mui/icons-material/Straighten';
import { Account } from '../pages/account/Account';
import { Addresses } from '../pages/adresses/Addresses';
import { BodySizeInfo } from '../pages/bodySizeInfo/BodySizeInfo';
import { Main } from '../pages/main/Main';
import { Orders } from '../pages/orders/Orders';
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
    title: "Dashboard",
    route: "/",
    menuItem: {
      icon: <DashboardIcon />,
      name: "Dashboard"
    },
    component: <Main />,
    layout: "dashboard",
    isPublic: false,
    environments: ["development", "int", "staging"]
  },
  {
    title: "Hesap Bilgilerim",
    route: "/account",
    menuItem: {
      icon: <ManageAccountsIcon />,
      name: "Hesap Bilgilerim"
    },
    layout: "dashboard",
    component: <Account />,
    isPublic: false,
    environments: ["development", "int", "staging"]
  },
  {
    title: "Stil Tercihlerim",
    route: "/style-preferences",
    menuItem: {
      icon: <BarChartIcon />,
      name: "Stil Tercihlerim"
    },
    layout: "dashboard",
    component: <StylePreferences />,
    isPublic: false,
    environments: ["development", "int", "staging"]
  },
  {
    title: "Siparişlerim",
    route: "/orders",
    menuItem: {
      icon: <ShoppingCartIcon />,
      name: "Siparişlerim"
    },
    layout: "dashboard",
    component: <Orders />,
    isPublic: false,
    environments: ["development", "int", "staging"]
  },
  {
    title: "Kıyafet Ölçülerim",
    route: "/size-info",
    menuItem: {
      icon: <SquareFootIcon />,
      name: "Kıyafet Ölçülerim"
    },
    layout: "dashboard",
    component: <SizeInfo />,
    isPublic: false,
    environments: ["development", "int", "staging"]
  },
  {
    title: "Beden Ölçülerim",
    route: "/body-size-info",
    menuItem: {
      icon: <StraightenIcon />,
      name: "Beden Ölçülerim"
    },
    layout: "dashboard",
    component: <BodySizeInfo />,
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
        return (<Dashboard menuItems={filteredRoutes.filter(x => x.menuItem !== undefined).map(x => {
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
        console.log("callback");
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