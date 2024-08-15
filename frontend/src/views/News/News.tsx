import React from 'react';
import styled from 'styled-components';

const StyledTextContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${({ theme }) => theme.color.textPrimary};

  h2 {
    margin: 0 1rem 1rem;
  }

  p {
    padding: 0 1rem;
  }
`;

const News = () => {
  return (
    <StyledTextContainer>
      <h2>Våra senaste nyheter!</h2>
      <p>Här är massa nyheter. Kolla in alla roliga produkter vi fått in.</p>
    </StyledTextContainer>
  );
};

export default News;
