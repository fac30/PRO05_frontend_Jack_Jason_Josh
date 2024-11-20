import { Link } from "react-router-dom";
import Searchbar from "../Hero/Searchbar/Searchbar";
import { useAuth } from "../../contexts/AuthContext";

export default function Navbar() {
  const { isAuthenticated, username, loading, logout } = useAuth();

  const navLinks = [
    { text: "Home", link: "/" },
    { text: "about", link: "/about" },
    { text: "colours", link: "/colours" },
  ];

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5187/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      logout();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
        {loading ? (
          <div>Loading...</div>
        ) : isAuthenticated ? (
          <>
            <span className="text-white">Welcome, {username}</span>
            <button
              className="hover:bg-gray-200 ml-4 bg-jjjWhite font-semibold rounded-xl px-4"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <button className="hover:bg-gray-200 ml-20 bg-jjjWhite font-semibold rounded-xl w-52 text-lg">
            <Link
              to="/signup"
              className="text-black font-medium tracking-wider"
            >
              Sign Up
            </Link>
          </button>
        )}
      </ul>
    </nav>
  );
}
