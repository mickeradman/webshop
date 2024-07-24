import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store/store';
import { useAppDispatch } from '../../store/useAppDispatch';
import { fetchProducts } from '../../store/Product/ProductThunks';
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

function ProductFilter() {
  console.log('ProductFilter renderas om...');
  const dispatch = useAppDispatch();
  const { minPrice, maxPrice, search, page, viewLimit } = useSelector(
    (state: RootState) => state.filter
  );

  useEffect(() => {
    dispatch(
      fetchProducts({
        page,
        viewLimit,
        minPrice,
        maxPrice,
        search,
      })
    );
  }, [page, viewLimit, minPrice, maxPrice, search, dispatch]);

  return (
    <FilterWrapper>
      <PriceRangeSlider />
      <ProductSearchInput />
      <ViewLimiter />
    </FilterWrapper>
  );
}

export default ProductFilter;
