import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "../hooks/useAuth";




const useCurrentUser = () => {
 const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { data: currentUser = [], refetch } = useQuery({
    queryKey: ["CurrentUser", user?.email],
    queryFn: async () => {
      if (user) {
        const res = await axiosPublic.get(`/profile?email=${user.email}`);
        return res.data;
      }
      return []; 
    },
    enabled: !!user, 
  });

  return { currentUser, refetch };
};

export default useCurrentUser;