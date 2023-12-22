import PropTypes from 'prop-types';

const ListTasks = ({tasks,setTasks}) => {
    return (
        <div>
            List
        </div>
    );
};


ListTasks.propTypes = {
    tasks: PropTypes.array,
    setTasks: PropTypes.func
};


export default ListTasks;