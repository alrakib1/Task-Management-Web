import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

// icons

import { MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import useAxiosPublic from "../../../api/useAxiosPublic";
import { MdDelete } from "react-icons/md";

const Tasks = ({ task, refetch }) => {
  const { _id, title, priority } = task;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const axiosPublic = useAxiosPublic();

  const handleRemove = () => {
    Swal.fire({
      title: "Do you want to delete this task?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#A35709",
      cancelButtonColor: "#FF8303",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosPublic.delete(`/tasks/${_id}`);
        if (res?.data?.result.deletedCount) {
          toast.success("To do has been deleted", {
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
            icon: "💀",
          });
          refetch();
        }
      }
    });
  };

  return (
    <div
      ref={drag}
      className={`flex h-40 flex-col gap-5 overflow-hidden bg-[#242320] border border-[#A35709] shadow-[#A35709]  p-4 mt-5 shadow-md rounded-md cursor-grab ${
        isDragging ? "opacity-25" : "opacity-100"
      }`}
    >
      <p className="h-20">{title}</p>
      <p className="text-sm">priority: {priority}</p>
      <div className="flex justify-around items-center mt-auto text-[#FF8303] font-semibold">
        <button
          className=" bottom-1 right-1  hover:text-[#A35709]"
          onClick={() => handleRemove()}
        >
          <MdDelete className="cursor-pointer" />
        </button>
        <Link to={`/dashboard/edit/${_id}`}>
          <button className=" bottom-6 text-base right-1 ">
            <MdEdit className="cursor-pointer" />
          </button>
        </Link>
        <Link to={`/dashboard/details/${_id}`}>
          <button className=" bottom-10 text-base right-1 ">
            <FaEye className="cursor-pointer" />
          </button>
        </Link>
      </div>
    </div>
  );
};

Tasks.propTypes = {
  task: PropTypes.object,
  refetch: PropTypes.func,
};

export default Tasks;
