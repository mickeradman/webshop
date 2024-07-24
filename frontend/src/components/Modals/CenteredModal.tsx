import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { TopGridContainer } from '../../styles/styles';
import { ModalOverlay } from './SharedComponents';

const ModalContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 1250px;
  height: 80vh;
  padding: 1.5rem;
  color: ${({ theme }) => theme.color.textPrimary};
  background: ${({ theme }) => theme.color.modalBg};
  border: 1px solid ${({ theme }) => theme.color.borderPrimary};

  @media screen and (max-width: 700px) {
    width: 100%;
    height: 100%;
    margin: 0;
    border: none;
  }
`;

const ModalTitle = styled.h3`
  grid-row: 1 / 2;
  grid-column: 2 / 3;
  justify-self: center;
  color: ${({ theme }) => theme.color.textPrimary};
  font-size: 1.4rem;
  margin: 0;
`;

const ModalCloseButton = styled(CloseRoundedIcon)`
  grid-row: 1 / 2;
  grid-column: 3 / 4;
  justify-self: flex-end;
  align-self: center;
  color: ${({ theme }) => theme.color.textPrimary};
  border: 2px solid ${({ theme }) => theme.color.textPrimary};
  border-radius: 0.3rem;
  font-size: 1.2rem !important;

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.color.navLinkHover};
    border-color: ${({ theme }) => theme.color.navLinkHover};
  }
`;

type Props = {
  children: JSX.Element;
  headerTitle: string | undefined;
  closeOnOutsideClick?: boolean;
  closeModal: () => void;
  closeImage?: () => void;
};

function CenteredModal({
  children,
  headerTitle,
  closeOnOutsideClick = true,
  closeModal,
  closeImage,
}: Props): JSX.Element {
  return ReactDOM.createPortal(
    <ModalOverlay onClick={closeOnOutsideClick ? closeModal : undefined}>
      <ModalContainer
        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          event.stopPropagation();
          closeImage ? closeImage() : null;
        }}
      >
        <TopGridContainer>
          <ModalTitle>{headerTitle}</ModalTitle>
          <ModalCloseButton onClick={closeModal} />
        </TopGridContainer>
        {children}
      </ModalContainer>
    </ModalOverlay>,
    document.body
  );
}

export default CenteredModal;
