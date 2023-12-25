import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import { FaRegUserCircle } from "react-icons/fa";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import Container from "../../components/shared/Container/Container";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

// icons
import { CiLogout } from "react-icons/ci";
import { MdPreview } from "react-icons/md";
import { Toaster } from "react-hot-toast";
import { Avatar } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

// main
const drawerWidth = 240;

// css

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { user, logOut } = useAuth();
  // console.log(user);

  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut();
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Helmet>
        <title>Taskify | Dashboard</title>
      </Helmet>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "#1E3A8A" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <h6 className="font-Permanent text-2xl">
            <Link to="/">Taskify</Link>
          </h6>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <List
          className="flex justify-center items-center "
          sx={{
            marginBottom: "20px",
            height: "100px",
            width: "100px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Avatar
            sx={{ width: "100px", height: "100px" }}
            alt="User Photo"
            src={user.photoURL}
          />
        </List>
        <div className="flex flex-col space-y-4">
          <NavLink to="/dashboard">
            <List className="flex  items-center gap-2 hover:bg-blue-900 hover:text-white  border-b border-blue-900 font-Montserrat">
              <MdPreview className="ml-3" /> View All Tasks
            </List>
          </NavLink>
          <NavLink to="/dashboard/profile">
            <List className="flex  items-center gap-2 hover:bg-blue-900 hover:text-white  border-b border-blue-900 font-Montserrat">
              <FaRegUserCircle className="ml-3" /> Profile
            </List>
          </NavLink>

          <List
            className="flex  items-center gap-2 hover:bg-blue-900 hover:text-white  border-b border-blue-900 font-Montserrat"
            onClick={handleLogOut}
          >
            <CiLogout className="ml-3" /> Logout
          </List>
        </div>
      </Drawer>
      <Container>
        <Main open={open}>
          <DrawerHeader />
          <div className="font-Montserrat">
            <Toaster position="top-center" reverseOrder={false} />
            <Outlet />
          </div>
        </Main>
      </Container>
    </Box>
  );
}
