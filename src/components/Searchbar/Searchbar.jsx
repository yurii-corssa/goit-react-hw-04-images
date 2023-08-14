import { Input } from 'components/Input/Input';
import { SearchBar, SearchBtn, SearchIcon } from './Searchbar.styled';
import { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(query);
    setQuery('');
  };

  return (
    <SearchBar onSubmit={handleSubmit}>
      <Input
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <SearchBtn type="submit">
        <SearchIcon />
      </SearchBtn>
    </SearchBar>
  );
};
