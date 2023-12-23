import Lottie from "react-lottie-player";
import animation from "../../assets/animations/loginanimation.json";
import Container from "../../components/shared/Container/Container";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

// icons
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPass, setShowPass] = useState(false);

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

      <div>
        <div className="bg-gray-50 font-Montserrat">
          {/* login container */}

          <div className="bg-gray-100 flex  rounded-2xl shadow-lg max-w-3xl xs:py-4 py-0 sm:p-5">
            {/* form */}
            <div className="sm:w-1/2 px-8">
              <h1 className="font-bold text-2xl text-blue-900 text-center">
                Login
              </h1>
              <p className="text-sm mt-4 text-blue-900 font-medium">
                If you are already a member, easily log in
              </p>
              <form className="flex flex-col gap-4">
                <input
                  className="p-2 mt-8 border rounded-xl"
                  type="email"
                  name="email"
                  placeholder="Email"
                />
                <div className="relative">
                  <input
                    className="p-2 border rounded-xl w-full"
                    type={showPass ? "text" : "password"}
                    name="password"
                    id=""
                    placeholder="Password"
                  />
                  {showPass ? (
                    <FaRegEyeSlash
                      className="absolute top-1/2 right-3 cursor-pointer -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPass((prev) => setShowPass(!prev))}
                    />
                  )
                :
                (
                  <FaRegEye
                    className="absolute top-1/2 right-3 cursor-pointer -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPass((prev) => setShowPass(!prev))}
                  />
                )
                
                }
                </div>
                <button className="rounded-xl text-white bg-[#004080] py-2">
                  Login
                </button>
              </form>
              <div className="mt-10 grid grid-cols-3 text-gray-500 items-center">
                <hr className="border-gray-500" />
                <p className="text-center text-sm">OR</p>
                <hr className="border-gray-500" />
              </div>
              <div>
                <button className="border bg-white py-2 w-full rounded-xl">Login in with google</button>
              </div>
            </div>

            {/* image */}

            <div className="md:w-1/2  sm:block hidden">
              <Lottie
                loop
                animationData={animation}
                play
                className="rounded-2xl bg-[#ADD8E6]"
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;
