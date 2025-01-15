import React, { useState } from "react";
import PropTypes from "prop-types";

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    onSearch(search);
  };

  return (
    <div className="mb-2 flex flex-col md:flex-row">
      <input
        type="text"
        placeholder="Search by name or number"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border-2 border-gray-300 rounded"
      />
      <button
        onClick={handleSearch}
        className="p-2 bg-primary text-white rounded mt-2 md:mt-0 md:ml-2"
      >
        Search
      </button>
      {search && (
        <button
          onClick={() => {
            setSearch("");
            onSearch("");
          }}
          className="p-2 bg-transparent rounded md:mt-0 md:ml-2"
        >
          Reset
        </button>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
