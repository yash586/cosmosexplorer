import { useState } from 'react';
import './DiscoverCommon.css';

const SearchBar = ({onSearch}) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(value.trim()) onSearch(value.trim());
  };

  return (
    <form className='search-bar' onSubmit={handleSubmit}>
      <div className='input-group search-bar_group'>
        <input
        type='text'
        className='form-control search-bar_input'
        placeholder='Search Nasa images... e.g. "mars", "nebula", "astronaut"'
        value={value}
        onChange={(e) => setValue(e.target.value)} 
        />
        <button type='submit' className='btn search-bar_btn'>Search</button>
      </div>
    </form>
  );
};

export default SearchBar;