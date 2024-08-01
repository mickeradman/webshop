import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

import { RootState } from '../../../store/store';
import {
  useFetchProductsQuery,
  useUpdateProductMutation,
} from '../../../api/productApi';
import ControlledInput from '../../../components/Input/ControlledInput';
import { ErrorHandler } from '../../../utils/helperFunctions/ErrorHandler';
import { allFieldsContainsAValue } from '../../../utils/helperFunctions/allFieldsContainsAValue';
import { notify } from '../../../utils/helperFunctions/notify';

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
  row-gap: 1.5rem;
`;

const ProductTitle = styled.h2`
  margin: 0 0 0.5rem 0;
`;

const FieldsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  column-gap: 1rem;
`;

const UpdateButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  color: ${({ theme }) => theme.color.textPrimary};
  font-weight: bold;
  letter-spacing: 1px;
  background: ${({ theme }) => theme.color.buttonBg};
  background: transparent;
  border: ${({ theme }) => `2px solid ${theme.color.buttonBorder}`};
  border-radius: 5px;
  box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.25);
  transition: box-shadow 200ms ease-in-out;
  padding: 0.75rem 1rem;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.color.buttonBg};
    border: none;
    box-shadow: none;
    padding: calc(0.75rem + 2px) calc(1rem + 2px);
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
    refetch,
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
    if (isLoading || isUpdating) {
      timer = setTimeout(() => {
        setShowLoading(true);
      }, 1000);
    } else {
      setShowLoading(false);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isLoading, isUpdating]);

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
    const originalProduct = products.find(
      (product) => product._id === productId
    );
    if (!originalProduct) return;

    let convertedValue: string | number;

    const originalValue = originalProduct[fieldName];
    if (typeof originalValue === 'number' && value !== '') {
      convertedValue = parseInt(value.toString(), 10);

      if (fieldName === 'price' && convertedValue <= 0) {
        notify('error', 'Priset får inte börja med noll.');
        return;
      }

      if (isNaN(convertedValue)) {
        notify('error', 'Endast siffror är tillåtna i detta fält.');
        return;
      }

      const lastChar = value.toString().slice(-1);
      if (/^[a-zA-Z]$/.test(lastChar)) {
        notify('error', 'Endast siffror är tillåtna i detta fält.');
        return;
      }
    } else {
      convertedValue = value;
    }

    setFormFields((prev) => {
      const newFormFields = { ...prev };

      if (newFormFields[productId]) {
        if (
          newFormFields[productId][fieldName] !== undefined &&
          convertedValue === originalProduct[fieldName]
        ) {
          const { [fieldName]: _, ...remainingFields } =
            newFormFields[productId];
          newFormFields[productId] = remainingFields;

          if (Object.keys(newFormFields[productId]).length === 0) {
            delete newFormFields[productId];
          }
        } else {
          newFormFields[productId] = {
            ...newFormFields[productId],
            [fieldName]: convertedValue,
          };
        }
      } else {
        newFormFields[productId] = { [fieldName]: value };
      }

      return newFormFields;
    });
  };

  const handleUpdateProduct = async (productId: string) => {
    const updateFields = formFields[productId];
    if (!updateFields) return;

    try {
      await updateProduct({ productId, updateFields }).unwrap();
      notify('success', 'Product updated successfully!');
      refetch();

      setFormFields((prev) => {
        const newFormFields = { ...prev };
        delete newFormFields[productId];
        return newFormFields;
      });
    } catch (error) {
      notify('error', 'Failed to update product.');
    }
  };

  if ((isLoading || isUpdating) && showLoading) {
    return (
      <CenterDeviation>
        <p>Loading...</p>;
      </CenterDeviation>
    );
  }

  if (error || updateError) {
    return (
      <CenterDeviation>
        {error
          ? ErrorHandler(error)
          : updateError
          ? ErrorHandler(updateError)
          : null}
      </CenterDeviation>
    );
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
            {formFields[product._id] &&
              allFieldsContainsAValue(formFields[product._id]) && (
                <UpdateButton onClick={() => handleUpdateProduct(product._id)}>
                  Update product
                </UpdateButton>
              )}
          </ProductContainer>
        ))}
    </ProductsWrapper>
  );
};
