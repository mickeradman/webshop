import styled from 'styled-components';

export const ModalOverlay = styled.section<{
  $transparentBgOnDrawerClose?: boolean;
}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ $transparentBgOnDrawerClose }) =>
    $transparentBgOnDrawerClose ? 'transparent' : 'rgba(0, 0, 0, 0.7)'};
`;
