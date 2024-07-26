import React from 'react';
import styled from 'styled-components';

type StyledButtonProps = {
  $gridRow?: string;
  $gridCol?: string;
  $justifySelf?: string;
  $disabled?: boolean;
};

const StyledButton = styled.button<StyledButtonProps>`
  grid-row: ${({ $gridRow }) => ($gridRow ? $gridRow : undefined)};
  grid-column: ${({ $gridCol }) => ($gridCol ? $gridCol : undefined)};
  justify-self: ${({ $justifySelf }) =>
    $justifySelf ? $justifySelf : 'flex-end'};
  align-self: center;
  width: fit-content;
  height: fit-content;
  background: ${({ theme, $disabled }) =>
    $disabled ? theme.color.disabledComponent : 'transparent'};
  color: ${({ theme }) => theme.color.textPrimary};
  font-size: 0.9rem;
  border: ${({ $disabled }) => ($disabled ? 'none' : '1px solid #6f98b2')};
  border-radius: 0.5rem;
  padding: 0.35rem;
  transition: background 200ms;

  &:hover {
    cursor: ${({ $disabled }) => ($disabled ? 'normal' : 'pointer')};
    background: ${({ theme, $disabled }) =>
      $disabled ? theme.color.disabledComponent : theme.color.buttonHover};
  }
`;

type ButtonProps = {
  buttonText: string;
  gridRow?: string;
  gridCol?: string;
  justifySelf?: string;
  cartIsEmpty?: boolean;
  disabled?: boolean;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({
  buttonText,
  gridRow,
  gridCol,
  justifySelf,
  disabled,
  onClick,
}) => {
  return (
    <StyledButton
      $gridRow={gridRow}
      $gridCol={gridCol}
      $justifySelf={justifySelf}
      $disabled={disabled}
      onClick={onClick}
    >
      {buttonText}
    </StyledButton>
  );
};

export default Button;
