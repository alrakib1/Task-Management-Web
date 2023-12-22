import { useState } from "react";
import CreateTask from "../Tasks/CreateTask";
import ListTasks from "../List/ListTasks";


const Form = () => {
    const [tasks, setTasks] = useState([])
    return (
        <div className="bg-slate-200 w-screen h-screen flex flex-col items-center justify-center pt-3 gap-16">
            <CreateTask tasks={tasks} setTasks={setTasks} ></CreateTask>
            <ListTasks tasks={tasks} setTasks={setTasks}></ListTasks>
        </div>
    );
};

export default Form;