// This component is built taking App Bar, Account menu, Basic menu, Transition modal examples in MUI documentation
// https://mui.com/components/app-bar/#app-bar-with-responsive-menu
// https://mui.com/components/menus/#account-menu
// https://mui.com/components/menus/#basic-menu
// https://mui.com/components/modal/#transitions
import * as React from 'react';
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
          <Avatar />
          <div sx={{ color: "#000000DE", textTransform: "capitalize" }}>User Space</div>
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
    ReactSession.set('userId', null);
    ReactSession.set('token', null);
    ReactSession.set('email', null);
    ReactSession.set('projectId', null);
    ReactSession.set('type', null);
    window.location.reload();
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open User Account Menu">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
      >
        <TransitionsUSModal />
        <Divider sx={{paddingTop: 1, marginBottom: 1}} />
        <MenuItem onClick={handleLogOut}>
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
      <Button onClick={handleLoginModalOpen} sx={{color: "white", mr: 1, textTransform: "capitalize"}}>Log in / Sign up</Button>
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

  if (cookie["__react_session__"] && ReactSession.get("userId") !== null && ReactSession.get("userId") !== undefined) {
    isLoggedIn = true;
  } else {
    ReactSession.set('userId', null);
    ReactSession.set('token', null);
    ReactSession.set('projectId', null);
    ReactSession.set('email', null);
    ReactSession.set('type', null);
    isLoggedIn = false;
  }
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  // basic menu example in MUI documentation
  // https://mui.com/components/menus/#basic-menu
  const [anchorElShare, setAnchorElShare] = React.useState(null);
  const shareOpen = Boolean(anchorElShare);

  const handleShareClick = (event) => {
    setAnchorElShare(event.currentTarget);
  };
  const handleShareClose = () => {
    setAnchorElShare(null);
  };

  const [anchorElExport, setAnchorElExport] = React.useState(null);
  const exportOpen = Boolean(anchorElExport);

  const handleExportClick = (event) => {
    setAnchorElExport(event.currentTarget);
  };
  const handleExportClose = () => {
    setAnchorElExport(null);
  };

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

  return (
    <AppBar 
      position="sticky"
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
              {/* <div>
                <Button
                  id="basic-button-share"
                  aria-controls={shareOpen ? 'basic-menu-share' : undefined}
                  aria-haspopup="true"
                  aria-expanded={shareOpen ? 'true' : undefined}
                  onClick={handleShareClick}
                  sx={{ my: 1, px: 3, color: 'black', display: 'block', textAlign: "center", width: "100%", textTransform: "capitalize" }}
                >
                  Share
                </Button>
                <Menu
                  id="basic-menu-share"
                  anchorEl={anchorElShare}
                  open={shareOpen}
                  onClose={handleShareClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button-share',
                  }}
                >
                  <MenuItem onClick={handleShareClose}>Link</MenuItem>
                  <MenuItem onClick={handleShareClose}>Invite</MenuItem>
                </Menu>
              </div> */}
              <div>
                <Button
                  id="basic-button-export"
                  aria-controls={exportOpen ? 'basic-menu-export' : undefined}
                  aria-haspopup="true"
                  aria-expanded={exportOpen ? 'true' : undefined}
                  onClick={handleExportClick}
                  sx={{ my: 1, px: 3, color: 'black', display: 'block', textAlign: "center", width: "100%", textTransform: "capitalize" }}
                >
                  Export
                </Button>
                <Menu
                  id="basic-menu-export"
                  anchorEl={anchorElExport}
                  open={exportOpen}
                  onClose={handleExportClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button-export',
                  }}
                >
                  <MenuItem onClick={handleExportClose}>Download PDF</MenuItem>
                  <MenuItem onClick={handleExportClose}>Download HTML</MenuItem>
                  <MenuItem onClick={handleExportClose}>Download Markdown</MenuItem>
                </Menu>
              </div>
              <div>
                <Button
                  id="basic-button-theme"
                  aria-controls={themeOpen ? 'basic-menu-theme' : undefined}
                  aria-haspopup="true"
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
                  <MenuItem onClick={handleThemeClose}>Light</MenuItem>
                  <MenuItem onClick={handleThemeClose}>Dark</MenuItem>
                  <MenuItem onClick={handleThemeClose}>Spring</MenuItem>
                  <MenuItem onClick={handleThemeClose}>Summer</MenuItem>
                  <MenuItem onClick={handleThemeClose}>Fall</MenuItem>
                  <MenuItem onClick={handleThemeClose}>Winter</MenuItem>
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
            {/* <div>
              <Button
                id="basic-button-share"
                aria-controls={shareOpen ? 'basic-menu-share' : undefined}
                aria-haspopup="true"
                aria-expanded={shareOpen ? 'true' : undefined}
                onClick={handleShareClick}
                sx={{ my: 1, mx: 3, color: 'white', display: 'block', textTransform: "capitalize" }}
              >
                Share
              </Button>
              <Menu
                id="basic-menu-share"
                anchorEl={anchorElShare}
                open={shareOpen}
                onClose={handleShareClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button-share',
                }}
              >
                <MenuItem onClick={handleShareClose}>Link</MenuItem>
                <MenuItem onClick={handleShareClose}>Invite</MenuItem>
              </Menu>
            </div> */}
            <div>
              <Button
                id="basic-button-export"
                aria-controls={exportOpen ? 'basic-menu-export' : undefined}
                aria-haspopup="true"
                aria-expanded={exportOpen ? 'true' : undefined}
                onClick={handleExportClick}
                sx={{ my: 1, mx: 3, color: 'white', display: 'block', textTransform: "capitalize" }}
              >
                Export
              </Button>
              <Menu
                id="basic-menu-export"
                anchorEl={anchorElExport}
                open={exportOpen}
                onClose={handleExportClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button-export',
                }}
              >
                <MenuItem onClick={handleExportClose}>Download PDF</MenuItem>
                <MenuItem onClick={handleExportClose}>Download HTML</MenuItem>
                <MenuItem onClick={handleExportClose}>Download Markdown</MenuItem>
              </Menu>
            </div>
            <div>
              <Button
                id="basic-button-theme"
                aria-controls={themeOpen ? 'basic-menu-theme' : undefined}
                aria-haspopup="true"
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
                <MenuItem onClick={handleThemeClose}>Light</MenuItem>
                <MenuItem onClick={handleThemeClose}>Dark</MenuItem>
                <MenuItem onClick={handleThemeClose}>Spring</MenuItem>
                <MenuItem onClick={handleThemeClose}>Summer</MenuItem>
                <MenuItem onClick={handleThemeClose}>Fall</MenuItem>
                <MenuItem onClick={handleThemeClose}>Winter</MenuItem>
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