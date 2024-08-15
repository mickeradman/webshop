import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Tooltip from '@mui/material/Tooltip';
import { blockScroll } from '../../utils/helperFunctions/blockScroll';
import ShoppingCart from '../ShoppingCart/ShoppingCart';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: center;
  width: 100vw;
  background: ${({ theme }) => theme.color.headerFooterBg};
  position: sticky;
  top: 0;
  z-index: 5;

  &.cartIsOpen {
    z-index: 0;
  }
`;

const HeaderGridContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  max-width: 1440px;
  width: 60%;
`;

const HeaderTitleContainer = styled.section`
  grid-row: 1 / 2;
  grid-column: 1 / 3;
  display: flex;
  align-items: center;
  margin: 0.8rem 0;
  padding: 0;
`;

const HeaderTitle = styled.h1`
  width: fit-content;
  padding: 0;
  margin: 0;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.color.textPrimary};
  user-select: none;
  outline: none;

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.color.hoverPrimary} !important;
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  grid-row: 1 / 2;
  grid-column: 3 / 4;
  justify-self: flex-end;
  padding: 0.8rem 0;
  gap: 1rem;
`;

const OptionsIconContainer = styled.div`
  position: relative;
  color: ${({ theme }) => theme.color.textPrimary};

  :hover {
    cursor: pointer;
    color: ${({ theme }) => theme.color.hoverPrimary};
  }
`;

const ProductCountChip = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 1.1rem;
  left: 0.9rem;
  color: ${({ theme }) => theme.color.textPrimary} !important;
  background: ${({ theme }) => theme.color.cartCountChip};
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 50%;
  font-size: 0.8rem;
  padding: 0.15rem;
  font-weight: bold;
`;

type HeaderProps = {
  adminHeader?: boolean;
  isLightMode: boolean;
  onClickThemeChange: () => void;
};

const Header = ({
  adminHeader,
  isLightMode,
  onClickThemeChange,
}: HeaderProps) => {
  const [showShoppingCart, setShowShoppingCart] = useState(false);
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const articleCount = cartItems.reduce((acc, item) => {
    return acc + item.qty;
  }, 0);

  useEffect(() => {
    blockScroll(showShoppingCart);

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showShoppingCart]);

  return (
    <HeaderWrapper className={showShoppingCart ? 'cartIsOpen' : ''}>
      <HeaderGridContainer>
        <HeaderTitleContainer>
          <HeaderTitle
            onClick={() => navigate('/news')}
            className='noVisibleMarkerOnClick'
          >
            LE BOTIQUE
          </HeaderTitle>
        </HeaderTitleContainer>
        <OptionsContainer>
          {adminHeader ? null : (
            <Tooltip title={'Kundvagnen'} placement='bottom' arrow={true}>
              <OptionsIconContainer
                onClick={() => setShowShoppingCart(!showShoppingCart)}
              >
                {articleCount ? (
                  <ProductCountChip>{articleCount}</ProductCountChip>
                ) : null}
                <ShoppingCartOutlinedIcon sx={{ fontSize: '2rem' }} />
              </OptionsIconContainer>
            </Tooltip>
          )}
          <Tooltip
            title={`Byt till ${isLightMode ? 'mörkt tema' : 'ljust tema'}`}
            placement='bottom-start'
            arrow={true}
          >
            <OptionsIconContainer>
              {isLightMode ? (
                <LightModeOutlinedIcon
                  sx={{ fontSize: '2rem' }}
                  onClick={() => onClickThemeChange()}
                />
              ) : (
                <DarkModeOutlinedIcon
                  sx={{ fontSize: '2rem' }}
                  onClick={() => onClickThemeChange()}
                />
              )}
            </OptionsIconContainer>
          </Tooltip>
          {showShoppingCart ? (
            <ShoppingCart
              isOpen={showShoppingCart}
              closeModal={() => setShowShoppingCart(false)}
            />
          ) : null}
        </OptionsContainer>
      </HeaderGridContainer>
    </HeaderWrapper>
  );
};

export default Header;
