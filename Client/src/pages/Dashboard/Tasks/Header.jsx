import PropTypes from "prop-types";

const Header = ({ text, bg, count }) => {
  return (
    <div
      className={`${bg} flex items-center  h-10 pl-4 rounded-md text-[#F0E3CA] `}
    >
      {text}{" "}
      <div className="ml-2 bg-white w-5 h-5 text-black rounded-full flex justify-center items-center">
        {count}
      </div>
    </div>
  );
};

Header.propTypes = {
  text: PropTypes.string,
  bg: PropTypes.string,
  count: PropTypes.number,
};

export default Header;
