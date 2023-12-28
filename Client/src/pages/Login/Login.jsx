/* eslint-disable react/no-unescaped-entities */
import Lottie from "react-lottie-player";
import animation from "../../assets/animations/loginanimation.json";
import Container from "../../components/shared/Container/Container";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";

// icons
import { FaGoogle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();
  const { logIn, user, loginWithGmail } = useAuth();

  const { register, handleSubmit } = useForm();

  // TODO: change the navigate route after login instead of useeffect

  useEffect(() => {
    if (user) {
      return navigate("/");
    }
  }, [user, navigate]);

  const onSubmit = (data) => {
    const email = data?.email;
    const password = data?.password;

    logIn(email, password)
      .then((result) => {
        // console.log(result)
        result &&
          toast.success("Login successful", {
            style: {
              border: "1px solid #FF8303",
              padding: "16px",
              color: "white",
              backgroundColor: "#242320",
            },
            iconTheme: {
              primary: "#FF8303",
              secondary: "#FFFAEE",
            },
          });
      })
      .catch((error) => {
        // console.log(error);

        error &&
          toast.error("Wrong Email or Password !!!", {
            style: {
              border: "1px solid #FF8303",
              padding: "16px",
              color: "white",
              backgroundColor: "#242320",
            },
          });
      });
  };

  const handleGoogleLogin = () => {
    loginWithGmail()
      .then((result) => {
        const user = result.user;
        user &&
          toast.success("Login successful", {
            style: {
              border: "1px solid #FF8303",
              padding: "16px",
              color: "white",
              backgroundColor: "#242320",
            },
            iconTheme: {
              primary: "#FF8303",
              secondary: "#FFFAEE",
            },
          });
        // console.log(user)
      })
      .catch(() => {
        toast.error("An error has occurred !!!", {
          style: {
            border: "1px solid #FF8303",
            padding: "16px",
            color: "white",
            backgroundColor: "#242320",
          },
        });
      });
  };

  return (
    <Container>
      <Helmet>
        <title>Taskify | Login</title>
      </Helmet>

      <div>
        <div className="bg-[#242320] rounded-2xl font-Montserrat">
          {/* login container */}

          <div className="bg-[#242320] flex  rounded-2xl shadow-lg max-w-3xl xs:py-4 py-0 sm:p-5 items-center">
            {/* form */}
            <div className="md:w-1/2 px-8">
              <h1 className="font-bold text-2xl text-[#A35709] text-center">
                Login
              </h1>
              <p className="text-sm mt-4 font-medium">
                If you are already a member, easily log in
              </p>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  className="p-2 mt-8 border rounded-xl text-black font-medium"
                  type="email"
                  name="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
                <div className="relative">
                  <input
                    className="p-2 border rounded-xl w-full text-black font-medium"
                    type={showPass ? "text" : "password"}
                    name="password"
                    id=""
                    placeholder="Password"
                    {...register("password", { required: true })}
                  />
                  {showPass ? (
                    <FaRegEyeSlash
                      className="absolute top-1/2 right-3 cursor-pointer -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPass((prev) => setShowPass(!prev))}
                    />
                  ) : (
                    <FaRegEye
                      className="absolute top-1/2 right-3 cursor-pointer -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPass((prev) => setShowPass(!prev))}
                    />
                  )}
                </div>
                <button className="rounded-xl text-[#F0E3CA] bg-[#A35709] hover:bg-[#FF8303] py-2 hover:scale-105 duration-300">
                  Login
                </button>
              </form>
              <div className="mt-10 grid grid-cols-3 text-gray-500 items-center">
                <hr className="border" />
                <p className="text-center text-[#F0E3CA] text-sm">OR</p>
                <hr className="border" />
              </div>
              <div>
                <button
                  onClick={() => handleGoogleLogin()}
                  className="border bg-[#A35709] py-2 w-full rounded-xl mt-5 flex justify-center items-center hover:scale-105 duration-300 hover:bg-[#FF8303] hover:text-[#F0E3CA]"
                >
                  <FaGoogle className="w-[25px] mr-1 text-sm" />
                  Login in with google
                </button>
              </div>
              <a href="">
                <div className="mt-10 text-sm border-b border-gray-400 py-4">
                  Forgot your password ?
                </div>
              </a>
              <div className="text-xs mt-3 flex justify-between items-center">
                <p>If you don't have account....</p>
                <Link to="/signup">
                  <button className="py-2 px-5 bg-[#1B1A17] border rounded-xl hover:bg-[#FF8303] hover:text-[#F0E3CA] hover:scale-110 duration-300">
                    Signup
                  </button>
                </Link>
              </div>
            </div>

            {/* image */}

            <div className="md:w-1/2  sm:block hidden">
              <Lottie
                loop
                animationData={animation}
                play
                className="rounded-2xl h-full object-contain bg-[#A35709]"
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;
