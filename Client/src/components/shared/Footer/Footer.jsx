import { FaFacebook, FaReddit, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import moment from 'moment';

const Footer = () => {
  return (
    <div className="h-24 text-[#CCCCCC] font-semibold bg-blue-900">
      <div className="flex gap-4 h-[60px] items-center justify-center">
        <Link to="https://www.facebook.com/">
          <FaFacebook className="text-3xl hover:text-white" />
        </Link>

        <Link to="https://www.reddit.com/">
          <FaReddit className="text-3xl hover:text-white" />
        </Link>
        <Link to="https://twitter.com/">
          <FaTwitter className="text-3xl hover:text-white" />
        </Link>
      </div>
      <p className="text-center text-white"> &copy; Taskify { moment().year()}</p>
    </div>
  );
};

export default Footer;
