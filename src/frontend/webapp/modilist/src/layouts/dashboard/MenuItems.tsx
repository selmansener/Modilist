import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentIcon from '@mui/icons-material/Payment';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import StraightenIcon from '@mui/icons-material/Straighten';
import { Main } from '../../pages/main/Main';
import { Orders } from '../../pages/orders/Orders';
import { StylePreferences } from '../../pages/stylePreferences/StylePreferences';
import { Account } from '../../pages/account/Account';
import { Addresses } from '../../pages/adresses/Addresses';
import { PaymentMethods } from '../../pages/paymentMethods/PaymentMethods';
import { SizeInfo } from '../../pages/sizeInfo/SizeInfo';
import { BodySizeInfo } from '../../pages/bodySizeInfo/BodySizeInfo';

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
    title: "Hesap Bilgilerim",
    route: "/account",
    icon: <ManageAccountsIcon />,
    component: <Account />
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
  },
  {
    title: "Kıyafet Ölçülerim",
    route: "/size-info",
    icon: <SquareFootIcon />,
    component: <SizeInfo />
  },
  {
    title: "Beden Ölçülerim",
    route: "/body-size-info",
    icon: <StraightenIcon />,
    component: <BodySizeInfo />
  },
  {
    title: "Adreslerim",
    route: "/addresses",
    icon: <LocationOnIcon />,
    component: <Addresses />
  },
  {
    title: "Kayıtlı Kartlarım",
    route: "/payment-methods",
    icon: <PaymentIcon />,
    component: <PaymentMethods />
  },
];

export const footerMenu: MenuLinkItem[] = [

];