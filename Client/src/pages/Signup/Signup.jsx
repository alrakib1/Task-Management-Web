import Lottie from "react-lottie-player";
import animation from "../../assets/animations/loginanimation.json";
import Container from "../../components/shared/Container/Container";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const Signup = () => {
  const navigate = useNavigate();
  const { Signup, user } = useAuth();

  useEffect(() => {
    if (user) {
      return navigate("/");
    }
  }, [user, navigate]);

  const handleSignup = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const photo = e.target.photo.value;

    console.log(email, password, name,photo);

    // Signup(email, password)
    //   .then((result) => {
    //     // console.log(result)
    //     result && toast.success("Signup successful!");
    //   })
    //   .catch((error) => {
    //     // console.log(error);
      
    //    error &&  toast.error("Please recheck and try again !!!!");
    
    //   });
  };
  return (
    <Container>
      <Helmet>
        <title>Task Manager | Signup</title>
      </Helmet>
      {/* <div className="flex flex-col md:flex-row justify-center items-center">
  
        <div className="md:w-1/2 ">
          <Lottie
            loop
            animationData={animation}
            play
            className="object-contain"
          />
        </div>
    
        <div className="md:w-1/2  text-center border-2 border-blue-900 bg-slate-50 rounded-md py-10 px-2 flex items-center justify-center">
  <form onSubmit={handleSignup} className="flex  items-center justify-center flex-col text-blue-900 font-bold">
    <div className="flex justify-around mb-4 w-full">
      <label htmlFor="name" className="w-1/2">Name </label>
      <input
        name="name"
        type="text"
        className="border border-blue-900 ml-2 p-1"
      />
    </div>
    <div className="flex justify-around mb-4 w-full">
      <label htmlFor="photo" className="w-1/2">Photo </label>
      <input type="file" name="photo" id="" accept="image/*"/>
    </div>
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
      Signup
    </button>
  </form>
</div>

      </div> */}
      <div>
        signup
      </div>
    </Container>
  );
};

export default Signup;
