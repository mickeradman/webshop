import React from 'react';
import styled from 'styled-components';
import { Product } from '../../types/types';
import { InfoBit } from '../../components/InfoBit/InfoBit';
import { CURRENCY } from '../../utils/constants';

const InfoWindowContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1.5rem 0;
  padding: 1rem 0;
  border: 1px solid ${({ theme }) => theme.color.borderPrimary};
  border-radius: 0.3rem;
`;

const InfoBitContainer = styled.div<{ $columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns}, 1fr);
  padding: 1rem 0;
  row-gap: 2.5rem;
`;

type InfoWindowProps = {
  productDetails: Product | null;
};

export default function InfoWindow({ productDetails }: InfoWindowProps) {
  if (!productDetails) return null;

  const { productName, description, price, stockQty, category } =
    productDetails;

  return (
    <InfoWindowContainer>
      <InfoBitContainer $columns={2}>
        <InfoBit title='Produkt' content={productName} />
        <InfoBit title='Pris' content={`${price} ${CURRENCY}`} />
        <InfoBit title='Lagerkvantitet' content={`${stockQty} st`} />
        <InfoBit title='Kategori' content={category} />
      </InfoBitContainer>
      <InfoBitContainer $columns={1}>
        <InfoBit title='Beskrivning' content={description} />
      </InfoBitContainer>
    </InfoWindowContainer>
  );
}
