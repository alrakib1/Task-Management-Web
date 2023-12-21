import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const NotLoggedUser = ({ children }) => {
  const navigate = useNavigate();

  const { user } = useAuth();

  if (user) {
    return navigate("/");
  }
  return { children };
};

NotLoggedUser.propTypes = {
  children: PropTypes.node,
};

export default NotLoggedUser;
