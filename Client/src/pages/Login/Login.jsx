import Lottie from "react-lottie-player";
import animation from "../../assets/animations/loginanimation.json";
import Container from "../../components/shared/Container/Container";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const navigate = useNavigate();
  const { logIn, user } = useAuth();

  useEffect(() => {
    if (user) {
      return navigate("/");
    }
  }, [user, navigate]);

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   const email = e.target.email.value;
  //   const password = e.target.password.value;
  //   // console.log(email, password);

  //   logIn(email, password)
  //     .then((result) => {
  //       // console.log(result)
  //       result && toast.success("Login successful!");
  //     })
  //     .catch((error) => {
  //       // console.log(error);
      
  //      error &&  toast.error("Wrong email or Password !!!!");
    
  //     });
  // };
  return (
    <Container>
      <Helmet>
        <title>Task Manager | Login</title>
      </Helmet>
      {/* <div className="flex flex-col md:flex-row justify-center items-center">
      
        <div className="md:w-1/2">
          <Lottie
            loop
            animationData={animation}
            play
            className="object-contain"
          />
        </div>
    

      </div> */}
     <div>
      login

      
     </div>
    </Container>
  );
};

export default Login;
