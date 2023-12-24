
import CreateTask from "../Tasks/CreateTask";
import ListTasks from "../List/ListTasks";
import useAxiosPublic from "../../../api/useAxiosPublic";


import useTodos from "../../../api/useTodos";

const AllTasks = () => {


    const axiosPublic = useAxiosPublic();

  const {todos} = useTodos();
//   console.log(todos)

const handleUpdate = ()=>{
    console.log('update to do')
}

    return (
        <div className="flex flex-col items-center justify-center pt-3 gap-16">
            {/* <CreateTask tasks={tasks} setTasks={setTasks} ></CreateTask> */}
            <ListTasks tasks={todos} handleUpdate={handleUpdate}></ListTasks>
        </div>
    );
};

export default AllTasks;