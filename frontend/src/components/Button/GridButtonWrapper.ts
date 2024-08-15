import styled from 'styled-components';

const ButtonWrapper = styled.div<{
  $gridRow?: string;
  $gridCol?: string;
  $justifySelf?: string;
  $alignSelf?: string;
}>`
  ${({ $gridRow }) => $gridRow && `grid-row: ${$gridRow};`}
  ${({ $gridCol }) => $gridCol && `grid-column: ${$gridCol};`}
  ${({ $justifySelf }) => $justifySelf && `justify-self: ${$justifySelf};`}
`;

export default ButtonWrapper;
