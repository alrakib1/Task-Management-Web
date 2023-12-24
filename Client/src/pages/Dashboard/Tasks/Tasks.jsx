
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { IoRemoveCircleOutline } from "react-icons/io5";


const Tasks = ({ task, refetch }) => {
    console.log(task)
const  {_id, title } = task;

const handleRemove = ()=>{
console.log(_id)

refetch();
toast.success('Task has been removed', {icon:"💀" })
}

    return (
  
  <div className='relative p-4 mt-8 shadow-md rounded-md cursor-grab'>
      <p>{title}</p>
      <button className='absolute bottom-1 right-1 text-slate-400' onClick={()=>handleRemove()}>
      <IoRemoveCircleOutline className='cursor-pointer'/>
      </button>
    
  </div>
  
    )
  };

Tasks.propTypes = {
    task: PropTypes.object,
    refetch: PropTypes.func
};

export default Tasks;