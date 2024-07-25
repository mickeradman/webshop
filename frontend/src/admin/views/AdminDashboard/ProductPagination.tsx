import React, { useEffect } from 'react';
import styled from 'styled-components';

import Button from '../../../components/Button/Button';
import { useAppDispatch } from '../../../store/useAppDispatch';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { setPage, setTotalPages } from '../../../store/Filter/filterSlice';

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0 1.5rem 0;
  list-style: none;
  gap: 0.5rem;
  height: 2rem;
`;

export const ProductPagination = () => {
  const dispatch = useAppDispatch();
  const { total } = useSelector((state: RootState) => state.products);
  const { page, viewLimit, totalPages } = useSelector(
    (state: RootState) => state.filter
  );

  useEffect(() => {
    const calculatedTotalPages = Math.ceil(total / viewLimit);
    dispatch(setTotalPages(calculatedTotalPages));
    dispatch(setPage(1));
  }, [total, viewLimit, dispatch]);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  return (
    <PaginationWrapper>
      {pageNumbers.map((p) => (
        <Button
          key={p}
          onClick={() => handlePageChange(p)}
          disabled={p === page}
          buttonText={p.toString()}
        />
      ))}
    </PaginationWrapper>
  );
};
