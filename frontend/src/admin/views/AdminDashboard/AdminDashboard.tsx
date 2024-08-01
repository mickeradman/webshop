import React from 'react';
import styled from 'styled-components';

import Header from '../../../views/Header/Header';
import { ProductFilter } from '../../../components/ProductFilter/ProductFilter';
import { ProductList } from '../AdminDashboard/ProductList';
import { ProductPagination } from './ProductPagination';

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
  margin: 1rem 0 0 0;
  padding: 1rem 0;
`;

type Props = {
  isLightMode: boolean;
  switchTheme: () => void;
};

const AdminDashboard = ({ isLightMode, switchTheme }: Props) => {
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
        <ProductPagination />
      </DashboardWrapper>
    </Wrapper>
  );
};

export default AdminDashboard;
