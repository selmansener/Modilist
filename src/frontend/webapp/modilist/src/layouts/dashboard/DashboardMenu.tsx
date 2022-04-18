import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link, To } from "react-router-dom";
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import StylePreferences from '../../pages/stylePreferences/StylePreferences';
import Orders from '../../pages/orders/Orders';
import Main from '../../pages/main/Main';

export type DashboardMenuItem = {
  title: string,
  route: string,
  icon: React.ReactNode,
  component: React.ReactNode
}

export const dashboardMenu: DashboardMenuItem[] = [
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
]
