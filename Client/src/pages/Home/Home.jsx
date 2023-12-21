import { Helmet } from "react-helmet-async";
import Banner from "../../components/Banner/Banner";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Task Manager | Home</title>
      </Helmet>
      <Banner />
    </div>
  );
};

export default Home;
