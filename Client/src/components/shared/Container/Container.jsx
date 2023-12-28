
import PropTypes from 'prop-types'



const Container = ({children}) => {
    return (
      <div className='max-w-screen-2xl bg-[#1B1A17] mx-auto px-2 sm:px-3 md:px-5 lg:px-10'>
          {children}
      </div>
    );
};

export default Container;

Container.propTypes = {
    children: PropTypes.node
}
