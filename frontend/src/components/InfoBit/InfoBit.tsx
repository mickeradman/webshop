import React from 'react';
import styled from 'styled-components';

const InfoBitContent = styled.div<{ $width: string }>`
  display: flex;
  flex-direction: column;
  flex: ${({ $width }) => $width};
  row-gap: 0.8rem;
  margin: 0;
  padding: 0 1.5rem;

  h3 {
    margin: 0;
  }

  p {
    margin: 0;
  }
`;

type InfoBitProps = {
  title: string;
  content: string;
  width?: string;
};

export function InfoBit({ title, content, width = '50%' }: InfoBitProps) {
  return (
    <InfoBitContent $width={width}>
      <h3>{title}</h3>
      <p>{content}</p>
    </InfoBitContent>
  );
}
