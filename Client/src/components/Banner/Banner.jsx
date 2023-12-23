/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom";
import Container from "../shared/Container/Container";
import useAuth from "../../hooks/useAuth";

const Banner = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleExplore = () => {
    if (user) {
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <Container>
      <div className="">
      <div className="flex flex-col md:flex-row sm: justify-center gap-5 pt-5 xl:gap-10 items-center font-Montserrat">
        {/* for tex */}

        <div className="md:w-1/2 space-y-4 md:space-y-6">
          <h1 className="text-3xl md:text-4xl  lg:text-5xl xl:text-6xl font-semibold text-blue-900 xl:leading-10 font-Permanent xs:w-10/12">
            Welcome to
            <br className="hidden xl:block" />
            <br /> Task Manager
          </h1>
          <p className="xs:text-sm sm:text-sm md:text-base lg:text-lg md:pt-2 xl:pt-5 md:w-9/12">
            Unlock the power of seamless collaboration and productivity with
            Task Manager. Our intuitive platform is designed to revolutionize the way
            you manage tasks, whether you're working solo or with a team.
            Experience the perfect blend of simplicity and functionality, all
            wrapped in a visually appealing interface.
          </p>

          <button
            onClick={handleExplore}
            className="btn mt-6 text-blue-900 shadow-md shadow-gray-400/50 font-semibold border-2 border-blue-900 px-2 py-1 xl:px-3 xl:py-2 rounded-md hover:bg-blue-900 hover:text-white transition-transform "
          >
            Let's Explore
          </button>
        </div>

        {/* for image */}
        <div className="md:w-1/2">
          <img
            src="https://i.ibb.co/FnfDjkv/banner.png"
            className="object-contain"
          />
        </div>
      </div>
      </div>
    </Container>
  );
};

export default Banner;
