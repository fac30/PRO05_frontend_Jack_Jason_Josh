import { Link } from "react-router-dom";
import Searchbar from "../Hero/Searchbar/Searchbar";

export default function Navbar() {
  const navLinks = [
    { text: "Home", link: "/" },
    { text: "about", link: "/about" },
    { text: "colours", link: "/colours" },
  ];

  return (
    <nav className="w-screen bg-jjjBlue py-2 mb-24">
      <ul className="  list-none w-3/4 m-auto flex">
        <div className="flex justify-between items-center uppercase w-1/2 mr-52">
          {navLinks.map((link) => {
            return (
              <li key={link.text}>
                <Link
                  key={link.link}
                  to={link.link}
                  className="text-jjjWhite font-medium tracking-wider hover:text-gray-300"
                >
                  {link.text}
                </Link>
              </li>
            );
          })}
        </div>
        <Searchbar />
        <button className="hover:bg-gray-200 ml-20 px-4 py-2 bg-jjjWhite font-semibold rounded-xl w-52 text-lg">
          Log In
        </button>
      </ul>
    </nav>
  );
}
