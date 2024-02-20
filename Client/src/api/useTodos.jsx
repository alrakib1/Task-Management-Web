import { useQuery } from "@tanstack/react-query";

import useAuth from "../hooks/useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useTodos = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const { data: todos = [], refetch } = useQuery({
    queryKey: ["todos", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/usersTodo?email=${user?.email}`);
      return res.data;
    },
  });

  return { todos, refetch };
};
export default useTodos;
