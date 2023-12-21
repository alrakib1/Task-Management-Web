import { Outlet } from "react-router-dom";


const Main = () => {
    return (
        <div>

       <div className="">
       <Outlet/>
       </div>

        </div>
    );
};

export default Main;