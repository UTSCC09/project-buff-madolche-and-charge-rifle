// This component is built taking App Bar, Account menu, Basic menu, Transition modal examples in MUI documentation
// https://mui.com/components/app-bar/#app-bar-with-responsive-menu
// https://mui.com/components/menus/#account-menu
// https://mui.com/components/menus/#basic-menu
// https://mui.com/components/modal/#transitions
// import * as React from 'react';
import React, { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import LoginComponent from './LoginComponent';
import UserSpaceComponent from './UserSpaceComponent';
import ReactSession from 'react-client-session/dist/ReactSession';
import navbarLogo from '../navbar_logo.png';
import mdlogo from "../default_avatar.png";

import { useTheme } from '../theme/useTheme';
import { getFromLS } from '../utils/storage';

// Derived from React official example about conditional rendering
// https://reactjs.org/docs/conditional-rendering.html
function UserLogInCorner(props) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // from Transition modal example in MUI documentation
  // https://mui.com/components/modal/#transitions
  const userSpaceStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid #888',
    boxShadow: 24,
    p: 4,
    width: {xs: "78vw", md: "80vw"},
    borderRadius: 3,
    paddingX: { xs: 2, md: 4 },
    paddingY: { xs: 4, md: 7 }
  };  

  const [usModalOpen, setUSModalOpen] = React.useState(false);
  const handleUSModalOpen = () => setUSModalOpen(true);
  const handleUSModalClose = () => setUSModalOpen(false);

  // from Transition modal example in MUI documentation
  // https://mui.com/components/modal/#transitions
  function TransitionsUSModal() {
    return (
      <div>
        <MenuItem onClick={handleUSModalOpen}>
          <Avatar alt="Default avatar" src={mdlogo} />
          <div sx={{ color: "#000000DE", textTransform: "capitalize" }} className='change-font'>User Space</div>
        </MenuItem>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={usModalOpen}
          onClose={handleUSModalClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={usModalOpen}>
            <Box sx={userSpaceStyle}>
              <UserSpaceComponent />
            </Box>
          </Fade>
        </Modal>
      </div>
    );
  }

  function handleLogOut(event) {
    event.preventDefault();
    const body = {
      query:`
      query{
        logout(userId:"")
      }
      `
    }
    let err = false;
    let backenderr = false;
    fetch("https://api.mdtogether.live/graphql", {
    method: 'POST',
    body: JSON.stringify(body),
    headers:{
      "Content-Type": 'application/json',
      "Authorization":'asda '+ ReactSession.get('token')
    }
    })
    .then(res =>{
      if(res.status !== 200 && res.status !== 201){
        // need to change this to actual error messages
        err = true;
        if(res.status === 400){
          backenderr = true;
        }
        // console.log("Failed");
      }
      return res.json();
    })
    .then(data =>{
      console.log(data);
    })
    .catch(err =>{
      // need to change this to actual error messages
      // document.getElementById("Sign Up Error Box").innerHTML += "<p></p>"+ err;
      console.log(err)
    });
    ReactSession.set('token', null);
    ReactSession.set('email', null);
    ReactSession.set('projectId', null);
    ReactSession.set('type', null);
    ReactSession.set('projectName', null);
    // reload before setting name to null
    // avoid display null in navbar
    window.location.reload();
    ReactSession.set('firstName', null);
    ReactSession.set('lastName', null);
  }

  return (
    <Box sx={{ flexGrow: 0, display: "flex" }}>
      <div className="navbar-username">{ReactSession.get("firstName") + " " + ReactSession.get("lastName")}</div>
      <Tooltip title="Open User Account Menu">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, display: "flex" }}>
          <Avatar />
        </IconButton>
      </Tooltip>

      {/* Account menu examples in MUI documentation */}
      {/* // https://mui.com/components/menus/#account-menu */}
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        onClick={handleCloseUserMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              // bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
      >
        <TransitionsUSModal />
        <Divider sx={{paddingTop: 1, marginBottom: 1}} />
        <MenuItem onClick={handleLogOut} className='change-font'>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          Log Out
        </MenuItem>
      </Menu>
    </Box>
  );
}

function GuestLogInCorner(props) {
  // from Transition modal example in MUI documentation
  // https://mui.com/components/modal/#transitions
  const loginModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid #888',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
    width: {xs: "90vw", md: "36vw"}
  };  

  const [loginModalOpen, setLoginModalOpen] = React.useState(false);
  const handleLoginModalOpen = () => setLoginModalOpen(true);
  const handleLoginModalClose = () => setLoginModalOpen(false);

  // from Transition modal example in MUI documentation
  // https://mui.com/components/modal/#transitions
  // function TransitionsLoginModal() {
  return (
    <div>
      <Button onClick={handleLoginModalOpen} sx={{color: "white", mr: 1, textTransform: "capitalize"}} className="change-font">Log in / Sign up</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={loginModalOpen}
        onClose={handleLoginModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={loginModalOpen}>
          <Box sx={loginModalStyle}>
            <LoginComponent />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
  // }
}

function LogInCorner(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserLogInCorner />;
  } else {
    return <GuestLogInCorner />;
  }
}

const NavbarComponent = () => {

  let isLoggedIn = false;

  // example derived from w3schools example
  // https://www.w3schools.blog/get-cookie-by-name-javascript-js
  let cookie = {};
  document.cookie.split(";").forEach(function(elmt) {
    let [key, value] = elmt.split("=");
    cookie[key.trim()] = value;
  })

  if (cookie["__react_session__"] && ReactSession.get("token") !== null && ReactSession.get("token") !== undefined) {
    isLoggedIn = true;
  } else {
    ReactSession.set('token', null);
    ReactSession.set('projectId', null);
    ReactSession.set('email', null);
    ReactSession.set('type', null);
    ReactSession.set('firstName', null);
    ReactSession.set('lastName', null);
    ReactSession.set('projectName', null);
    isLoggedIn = false;
  }
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  // basic menu example in MUI documentation
  // https://mui.com/components/menus/#basic-menu

  const [anchorElTheme, setAnchorElTheme] = React.useState(null);
  const themeOpen = Boolean(anchorElTheme);

  const handleThemeClick = (event) => {
    setAnchorElTheme(event.currentTarget);
  };
  const handleThemeClose = () => {
    setAnchorElTheme(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // the code and schema.json in this folder are derived from "Theme Builder" blog by Tapas Adhikary
  // https://css-tricks.com/theming-and-theme-switching-with-react-and-styled-components/
  const themesFromStore = getFromLS('all-themes');
  const [data, setData] = useState(themesFromStore.data);
  const {setMode} = useTheme();

  const handleLightTheme = () => {
    setMode(data.light);
    window.location.reload();
    // console.log(data.light);
  }

  const handleSeaWaveTheme = () => {
    setMode(data.seaWave);
    window.location.reload();
  }

  const handleCalmTheme = () => {
    setMode(data.calm);
    window.location.reload();
  }

  const handleDarkTheme = () => {
    setMode(data.dark);
    window.location.reload();
  }

  const handleSharpTheme = () => {
    setMode(data.sharp);
    window.location.reload();
  }


  return (
    <AppBar 
      position="sticky"
      id="nav_bar"
      // We may change UI theme here
      sx = {{background: "#8268c9"}}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontWeight: "bold" }}
          >
            {/* Do we need to put a link in the logo? it might cause users to lose changes accidentally click on it */}
            {/* <a href="/" style={{textDecoration: "none", color: "white"}}>mdTogether</a> */}
            {/* mdTogether */}
            <img style={{height: "40px"}} src={navbarLogo} alt="mdTogether logo" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {/* basic menu example in MUI documentation
              https://mui.com/components/menus/#basic-menu */}
              <div>
                <Button
                  id="basic-button-theme"
                  aria-controls={themeOpen ? 'basic-menu-theme' : undefined}
                  aria-haspopup="true"
                  className='change-font'
                  aria-expanded={themeOpen ? 'true' : undefined}
                  onClick={handleThemeClick}
                  sx={{ my: 1, px: 3, color: 'black', display: 'block', textAlign: "center", width: "100%", textTransform: "capitalize" }}
                >
                  Theme
                </Button>
                <Menu
                  id="basic-menu-theme"
                  anchorEl={anchorElTheme}
                  open={themeOpen}
                  onClose={handleThemeClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button-theme',
                  }}
                >
                  <MenuItem onClick={handleLightTheme}>Light</MenuItem>
                  <MenuItem onClick={handleDarkTheme}>Dark</MenuItem>
                  <MenuItem onClick={handleSeaWaveTheme}>SeaWave</MenuItem>
                  <MenuItem onClick={handleSharpTheme}>Sharp</MenuItem>
                  <MenuItem onClick={handleCalmTheme}>Calm</MenuItem>
                </Menu>
              </div>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, fontWeight: "bold" }}
          >
            {/* mdTogether */}
            <img style={{height: "25px"}} src={navbarLogo} alt="mdTogether logo" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* basic menu example in MUI documentation
            https://mui.com/components/menus/#basic-menu */}
            <div>
              <Button
                id="basic-button-theme"
                aria-controls={themeOpen ? 'basic-menu-theme' : undefined}
                aria-haspopup="true"
                className='change-font'
                aria-expanded={themeOpen ? 'true' : undefined}
                onClick={handleThemeClick}
                sx={{ my: 1, mx: 3, color: 'white', display: 'block', textTransform: "capitalize" }}
              >
                Theme
              </Button>
              <Menu
                id="basic-menu-theme"
                anchorEl={anchorElTheme}
                open={themeOpen}
                onClose={handleThemeClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button-theme',
                }}
              >
                <MenuItem onClick={handleLightTheme}>Light</MenuItem>
                <MenuItem onClick={handleDarkTheme}>Dark</MenuItem>
                <MenuItem onClick={handleSeaWaveTheme}>SeaWave</MenuItem>
                <MenuItem onClick={handleSharpTheme}>Sharp</MenuItem>
                <MenuItem onClick={handleCalmTheme}>Calm</MenuItem>
              </Menu>
            </div>
          </Box>
          
          <LogInCorner isLoggedIn={isLoggedIn} />
          
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavbarComponent;