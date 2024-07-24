import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import styled from "styled-components";

import { useAppDispatch } from "../../store/useAppDispatch";
import { Product } from "../../types/types";
import { IMG_EXTENSION } from "../../utils/constants";
import { CURRENCY } from "../../utils/constants";
import { getAddedToCartQty } from "../../utils/helperFunctions/getAddedToCartQty";
import {
  AddRemoveIconsContainer,
  StyledRemoveIcon,
  StyledAddIcon,
  QuantityContainer,
  Quantity,
  AddRemoveWrapper,
} from "../../styles/styles";
import { createHandleModifyCart } from "../../utils/helperFunctions/handleModifyCart";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content ;
  border-radius: 0.3rem;
  /* border: 1px solid ${({ theme }) => theme.color.productCardBgOnHover}; */
  box-shadow: 0 0 4px rgb(238, 255, 239);
  color: ${({ theme }) => theme.color.textPrimary};
  background: ${({ theme }) => theme.color.productCardBg};

  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.color.productCardBgOnHover};
    transform: scale(1.02);

    .visible-on-hover {
      visibility: visible !important;
    }
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 16rem;
  object-fit: contain;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.borderPrimary};
`;

const StyledBottomContainer = styled.div`
  display: flex;
  /* justify-content: space-between; */
  width: 100%;
`;

const StyledTitlePriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  width: calc(60%);
  color: ${({ theme }) => theme.color.textPrimary};
  border: none;
  background: transparent;
  margin-top: 0.5rem;
`;

const StyledListTitle = styled.p`
  display: inline-block;
  align-self: flex-start;
  font-weight: normal;
  width: calc(100%);
  margin: 0.25rem 0;
  padding: 0 0.5rem;
  color: ${({ theme }) => theme.color.textPrimary};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const StyledListPrice = styled.p`
  font-size: 1.2rem;
  margin: 0.25rem 0 0.5rem;
  padding: 0 0.5rem;
  color: ${({ theme }) => theme.color.textPrimary};
`;

const NotInStock = styled.h3`
  margin: 0;
  padding: 0.2rem 0.5rem;
  color: ${({ theme }) => theme.color.textPrimary};
`;

type ProductCardProps = {
  product: Product;
  openProductDetails: () => void;
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  openProductDetails,
}) => {
  const dispatch = useAppDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const handleModifyCart = createHandleModifyCart({ dispatch, product });

  return (
    <Card onClick={openProductDetails}>
      <StyledImage
        src={product.imgPath + IMG_EXTENSION}
        alt={product.productName}
      />
      <StyledBottomContainer>
        <StyledTitlePriceContainer>
          <StyledListTitle>{product.productName}</StyledListTitle>
          <StyledListPrice>
            {product.price
              ? `${product.price} ${CURRENCY}`
              : "Ej prissatt ännu"}
          </StyledListPrice>
        </StyledTitlePriceContainer>
        <AddRemoveWrapper>
          <AddRemoveIconsContainer
            className={`${
              getAddedToCartQty(product._id, cartItems) > 0
                ? "visible"
                : "hidden"
            } visible-on-hover no-border ${
              product.stockQty === 0 && "no-border"
            }`}
          >
            {product.stockQty === 0 ? (
              <NotInStock>Slut i lager</NotInStock>
            ) : (
              <>
                <StyledRemoveIcon onClick={handleModifyCart("remove")} />
                <QuantityContainer
                  onClick={(event: React.MouseEvent<HTMLElement>) => {
                    event.stopPropagation();
                  }}
                >
                  <Quantity>
                    {getAddedToCartQty(product._id, cartItems)}
                  </Quantity>
                </QuantityContainer>
                <StyledAddIcon onClick={handleModifyCart("add")} />
              </>
            )}
          </AddRemoveIconsContainer>
        </AddRemoveWrapper>
      </StyledBottomContainer>
    </Card>
  );
};

export default ProductCard;
