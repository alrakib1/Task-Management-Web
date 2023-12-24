import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import About from "../pages/About/About";
import Dashboard from "../pages/Dashboard/Dashboard";
import UpdateTask from "../pages/Dashboard/Tasks/Update Task/UpdateTask";
import PrivateRoute from "./PrivateRoute";
import AllTasks from "../pages/Dashboard/AllTasks/AllTasks";
import TaskDetails from "../pages/Dashboard/Tasks/Task Details/TaskDetails";
import Profile from "../pages/Dashboard/Profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "about",
        element: <About></About>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [

      {
        path: '/dashboard',
        element:<AllTasks></AllTasks>
      },
      {
        path: "/dashboard/edit/:id",
        element: <UpdateTask/>,
      },
      {
        path: '/dashboard/details/:id',
        element: <TaskDetails></TaskDetails>
      }
     ,
      {
        path: '/dashboard/profile',
        element: <Profile></Profile>
      }
     
    ],
  },
]);

export default router;
