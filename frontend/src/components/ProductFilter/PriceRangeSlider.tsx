import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useAppDispatch } from '../../store/useAppDispatch';
import { RootState } from '../../store/store';
import { setMinPrice, setMaxPrice } from '../../store/Filter/FilterSlice';

const SliderWrapper = styled.div`
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 2;
`;

const PriceBoxesWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  column-gap: 1rem;
`;

const MinPriceBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MaxPriceBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RangeSlider = React.memo(styled.div`
  position: relative;
  width: 18.75rem;
  height: 3.125rem;
`);

const SliderTrack = React.memo(
  styled.div.attrs<{ $background: string }>((props) => ({
    style: {
      background: props.$background,
    },
  }))<{ $background: string }>`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    height: 8px;
    border-radius: 5px;
    z-index: 1;
  `
);

const SliderInput = React.memo(styled.input<{ $active?: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: 8px;
  margin: 0;
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  pointer-events: none;
  z-index: ${({ $active }) => ($active ? 3 : 2)};

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 0.5rem;
    height: 20px;
    background: #8b8bff;
    cursor: pointer;
    pointer-events: auto;
    border-radius: 4px;
    z-index: 4;
  }

  &::-moz-range-thumb {
    width: 0.5rem;
    height: 20px;
    background: ${({ theme }) => theme.color.hoverPrimary};
    cursor: pointer;
    pointer-events: auto;
    border-radius: 4px;
    z-index: 4;
  }
`);

const absoluteMaxPrice = 25000;

export const PriceRangeSlider = () => {
  const dispatch = useAppDispatch();
  const { minPrice, maxPrice } = useSelector(
    (state: RootState) => state.filter
  );

  const [minPriceSliderState, setMinPriceSliderState] = useState(minPrice);
  const [maxPriceSliderState, setMaxPriceSliderState] = useState(maxPrice);
  const [activeSlider, setActiveSlider] = useState<'min' | 'max' | null>(null);

  const updateSliderTrack = useCallback(() => {
    const minPercent = (minPriceSliderState / absoluteMaxPrice) * 100;
    const maxPercent = (maxPriceSliderState / absoluteMaxPrice) * 100;

    return `linear-gradient(to right, #b5b5ff ${minPercent}%, #FFF ${minPercent}%, #FFF ${maxPercent}%, #b5b5ff ${maxPercent}%)`;
  }, [minPriceSliderState, maxPriceSliderState]);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < maxPriceSliderState - 1) {
      setMinPriceSliderState(value);
    } else {
      setMinPriceSliderState(maxPriceSliderState - 1);
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value > minPriceSliderState + 1) {
      setMaxPriceSliderState(value);
    } else {
      setMaxPriceSliderState(minPriceSliderState + 1);
    }
  };

  const handleMinPriceMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    const inputElement = e.target as HTMLInputElement;
    dispatch(setMinPrice(Number(inputElement.value)));
    setActiveSlider(null);
  };

  const handleMaxPriceMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    const inputElement = e.target as HTMLInputElement;
    dispatch(setMaxPrice(Number(inputElement.value)));
    setActiveSlider(null);
  };

  return (
    <SliderWrapper>
      <PriceBoxesWrapper>
        <MinPriceBox>{minPriceSliderState} kr</MinPriceBox>
        <MaxPriceBox>{maxPriceSliderState} kr</MaxPriceBox>
      </PriceBoxesWrapper>
      <RangeSlider>
        <SliderTrack $background={updateSliderTrack()} />
        <SliderInput
          type='range'
          min={0}
          max={absoluteMaxPrice}
          value={minPriceSliderState}
          onChange={handleMinPriceChange}
          onMouseDown={() => setActiveSlider('min')}
          onMouseUp={handleMinPriceMouseUp}
          $active={activeSlider === 'min'}
        />
        <SliderInput
          type='range'
          min={0}
          max={absoluteMaxPrice}
          value={maxPriceSliderState}
          onChange={handleMaxPriceChange}
          onMouseDown={() => setActiveSlider('max')}
          onMouseUp={handleMaxPriceMouseUp}
          $active={activeSlider === 'max'}
        />
      </RangeSlider>
    </SliderWrapper>
  );
};
