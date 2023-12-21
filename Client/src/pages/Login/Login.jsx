import Lottie from "react-lottie-player";
import animation from "../../assets/animations/loginanimation.json";
import Container from "../../components/shared/Container/Container";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
    const navigate = useNavigate();
  const { logIn,user } = useAuth();


useEffect(()=>{
    if(user){
        return navigate('/')
      }
},[user,navigate])

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    try {
      const result = logIn(email, password);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
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
        <div className="md:w-1/2 text-center border py-10 px-2 flex items-center justify-center">
          <form onSubmit={handleLogin}>
            <label htmlFor="">
              Email :
              <input
                name="email"
                type="text"
                className="border border-blue-900 mb-5"
              />
            </label>
            <br />
            <label htmlFor="">
              Password :
              <input
                name="password"
                type="text"
                className="border  border-blue-900"
              />
            </label>
            <br />
            <button
              className="text-center btn border-blue-900 text-blue-900 font-semibold border px-2 py-1 mt-5"
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
