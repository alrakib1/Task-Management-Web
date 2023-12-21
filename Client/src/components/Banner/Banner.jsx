import { Link } from "react-router-dom";
import Container from "../shared/Container/Container";

const Banner = () => {
  return (
    <Container>
      <div className="flex flex-col md:flex-row sm: justify-center gap-5 xl:gap-10 items-center font-Montserrat">
        {/* for tex */}

        <div className="md:w-1/2 space-y-4 md:space-y-6">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-blue-900 xl:leading-10 font-Permanent">
            Welcome to
            <br className="hidden lg:block"/>
            <br className="hidden xl:block"/>  Task Manager
          </h1>
          <p className="text-lg xl:pt-5 w-9/12">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe
            itaque natus, adipisci quia voluptatem quod modi optio odio
            temporibus unde repellat, amet consequuntur tempora rem! Adipisci
            aliquam omnis perspiciatis alias?
          </p>
          <Link to='/login'>
          <button className="btn mt-4 text-blue-900 shadow-md shadow-gray-400/50 font-semibold border-2 border-blue-900 px-2 py-1 xl:px-3 xl:py-2 rounded-md hover:bg-blue-900 hover:text-white transition-transform ">Explore more</button>
          </Link>
        </div>

        {/* for image */}
        <div className="md:w-1/2">
          <img src="../../../src/assets/images/banner.png" alt="" />
        </div>
      </div>
    </Container>
  );
};

export default Banner;
