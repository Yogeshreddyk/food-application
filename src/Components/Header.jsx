import logo from "../../public/FoodLogo1.jpg";
import { Link } from "react-router-dom";
import useOnlineStatus from "../Utils/useOnlineStatus";
import { useContext } from "react";
import UserContext from "../Utils/UserContext";
import { useSelector } from "react-redux";

export const Header = () => {
  const { loggedInUser } = useContext(UserContext);
  const onlineStatus = useOnlineStatus();
  const cartItems = useSelector((store) => store?.cart?.items);
  return (
    <div className="h-[100px] flex justify-between bg-gradient-to-r from-red-800 to-rose-300 shadow-xl backdrop-blur-md bg-opacity-80 rounded-lg">
      <div className="h-[100px] flex">
        <img
          src={logo}
          className="h-[100px] w-[150px] rounded-lg object-cover shadow-[10px_0px_20px_rgba(0,0,0,0.3)]"
          alt="Logo"
        />
      </div>

      <div className="flex ">
        <ul className="flex p-4 m-4 items-center">
          <li className="px-4">
            <div className="flex items-center">
              <span className="mr-2">Online Status:</span>
              {onlineStatus ? <div>✅</div> : <div>❌</div>}
            </div>
          </li>
          <li className="px-4">
            <Link to="/">🏠Home</Link>
          </li>
          <li className="px-4">
            <Link to="/about">👩🏼‍💻About</Link>
          </li>
          <li className="px-4">
            <Link to="/contact">📩Contact Us</Link>
          </li>
          <li className="px-4 flex items-center">
            <Link to="/cart" className="flex items-center space-x-1">
              🛒Cart{" "}
              <span className="p-3 m-0.5 w-6 h-6 bg-orange-500 text-white text-sm flex items-center justify-center rounded">
                {cartItems?.length}
              </span>
            </Link>
          </li>

          <li className="px-4">{loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};
