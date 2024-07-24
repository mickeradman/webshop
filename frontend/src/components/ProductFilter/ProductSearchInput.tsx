import React, { useRef, useState } from 'react';
import { debounce } from 'lodash';
import ControlledInput from '../Input/ControlledInput';
import { setSearch } from '../../store/Filter/FilterSlice';
import { useAppDispatch } from '../../store/useAppDispatch';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 2;
`;

const StyledLabel = styled.label`
  font-weight: bold;
`;

const searchInputPlaceholder = 'Sök bland produkter...';

export const ProductSearchInput = () => {
  const dispatch = useAppDispatch();

  const [placeholder, setPlaceholder] = useState(searchInputPlaceholder);
  const [localSearch, setLocalSearch] = useState('');

  const debouncedSearchRef = useRef(
    debounce((value: string) => {
      dispatch(setSearch(value));
    }, 500)
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
    debouncedSearchRef.current(e.target.value);
  };

  const handleFocus = () => {
    setPlaceholder('');
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setPlaceholder(searchInputPlaceholder);
    }
  };

  return (
    <Wrapper>
      <StyledLabel>Sök</StyledLabel>
      <ControlledInput
        type='text'
        value={localSearch}
        onChange={handleSearchChange}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </Wrapper>
  );
};
