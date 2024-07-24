import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

import DrawerModal from '../../components/Modals/DrawerModal';
import ProductTable from './ProductTable';
import SummaryWindow from './SummaryWindow';

const ProdSumContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: scroll;
  scrollbar-width: none;
`;

const NoProductsInCart = styled.p`
  align-self: center;
  color: ${({ theme }) => theme.color.textPrimary};
  font-size: 1rem;
`;

type ShoppingCartProps = {
  isOpen: boolean;
  closeOnOutsideClick?: boolean;
  closeModal: () => void;
};

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  isOpen,
  closeOnOutsideClick,
  closeModal,
}) => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  if (!isOpen) return null;

  return (
    <DrawerModal
      headerTitle='Kundvagnen'
      closeOnOutsideClick={closeOnOutsideClick}
      closeModal={closeModal}
      cartItems={cartItems}
    >
      {cartItems.length > 0 ? (
        <ProdSumContainer>
          <ProductTable />
          <SummaryWindow />
        </ProdSumContainer>
      ) : (
        <NoProductsInCart>
          Det finns inga produkter i kundvagnen...
        </NoProductsInCart>
      )}
    </DrawerModal>
  );
};

export default ShoppingCart;
