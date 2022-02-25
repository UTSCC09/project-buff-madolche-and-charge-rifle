// This component is built taking App Bar, Account menu, Basic menu examples in MUI documentation
// https://mui.com/components/app-bar/#app-bar-with-responsive-menu
// https://mui.com/components/menus/#account-menu
// https://mui.com/components/menus/#basic-menu
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

const NavbarComponent = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontWeight: "bold" }}
          >
            <a href="/" style={{textDecoration: "none", color: "white"}}>mdTogether</a>
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
                  id="basic-button-share"
                  aria-controls={shareOpen ? 'basic-menu-share' : undefined}
                  aria-haspopup="true"
                  aria-expanded={shareOpen ? 'true' : undefined}
                  onClick={handleShareClick}
                  sx={{ my: 1, px: 3, color: 'black', display: 'block', textAlign: "center", width: "100%" }}
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
              </div>
              <div>
                <Button
                  id="basic-button-export"
                  aria-controls={exportOpen ? 'basic-menu-export' : undefined}
                  aria-haspopup="true"
                  aria-expanded={exportOpen ? 'true' : undefined}
                  onClick={handleExportClick}
                  sx={{ my: 1, px: 3, color: 'black', display: 'block', textAlign: "center", width: "100%" }}
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
                  sx={{ my: 1, px: 3, color: 'black', display: 'block', textAlign: "center", width: "100%" }}
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
            mdTogether
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* basic menu example in MUI documentation
            https://mui.com/components/menus/#basic-menu */}
            <div>
              <Button
                id="basic-button-share"
                aria-controls={shareOpen ? 'basic-menu-share' : undefined}
                aria-haspopup="true"
                aria-expanded={shareOpen ? 'true' : undefined}
                onClick={handleShareClick}
                sx={{ my: 2, mx: 3, color: 'white', display: 'block' }}
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
            </div>
            <div>
              <Button
                id="basic-button-export"
                aria-controls={exportOpen ? 'basic-menu-export' : undefined}
                aria-haspopup="true"
                aria-expanded={exportOpen ? 'true' : undefined}
                onClick={handleExportClick}
                sx={{ my: 2, mx: 3, color: 'white', display: 'block' }}
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
                sx={{ my: 2, mx: 3, color: 'white', display: 'block' }}
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
              <MenuItem>
                <Avatar /> User Space
              </MenuItem>
              <MenuItem>
                <Avatar /> Profile
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                Log Out
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavbarComponent;