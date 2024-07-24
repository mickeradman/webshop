import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { CartProps } from '../../store/Cart/CartSlice';
import ProductItem from './ProductItem';

const ProductListWrapper = styled.div`
  height: 70%;
  overflow-y: scroll;
  scrollbar-width: none;
  padding: 1.5rem 1.5rem 0 1.5rem;
`;

const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 0.75rem;
  padding: 0;
  margin-block-end: 0;
`;

function ProductTable(): JSX.Element {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  return (
    <ProductListWrapper>
      <ProductList>
        {cartItems.map((cartProduct: CartProps) => (
          <ProductItem
            key={cartProduct._id}
            cartProduct={cartProduct}
            cartItems={cartItems}
          />
        ))}
      </ProductList>
    </ProductListWrapper>
  );
}

export default ProductTable;
