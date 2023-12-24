import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";

const CreateTask = ({ tasks, setTasks }) => {
  const { register, handleSubmit } = useForm();

  const [task, setTask] = useState({
    id: "",
    title: "",
    status: "todo", //can also be inprogress or closed;
    priority: "medium",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  console.log(task);

  return (
    <div className="min-h-[calc(100vh-150px)] flex justify-center items-center">
        <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 border p-10 rounded-md bg-slate-100 shadow-sm w-full"
    >
      <div>
        <h1 className="mb-2">Title</h1>
        <input
          name="title"
          {...register("title", { required: true })}
          type="text"
          className="border-2 rounded-md border-slate-400 bg-white h-12 w-full px-1"
          onChange={(e) => setTask({ ...task, id: "", title: e.target.value })}
        />
      </div>
      <div>
        <h1 className="text-base mb-2">Priority</h1>
        <select
          className="border px-2 border-slate-400 bg-white rounded-md py-2 w-full"
          {...register("priority", { required: true })}
        >
          <option >Low</option>
          <option >Medium</option>
          <option >high</option>
        </select>
      </div>
      <div>
        <h2>Description</h2>
        <textarea
          name="description"
          id=""
          cols="30"
          rows="10"
          className="rounded-md p-2 border-slate-400 bg-white  border "
          {...register("description", { required: true })}
        ></textarea>
      </div>
      <button className="rounded-md text-white bg-[#004080] py-2 px-4 hover:scale-x-105 duration-300">
        Create
      </button>
    </form>
    </div>
  );
};

CreateTask.propTypes = {
  tasks: PropTypes.array,
  setTasks: PropTypes.func,
};

export default CreateTask;
