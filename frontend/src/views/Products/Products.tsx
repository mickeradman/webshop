import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../../store/store';
import { useAppDispatch } from '../../store/useAppDispatch';
import { resetError } from '../../store/Product/ProductSlice';
import { fetchProducts } from '../../store/Product/ProductThunks';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Product } from '../../types/types';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ProductDetails from '../ProductDetails/ProductDetails';
import { blockScroll } from '../../utils/helperFunctions/blockScroll';

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
  const dispatch = useAppDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const { page, totalPages } = useSelector((state: RootState) => state.filter);

  const viewLimit = 10;

  const isLoading = loading;
  const hasError = !!error;

  localStorage.setItem('lastVisitedPage', location.pathname);
  localStorage.setItem('lastInteractionTime', Date.now().toString());

  useEffect(() => {
    dispatch(resetError());
    const lastFetchTime = localStorage.getItem('lastFetchTime');

    if (lastFetchTime) {
      if (products.length === 0) {
        localStorage.removeItem('lastFetchTime');
        return;
      }
      console.log(
        'Hämtade sist från databasen:',
        new Date(parseInt(lastFetchTime)).toLocaleString()
      );
    } else {
      console.log('Det är tomt i localStorage...');
    }

    const shouldFetchFromDatabase =
      !lastFetchTime ||
      Date.now() - parseInt(lastFetchTime) > 6 * 60 * 60 * 1000;

    if (shouldFetchFromDatabase) {
      console.log('Hämtar produkter från databasen...');
      dispatch(fetchProducts({ page, viewLimit }));
      localStorage.setItem('lastFetchTime', Date.now().toString());
    }
  }, [dispatch, page, viewLimit]);

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
        {hasError && <StyledLoadingOrError>{error}</StyledLoadingOrError>}
        {!isLoading &&
          !hasError &&
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
