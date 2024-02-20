import PropTypes from "prop-types";
import Header from "../Tasks/Header";
import Tasks from "../Tasks/Tasks";
import { useDrop } from "react-dnd";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../api/useAxiosSecure";

const Section = ({ stat, todo, completed, ongoing, refetch }) => {
const axiosSecure = useAxiosSecure();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addItemToSection = async (id) => {


    const updatedStatus = {
      status: stat,
    };

    const response = await axiosSecure.patch(`/tasks/${id}`, updatedStatus);

    if (response.data.result.modifiedCount > 0) {
      toast.success(`Moved to ${stat}`, {
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
      refetch();
    }
  };

  let text = "todo";
  let bg = "bg-[#FF8303]";

  let tasksToMap = todo;

  if (stat === "ongoing") {
    (text = "On going"), (bg = "bg-[#FF8303]");
    tasksToMap = ongoing;
  }
  if (stat === "completed") {
    (text = "completed"), (bg = "bg-[#FF8303]");
    tasksToMap = completed;
  }

  return (
    <div
      ref={drop}
      className={`w-64 rounded-md p-2 ${isOver ? "bg-slate-200" : ""}`}
    >
      <Header text={text} bg={bg} count={tasksToMap.length}></Header>
      {tasksToMap.length > 0 &&
        tasksToMap.map((task) => (
          <Tasks refetch={refetch} key={task._id} task={task}></Tasks>
        ))}
    </div>
  );
};

Section.propTypes = {
  stat: PropTypes.string,
  todo: PropTypes.array,
  completed: PropTypes.array,
  ongoing: PropTypes.array,
  refetch: PropTypes.func,
};

export default Section;
