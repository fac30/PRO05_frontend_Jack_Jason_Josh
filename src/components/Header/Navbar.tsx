import { Link } from "react-router-dom";

const navItemClasses = "hover:text-gray-400";

export default function Navbar() {
  return (
    <nav>
      <ul className="flex justify-between list-none w-full">
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
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
