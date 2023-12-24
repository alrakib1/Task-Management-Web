
import CreateTask from "../Tasks/CreateTask";
import ListTasks from "../List/ListTasks";
import useAxiosPublic from "../../../api/useAxiosPublic";


import useTodos from "../../../api/useTodos";

const AllTasks = () => {


    const axiosPublic = useAxiosPublic();

  const {todos, refetch} = useTodos();
//   console.log(todos)


    return (
        <div className="flex flex-col items-center justify-center pt-3 gap-16">
            {/* <CreateTask tasks={tasks} setTasks={setTasks} ></CreateTask> */}
            <ListTasks tasks={todos}  refetch={refetch}></ListTasks>
        </div>
    );
};

export default AllTasks;