import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Main } from '../../pages/main/Main';
import { Orders } from '../../pages/orders/Orders';
import { StylePreferences } from '../../pages/stylePreferences/StylePreferences';

export type MenuLinkItem = {
  title: string,
  route: string,
  icon: React.ReactNode,
  component: React.ReactNode
}

export const dashboardMenu: MenuLinkItem[] = [
  {
    title: "Dashboard",
    route: "/",
    icon: <DashboardIcon />,
    component: <Main />
  },
  {
    title: "Stil Tercihlerim",
    route: "/style-preferences",
    icon: <BarChartIcon />,
    component: <StylePreferences />
  },
  {
    title: "Siparişlerim",
    route: "/orders",
    icon: <ShoppingCartIcon />,
    component: <Orders />
  }
];

export const footerMenu: MenuLinkItem[] = [

];