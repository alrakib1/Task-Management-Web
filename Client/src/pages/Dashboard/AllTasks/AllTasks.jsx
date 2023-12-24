import CreateTask from "../Tasks/CreateTask";
import ListTasks from "../List/ListTasks";
import useAxiosPublic from "../../../api/useAxiosPublic";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import useTodos from "../../../api/useTodos";

const AllTasks = () => {
  const axiosPublic = useAxiosPublic();

  const { todos, refetch } = useTodos();
  //   console.log(todos)

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center justify-center pt-3 gap-16">
     
        <ListTasks tasks={todos} refetch={refetch}></ListTasks>
      </div>
    </DndProvider>
  );
};

export default AllTasks;
