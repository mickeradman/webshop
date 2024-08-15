import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;
`;

const StyledLabel = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const StyledInput = styled.input`
  width: fit-content;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.textPrimary};
  background-color: ${({ theme }) => theme.color.appBg};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.primary};
  }
`;

type UncontrolledInputProps = {
  label: string;
  defaultValue?: string | number;
  placeholder?: string;
};

const UncontrolledInput = ({
  label,
  defaultValue,
  placeholder,
}: UncontrolledInputProps) => {
  return (
    <InputWrapper>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
    </InputWrapper>
  );
};

export default UncontrolledInput;
