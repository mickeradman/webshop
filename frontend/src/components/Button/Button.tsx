import React from 'react';
import styled, { css } from 'styled-components';

const sizeStyles = {
  small: css`
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
  `,
  medium: css`
    padding: 0.75rem 1rem;
    font-size: 1rem;
  `,
  large: css`
    padding: 1rem 2rem;
    font-size: 1.2rem;
  `,
};

const variantStyles = {
  primary: css`
    background: ${({ theme }) => theme.color.buttonBg};
    border: none;
    box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.25);

    &:active {
      background: ${({ theme }) => theme.color.buttonBg};
      color: rgba(0, 0, 0, 0.6);
      box-shadow: inset 2px 2px 8px 0 rgba(0, 0, 0, 0.25);
    }
  `,
  secondary: css`
    color: ${({ theme }) => theme.color.buttonBorderHover};
    background: transparent;
    border: ${({ theme }) => `2px solid ${theme.color.buttonBorder}`};
    box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.25);

    &:hover {
      background: ${({ theme }) => theme.color.buttonBorder};
      border-color: ${({ theme }) => theme.color.buttonBorderHover};
    }

    &:active {
      background: ${({ theme }) => theme.color.buttonBg};
      box-shadow: inset 2px 2px 8px 0 rgba(0, 0, 0, 0.25);
    }
  `,
  danger: css`
    background: transparent;
    border: ${({ theme }) => `2px solid ${theme.color.buttonDangerBorder}`};
    box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.25);
  `,
};

type StyledButtonProps = {
  $size?: 'small' | 'medium' | 'large';
  $variant?: 'primary' | 'secondary' | 'danger';
  $margin?: string;
  $padding?: string;
  $justifySelf?: string;
  $alignSelf?: string;
};

const StyledButton = styled.button<StyledButtonProps>`
  border: none;
  border-radius: 5px;
  color: ${({ theme }) => theme.color.textPrimary};
  background-color: transparent;
  transition: background 200ms;
  font-weight: bold;
  letter-spacing: 1px;
  cursor: pointer;

  ${({ $size }) => $size && sizeStyles[$size]}
  ${({ $variant }) => $variant && variantStyles[$variant]}

  ${({ $margin }) => $margin && `margin: ${$margin};`}
  ${({ $padding }) => $padding && `padding: ${$padding};`}
  ${({ $justifySelf }) => $justifySelf && `justify-self: ${$justifySelf};`}
  ${({ $alignSelf }) => $alignSelf && `align-self: ${$alignSelf};`}

  &&&:disabled {
    background: ${({ theme }) => theme.color.disabledComponent};
    color: ${({ theme }) => theme.color.textInverted};
    border: 2px solid transparent;
    box-shadow: none;
    cursor: unset;
  }
`;

type ButtonProps = {
  buttonText?: string;
  icon?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'danger';
  margin?: string;
  padding?: string;
  justifySelf?: string;
  alignSelf?: string;
  disabled?: boolean;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({
  buttonText,
  icon,
  size,
  variant,
  margin,
  padding,
  justifySelf,
  alignSelf,
  disabled,
  onClick,
}) => {
  return (
    <StyledButton
      $size={size}
      $variant={variant}
      $margin={margin}
      $padding={padding}
      $justifySelf={justifySelf}
      $alignSelf={alignSelf}
      disabled={disabled}
      onClick={onClick}
    >
      {icon ? icon : buttonText}
    </StyledButton>
  );
};

export default Button;
