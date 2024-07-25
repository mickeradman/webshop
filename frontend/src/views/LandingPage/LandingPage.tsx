import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Outlet, useNavigate } from 'react-router-dom';

const StyledLandingPage = styled.main`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.color.appBg};
  padding: 2rem 0;

  @media screen and (max-width: 1440px) {
    padding: 2rem 1rem;
  }
`;

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/products');
  }, [navigate]);

  return (
    <StyledLandingPage>
      <Outlet />
    </StyledLandingPage>
  );
}

export default LandingPage;
