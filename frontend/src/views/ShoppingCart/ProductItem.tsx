import React from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../store/useAppDispatch';
import {
  AddRemoveIconsContainer,
  StyledRemoveIcon,
  QuantityContainer,
  Quantity,
  StyledAddIcon,
} from '../../styles/styles';
import { IMG_EXTENSION } from '../../utils/constants';
import { CURRENCY } from '../../utils/constants';
import { getAddedToCartQty } from '../../utils/helperFunctions/getAddedToCartQty';
import { createHandleModifyCart } from '../../utils/helperFunctions/handleModifyCart';
import { CartProps } from '../../store/Cart/CartSlice';

const ProductListItem = styled.li`
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 1 / span 4;
  gap: 2rem;
  align-items: center;
  justify-items: left;
  list-style: none;
  border-bottom: 1px solid ${({ theme }) => theme.color.delimiterSecondary};
  padding: 1rem 0;
  flex-wrap: wrap;

  p {
    margin: 0;
  }

  &:last-child {
    border: none;
  }
`;

const ProductImage = styled.img`
  width: 6rem;
  height: 6rem;
  object-fit: contain;
  justify-self: center;
`;

const ProductPrice = styled.p`
  /* justify-self: center; */
`;

interface ProductItemProps {
  cartProduct: CartProps;
  cartItems: CartProps[];
}

const ProductItem: React.FC<ProductItemProps> = ({
  cartProduct,
  cartItems,
}) => {
  const dispatch = useAppDispatch();
  const { qty, ...product } = cartProduct;
  const handleModifyCart = createHandleModifyCart({ dispatch, product });

  return (
    <ProductListItem key={cartProduct._id}>
      <ProductImage
        src={cartProduct.imgPath + IMG_EXTENSION}
        alt={cartProduct.productName}
      />
      <p>{cartProduct.productName}</p>
      <ProductPrice>
        {getAddedToCartQty(cartProduct._id, cartItems) * cartProduct.price}{' '}
        {CURRENCY}
      </ProductPrice>
      <AddRemoveIconsContainer className='visible no-border'>
        <StyledRemoveIcon onClick={handleModifyCart('remove')} />
        <QuantityContainer>
          <Quantity>{getAddedToCartQty(cartProduct._id, cartItems)}</Quantity>
        </QuantityContainer>
        <StyledAddIcon onClick={handleModifyCart('add')} />
      </AddRemoveIconsContainer>
    </ProductListItem>
  );
};

export default ProductItem;
