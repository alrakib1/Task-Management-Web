
import PropTypes from 'prop-types';



const CreateTask = ({tasks,setTasks}) => {
    return (
        <form>
            <input type="text" className='border-2 border-slate-400 bg-slate-100 mr-4 h-12'/>
            <button>Create</button>
        </form>
    );
};


CreateTask.propTypes = {
    tasks: PropTypes.array,
    setTasks: PropTypes.func
};

export default CreateTask;