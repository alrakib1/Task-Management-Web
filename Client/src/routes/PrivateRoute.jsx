import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import PacmanLoader from "react-spinners/PacmanLoader";

const PrivateRoute = ({ children }) => {
  const { loading, user } = useAuth();

  return loading ? (
    <div className="min-h-screen flex justify-center items-center">
      <PacmanLoader color="#FF8303" loading size={20} />
    </div>
  ) : (
    user && children
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
