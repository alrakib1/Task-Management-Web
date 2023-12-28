import PropTypes from "prop-types";

import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";

import toast from "react-hot-toast";
import useAxiosPublic from "../../../../api/useAxiosPublic";

import useTodos from "../../../../api/useTodos";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

const UpdateTask = () => {
  const params = useParams();

  // console.log(params?.id)

  const { data = {}, refetch: loaded } = useQuery({
    queryKey: ["to-tdo", params?.id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/edit/${params?.id}`);
      return res.data.result;
    },
  });

  const axiosPublic = useAxiosPublic();

  const { refetch } = useTodos();

  const { register, handleSubmit, reset, control } = useForm();

  const status = data?.status;
  // console.log(status)

  const onSubmit = async (data) => {
    const updatedData = { ...data, status };
    // console.log(data)

    try {
      const response = await axiosPublic.patch(
        `/edit/${params?.id}`,
        updatedData
      );
      // console.log(response.data);

      const success = response.data.result.modifiedCount;
      if (success) {
        toast.success("To do has been updated", {
          style: {
            border: "1px solid #FF8303",
            padding: "16px",
            color: "white",
            backgroundColor: "#242320",
          },
          iconTheme: {
            primary: "#FF8303",
            secondary: "#FFFAEE",
          },
        });
        refetch();
        loaded();
        reset();
      } else {
        toast.error("Failed to update todo !!!",{
          style: {
            border: "1px solid #FF8303",
            padding: '16px',
            color: 'white',
            backgroundColor: "#242320",
          }
        });
      }
    } catch (error) {
      toast.error("An error has occurred !!!",{
        style: {
          border: "1px solid #FF8303",
          padding: '16px',
          color: 'white',
          backgroundColor: "#242320",
        }
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-150px)]  md:w-3/4 lg:w-1/2 mx-auto flex justify-center items-center">
      <Helmet>
        <title>Taskify | Update</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 border p-5 rounded-md bg-[#242320] border-[#A35709] shadow-[#A35709] shadow-lg w-full"
      >
        <div>
          <h1 className="mb-2">Title</h1>
          <input
            defaultValue={data?.title}
            name="title"
            {...register("title", { required: true })}
            type="text"
            className="border-2 rounded-md border-slate-400 bg-[#1B1A17]  h-10 w-full px-1"
          />
        </div>
        <div>
          <h1 className="text-base mb-2">Priority</h1>
          <select
            selected={data?.priority}
            className="border px-2 border-slate-400 bg-[#1B1A17]  rounded-md py-2 w-full"
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
                className="py-2 px-2 rounded-md w-full bg-[#1B1A17] "
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
            className="rounded-md p-2 border-slate-400 bg-[#1B1A17] border "
            {...register("description", { required: true })}
          ></textarea>
        </div>
        <button className="rounded-md text-[#F0E3CA] bg-[#A35709] py-2 px-4 hover:scale-x-105 duration-300">
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
