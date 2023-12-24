import { Link, useNavigate } from "react-router-dom";
import useTodos from "../../../api/useTodos";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const Profile = () => {
  const { user, logOut } = useAuth();
  // console.log(user)
  const { todos } = useTodos();
  //   console.log(todos);

  const statusCounts = todos.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});
  //   console.log(statusCounts);

  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate("/");
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex justify-center items-center w-full">
      <Helmet>
        <title>Task Manager | Profile</title>
      </Helmet>
      <div className="bg-slate-100 xs:w-[300px] md:w-[700px] rounded-md shadow-lg mx-auto px-10 py-10 space-y-4 font-medium">
        <h1 className="mb-10 text-center text-2xl font-bold font-Permanent text-blue-900 ">
          Welcome
        </h1>
       <div className="flex flex-col md:flex-row md:justify-between gap-5 md:gap-10">
       <img src={user.photoURL} className="max-w-40 max-h-40 object-cover" alt="user-img" />
        <div className="flex flex-col ga-5 md:gap-10 lg:flex-row">
       <div>
       <p className="text-lg">Name: {user.displayName}</p>
        <p>Email: {user.email}</p>
        <p>
          Verified:{" "}
          <span
            className={user.emailVerified ? "text-green-600" : "text-red-600"}
          >
            {user.emailVerified ? "Yes" : "No"}
          </span>{" "}
        </p>
       </div>
      <div>
      <p>Total Todo : {todos.length}</p>
        <p>To-do : {statusCounts && statusCounts["to-do"] || 0}</p>

        <p>Ongoing : {statusCounts && statusCounts["ongoing"] ||0} </p>
        <p>Completed : {statusCounts && statusCounts["completed"] || 0}</p>
      </div>
        </div>
       </div>
        <div className="flex justify-between gap-5">
          <button
            className="mt-5 border  px-3 py-1 rounded-md bg-white text-blue-900 hover:scale-x-110 duration-300 "
            onClick={handleLogout}
          >
            Log out
          </button>
          <Link to="/dashboard">
            <button className="mt-5 border px-3 py-1 rounded-md bg-blue-900 text-white hover:scale-x-110 duration-300">
              View all
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
