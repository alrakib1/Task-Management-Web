import PropTypes from "prop-types";
import Section from "../Section/Section";

const ListTasks = ({ tasks, refetch }) => {
  // console.log(tasks);

  const todo = tasks.filter((task) => task.status === "to-do");
  const completed = tasks.filter((task) => task.status === "completed");
  const ongoing = tasks.filter((task) => task.status === "ongoing");

  // console.log(ongoing)

  const statuses = ["to-do", "ongoing", "completed"];

  return (
    <div className="min-h-[calc(100vh-150px)] flex justify-center md:pt-10 xl:pt-32 2xl:pt-48">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  px-3 gap-10">
        {statuses.map((stat, index) => (
          <Section
            refetch={refetch}
            key={index}
            stat={stat}
            todo={todo}
            completed={completed}
            ongoing={ongoing}
          ></Section>
        ))}
      </div>
    </div>
  );
};
// console.log(stat)

ListTasks.propTypes = {
  tasks: PropTypes.array,
  refetch: PropTypes.func,
};

export default ListTasks;
