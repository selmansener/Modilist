import { Toolbar, IconButton, Typography, Menu, MenuItem, Divider, List, ListItemButton, ListItemIcon, ListItemText, Badge, Select, SelectChangeEvent, Avatar, Grid, Box } from "@mui/material"
import React from "react";
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, NavLink } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useTranslation } from 'react-i18next'
import { AccountDTO } from "../../services/swagger/api";
import { ImageComponent } from "../../components/image/ImageComponent";
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  //height: '180px',
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    //height: '180px',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const supportedLanguages = [
  {
    code: "tr",
    lang: "tr"
  },
  {
    code: "us",
    lang: "en"
  },
  {
    code: "us",
    lang: "en-US"
  },
  {
    code: "us",
    lang: "en-GB"
  }
]

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

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
  const { t, i18n } = useTranslation();
  const { instance, accounts } = useMsal();
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const { menuItems, account } = props;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    instance.logoutRedirect({
      account: accounts[0]
    });
  }

  const handleLanguageChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  }

  return (
    <>
      <AppBar position="absolute" open={open}>
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
              sx={{
                marginRight: '18px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexGrow: 1
          }}>
            <ImageComponent width={200} src="/whitehorizontallogo.svg" />
          </Box>
          <Box>

            <Select
              value={i18n.language}
              onChange={handleLanguageChange}
              sx={{ mr: 2, backgroundColor: "#fff" }}
            >
              {supportedLanguages.map(supportedLang => (
                <MenuItem value={supportedLang.lang} key={supportedLang.lang}>
                  <img
                    loading="lazy"
                    width="20"
                    src={`https://flagcdn.com/w20/${supportedLang.code}.png`}
                    srcSet={`https://flagcdn.com/w40/${supportedLang.code}.png 2x`}
                    alt={supportedLang.code}
                  />
                  <Typography variant="caption" sx={{ pl: 1 }}>
                    {supportedLang.lang.toLocaleUpperCase()}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
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
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
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
              <Link key={item.route} to={item.route}>
                <ListItemButton>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={t(item.name)} />
                </ListItemButton>
              </Link>
            )
          })}
        </List>
      </Drawer>
    </>
  )
}
