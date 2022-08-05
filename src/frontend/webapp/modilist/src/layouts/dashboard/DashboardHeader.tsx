import { Toolbar, IconButton, Typography, Menu, MenuItem, Divider, List, ListItemButton, ListItemIcon, ListItemText, Badge, Select, SelectChangeEvent, Avatar, Box, Portal, AppBar, Drawer, Button } from "@mui/material"
import React, { useRef } from "react";
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useTranslation } from 'react-i18next'
import { AccountDTO } from "../../services/swagger/api";
import { ImageComponent } from "../../components/image/ImageComponent";
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';

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
  const { instance, accounts } = useMsal();
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const { menuItems, account } = props;
  const theme = useTheme();

  const [notificationsIcon, setNotificationsIcon] = React.useState<null | HTMLElement>(null);

  const handleNotificationMenu = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsIcon(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationsIcon(null);
  };

  const logout = () => {
    instance.logoutRedirect({
      account: accounts[0]
    });
  }


  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <Box display="flex">
      <AppBar position="absolute">
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
                <Button sx={{ color: '#fff' }} size="small" startIcon={item.icon}>
                  {t(item.name)}
                </Button>
              </NavLink>
            ))}
          </Box>
          <Box>
            <IconButton
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
              <MenuItem onClick={handleNotificationClose}>Profile</MenuItem>
              <MenuItem onClick={handleNotificationClose}>My account</MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
            <NavLink to={"/settings"} style={{ color: "#fff" }}>
              <IconButton
                size="large"
                aria-label="settings"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <SettingsIcon />
              </IconButton>
            </NavLink>
            <IconButton
              size="large"
              aria-label="logout"
              color="inherit"
              onClick={logout}
            >
              <LogoutIcon />
            </IconButton>
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
          // sx={{
          //   [`& .MuiDrawer-paper`]: {
          //     backgroundColor: 'rgba(150, 141, 179, 0.3);',
          //     border: 'none'
          //   },
          // }}
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
