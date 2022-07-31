import * as React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentIcon from '@mui/icons-material/Payment';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import BoyIcon from '@mui/icons-material/Boy';
import HomeIcon from '@mui/icons-material/Home';
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

interface RouterOptions {
  title: string,
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
    title: "Login",
    route: "",
    component: <></>,
    layout: {
      path: "/unauthenticated",
      component: <Unauthenticated />
    },
    isPublic: true,
    disabledEnvironments: []
  },
  {
    title: "Pages.Titles.Main",
    route: "",
    menuItem: {
      icon: <HomeIcon sx={{
        verticalAlign: "sub"
      }} />,
      name: "Pages.Titles.Main"
    },
    component: <Main />,
    layout: {
      path: "/",
      component: <Dashboard title={"Pages.Titles.Main"} icon={<HomeIcon sx={{
        verticalAlign: "sub"
      }} />} />
    },
    isPublic: false,
    disabledEnvironments: []
  },
  {
    title: "Pages.Titles.SalesOrders",
    route: "sales-orders",
    menuItem: {
      icon: <ShoppingBasketIcon sx={{
        verticalAlign: "sub"
      }} />,
      name: "Pages.Titles.SalesOrders"
    },
    component: <SalesOrders />,
    layout: {
      path: "/",
      component: <Dashboard title={"Pages.Titles.SalesOrders"} icon={<ShoppingBasketIcon sx={{
        verticalAlign: "sub"
      }} />} />
    },
    isPublic: false,
    disabledEnvironments: []
  },
  {
    title: "Pages.Titles.SalesOrders",
    route: "sales-orders/:salesOrderId",
    component: <SalesOrderDetails />,
    layout: {
      path: "/",
      component: <Dashboard title={"Pages.Titles.SalesOrders"} icon={<ShoppingBasketIcon sx={{
        verticalAlign: "sub"
      }} />} />
    },
    isPublic: false,
    disabledEnvironments: []
  },
  {
    title: "Pages.Titles.SalesOrders",
    route: "sales-orders/:salesOrderId/checkout",
    component: <Checkout />,
    layout: {
      path: "/",
      component: <Dashboard title={"Pages.Titles.SalesOrders"} icon={<ShoppingBasketIcon sx={{
        verticalAlign: "sub"
      }} />} />
    },
    isPublic: false,
    disabledEnvironments: []
  },
  {
    title: "Pages.Titles.SizeInfo",
    route: "size-info",
    menuItem: {
      icon: <BoyIcon sx={{
        verticalAlign: "sub"
      }} />,
      name: "Pages.Titles.SizeInfo"
    },
    layout: {
      path: "/",
      component: <Dashboard title={"Pages.Titles.SizeInfo"} icon={<BoyIcon sx={{
        verticalAlign: "sub"
      }} />} />
    },
    component: <SizeInfo />,
    isPublic: false,
    disabledEnvironments: []
  },
  {
    title: "Pages.Titles.StylePreferences",
    route: "style-preferences",
    menuItem: {
      icon: <BoyIcon sx={{
        verticalAlign: "sub"
      }} />,
      name: "Pages.Titles.StylePreferences"
    },
    layout: {
      path: "/",
      component: <Dashboard title={"Pages.Titles.StylePreferences"} icon={<BoyIcon sx={{
        verticalAlign: "sub"
      }} />} />
    },
    component: <StylePreferences />,
    isPublic: false,
    disabledEnvironments: []
  },
  {
    title: "Pages.Titles.FitPreferences",
    route: "fit-preferences",
    menuItem: {
      icon: <BoyIcon sx={{
        verticalAlign: "sub"
      }} />,
      name: "Pages.Titles.FitPreferences"
    },
    layout: {
      path: "/",
      component: <Dashboard title={"Pages.Titles.FitPreferences"} icon={<BoyIcon sx={{
        verticalAlign: "sub"
      }} />} />
    },
    component: <FitPreferences />,
    isPublic: false,
    disabledEnvironments: []
  },
  {
    title: "Pages.Titles.FabricProperties",
    route: "fabric-properties",
    menuItem: {
      icon: <BoyIcon sx={{
        verticalAlign: "sub"
      }} />,
      name: "Pages.Titles.FabricProperties"
    },
    layout: {
      path: "/",
      component: <Dashboard title={"Pages.Titles.FabricProperties"} icon={<BoyIcon sx={{
        verticalAlign: "sub"
      }} />} />
    },
    component: <FabricProperties />,
    isPublic: false,
    disabledEnvironments: []
  },
  {
    title: "Pages.Titles.Settings",
    route: "settings",
    layout: {
      path: "/",
      component: <Dashboard title={"Pages.Titles.Settings"} icon={<ShoppingBasketIcon sx={{
        verticalAlign: "sub"
      }} />} />
    },
    component: <AccountSettings />,
    isPublic: false,
    disabledEnvironments: []
  },
  {
    title: "Pages.Titles.PaymentMethods",
    route: "payment-methods",
    menuItem: {
      icon: <PaymentIcon sx={{
        verticalAlign: "sub"
      }} />,
      name: "Pages.Titles.PaymentMethods"
    },
    layout: {
      path: "/",
      component: <Dashboard title={"Pages.Titles.PaymentMethods"} icon={<PaymentIcon sx={{
        verticalAlign: "sub"
      }} />} />
    },
    component: <PaymentMethods />,
    isPublic: false,
    disabledEnvironments: []
  },
  {
    title: "Pages.Titles.Addresses",
    route: "addresses",
    menuItem: {
      icon: <LocationOnIcon sx={{
        verticalAlign: "sub"
      }} />,
      name: "Pages.Titles.Addresses"
    },
    layout: {
      path: "/",
      component: <Dashboard title={"Pages.Titles.Addresses"} icon={<LocationOnIcon sx={{
        verticalAlign: "sub"
      }} />} />
    },
    component: <Addresses />,
    isPublic: false,
    disabledEnvironments: []
  },
  {
    title: "Pages.Titles.Welcome",
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
    title: "Pages.Titles.Welcome",
    route: "",
    layout: {
      path: "/welcome",
      component: <WelcomeLayout title="Pages.Titles.Welcome" />
    },
    component: <WelcomeSteps />,
    isPublic: false,
    disabledEnvironments: []
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
  const { environment, isPublic, role } = props;

  const filteredRoutes = routes.filter(route =>
    route.disabledEnvironments.every(env => env !== environment)
    && route.isPublic === isPublic
    && (route.roles === undefined || route.roles?.length === 0 || (route.roles && route.roles.some(r => r === role)))
  );

  const groupedRoutes = filteredRoutes.reduce((a: any,b: any) => {
    ((a[b["layout"]["path"]] as any) = a[b["layout"]["path"]] || []).push(b);
    return a;
  }, {});

  const RenderRoutes = () => {
    const routes = [];
    return Object.keys(groupedRoutes).map((key: string) => {
      console.log("key", key);
      var group: RouterOptions[] = groupedRoutes[key as keyof typeof groupedRoutes];
      return <Route key={key} path={key} element={group[0].layout.component as React.ReactNode}>
        {group.map(route => {
          console.log("route", route.route)
          return <Route key={route.route} path={route.route} element={route.component} />
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