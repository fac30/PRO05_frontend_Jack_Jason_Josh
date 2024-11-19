import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { useColours } from "../../../contexts/ColourContext"; 

export default function Searchbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const { colours } = useColours(); 
  const navigate = useNavigate(); 

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const matchingColour = colours.find((colour) =>
      colour.hex.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!matchingColour) {
      alert("No matching colours found.");
    } else {
      navigate("/colourpage", { state: { hex: matchingColour.hex } });
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="max-w-md min-w-96 mx-auto">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
            placeholder="Search our Colours"
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 bg-jjjBlue hover:bg-[#4e758a]"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
