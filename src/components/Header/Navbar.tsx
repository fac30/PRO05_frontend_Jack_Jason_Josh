import { Link } from "react-router-dom";
import Searchbar from "../Hero/Searchbar/Searchbar";

export default function Navbar() {
  const navLinks = ["Home", "about", "colours"];

  return (
    <nav className="w-screen bg-jjjBlue py-2">
      <ul className="  list-none w-3/4 m-auto flex">
        <div className="flex justify-between items-center uppercase w-1/2 mr-52">
          {navLinks.map((link) => {
            return (
              <li>
                <Link
                  to="/"
                  className="text-jjjWhite font-medium tracking-wider hover:text-gray-300"
                >
                  {link}
                </Link>
              </li>
            );
          })}
        </div>
        <Searchbar />
      </ul>
    </nav>
  );
}
