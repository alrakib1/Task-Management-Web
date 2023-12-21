import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar/Navbar";
import Footer from "../components/shared/Footer/Footer";
import { Toaster } from "react-hot-toast";

const Main = () => {
  return (
    <div>
      <Navbar />
      <div className="">
      <Toaster position="top-center" reverseOrder={false} />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
