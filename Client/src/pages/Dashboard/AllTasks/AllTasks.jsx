import ListTasks from "../List/ListTasks";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import useTodos from "../../../api/useTodos";

const AllTasks = () => {
  const { todos, refetch } = useTodos();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-full min-w-max">
        <ListTasks tasks={todos} refetch={refetch}></ListTasks>
      </div>
    </DndProvider>
  );
};

export default AllTasks;
