import CreateTask from "../Tasks/CreateTask";
import ListTasks from "../List/ListTasks";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import useTodos from "../../../api/useTodos";

const AllTasks = () => {
  const { todos, refetch } = useTodos();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col-reverse md:flex-row  justify-center pt-3 gap-16">
        <div>
          <CreateTask />
        </div>
        <div className="h-full">
          <ListTasks tasks={todos} refetch={refetch}></ListTasks>
        </div>
      </div>
    </DndProvider>
  );
};

export default AllTasks;
