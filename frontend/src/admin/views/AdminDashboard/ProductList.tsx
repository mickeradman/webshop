import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../../../store/store';
import { useFetchProductsQuery } from '../../../api/productApi';
import UncontrolledInput from '../../../components/Input/UncontrolledInput';
import { ErrorHandler } from '../../../utils/helperFunctions/ErrorHandler';

import type { Product } from '../../../types/types';

const CenterDeviation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductsWrapper = styled.ul<{ $scrollbarVisible: boolean }>`
  display: flex;
  width: calc(100% - 2rem);
  align-items: center;
  flex-direction: column;
  row-gap: 3rem;
  padding: 0;
  margin: 1rem 0;
  overflow-y: auto;
  padding-right: ${({ $scrollbarVisible }) =>
    $scrollbarVisible ? '1.5rem' : '0'};
`;

const ProductContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  width: 100%;
`;

const ProductTitle = styled.h2`
  margin: 0 0 0.5rem 0;
`;

const FieldsContainer = styled.div`
  display: flex;
  column-gap: 1rem;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-evenly;
`;

export const ProductList = () => {
  const { page, viewLimit, minPrice, maxPrice, search } = useSelector(
    (state: RootState) => state.filter
  );

  const {
    data: response,
    error,
    isLoading,
  } = useFetchProductsQuery(
    { page, viewLimit, minPrice, maxPrice, search },
    { refetchOnMountOrArgChange: true }
  );

  const products = useMemo(() => response?.products || [], [response]);

  const [showLoading, setShowLoading] = useState(false);
  const [scrollbarVisible, setScrollbarVisible] = useState(false);
  const productsWrapperRef = useRef<HTMLUListElement>(null);

  // Visa inte loading på skärmen om sidan laddats i mindre än en sekund
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isLoading) {
      timer = setTimeout(() => {
        setShowLoading(true);
      }, 1000);
    } else {
      setShowLoading(false);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isLoading]);

  useEffect(() => {
    const handleResize = () => {
      if (productsWrapperRef.current) {
        setScrollbarVisible(
          productsWrapperRef.current.scrollHeight >
            productsWrapperRef.current.clientHeight
        );
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [products]);

  useEffect(() => {
    if (productsWrapperRef.current) {
      productsWrapperRef.current.scrollTop = 0;
    }
  }, [page, products]);

  if (isLoading && showLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return ErrorHandler(error);
  }

  if (response && !response.success) {
    return (
      <CenterDeviation>
        <p>{response.message}</p>
      </CenterDeviation>
    );
  }

  return (
    <ProductsWrapper
      ref={productsWrapperRef}
      $scrollbarVisible={scrollbarVisible}
    >
      {products?.length > 0 &&
        products.map((product: Product) => (
          <ProductContainer key={product._id} id={product._id}>
            <ProductTitle>{product.productName}</ProductTitle>
            <FieldsContainer>
              {Object.keys(product).map((key) => {
                if (key === '_id') return null;
                if (key in product) {
                  return (
                    <UncontrolledInput
                      key={key}
                      label={key}
                      defaultValue={String(product[key as keyof Product])}
                    />
                  );
                }
                return null;
              })}
            </FieldsContainer>
          </ProductContainer>
        ))}
    </ProductsWrapper>
  );
};
