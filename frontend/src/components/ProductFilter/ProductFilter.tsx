import React from 'react';
import styled from 'styled-components';
import { PriceRangeSlider } from './PriceRangeSlider';
import { ViewLimiter } from './ViewLimiter';
import { ProductSearchInput } from './ProductSearchInput';

const FilterWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  justify-items: center;
  width: 100%;
  margin: 1rem 0;
  padding: 1rem 0;
  column-gap: 2rem;
  background-color: ${({ theme }) => theme.color.filterBg};
`;

export const ProductFilter = React.memo(() => {
  return (
    <FilterWrapper>
      <PriceRangeSlider />
      <ProductSearchInput />
      <ViewLimiter />
    </FilterWrapper>
  );
});
