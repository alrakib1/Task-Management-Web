import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

// icons
import { IoRemoveCircleOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import useAxiosPublic from "../../../api/useAxiosPublic";

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

  const handleRemove = async () => {
    const res = await axiosPublic.delete(`/tasks/${_id}`);
    console.log(res.data);

    // console.log(_id);

    (res?.data?.result.deletedCount ) &&
      toast.success("Task has been removed", { icon: "💀" }) &&   refetch();
  
  };

  return (
    <div
      ref={drag}
      className={` p-4 mt-8 shadow-md rounded-md cursor-grab ${
        isDragging ? "opacity-25" : "opacity-100"
      }`}
    >
      <p>{title}</p>
      <p className="text-sm">priority: {priority}</p>
      <div className="mt-5 flex justify-around items-center">
        <button
          className=" bottom-1 right-1 text-slate-400 hover:text-blue-900"
          onClick={() => handleRemove()}
        >
          <IoRemoveCircleOutline className="cursor-pointer" />
        </button>
        <Link to={`/dashboard/edit/${_id}`}>
          <button className=" bottom-6 text-base right-1 text-slate-400">
            <MdEdit className="cursor-pointer" />
          </button>
        </Link>
        <Link to={`/dashboard/details/${_id}`}>
          <button
            className=" bottom-10 text-base right-1 text-slate-400"
            onClick={() => handleRemove()}
          >
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
