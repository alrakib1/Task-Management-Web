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

import "./styles/Nav.css";
import useAuth from "../../../hooks/useAuth";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { FaRegUserCircle } from "react-icons/fa";
import useCurrentUser from "../../../api/useCurrentUser";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const { currentUser } = useCurrentUser();
  // console.log(currentUser)

  const handleLogOut = () => {
    logOut();
    navigate("/");
  };

  const navItems = (
    <ul className="flex flex-wrap flex-row lg:justify-center gap-1 xs:justify-center xl:gap-5 items-center no-underline list-none px-2 ">
      <NavLink to="/">
        {" "}
        <li className=" duration-300 hover:scale-x-110">Home</li>
      </NavLink>
      {user && (
        <NavLink to="/dashboard">
          {" "}
          <li className=" duration-300 hover:scale-x-110">Dashboard</li>
        </NavLink>
      )}
      {user ? (
        ""
      ) : (
        <NavLink to="/signup">
          {" "}
          <li className="inline-block duration-300 hover:scale-x-110">
            Signup
          </li>
        </NavLink>
      )}
      {user ? (
        ""
      ) : (
        <NavLink to="/login">
          {" "}
          <li className="block duration-300 hover:scale-x-110">Login</li>
        </NavLink>
      )}
      <NavLink to="/about">
        <li className=" duration-300 hover:scale-x-110">About</li>
      </NavLink>
      {user && (
        <li className="cursor-pointer" onClick={handleLogOut}>
          Logout
        </li>
      )}
    </ul>
  );

  const settings = (
    <ul>
      {user ? (
        <>
          <Link to="/dashboard/profile">
            <li>Profile</li>
          </Link>
          <li className="cursor-pointer" onClick={handleLogOut}>
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
    <AppBar position="static" sx={{ backgroundColor: "#242320" }}>
      <Container maxWidth="xl" className="bg-[#242320]">
        <Toolbar disableGutters className="bg-[#242320]">
          <Link to="/">
            <h1 className="font-Permanent text-xl font-medium text-[#A35709]">
              Taskify
            </h1>
          </Link>
          <Box className="md:hidden">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ display: { xs: "block", md: "none" } }}
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
            <Tooltip>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {user ? (
                  <Avatar
                    alt="user-avatar-image"
                    src={
                      currentUser.length === 0
                        ? user?.photoURL
                        : currentUser[0]?.avatarImage
                    }
                  />
                ) : (
                  <FaRegUserCircle className=" text-[#A35709] sm:w-6 sm:h-6 lg:w-9 lg:h-9" />
                )}
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
};
export default Navbar;
