import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { moneyFormatter } from '../../utils/helperFunctions/moneyFormatter';

const SummaryContainer = styled.div`
  height: 30%;
  background: ${({ theme }) => theme.color.cartSummaryBg};

  p {
    padding: 0 1.5rem;
  }
`;

const SummaryTitle = styled.h3`
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.color.textPrimary};
  font-size: 1.4rem;
  margin: 0;
  padding: 1.5rem 0;
`;

function SummaryWindow(): JSX.Element {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const [totalSum, setTotalSum] = useState('0');

  useEffect(() => {
    const sum = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
    setTotalSum(moneyFormatter.format(sum));
  }, [cartItems]);

  return (
    <SummaryContainer>
      <SummaryTitle>Summering</SummaryTitle>
      <p>Totalsumma: {totalSum}</p>
    </SummaryContainer>
  );
}

export default SummaryWindow;
