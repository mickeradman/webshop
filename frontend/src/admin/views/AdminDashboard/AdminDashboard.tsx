import React, { useEffect } from 'react';
import styled from 'styled-components';

import Header from '../../../views/Header/Header';
import ProductFilter from '../../../components/ProductFilter/ProductFilter';
import { ProductList } from '../AdminDashboard/ProductList';
import { ProductPagination } from './ProductPagination';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useAppDispatch } from '../../../store/useAppDispatch';
import { setPage, setViewLimit } from '../../../store/Filter/FilterSlice';

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
  width: 100vw;
  justify-items: center;
`;

const DashboardWrapper = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  justify-items: center;
  max-width: 1440px;
  width: 60%;
  padding: 0 1.5rem;
  background-color: ${({ theme }) => theme.color.appBg};
  height: 100%;
  overflow-y: hidden;
`;

const PageTitle = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 1rem 0;
  height: 2rem;
`;

type Props = {
  isLightMode: boolean;
  switchTheme: () => void;
};

const AdminDashboard = ({ isLightMode, switchTheme }: Props) => {
  const dispatch = useAppDispatch();
  const { page, totalPages } = useSelector((state: RootState) => state.filter);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  return (
    <Wrapper>
      <Header
        adminHeader
        isLightMode={isLightMode}
        onClickThemeChange={switchTheme}
      />
      <DashboardWrapper>
        <PageTitle>Admin Dashboard</PageTitle>
        <ProductFilter />
        <ProductList />
        <ProductPagination
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </DashboardWrapper>
    </Wrapper>
  );
};

export default AdminDashboard;
