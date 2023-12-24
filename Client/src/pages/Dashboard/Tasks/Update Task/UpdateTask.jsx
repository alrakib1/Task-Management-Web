import PropTypes from "prop-types";

import { useForm, Controller} from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useParams} from 'react-router-dom'


import toast from "react-hot-toast";
import useAxiosPublic from "../../../../api/useAxiosPublic";

import useTodos from "../../../../api/useTodos";
import { useQuery } from "@tanstack/react-query";



const UpdateTask = () => {

  const params = useParams();

  // console.log(params?.id)

    const {data={} }= useQuery({
        queryKey: ['to-tdo',params?.id], 
        queryFn: async()=>{
                const res = await axiosPublic.get(`/edit/${params?.id}`)
                return res.data;
        }
    })


    


  const axiosPublic = useAxiosPublic();



  const {refetch} = useTodos();

  const { register, handleSubmit, reset, control } = useForm();


  const onSubmit = async (data) => {
    const updatedData = data;
    // console.log(data)

    try {
      const response = await axiosPublic.patch(`/edit/${params?.id}`, updatedData);
        // console.log(response.data);

      const success = response.data.result.modifiedCount;
      if (success) {
        success && toast.success("To do has been updated");
        refetch();
        reset();
      } else {
        toast.error("Failed to update todo !!!");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("An error has occurred !!!");
    }
  };



  return (
    <div className="min-h-[calc(100vh-150px)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 border p-5 rounded-md bg-slate-100 shadow-sm w-full"
      >
        <div>
          <h1 className="mb-2">Title</h1>
          <input
          defaultValue={data?.result?.title}
            name="title"
            {...register("title", { required: true })}
            type="text"
            className="border-2 rounded-md border-slate-400 bg-white h-10 w-full px-1"
          />
        </div>
        <div>
          <h1 className="text-base mb-2">Priority</h1>
          <select
          selected={data?.result?.priority}
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
       Update
        </button>
      </form>
    </div>
  );
};

UpdateTask.propTypes = {
  tasks: PropTypes.array,
  setTasks: PropTypes.func,
};

export default UpdateTask;
