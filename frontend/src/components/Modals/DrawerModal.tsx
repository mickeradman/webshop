import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { TopGridContainer } from '../../styles/styles';
import { ModalOverlay } from './SharedComponents';
import Button from '../Button/Button';
import { createHandleModifyCart } from '../../utils/helperFunctions/handleModifyCart';
import { useAppDispatch } from '../../store/useAppDispatch';
import { CartProps } from '../../store/Cart/cartSlice';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

const ModalContainer = styled.div<{
  $closeDrawer: boolean;
}>`
  position: absolute;
  right: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 30%;
  max-width: 1250px;
  height: 100vh;
  padding: 0;
  color: ${({ theme }) => theme.color.textPrimary};
  background: ${({ theme }) => theme.color.modalBg};
  border: 1px solid ${({ theme }) => theme.color.borderPrimary};
  transform: translateX(${({ $closeDrawer }) => ($closeDrawer ? '100%' : '0')});
  animation: ${({ $closeDrawer }) => ($closeDrawer ? slideOut : slideIn)} 250ms
    forwards;
  transition: transform 250ms;

  @media screen and (max-width: 700px) {
    width: 100%;
    height: 100%;
    margin: 0;
    border: none;
  }
`;

const ModalTitle = styled.h3`
  grid-row: 1 / 2;
  grid-column: 2 / 3;
  justify-self: center;
  color: ${({ theme }) => theme.color.textPrimary};
  font-size: 1.4rem;
  margin: 0;
`;

const ModalCloseButton = styled(CloseRoundedIcon)`
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  justify-self: flex-start;
  color: ${({ theme }) => theme.color.textPrimary};
  border: 2px solid ${({ theme }) => theme.color.textPrimary};
  border-radius: 0.3rem;
  font-size: 1.2rem !important;

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.color.navLinkHover};
    border-color: ${({ theme }) => theme.color.navLinkHover};
  }
`;

const ButtonWrapper = styled.div`
  grid-column: 3 / 4;
  grid-row: 1 / 2;
  justify-self: flex-end;
`;

type Props = {
  children: JSX.Element;
  headerTitle: string | undefined;
  closeOnOutsideClick?: boolean;
  cartItems: CartProps[];
  closeModal: () => void;
  closeImage?: () => void;
};

function DrawerModal({
  children,
  headerTitle,
  closeOnOutsideClick = true,
  cartItems,
  closeModal,
  closeImage,
}: Props): JSX.Element {
  const [isCartOpened, setIsCartOpened] = useState(true);
  const dispatch = useAppDispatch();
  const handleModifyCart = createHandleModifyCart({ dispatch });

  function handleClose() {
    setIsCartOpened(false);
  }

  return ReactDOM.createPortal(
    <ModalOverlay
      onClick={closeOnOutsideClick ? handleClose : undefined}
      $transparentBgOnDrawerClose={!isCartOpened}
    >
      <ModalContainer
        $closeDrawer={!isCartOpened}
        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          event.stopPropagation();
          closeImage ? closeImage() : null;
        }}
        onAnimationEnd={isCartOpened ? undefined : closeModal}
      >
        <TopGridContainer $padding='1.5rem'>
          <ModalTitle>{headerTitle}</ModalTitle>
          <ModalCloseButton onClick={handleClose} />
          <ButtonWrapper>
            <Button
              buttonText='Töm kundvagnen'
              size='small'
              variant='secondary'
              disabled={cartItems.length === 0}
              onClick={handleModifyCart('clear')}
            />
          </ButtonWrapper>
        </TopGridContainer>
        {children}
      </ModalContainer>
    </ModalOverlay>,
    document.body
  );
}

export default DrawerModal;
