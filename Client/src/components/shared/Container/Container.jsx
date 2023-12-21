
import PropTypes from 'prop-types'



const Container = ({children}) => {
    return (
      <div className='max-w-screen-2xl mx-auto xs:p-2 sm:p-4 md:p-5 lg:p-7 xl:p-10'>
          {children}
      </div>
    );
};

export default Container;

Container.propTypes = {
    children: PropTypes.node
}
