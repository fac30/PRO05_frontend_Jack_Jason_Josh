import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { useColours } from "../../../hooks/useColours";
import { Colour } from "../../../types/colour";

export default function Searchbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const { colours, fetchColours } = useColours(); 
  const navigate = useNavigate(); 

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Get array of hex codes from the name search endpoint
      const response = await fetch(`http://localhost:5187/search/colourname?name=${searchQuery}`);
      const data = await response.json();
      const hexCodes = data.hexCodes;

      // Array to store all matched colours
      const matchedColours: Colour[] = [];

      // Process each hex code
      for (const hex of hexCodes) {
        // Look for existing colour
        let matchingColour = colours.find((colour) =>
          colour.hex.toLowerCase() === hex.toLowerCase()
        );

        // If no match, create new colour
        if (!matchingColour) {
          const createResponse = await fetch('http://localhost:5187/colours', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ hex }),
          });

          if (!createResponse.ok) {
            throw new Error(`Failed to create colour with hex ${hex}`);
          }

          // Refresh colours context
          await fetchColours();

          // Find the newly created colour
          matchingColour = colours.find((colour) =>
            colour.hex.toLowerCase() === hex.toLowerCase()
          );
        }

        if (matchingColour) {
          matchedColours.push(matchingColour);
        }
      }

      // Navigate to colour page with all matched colours
      navigate("/colourpage", { state: { hexCodes: matchedColours.map(c => c.hex) } });
    } catch (error) {
      console.error('Search failed:', error);
      alert('Search failed. Please try again.');
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
