import styled from 'styled-components';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { createGlobalStyle } from 'styled-components';

// Används för att sätta bakgrundsfärgen på body efter aktuellt tema
export const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.color.bodyBg};
    color: ${({ theme }) => theme.color.textPrimary};
  }

  button {
    background: ${({ theme }) => theme.buttonBg};
    color: ${({ theme }) => theme.textPrimary};
    border: 1px solid ${({ theme }) => theme.borderPrimary};

    &:hover {
      background: ${({ theme }) => theme.buttonHover};
    }
  }
`;

// Grid-container för rubriker / underrubriker
export const TopGridContainer = styled.div<{ $padding?: string }>`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  padding: ${({ $padding }) => ($padding ? $padding : '0')};
`;

// Nedanstående är för styling av "lägg till och ta bort-knappar" för produkter i kundvagnen
export const AddRemoveWrapper = styled.div`
  display: flex;
  width: 40%;
  justify-content: flex-end;
  margin-right: 0.3rem;
`;

export const AddRemoveIconsContainer = styled.div`
  display: flex;
  align-self: center;
  align-items: center;
  margin-right: 0.3rem;
  border: 1px solid ${({ theme }) => theme.color.borderPrimary};
  border-radius: 0.3rem;
  visibility: hidden;

  &.visible {
    visibility: visible;
  }

  &.no-border {
    border: none;
  }
`;

export const StyledRemoveIcon = styled(RemoveRoundedIcon)`
  background: ${({ theme }) => theme.color.positiveGreen};
  border-radius: 0.3rem 0 0 0.3rem;

  &:hover {
    cursor: pointer;
  }
`;

export const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.color.textPrimary};
  font-size: 1.2rem;
  font-weight: bold;
`;

export const Quantity = styled.div`
  margin: 0;
  padding: 0 0.75rem;
`;

export const StyledAddIcon = styled(AddRoundedIcon)`
  background: ${({ theme }) => theme.color.positiveGreen};
  border-radius: 0 0.3rem 0.3rem 0;

  &:hover {
    cursor: pointer;
  }
`;
