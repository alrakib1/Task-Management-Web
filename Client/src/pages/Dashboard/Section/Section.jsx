import PropTypes from "prop-types";
import Header from "../Tasks/Header";
import Tasks from "../Tasks/Tasks";
import { useDrop } from "react-dnd";
import useAxiosPublic from "../../../api/useAxiosPublic";
import toast from "react-hot-toast";

const Section = ({ stat, todo, completed, ongoing, refetch }) => {


const axiosPublic = useAxiosPublic();


  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addItemToSection = async(id) => {
    // console.log("dropped ", id, stat);

    const updatedStatus = {
      status: stat
    }

    const response = await axiosPublic.patch(`/tasks/${id}`,updatedStatus);
    // console.log(response.data.result.modifiedCount)
    if(response.data.result.modifiedCount >0){
      toast.success(`Moved to ${stat}`, { icon: "✅" });
      refetch();
    }
  };

  let text = "todo";
  let bg = "bg-slate-500";

  let tasksToMap = todo;

  if (stat === "ongoing") {
    (text = "On going"), (bg = "bg-purple-500");
    tasksToMap = ongoing;
  }
  if (stat === "completed") {
    (text = "completed"), (bg = "bg-green-500");
    tasksToMap = completed;
  }

  return (
    <div ref={drop} className={`w-64 rounded-md p-2 ${isOver ? "bg-slate-200" : ""}`}>
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
