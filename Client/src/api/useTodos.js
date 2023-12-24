import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "../hooks/useAuth";



const useTodos = ()=>{

    const {user} = useAuth();

const axiosPublic = useAxiosPublic();

const {data:todos=[],refetch} = useQuery({
    queryKey: ['todos'],
    queryFn : async()=>{
      const res = await  axiosPublic.get(`/usersTodo?email=${user?.email}`);
      return res.data;
    }
});

return {todos,refetch};
}
export  default useTodos;