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

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(email, password);

    logIn(email, password)
      .then((result) => {
        // console.log(result)
        result && toast.success("Login successful!");
      })
      .catch((error) => {
        // console.log(error);
      
       error &&  toast.error("Wrong email or Password !!!!");
    
      });
  };
  return (
    <Container>
      <Helmet>
        <title>Task Manager | Login</title>
      </Helmet>
      <div className="flex flex-col md:flex-row justify-center items-center">
        {/* animation */}
        <div className="md:w-1/2">
          <Lottie
            loop
            animationData={animation}
            play
            className="object-contain"
          />
        </div>
        {/* form */}
        <div className="md:w-1/2 text-center border-2 border-blue-900 bg-slate-50 rounded-md py-10 px-2 flex items-center justify-center">
  <form onSubmit={handleLogin} className="flex items-center justify-center flex-col text-blue-900 font-bold">
    <div className="flex justify-around mb-4 w-full">
      <label htmlFor="email" className="w-1/2">Email </label>
      <input
        name="email"
        type="text"
        className="border border-blue-900 ml-2 p-1"
      />
    </div>
    <div className="flex justify-around mb-4 w-full">
      <label htmlFor="password" className="w-1/2">Password </label>
      <input
        name="password"
        type="password"
        className="border border-blue-900 ml-2 p-1"
      />
    </div>
    <button
      className="text-center hover:bg-blue-900 hover:text-white rounded-md transition-transform font-semibold btn border-blue-900 text-blue-900 border px-2 py-1 mt-2"
      type="submit"
    >
      Login
    </button>
  </form>
</div>

      </div>
    </Container>
  );
};

export default Login;
