import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../../../api/useAxiosPublic";
import { MdEdit } from "react-icons/md";
import { Helmet } from "react-helmet-async";
import { format, parseISO } from "date-fns";

const TaskDetails = () => {
  const params = useParams();

  const axiosPublic = useAxiosPublic();

  const { data = {} } = useQuery({
    queryKey: ["to-tdo", params?.id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/edit/${params?.id}`);
      return res.data.result;
    },
  });

  const { _id, deadline } = data;
  const parsedDeadline = deadline
    ? format(parseISO(deadline), "MMMM dd, yyyy")
    : null;

  return (
    <div className="min-h-[calc(100vh-160px)] flex justify-center items-center w-full">
      <Helmet>
        <title>Taskify | Details</title>
      </Helmet>
      <div className="bg-[#242320] rounded-2xl shadow-lg shadow-[#A35709] md:w-4/6 xl:w-2/4 mx-auto px-10 py-10 space-y-4">
        <h1 className="text-xl font-semibold">Title: {data.title}</h1>
        <p className="text-base font-medium">Priority: {data.priority}</p>
        <p className="text-sm font-medium">Details: {data.description}</p>
        <p className="text-sm font-medium">Deadline: {parsedDeadline}</p>
        <p className="text-sm font-medium">Status: {data.status}</p>
        <div className="flex justify-end gap-10 items-center mt-10">
          <Link to={`/dashboard/edit/${_id}`}>
            <button className="  text-base  text-[#FF8303]">
              <MdEdit className="cursor-pointer" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
