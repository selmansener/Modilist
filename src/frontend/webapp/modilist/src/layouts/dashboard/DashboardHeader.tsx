import AccountCircle from "@mui/icons-material/AccountCircle"
import { Toolbar, IconButton, Typography, Menu, MenuItem, Divider, List, ListItemButton, ListItemIcon, ListItemText, Badge, Select, SelectChangeEvent } from "@mui/material"
import React from "react";
import { dashboardMenu, MenuLinkItem } from "./MenuItems"
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useTranslation } from 'react-i18next'

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

export function DashboardHeader() {
  const { t, i18n } = useTranslation();
  const { instance, accounts } = useMsal();
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Modilist
          </Typography>
          <Select
            value={i18n.language}
            onChange={handleLanguageChange}
            sx={{mr:2}}
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
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
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
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {dashboardMenu.map((item: MenuLinkItem) => {
            return (
              <Link key={item.route} to={item.route}>
                <ListItemButton>

                  <Badge badgeContent="" variant="dot" anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }} color="error">
                    <ListItemIcon>
                      {item.icon}
                    </ListItemIcon>
                  </Badge>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </Link>
            )
          })}
        </List>
      </Drawer>
    </>
  )
}
