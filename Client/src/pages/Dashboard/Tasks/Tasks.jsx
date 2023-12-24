import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import toast from "react-hot-toast";
import { IoRemoveCircleOutline } from "react-icons/io5";

const Tasks = ({ task, refetch }) => {
  const { _id, title } = task;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));


  const handleRemove = () => {
    // console.log(_id);

    refetch();
    toast.success("Task has been removed", { icon: "💀" });
  };

  return (
    <div
      ref={drag}
      className={`relative p-4 mt-8 shadow-md rounded-md cursor-grab ${
        isDragging ? "opacity-25" : "opacity-100"
      }`}
    >
      <p>{title}</p>
      <button
        className="absolute bottom-1 right-1 text-slate-400"
        onClick={() => handleRemove()}
      >
        <IoRemoveCircleOutline className="cursor-pointer" />
      </button>
    </div>
  );
};

Tasks.propTypes = {
  task: PropTypes.object,
  refetch: PropTypes.func,
};

export default Tasks;
