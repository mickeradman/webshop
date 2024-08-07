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

const AddRemoveWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

// const AddNewProduct = styled.button`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: fit-content;
//   color: ${({ theme }) => theme.color.textPrimary};
//   background-color: ${({ theme }) => theme.color.buttonBg};
//   font-weight: bold;
//   letter-spacing: 1px;
//   padding: 0.5rem 1rem;
//   border-radius: 5px;
//   border: none;
//   box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.25);
//   transition: box-shadow 200ms ease-in-out;
//   cursor: pointer;

//   &:hover {
//     background-color: ${({ theme }) => theme.color.buttonBg};
//     border: none;
//     box-shadow: none;
//     padding: calc(0.5rem + 2px) calc(1rem + 2px);
//   }
// `;

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
