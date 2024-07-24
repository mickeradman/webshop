import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { useAppDispatch } from '../../../store/useAppDispatch';
import { RootState } from '../../../store/store';
import { selectVisibleProducts } from '../../../store/Product/ProductSlice';
import { setViewLimit } from '../../../store/Filter/FilterSlice';
import { fetchProducts } from '../../../store/Product/ProductThunks';
import UncontrolledInput from '../../../components/Input/UncontrolledInput';
import type { Product } from '../../../types/types';

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
  const dispatch = useAppDispatch();
  const { loading, error } = useSelector((state: RootState) => state.products);

  const products = useSelector(selectVisibleProducts);
  const [showLoading, setShowLoading] = useState(false);
  const [scrollbarVisible, setScrollbarVisible] = useState(false);
  const productsWrapperRef = useRef<HTMLUListElement>(null);

  const { page, viewLimit } = useSelector((state: RootState) => state.filter);

  useEffect(() => {
    dispatch(setViewLimit(viewLimit));
  }, [dispatch, viewLimit]);

  useEffect(() => {
    dispatch(fetchProducts({ page, viewLimit }));
  }, [dispatch, page, viewLimit]);

  // Visa inte loading på skärmen om sidan laddats i mindre än en sekund
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (loading) {
      timer = setTimeout(() => {
        setShowLoading(true);
      }, 1000);
    } else {
      setShowLoading(false);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [loading]);

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

  if (loading && showLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
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
