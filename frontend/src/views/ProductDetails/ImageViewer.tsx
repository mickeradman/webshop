import React, { useEffect, useState } from 'react';
import { Product } from '../../types/types';
import styled, { keyframes } from 'styled-components';
import { IMG_EXTENSION } from '../../utils/constants';

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 1rem;
  padding: 1rem;
  margin-top: 1rem;
`;

const fadeIn = keyframes`
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0.95);
    opacity: 0;
  }
`;

const StyledImageWrapper = styled.div<{ $enlargedImageIsVisible: boolean }>`
  display: flex;
  border: 1px solid ${({ theme }) => theme.color.borderPrimary};
  border-radius: 0.3rem;
  z-index: ${({ $enlargedImageIsVisible }) =>
    $enlargedImageIsVisible ? 1000 : 0};

  &:hover {
    box-shadow: ${({ theme, $enlargedImageIsVisible }) =>
      $enlargedImageIsVisible
        ? `0 0 5px ${theme.color.borderPrimary}`
        : 'none'};
    cursor: ${({ $enlargedImageIsVisible }) =>
      $enlargedImageIsVisible ? 'pointer' : 'auto'};
  }
`;

const StyledImage = styled.img`
  width: 10rem;
  height: 10rem;
  object-fit: contain;
  padding: 0.5rem 0;
  transition: transform 0.5s ease;
`;

const ClickedImage = styled.img<{
  $enlargedImageIsVisible: boolean;
  $disabledFade: boolean;
  $isVisible: boolean;
}>`
  visibility: ${({ $disabledFade }) => ($disabledFade ? 'hidden' : 'visible')};
  display: ${({ $isVisible }) => ($isVisible ? 'block' : 'none')};
  position: absolute;
  top: 30%;
  width: 30rem;
  height: 30rem;
  object-fit: contain;
  padding: 0.5rem 0;
  border: 2px solid ${({ theme }) => theme.color.borderPrimary};
  animation: ${({ $enlargedImageIsVisible }) =>
      $enlargedImageIsVisible ? fadeIn : fadeOut}
    0.3s forwards;
  z-index: ${({ $isVisible }) => ($isVisible ? 1000 : 0)};
  background: ${({ theme }) => theme.color.appBg};
`;

type ImageViewerProps = {
  productDetails: Product | null;
  clickedIndex: number | null;
  setClickedIndex: React.Dispatch<React.SetStateAction<number | null>>;
};

export default function ImageViewer({
  productDetails,
  clickedIndex,
  setClickedIndex,
}: ImageViewerProps) {
  const [disabledFade, setDisabledFade] = useState(true);
  /* isVisible finns för att sätta display:none i ClickedImage efter att animeringen (fade out) är avslutad. */
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (clickedIndex !== null) {
      setIsVisible(true);
      setDisabledFade(false);
    }
  }, [clickedIndex]);

  function handleAnimationEnd() {
    if (clickedIndex === null) {
      setIsVisible(false);
    }
  }

  if (!productDetails) return null;

  return (
    <ImageContainer>
      {[...Array(3)].map((_, index) => (
        <StyledImageWrapper
          key={index}
          onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            event.stopPropagation();
            if (clickedIndex !== null) {
              setClickedIndex(null);
            } else {
              setClickedIndex(index);
            }
          }}
          $enlargedImageIsVisible={clickedIndex === null}
        >
          <StyledImage
            src={productDetails.imgPath + IMG_EXTENSION}
            alt={productDetails.productName}
          />
        </StyledImageWrapper>
      ))}
      <ClickedImage
        src={productDetails.imgPath + IMG_EXTENSION}
        alt={productDetails.productName}
        onClick={() => setClickedIndex(null)}
        onAnimationEnd={handleAnimationEnd}
        $enlargedImageIsVisible={clickedIndex !== null}
        $disabledFade={disabledFade}
        $isVisible={isVisible}
      />
    </ImageContainer>
  );
}
