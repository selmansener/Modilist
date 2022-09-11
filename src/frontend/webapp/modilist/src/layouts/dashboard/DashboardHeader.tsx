import { Toolbar, IconButton, Typography, Menu, MenuItem, Divider, List, ListItemButton, ListItemIcon, ListItemText, Badge, Select, SelectChangeEvent, Avatar, Box, Portal, AppBar, Drawer, Button, Grid } from "@mui/material"
import React, { useRef } from "react";
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useTranslation } from 'react-i18next'
import { AccountDTO } from "../../services/swagger/api";
import { ImageComponent } from "../../components/image/ImageComponent";
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const drawerWidth: number = 240;

export interface MenuItem {
  name: string;
  icon: React.ReactNode;
  route: string;
}

interface DashboardHeaderProps {
  menuItems: MenuItem[];
  account?: AccountDTO;
}

export function DashboardHeader(props: DashboardHeaderProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { instance, accounts } = useMsal();
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const { menuItems, account } = props;
  const theme = useTheme();
  const { pathname } = useLocation();

  const [notificationsIcon, setNotificationsIcon] = React.useState<null | HTMLElement>(null);
  const [accountIcon, setAccountIcon] = React.useState<null | HTMLElement>(null);

  const handleNotificationMenu = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsIcon(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationsIcon(null);
  };

  const handleAccountIconMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAccountIcon(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountIcon(null);
  }

  const logout = () => {
    instance.logoutRedirect({
      account: accounts[0]
    });
  }

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <Box display="flex">
      <AppBar position="fixed">
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <Box>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{ display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexGrow: 1,
          }}>
            <NavLink to="/">
              <ImageComponent width={200} src="/whitehorizontallogo.svg" />
            </NavLink>
          </Box>
          <Box sx={{
            display: { xs: 'none', sm: 'flex' },
            justifyContent: 'flex-start',
            alignContent: 'flex-start'
          }}>
            {menuItems.map((item) => (
              <NavLink key={item.route} to={item.route} style={{ display: "flex" }}>
                <Button variant="outlined" color="secondary" sx={{
                  color: '#fff',
                  mr: 2,
                  fontWeight: (`/${item.route}` === pathname ? 800 : 400),
                  textDecoration: (`/${item.route}` === pathname ? "underline" : "none")
                }} size="small" startIcon={item.icon}>
                  {t(item.name)}
                </Button>
              </NavLink>
            ))}
          </Box>
          <Box>
            {/* <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleNotificationMenu}
              color="inherit"
            >
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={notificationsIcon}
              keepMounted
              open={notificationsIcon !== null}
              onClose={handleNotificationClose}
            >
              <MenuItem onClick={handleNotificationClose}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6">
                      Başka bir notification
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      Siparişin teslim edildi.
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      Buraya tıklayarak siparişini değerlendirebilirsin.
                    </Typography>
                  </Grid>

                </Grid>
              </MenuItem>
              <MenuItem onClick={handleNotificationClose}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6">
                      Örnek notification
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      Siparişin hazırlandı. Yakında kargoya verilecek.
                    </Typography>
                  </Grid>
                </Grid>
              </MenuItem>
            </Menu> */}
            <IconButton
              size="large"
              onClick={handleAccountIconMenu}
              color="inherit"
              sx={{
                display: { xs: 'none', sm: 'inline' },
              }}
            >
              <Avatar>
                <ManageAccountsIcon color="primary" />
              </Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={accountIcon}
              keepMounted
              open={accountIcon !== null}
              onClose={handleAccountMenuClose}
            >
              <MenuItem onClick={() => {
                navigate("/settings");
                handleAccountMenuClose();
              }}>
                {t("Layouts.Dashboard.Header.Subscription")}
              </MenuItem>
              <MenuItem onClick={() => {
                navigate("/account");
                handleAccountMenuClose();
              }}>{t("Layouts.Dashboard.Header.Profile")}</MenuItem>
              <MenuItem onClick={logout}>{t("Layouts.Dashboard.Header.Logout")}</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Portal container={container}>
          <Drawer variant="temporary"
            open={open}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 4,
                backgroundColor: theme.palette.primary.main,
                boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);'

              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon sx={{
                  color: '#fff'
                }}
                />
              </IconButton>
            </Toolbar>
            <Divider />
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 4
            }}>
              <Avatar alt={`${account?.firstName} ${account?.lastName}`} src="/static/images/avatar/3.jpg" sx={{
                width: '48px',
                height: '48px'
              }} />
              {open && <Box>
                <Typography variant="h5" align="center" sx={{
                  mt: 2
                }}>{`${account?.firstName} ${account?.lastName}`}</Typography>
                {account?.jobTitle && account?.jobTitle !== "" && <Typography variant="body1" align="center">{account?.jobTitle}</Typography>}
              </Box>}
            </Box>
            <Divider />
            <List component="nav">
              {menuItems.map((item: MenuItem) => {
                return (
                  <NavLink key={item.route} to={item.route}>
                    <ListItemButton>
                      <ListItemIcon>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={t(item.name)} />
                    </ListItemButton>
                  </NavLink>
                )
              })}
            </List>
          </Drawer>

        </Portal>
      </Box>
    </Box >
  )
}
