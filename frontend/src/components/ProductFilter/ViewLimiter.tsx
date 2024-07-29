import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store/store';
import { useAppDispatch } from '../../store/useAppDispatch';
import { setPage, setViewLimit } from '../../store/Filter/filterSlice';

const ViewLimiterWrapper = styled.div`
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 2;
`;

const StyledLabel = styled.label`
  font-weight: bold;
`;

const StyledSelect = styled.select`
  width: fit-content;
  height: fit-content;
  align-self: center;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid ${({ theme }) => theme.color.inputBorder};
  color: ${({ theme }) => theme.color.textPrimary};
  background-color: ${({ theme }) => theme.color.appBg};

  &:focus {
    outline: transparent;
    border-color: ${({ theme }) => theme.color.inputBorderFocus};
  }
`;

export const ViewLimiter = () => {
  const dispatch = useAppDispatch();
  const { viewLimit } = useSelector((state: RootState) => state.filter);
  const handleViewLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setPage(1));
    dispatch(setViewLimit(Number(e.target.value)));
  };

  return (
    <ViewLimiterWrapper>
      <StyledLabel htmlFor='viewLimitDropdown'>Produkter per sida</StyledLabel>
      <StyledSelect
        id='viewLimitDropdown'
        value={viewLimit}
        onChange={handleViewLimitChange}
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </StyledSelect>
    </ViewLimiterWrapper>
  );
};
