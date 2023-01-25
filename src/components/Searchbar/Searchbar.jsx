import { useState } from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import {
  Header,
  Form,
  SearchButton,
  ButtonLabel,
  Input,
} from './Searchbar.styles';

export function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = e => {
    const { value } = e.target;
    const normalizedValue = value.toLowerCase();
    setSearchQuery(normalizedValue);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast.error('Please start typing the searching query');
      return;
    }
    onSubmit(searchQuery.trim());
    setSearchQuery('');
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <ButtonLabel>Search</ButtonLabel>
        </SearchButton>
        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          name="searchQuery"
          value={searchQuery}
        />
      </Form>
    </Header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
