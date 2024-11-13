import { Link } from "react-router-dom";
import Searchbar from "../Hero/Searchbar/Searchbar";

const navItemClasses = "hover:text-gray-400";

export default function Navbar() {
  return (
    <nav className="w-screen bg-jjjBlue py-2">
      <ul className="  list-none w-3/4 m-auto flex">
        <div className="flex justify-between items-center uppercase w-1/2 mr-52">
          <li>
            <Link to="/" className={navItemClasses}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className={navItemClasses}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className={navItemClasses}>
              Colours
            </Link>
          </li>
        </div>
        <Searchbar />
      </ul>
    </nav>
  );
}
