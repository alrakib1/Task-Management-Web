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
import useAxiosPublic from "../../api/useAxiosPublic";

const Signup = () => {
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();
  const { signUp, user, loginWithGmail, updateUser } = useAuth();

  const { register, handleSubmit } = useForm();

  const axiosPublic = useAxiosPublic();

  // TODO: change the navigate route after signup instead of useeffect

  useEffect(() => {
    if (user) {
      return navigate("/");
    }
  }, [navigate]);

  const image_hosting_key = import.meta.env.VITE_IMGBB;

  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const onSubmit = async (data) => {
    const email = data.email;
    const name = data.name;
    const password = data.password;
    const photo = data.photo[0];

    const formData = new FormData();
    formData.append("image", photo);

    const response = await axiosPublic.post(image_hosting_api, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const avatarImage = await response.data.data.display_url;

    if (response.data.success) {
      const userData = {
        name,
        email,
        avatarImage,
      };

      signUp(email, password)
        .then((result) => {
          const newUser = result.user;
          axiosPublic.post("/users", userData);

          newUser &&
            toast.success("signup successful", {
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

          updateUser(name, avatarImage)
            .then(() => {
              // console.log("profile updated");
              navigate("/");
            })
            .catch(() => {
              // console.log(error);
            });
        })
        .catch((error) => {
          // console.log(error);
          error.code === "auth/email-already-in-use" &&
            toast.error("User already exits !!!", {
              style: {
                border: "1px solid #FF8303",
                padding: "16px",
                color: "white",
                backgroundColor: "#242320",
              },
            });
          error.code === "auth/weak-password" &&
            toast.error("Password Must be 6 characters  !!!", {
              style: {
                border: "1px solid #FF8303",
                padding: "16px",
                color: "white",
                backgroundColor: "#242320",
              },
            });
        });
    }
  };

  const handleGoogleSignup = () => {
    loginWithGmail()
      .then((result) => {
        const newUser = result.user;
        newUser &&
          toast.success("Signup successful", {
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
        // console.log(user);
        navigate("/");
      })
      .catch(() => {
        // console.log(error);
      });
  };

  return (
    <Container>
      <Helmet>
        <title>Taskify | Signup</title>
      </Helmet>

      <div>
        <div className="bg-[#242320] font-Montserrat rounded-2xl">
          {/* Signup container */}

          <div className="bg-[#242320] flex  flex-row-reverse rounded-2xl shadow-lg max-w-3xl xs:py-4 py-0 sm:p-5 items-center">
            {/* form */}
            <div className="md:w-1/2 px-8">
              <h1 className="font-bold text-2xl text-[#A35709] text-center">
                Signup
              </h1>
              <p className="text-sm mt-4 text-center font-medium">
                New here ? Signup easily
              </p>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  className="p-2 mt-8 border rounded-xl font-medium text-black"
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  {...register("name", { required: true })}
                />
                <input
                  className="p-2 xs:w-11/12 md:w-full border file:bg-white file:text-[#A35709] file:font-medium font-sm file:border-gray-500 file:border file:rounded-xl rounded-xl"
                  type="file"
                  name="photo"
                  {...register("photo", { required: true })}
                />
                <input
                  className="p-2  border rounded-xl font-medium text-black"
                  type="email"
                  name="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
                <div className="relative">
                  <input
                    className="p-2 border rounded-xl w-full font-medium text-black"
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
                <button className="rounded-xl text-white bg-[#A35709] hover:bg-[#FF8303] py-2 hover:scale-105 duration-300">
                  Signup
                </button>
              </form>
              <div className="mt-10 grid grid-cols-3 text-gray-500 items-center">
                <hr className="border-gray-500" />
                <p className="text-center text-sm">OR</p>
                <hr className="border-gray-500" />
              </div>
              <div>
                <button
                  onClick={() => handleGoogleSignup()}
                  className="border bg-[#A35709] py-2 w-full rounded-xl mt-5 flex justify-center items-center hover:scale-105 duration-300 hover:bg-[#FF8303] hover:text-white"
                >
                  <FaGoogle className="w-[25px] mr-1 text-sm" />
                  Signup in with google
                </button>
              </div>

              <div className="text-xs mt-3 flex justify-between items-center">
                <p>Already have an account ....</p>
                <Link to="/login">
                  <button className="py-2 px-5 bg-[#1B1A17] border rounded-xl hover:bg-[#FF8303] hover:text-white hover:scale-110 duration-300">
                    Login
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

export default Signup;
