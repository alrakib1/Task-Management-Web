import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import { FaEye, FaPlus, FaRegUserCircle } from "react-icons/fa";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";


import { Link, Outlet, useNavigate } from "react-router-dom";

// icons
import { CiLogout } from "react-icons/ci";

import { Toaster } from "react-hot-toast";
import { Avatar } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

// main
const drawerWidth = 240;

// css
import './styles/Dashboard.css'

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
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "#A35709" }}>
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
            backgroundColor: '#242320'
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon className="text-white" />
            ) : (
              <ChevronRightIcon className="text-white" />
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
          <Link to="/dashboard">
            <List className="flex  items-center gap-2 text-white hover:bg-[#A35709] hover:text-[#F0E3CA]  border-b border-[#A35709] font-Montserrat">
              <FaEye className="ml-3" /> View All Tasks
            </List>
          </Link>
          <Link to="/dashboard/create">
            <List className="flex  items-center gap-2 text-white hover:bg-[#A35709] hover:text-[#F0E3CA]  border-b border-[#A35709] font-Montserrat">
              <FaPlus className="ml-3" /> Create New Task
            </List>
          </Link>
          <Link to="/dashboard/profile">
            <List className="flex  items-center gap-2 text-white hover:bg-[#A35709] hover:text-[#F0E3CA]  border-b border-[#A35709] font-Montserrat">
              <FaRegUserCircle className="ml-3" /> Profile
            </List>
          </Link>

          <List
            className="flex  items-center gap-2 text-white hover:bg-[#A35709] hover:text-[#F0E3CA]  border-b border-[#A35709] font-Montserrat"
            onClick={handleLogOut}
          >
            <CiLogout className="ml-3" /> Logout
          </List>
        </div>
      </Drawer>
    
        <Main open={open}>
          <DrawerHeader />
          <div className="font-Montserrat min-h-[calc(100vh-80px)] bg-[#1B1A17]">
            <Toaster position="top-center" reverseOrder={false} />
            <Outlet />
          </div>
        </Main>
    
    </Box>
  );
}
