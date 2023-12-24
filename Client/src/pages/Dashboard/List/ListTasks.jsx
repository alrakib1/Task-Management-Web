import PropTypes from "prop-types";
import Section from "../Section/Section";

const ListTasks = ({ tasks, refetch}) => {
  // console.log(tasks);

  const todo = tasks.filter((task) => task.status === "to-do");
  const completed = tasks.filter((task) => task.status === "completed");
  const ongoing = tasks.filter((task) => task.status === "ongoing");

  // console.log(ongoing)

  const statuses = ["to-do", "ongoing", "completed"];

  return (
    <div className="flex  flex-col md:flex-row flex-wrap px-3 gap-10">
      {statuses.map((stat, index) => (
        <Section refetch={refetch} key={index} stat={stat} todo={todo} completed={completed} ongoing={ongoing}></Section>
        ))}
    </div>
  );
};
// console.log(stat)

ListTasks.propTypes = {
  tasks: PropTypes.array,
  refetch: PropTypes.func,
};

export default ListTasks;


