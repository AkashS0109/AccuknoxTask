import React, { useState } from 'react';
import '../App.css';
import { CiSearch } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";

export default function Header({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    onSearch(searchTerm); // Call the parent function with the search term
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <div className='outer'>
      <div className='inner'>
        <h4>Home Dashboard</h4>
      </div>
      <div className="search-container">
        <CiSearch className='search-icon' onClick={handleSearchSubmit} />
        <input 
          type='text' 
          placeholder='Search Anything..' 
          className='search-input' 
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown} // Trigger search on 'Enter' key
        />
      </div>
      <FaRegUserCircle className='userlogo' />
    </div>
  );
}
