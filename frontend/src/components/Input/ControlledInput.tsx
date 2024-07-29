import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;
  row-gap: 1rem;
`;

const StyledLabel = styled.label`
  font-weight: bold;
`;

const StyledInput = styled.input`
  width: fit-content;
  box-sizing: border-box;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.color.inputBorder};
  color: ${({ theme }) => theme.color.textPrimary};
  background-color: ${({ theme }) => theme.color.appBg};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.inputBorderFocus};
  }
`;

type ControlledInputProps = {
  label?: string;
  value: number | string;
  placeholder?: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMouseUp?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const ControlledInput = ({
  label,
  value,
  placeholder,
  type = 'text',
  onChange,
  onMouseUp,
  onFocus,
  onBlur,
}: ControlledInputProps) => {
  return (
    <InputWrapper>
      {label && <StyledLabel>{label}</StyledLabel>}
      <StyledInput
        value={value}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        onMouseUp={onMouseUp}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </InputWrapper>
  );
};

export default ControlledInput;
