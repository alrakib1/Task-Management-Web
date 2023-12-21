import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";

import Tooltip from "@mui/material/Tooltip";

import "./Nav.css";
import useAuth from "../../../hooks/useAuth";
import { Link, NavLink } from "react-router-dom";

function ResponsiveAppBar() {
  const { user, logOut } = useAuth();

  const navItems = (
    <ul className="flex flex-wrap flex-row lg:justify-start gap-1 xs:justify-center xl:gap-5 items-center no-underline list-none px-2 ">
      <NavLink to="/">
        {" "}
        <li>Home</li>
      </NavLink>
      {user && (
        <NavLink to="/dashboard">
          {" "}
          <li>Dashboard</li>
        </NavLink>
      )}
      {user ? (
        ""
      ) : (
        <NavLink to="/signup">
          {" "}
          <li className="inline-block">Signup</li>
        </NavLink>
      )}
      {user ? (
        ""
      ) : (
        <NavLink to="/login">
          {" "}
          <li className="block">Login</li>
        </NavLink>
      )}
      <li>About</li>
      {user && (
        <li className="cursor-pointer" onClick={() => logOut()}>
          Logout
        </li>
      )}
    </ul>
  );

  const settings = (
    <ul>
      {user ? (
        <>
          <Link to="/profile">
            <li>Profile</li>
          </Link>
          <li className="cursor-pointer" onClick={() => logOut()}>
            Logout
          </li>
        </>
      ) : (
        <>
          <Link to="/login">
            <li>Login</li>
          </Link>
          <Link to="/signup">
            <li>Signup</li>
          </Link>
        </>
      )}
    </ul>
  );

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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
    <AppBar position="static" sx={{ backgroundColor: "white" }}>
      <Container maxWidth="xl" className="bg-white">
        <Toolbar disableGutters className="bg-white text-black">
          <Box  className="md:hidden">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{display:{xs:'block',md:'none'}}}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              className="md:hidden"
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            
            >
              {navItems}
            </Menu>
          </Box>

          <Box className="w-full xs:hidden md:block">{navItems}</Box>

          <Box className="ml-auto text-black hover:text-black">
            <Tooltip >
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
              
              >
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/2.jpg"
                 
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px", width: "200px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              className="w-28"
            >
              {settings}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
