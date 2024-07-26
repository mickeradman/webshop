import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../../../store/store';
import {
  useFetchProductsQuery,
  useUpdateProductMutation,
} from '../../../api/productApi';
import ControlledInput from '../../../components/Input/ControlledInput';
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
  display: grid;
  grid-template-rows: auto 1fr auto;
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
  justify-content: space-between;
`;

const UpdateButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  color: #ffe6e6;
  font-weight: bold;
  letter-spacing: 1px;
  background: linear-gradient(-45deg, #915c5c4d, #6b1e1e4d, #39396c7a);
  /* background: linear-gradient(-45deg, #915c5c, #6b1e1e, #39396c); */
  border: 1px solid #6e6eff;
  margin-top: 1.5rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: linear-gradient(-45deg, #915c5c, #6b1e1e, #39396c);
    box-shadow: 0 0 10px 0 #6e6eff;
  }
`;

type FormFields = {
  [productId: string]: Partial<Omit<Product, '_id'>>;
};

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

  const [updateProduct, { isLoading: isUpdating, error: updateError }] =
    useUpdateProductMutation();
  const [formFields, setFormFields] = useState<FormFields>({});
  const [showLoading, setShowLoading] = useState(false);
  const [scrollbarVisible, setScrollbarVisible] = useState(false);
  const productsWrapperRef = useRef<HTMLUListElement>(null);

  const products = useMemo(() => response?.products || [], [response]);

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

  const handleFieldChange = (
    productId: string,
    fieldName: keyof Omit<Product, '_id'>,
    value: string | number
  ) => {
    setFormFields((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [fieldName]: value,
      },
    }));
  };

  const handleUpdateProduct = async (productId: string) => {
    const updateFields = formFields[productId];
    if (!updateFields) return;

    try {
      await updateProduct({ productId, updateFields }).unwrap();
      alert('Product updated successfully');
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  if (isLoading && showLoading) {
    return (
      <CenterDeviation>
        <p>Loading...</p>;
      </CenterDeviation>
    );
  }

  if (error) {
    return <CenterDeviation>{ErrorHandler(error)}</CenterDeviation>;
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
                return (
                  <ControlledInput
                    key={key}
                    label={key}
                    value={
                      formFields[product._id]?.[
                        key as keyof Omit<Product, '_id'>
                      ] ?? product[key as keyof Product]
                    }
                    onChange={(e) =>
                      handleFieldChange(
                        product._id,
                        key as keyof Omit<Product, '_id'>,
                        e.target.value
                      )
                    }
                  />
                );
              })}
            </FieldsContainer>
            <UpdateButton
              onClick={() => handleUpdateProduct(product._id)}
              disabled={isUpdating}
            >
              Update product
            </UpdateButton>
          </ProductContainer>
        ))}
    </ProductsWrapper>
  );
};
