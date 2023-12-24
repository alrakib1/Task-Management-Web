import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://taskify-server-lovat.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
