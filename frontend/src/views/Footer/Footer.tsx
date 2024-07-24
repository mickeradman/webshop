import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;

  background: ${({ theme }) => theme.color.headerFooterBg};
  color: ${({ theme }) => theme.color.textPrimary};
  padding: 2rem 0;

  p {
    font-size: ${({ theme }) => theme.size.md};
  }
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.size.md};
`;

const Footer = () => {
  return (
    <StyledFooter>
      <StyledContainer>
        <p>Work with us</p>
        <p>Contact</p>
        <p>About</p>
      </StyledContainer>
    </StyledFooter>
  );
};

export default Footer;
