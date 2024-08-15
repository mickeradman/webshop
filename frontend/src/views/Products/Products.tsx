import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../../store/store';
import { useFetchProductsQuery } from '../../api/productApi';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Product } from '../../types/types';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ProductDetails from '../ProductDetails/ProductDetails';
import { blockScroll } from '../../utils/helperFunctions/blockScroll';
import { ErrorHandler } from '../../utils/helperFunctions/ErrorHandler';

const StyledTextContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${({ theme }) => theme.color.textPrimary};
`;

const StyledProductsText = styled.h2`
  margin: 0 1rem 1rem;
  padding: 0 1rem;
  font-size: 1.2rem;
  font-weight: normal;
`;

const StyledProductsContainer = styled.ul`
  display: grid;
  padding: 0;
  grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
  margin: 2rem 0;
  gap: 1rem;
`;

const StyledLoadingOrError = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  color: ${({ theme }) => theme.color.textPrimary};
`;

const Products: React.FC = (): JSX.Element => {
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { page } = useSelector((state: RootState) => state.filter);

  const viewLimit = 10;

  const {
    data: response,
    error,
    isLoading,
  } = useFetchProductsQuery({
    page,
    viewLimit,
  });

  const products = response?.products || [];

  useEffect(() => {
    blockScroll(showProductDetails);

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showProductDetails]);

  const handleProductClick = (product: Product) => {
    setShowProductDetails(true);
    setSelectedProduct(product);
  };

  return (
    <>
      <StyledTextContainer>
        <StyledProductsText>
          Om inte annat anges finns alla listade varor i lager. Vi kommer i
          sinom tid lägga till en ikon för lagerstatus/saldo.
        </StyledProductsText>
      </StyledTextContainer>
      <StyledProductsContainer>
        {isLoading && (
          <StyledLoadingOrError>
            <LoadingSpinner />
          </StyledLoadingOrError>
        )}
        {error && (
          <StyledLoadingOrError>{ErrorHandler(error)}</StyledLoadingOrError>
        )}
        {!isLoading &&
          !error &&
          products.length > 0 &&
          products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              openProductDetails={() => handleProductClick(product)}
            />
          ))}
      </StyledProductsContainer>
      {showProductDetails ? (
        <ProductDetails
          isOpen={showProductDetails}
          productDetails={selectedProduct}
          closeModal={() => setShowProductDetails(false)}
        />
      ) : null}
    </>
  );
};

export default Products;
