import PropTypes from "prop-types";
import Header from "../Tasks/Header";
import Tasks from "../Tasks/Tasks";

const Section = ({ stat, todo, completed, ongoing,refetch }) => {
  let text = "todo";
  let bg = "bg-slate-500";

  let tasksToMap = todo;

  if(stat === 'ongoing'){
    text= "In Progress",
    bg="bg-purple-500"
    tasksToMap = ongoing;
  }
  if(stat === 'completed'){
    text= "completed",
    bg="bg-green-500"
    tasksToMap = completed;
  }

  return (
    <div className="w-64">
      <Header text={text} bg={bg} count={tasksToMap.length}></Header>
      {tasksToMap.length >0 && tasksToMap.map(task=><Tasks refetch={refetch} key={task._id} task={task}>

      </Tasks> ) }
    </div>
  );
};






Section.propTypes = {
  stat: PropTypes.string,
  todo : PropTypes.array, 
  completed: PropTypes.array, 
  ongoing: PropTypes.array,
  refetch: PropTypes.func
};

export default Section;
