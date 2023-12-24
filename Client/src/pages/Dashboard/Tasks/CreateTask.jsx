import PropTypes from "prop-types";

import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosPublic from "../../../api/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import useTodos from "../../../api/useTodos";

const CreateTask = () => {
  const axiosPublic = useAxiosPublic();

  const { user } = useAuth();

  const {refetch} = useTodos();

  const { register, handleSubmit, reset, control } = useForm();

  const email = user?.email;
  const status = "to-do";

  const onSubmit = async (data) => {
    const todoData = { ...data, email, status };

    try {
      const response = await axiosPublic.post("/todo", todoData);
      //   console.log(response.data);

      const success = response.data.result.insertedId;
      if (success) {
        success && toast.success("To do has been added");
        refetch();
        reset();
      } else {
        toast.error("Failed to add todo !!!");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("An error has occurred !!!");
    }
  };

  // console.log(email)

  return (
    <div className="min-h-[calc(100vh-150px)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 border p-5 rounded-md bg-slate-100 shadow-lg w-full"
      >
        <div>
          <h1 className="mb-2">Title</h1>
          <input
            name="title"
            {...register("title", { required: true })}
            type="text"
            className="border-2 rounded-md border-slate-400 bg-white h-10 w-full px-1"
          />
        </div>
        <div>
          <h1 className="text-base mb-2">Priority</h1>
          <select
            className="border px-2 border-slate-400 bg-white rounded-md py-2 w-full"
            {...register("priority", { required: true })}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>high</option>
          </select>
        </div>
        <div>
          <h1 className="mb-2">Deadline</h1>
          <Controller
            control={control}
            name="deadline"
            render={({ field }) => (
              <DatePicker
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                isClearable
                className="py-2 px-2 rounded-md w-full"
                selected={field.value}
                onChange={(date) => field.onChange(date)}
              />
            )}
          />
        </div>
        <div>
          <h2>Description</h2>
          <textarea
            name="description"
            id=""
            cols="30"
            rows="5"
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
