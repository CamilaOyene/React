import React, { useState } from 'react';

function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleTextChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className="d-flex" role="search">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Motorola"
        aria-label="Search"
        value={searchTerm}
        onChange={handleTextChange}
      />
      <button
        className="btn btn-outline-success"
        type="button"
        onClick={(e) => handleSearch(e)}
      >
        Buscar
      </button>
    </form>
  );
}

export default Search;
